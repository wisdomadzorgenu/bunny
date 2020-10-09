const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

//use should
chai.should();
chai.use(chaiAsPromised);

const UserTaskController = require("../controller/userTaskController");

//use the user-tasks-test collection for unit test
const userTask = new UserTaskController("user-tasks-test");

//UNIT TESTS
describe('User Tasks Controller Unit Tests',function(){
   this.timeout(10000); // this test can take up to 10 seconds

   it("should reject when no user id is provided during tasks retrieval",function(){
      return userTask.getAllUserTasks().should.eventually.be.rejected;
   });

   it("should succeed when a user id is provided for task retrieval",function(){
      return userTask.getAllUserTasks("test-user").should.eventually.be.fulfilled;
   });

   it("should reject when creating a task with no user id",function(){
      return userTask.createNewUserTask().should.eventually.be.rejected;
   });

   it("should reject when creating a task with no task description",function(){
      return userTask.createNewUserTask("some-task").should.eventually.be.rejected;
   });

   it("should reject when creating a task with no task state",function(){
      return userTask.createNewUserTask("some-task","a little description").should.eventually.be.rejected;
   });

   it("should successfully create a new task when userID,task description and state are provided",function(){
      return userTask.createNewUserTask("Test-user","some description","to do").should.eventually.be.fulfilled;
   });

   it("should reject when updating a task with no id",function(){
      return userTask.updateTaskInformation().should.eventually.be.rejected;
   });

   it("should reject when updating a task with no description",function(){
      return userTask.updateTaskInformation("task-id").should.eventually.be.rejected;
   });

   it("should reject when updating a task with no state",function(){
      return userTask.updateTaskInformation("some-task","a little description").should.eventually.be.rejected;
   });

   it("should successfully update a task given taskID, description and state",function(){
      return userTask.createNewUserTask("Test-user","some description","to do")
         .then((taskID)=>{
            return userTask.updateTaskInformation(taskID,"updated description","to do").should.eventually.be.fulfilled;
         });
   });
});