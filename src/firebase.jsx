import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
      apiKey: "AIzaSyA2b63Mxarv6DyKVNP_DRYP75K84feUbAM",
      authDomain: "pokeapi-75e1c.firebaseapp.com",
      projectId: "pokeapi-75e1c",
      storageBucket: "pokeapi-75e1c.appspot.com",
      messagingSenderId: "783139670218",
      appId: "1:783139670218:web:dc05c3a0f1a61ccc090c33",
      measurementId: "G-D6M5N897LR"
    };
    
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  export const FirebaseConf = {
    db,
    auth
  };