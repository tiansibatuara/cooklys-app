import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCWjDNahtbw_xBsl2GwmxyF6vV-RBsJkFg",
    authDomain: "cooklys-app.firebaseapp.com",
    projectId: "cooklys-app",
    storageBucket: "cooklys-app.appspot.com",
    messagingSenderId: "114130156489",
    appId: "1:114130156489:web:795b057e7a384f432f0618"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth, db};