import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCbY9OgvKPZ4JMwPewaIdsxN1M0ipLI8qA",
    authDomain: "what-s-app-clone-a5fb4.firebaseapp.com",
    projectId: "what-s-app-clone-a5fb4",
    storageBucket: "what-s-app-clone-a5fb4.appspot.com",
    messagingSenderId: "443536071757",
    appId: "1:443536071757:web:ea1814ac2a034568e45004",
    measurementId: "G-JYYYLLCYDH"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db =firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;