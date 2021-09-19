 // For Firebase JS SDK v7.20.0 and later, measurementId is optional

const config ={
  apiKey: "AIzaSyBmjbc7P21ttmGQsMh-sCqEcnaX3vKmWbc",
  authDomain: "hackathon2021-fb5b3.firebaseapp.com",
  databaseURL: "https://hackathon2021-fb5b3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hackathon2021-fb5b3",
  storageBucket: "hackathon2021-fb5b3.appspot.com",
  messagingSenderId: "206917093971",
  appId: "1:206917093971:web:1cf3e2a4cfd6160ee354a6",
  measurementId: "G-NQHP5HQE5K"
};

// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();
var db = firebase.firestore();
