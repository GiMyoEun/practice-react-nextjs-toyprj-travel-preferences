// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCED6unm7942bR9vsDsK3KR6cgOerw8f_g',
    authDomain: 'fcst-wear.firebaseapp.com',
    databaseURL: 'https://fcst-wear-default-rtdb.firebaseio.com',
    projectId: 'fcst-wear',
    storageBucket: 'fcst-wear.appspot.com',
    messagingSenderId: '821452527350',
    appId: '1:821452527350:web:90938316ff10b681b27ed7',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
