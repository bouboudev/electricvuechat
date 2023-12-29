// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQNKaXTtBypXcQO85tSVn7q7_h--OYBAk",
  authDomain: "electricvuechat.firebaseapp.com",
  databaseURL: "https://electricvuechat-default-rtdb.firebaseio.com",
  projectId: "electricvuechat",
  storageBucket: "electricvuechat.appspot.com",
  messagingSenderId: "304249265542",
  appId: "1:304249265542:web:04e7ecc95f65618c60a007"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getDatabase(app)

export { auth, db }