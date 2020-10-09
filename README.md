# User Task Management
This is a simple project which allows a client to manage users in the application as well as manage their tasks created.

All tasks can have only two states:
  - To do
  - Done

### Live Testing
To test the application live, please visit any of the following sites
- https://bunny-studio.web.app
- https://bunny-studio.firebaseapp.com

### Installation
This micro service application requires [Node.js](https://nodejs.org/) v8+ to run.

`Please install Node.js v8+ before proceeding`

### Installing User Service
Install the dependencies and devDependencies
```sh
$ cd projectDir
$ cd backend
$ cd user
$ npm install 
```
Additional Steps:
- Go to hidden directory under user.
- Open bunny-studio.json file.
- Add firebase service account credentials. 

`Note: You are required to create a firebase project with firestore.`

### Start User Service
```sh
$ cd projectDir
$ cd backend
$ cd user
$ node server.js 
```

### Installing User Task Service
Install the dependencies and devDependencies
```sh
$ cd projectDir
$ cd backend
$ cd user-task
$ npm install 
```
Additional Steps:
- Go to hidden directory in user.
- Open bunny-studio.json file.
- Add firebase service account credentials. 
`Note: You are required to create a firebase project with firestore.`

### Start User Task Service
```sh
$ cd projectDir
$ cd backend
$ cd user-task
$ node server.js 
```

### Frontend Installation and Running 
```sh
$ cd projectDir
$ cd frontend
$ npm install
$ ng serve
```

## Running Test on Microservices
To run already written unit tests for the services, please do the following:

### Testing User Service
```sh
$ cd projectDir
$ cd backend
$ cd user
$ npm run test
```

### Testing User Task Service
```sh
$ cd projectDir
$ cd backend
$ cd user-task
$ npm run test
```

### Building for production
For frontend production release:
```sh
$ cd projectDir
$ cd frontend
$ ng build --aot
```

### Upload to Hosting
- Copy files in your frontend dist directory to server.
- Modify app configurations for User  and User Task Services.
- Create a user Service and copy backend user directory over there.
- Create a user Task Service and copy backend user-task directory over there.
