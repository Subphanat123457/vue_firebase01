import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// import bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

// Your web app's Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyA8IVUDz3Fu6XT3uZViYVz3q_V4pXB7uqw",
    authDomain: "project-vue-firebase-3503a.firebaseapp.com",
    projectId: "project-vue-firebase-3503a",
    storageBucket: "project-vue-firebase-3503a.appspot.com",
    messagingSenderId: "638421835415",
    appId: "1:638421835415:web:03f699c5091f5d70d713d2"
};

// Initialize Firebase
const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");