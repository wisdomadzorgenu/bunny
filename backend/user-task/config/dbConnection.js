const Firestore = require('@google-cloud/firestore');
const path = require("path");

let projectInfo = {
   projectId: 'bunny-studio',
   keyFilename: path.join(__dirname,'../hidden/bunny-studio-firebase-adminsdk-i2fuo-3b874267ce.json')
};

// Instantiate a firestore db client
module.exports = new Firestore(projectInfo);
