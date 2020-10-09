const express =  require("express");
const UserTaskController = require("../controller/userTaskController");
const handleError = require("./error-handler").handleError;

module.exports =  () => {
   //define router
   let router = express.Router();     
   let userTask = new UserTaskController();

   /**
    * =============================
    *  GET ALL TASTKS OF A USER
    * =============================
    */    
   router.get("/user/:user/tasks",(req,res)=>{
      let userID = (req && req.params && req.params.user) ? req.params.user : "";

      if(userID){
         //get user tasks information
         userTask.getAllUserTasks(userID)
            .then(result=>{
               res.json({ tasks:result});
            })
            .catch(err=>{
               handleError(err,res);
            });
      }
      else {
         //send an empty task
         res.json({tasks:[]});
      }
   });

   /**
    * ============================
    *  UPDATE A TASK INFORMATION
    * ============================
    */
   router.post("/tasks/:id",(req,res)=>{
      let taskID = req.params.id;
      let description = (req && req.body && req.body.description) ? req.body.description : "";
      let state = (req && req.body && req.body.state) ? req.body.state : "";

      if(taskID && description && state){
         //update task information
         userTask.updateTaskInformation(taskID,description,state)
            .then(result=>{
               res.json({ issuccessful:true});
            })
            .catch(err=>{
               //if error has a code of 5, it means task doesn't exist
               if(err && err.code && err.code===5){
                  res.status(400).send("Sorry, task does not exist. Please create task");
               }
               else{
                  handleError(err,res);
               }
            });
      }
      else {
         //A task information is required
         res.status(400).send("A valid task information is required.");
      }
   });

   /**
    * ========================
    *  CREATE A NEW USER TASK
    * =======================
    */
   router.post("/tasks",(req,res)=>{
      let userID =  (req && req.body && req.body.userID) ? req.body.userID : "";
      let description = (req && req.body && req.body.description) ? req.body.description : "";
      let state = (req && req.body && req.body.state) ? req.body.state : "";

      if(userID && description && state){
         //create a new user task information
         userTask.createNewUserTask(userID,description,state)
            .then(id=>{
               //return created user task
               res.json({ taskID:id});
            })
            .catch(err=>{
               handleError(err,res);
            });
      }
      else {
         //A valid task is required
         res.status(400).send("A valid task information is required.");
      }
   });

   return router;
}
