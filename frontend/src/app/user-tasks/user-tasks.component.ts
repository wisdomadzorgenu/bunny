import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Data,Router } from '@angular/router';
import { BackendHttpOperationsService } from '../services/backend-http-operations.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css','../users/users.component.css']
})

export class UserTasksComponent implements OnInit {
  public taskInformation:{id:string,description:string,state:string}[] = [];
  public userID:string = "";
  public name:string = "";
  public toBeUpdatedTask:{id:string,description:string,state:string} = {id:"",description:"",state:""};
  public modalProcessing:boolean = false;
  public modalErrorMessage:string = "";
  public 	modalRef: BsModalRef;
	private modalConfig = {backdrop: true, ignoreBackdropClick:true, keyboard:false};

  //modal refs
	@ViewChild('userTaskTemplate',{static:false}) userTaskTemplate;

  //alert component variables
  public showAlert:boolean = false;
  public alertType:string = "";
  public alertMessage:string = "";

  constructor(private backendOp:BackendHttpOperationsService, private route:ActivatedRoute,
    private modalService: BsModalService,private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((response)=>{
      this.userID = response.id;
      this.name = response.name;

      this.getUserTasks();
    });
  }

  public getUserTasks(){
      this.backendOp.getUserTasks(this.userID)
        .subscribe((response:any)=>{
            if(response && (response.status ==="error" || response.error)){
              this.alertType = "error";
              this.alertMessage = response.message;
              this.showAlert = true;
            }
            else {
              //retrieve task information
              this.taskInformation = (response && response.tasks) ? response.tasks : [];
            }
        });
  }

  //show add modal
  public triggerUpdateTask(id=null,description=null,state=null){

    this.toBeUpdatedTask.id = id ? id : "";
    this.toBeUpdatedTask.description = description ? description :"";
    this.toBeUpdatedTask.state = state ? state :"";

    //show modal
    this.modalRef = this.modalService.show(this.userTaskTemplate,this.modalConfig);
  }

  public processTaskInfo(){
    if(this.toBeUpdatedTask.description && this.toBeUpdatedTask.state){
      //pop add user modal
      this.modalProcessing = true;

      //add new user if id doesn't exist or update if exists
      let subscription = null;

      if(this.toBeUpdatedTask.id){
        //update task info
        subscription = this.backendOp.updateTaskInformation(this.toBeUpdatedTask.id,
          this.toBeUpdatedTask.description,this.toBeUpdatedTask.state);
      }
      else {
        //create new user task
        subscription = this.backendOp.createUserTasks(this.userID,this.toBeUpdatedTask.description,
          this.toBeUpdatedTask.state);
      }

      //subscribe to observable
      subscription.subscribe((response:any)=>{
        this.modalProcessing = false;

        if(response && (response.status ==="error" || response.error)){
          this.modalErrorMessage = response.message;
        }
        else {
          //add to array if no id is present
          if(!this.toBeUpdatedTask.id){
            //add user to array
            let userTask = {
              id:response.taskID,
              description:this.toBeUpdatedTask.description,
              state:this.toBeUpdatedTask.state
            };

            this.taskInformation.push(userTask);

            this.cancelModal();

            //assign message type and show alert.
            this.alertType = "okay";
            this.alertMessage = "Task was successfully added";
            this.showAlert = true;
          }
          else {
            //find user with id and update description,state accordingly
            let ind = this.taskInformation.findIndex((element)=>element.id===this.toBeUpdatedTask.id);

            //update description and state
            this.taskInformation[ind].description = this.toBeUpdatedTask.description;
            this.taskInformation[ind].state = this.toBeUpdatedTask.state;

            this.cancelModal();

            //assign message type and show alert.
            this.alertType = "okay";
            this.alertMessage = "Task was successfully updated";
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

  public onAlertClosed(closed:boolean){
    if(closed)
      this.showAlert = false;
  }

}
