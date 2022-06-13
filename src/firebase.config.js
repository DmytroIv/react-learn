// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAEnRQ2GwJgpz_tEsqA31fO6TRyggMLVz4',
  authDomain: 'house-marketplace-c4622.firebaseapp.com',
  projectId: 'house-marketplace-c4622',
  storageBucket: 'house-marketplace-c4622.appspot.com',
  messagingSenderId: '176479256411',
  appId: '1:176479256411:web:461bdcdd40398cc738e47e',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
