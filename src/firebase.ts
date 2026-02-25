import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA8tReweL3VMhP3VsHZvbDXDIRn9OEL1Lg",
    authDomain: "link-bio-19b68.firebaseapp.com",
    projectId: "link-bio-19b68",
    storageBucket: "link-bio-19b68.firebasestorage.app",
    messagingSenderId: "676208700982",
    appId: "1:676208700982:web:8522aadba0cdf13548b297",
    measurementId: "G-QQYLHK84RE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
