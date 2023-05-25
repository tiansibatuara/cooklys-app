import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCWjDNahtbw_xBsl2GwmxyF6vV-RBsJkFg",
    authDomain: "cooklys-app.firebaseapp.com",
    projectId: "cooklys-app",
    storageBucket: "cooklys-app.appspot.com",
    messagingSenderId: "114130156489",
    appId: "1:114130156489:web:795b057e7a384f432f0618"
};

// if (!firebase.apps.length){
//     firebase.initializeApp(firebaseConfig)
// }

// export { firebase };

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();

const db = getFirestore();

export { auth, db };