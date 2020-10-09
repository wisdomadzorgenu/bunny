import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Data,Router } from '@angular/router';
import { BackendHttpOperationsService } from '../services/backend-http-operations.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public usersInformation:{name:string,id:string}[] = [];
  public toBeUpdatedUser:{name:string,id:string} = {name:"",id:""};
  public modalProcessing:boolean = false;
  public modalErrorMessage:string = "";
  public 	modalRef: BsModalRef;
	private modalConfig = {backdrop: true, ignoreBackdropClick:true, keyboard:false};

  //modal refs
	@ViewChild('userTemplate',{static:false}) userTemplate;

  //alert component variables
  public showAlert:boolean = false;
  public alertType:string = "";
  public alertMessage:string = "";

  constructor(private backendOp:BackendHttpOperationsService, private route:ActivatedRoute,
    private modalService: BsModalService,private router:Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(){
    this.backendOp.getAllUsers()
      .subscribe((response:any)=>{
        if(response && (response.status ==="error" || response.error)){
          this.alertType = "error";
          this.alertMessage = response.message;
          this.showAlert = true;
        }
        else{
          //retrieve user information
          this.usersInformation = (response && response.users) ? response.users : [];
        }
      });
  }

  //show add modal
  public triggerUpdateUser(id=null,name=null){
    this.toBeUpdatedUser.id = id ? id : "";
    this.toBeUpdatedUser.name = name ? name :"";

    //show modal
    this.modalRef = this.modalService.show(this.userTemplate,this.modalConfig);
  }

  public processUserInfo(){
    if(this.toBeUpdatedUser.name){
      //pop add user modal
      this.modalProcessing = true;

      //add new user if id doesn't exist or update if exists
      let subscription = null;

      if(this.toBeUpdatedUser.id)
        subscription = this.backendOp.updateUserInformation(this.toBeUpdatedUser.id,this.toBeUpdatedUser.name);
      else
        subscription = this.backendOp.createNewUser(this.toBeUpdatedUser.name);

      //subscribe to observable
      subscription.subscribe((response:any)=>{
        this.modalProcessing = false;

        if(response && (response.status ==="error" || response.error)){
          this.modalErrorMessage = response.message;
        }
        else {
          //add to array if no id is present
          if(!this.toBeUpdatedUser.id){
            //add user to array
            let user = {name:this.toBeUpdatedUser.name,id:response.userID};

            this.usersInformation.push(user);

            this.cancelModal();

            //assign message type and show alert.
            this.alertType = "okay";
            this.alertMessage = "User was successfully added";
            this.showAlert = true;
          }
          else {
            //find user with id and update name accordingly
            let ind = this.usersInformation.findIndex((element)=>element.id===this.toBeUpdatedUser.id);

            //update name
            this.usersInformation[ind].name = this.toBeUpdatedUser.name;

            this.cancelModal();

            //assign message type and show alert.
            this.alertType = "okay";
            this.alertMessage = "User was successfully updated";
            this.showAlert = true;
          }
        }
      });
    }
  }

  public cancelModal(){
    this.modalErrorMessage = "";
    this.modalProcessing = false;
    this.modalRef.hide()
  }

  public deleteUser(userID:string,name:string,index:number){
    let confirmMessage = "Are you sure you want to delete " + name + " ?";
    confirmMessage += " Operation will be irreversible.";

    let confirmed = window.confirm(confirmMessage);

    if(confirmed){

      //delete user from server
      this.backendOp.deleteUserInformation(userID)
        .subscribe((response:any)=>{

          if(response && (response.status ==="error" || response.error)){
            this.alertType = "error";
            this.alertMessage = response.message;
            this.showAlert = true;
          }
          else if(response && response.isDeleted){
            //remove deleted field from array
            this.usersInformation.splice(index,1);

            //assign message type and show alert.
            this.alertType = "okay";
            this.alertMessage = "User was successfully deleted";
            this.showAlert = true;
          }
        });
    }
  }

  public onAlertClosed(closed:boolean){
    if(closed)
      this.showAlert = false;
  }

  public goToUserTasks(id:string,name:string){
    //navigate to user tasks
    this.router.navigate(["/tasks"], {
      relativeTo:this.route,
      queryParams: {id:id,name:name}
    });
  }
}
