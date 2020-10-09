import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BackendHttpOperationsService {
  // userServerDomain = "https://user-service-dot-avian-mile-291100.uc.r.appspot.com";
  // userTaskServerDomain = "https://user-task-service-dot-avian-mile-291100.uc.r.appspot.com";
  userServerDomain = "http://localhost:3500";
  userTaskServerDomain = "http://localhost:4500";

  constructor(private  http: HttpClient){}

  public getAllUsers(){
    return this.http.get(this.userServerDomain+"/users");
  }

  public getUserInformation(userID:string){
    return this.http.get(this.userServerDomain+"/users/"+userID);
  }

  public createNewUser(name:string){
    //set headers
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    //create form
    let form = { name:name};

   return this.http.post(this.userServerDomain+"/users",form,{headers:headers});
  }

  public updateUserInformation(userID:string,name:string){
    //set headers
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    //create form
    let form = { name:name};

    return this.http.post(this.userServerDomain+"/users/"+userID,form,{headers:headers});
  }

  public deleteUserInformation(userID:string){
    return this.http.delete(this.userServerDomain+"/users/"+userID);
  }

  public getUserTasks(userID:string){
    return this.http.get(this.userTaskServerDomain+"/user/"+userID+"/tasks");
  }

  public createUserTasks(userID:string,description:string,state:string){
    //set headers
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    //create form
    let form = {
      userID:userID,description:description,state:state
    };

    return this.http.post(this.userTaskServerDomain+"/tasks",form,{headers:headers});
  }

  public updateTaskInformation(taskID:string,description:string,state:string){
    //set headers
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    //create form
    let form = {
      description:description,state:state
    };

    return this.http.post(this.userTaskServerDomain+"/tasks/"+taskID,form,{headers:headers});
  }
}
