
import firebase from "firebase/app";
import "firebase/database";
import {getAuth} from "firebase/auth";


const config = {

apiKey: "process.env.CONFIGAPIKEY",
authDomain: "process.env.CONFIGDOMAIN",
databaseURL: "https://electricvuechat-default-rtdb.firebaseio.com",
projectId: "process.env.CONFIPROJECTID",
storageBucket: "process.env.CONFIGBUCKET",
messagingSenderId: "process.env.CONFIGMESSAGING",
appId: "process.env.CONFIGAPIID"
}

const db  = firebase.initializeApp(config);

const auth = getAuth(db);
export default {db, auth}

