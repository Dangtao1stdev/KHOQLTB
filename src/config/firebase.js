import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyANSGJzNnkdKXHUMW5NvX5SjFKi3T_C2RY",
  authDomain: "app--sheets.firebaseapp.com",
  projectId: "app--sheets",
  storageBucket: "app--sheets.appspot.com",
  messagingSenderId: "203079837692",
  appId: "1:203079837692:web:aa1e5a6a6f95b78a13b479",
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export default firebase
