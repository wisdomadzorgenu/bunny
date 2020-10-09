const db = require("../config/dbConnection");
const USER_SERVER = require("../config/serverUrls").USER_SERVER;
const axios = require("axios");

class UserTaskController
{
   //collections to use
   constructor(collection="user-tasks"){
      //default collection to use is user-task
      this.dbRef = db.collection(collection);
   }

   /**
    * Get all users from user-s server
    * @returns Promise
    */
   getAllUsers(){
      //get user from user server
      return axios.get(USER_SERVER+"/users");
   }

   /**
    * Get all tasks for a given user
    * @param {string} userID
    * @returns Promise
    */
   getAllUserTasks(userID){
      if(!userID)
         return Promise.reject("A valid user is required");

      return this.dbRef.where("user_id","==",userID).get()
         .then(results=>{
            let allTasksData = [];

            //retrive documents
            results.forEach((doc)=>{
               let data = doc.data();
               data.id = doc.id;

               allTasksData.push(data);
            });

            return allTasksData;
         });
   }

   /**
    * Create a new user task
    * @param {string} userID
    * @param {string} description
    * @param {string} state
    * @returns Promise
    */
   createNewUserTask(userID,description,state){
      if(!userID || !description || !state)      
         return Promise.reject("A valid task information is required");

      //
      let info = {user_id:userID,description:description,state:state}
   
      //save a new user task
      return this.dbRef.add(info)
         .then(res=>{
            //returned the saved ID
            return res.id;
         });
   }

   /**
    * Update a task  information
    * @param {string} taskID
    * @param {string} description
    * @param {string} state
    * @returns Promise
    */
   updateTaskInformation(taskID, description,state){
      if(!taskID || !description || !state)      
         return Promise.reject("A valid task information is required");

      //
      let toBeUpdated = {description:description,state:state};

      //update an existing task
      return this.dbRef.doc(taskID).update(toBeUpdated)
         .then(res=>{
            //updated successfully
            return true;
         });
   }
}

module.exports = UserTaskController;