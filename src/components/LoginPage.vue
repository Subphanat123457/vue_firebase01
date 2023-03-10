<script setup>
import Swal from "sweetalert2";
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";

// import Swal from "sweetalert2";

const router = useRouter();
const email = ref();
const pwd = ref();
const provider = new GoogleAuthProvider();

function login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User : " + user);
      router.push("/index");
      Swal.fire("Welcome", "You clicked the button!", "success");
      router.push("/insert");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    });
}

function register() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User : " + user);
      Swal.fire("Welcome", "register", "success");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      // ..
    });
}

function googlelogin() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("Token : " + token);
      console.log("User : " + user);
      Swal.fire("Welcome", "You clicked the button!", "success");
      router.push("/insert");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log("Error : " + errorCode + errorMessage);
      console.log("email :" + email + credential);
    });
}
</script>

<template>
  <div class="flex-container">
    <div class="flex-items">
      <!-- Email input -->
      <h1>Login</h1>
      <div class="form-outline mb-4">
        <input
          type="email"
          id="email"
          class="form-control"
          placeholder="email"
          v-model="email"
        />
        <label class="form-label" for="form2Example1">Email address</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input
          type="password"
          id="pwd"
          class="form-control"
          name="pwd"
          v-model="pwd"
        />
        <label class="form-label">Password</label>
      </div>

      <!-- 2 column grid layout for inline styling -->

      <!-- Submit button -->
      <button
        type="button"
        class="btn btn-primary btn-block mb-4"
        @click="login()"
      >
        Login
      </button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>
          Login from Google
          <button class="btn btn-link" @click="googlelogin()">Click</button>
        </p>

        <p>
          Register Email
          <button class="btn btn-link" @click="register()">Click</button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: normal;
  align-items: normal;
  align-content: normal;
}

.flex-items {
  display: block;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: center;
  order: 0;
  max-width: 100%;
}
.block-login {
  padding-top: 50px;
  padding-left: 20%;
  background: gray;
  width: 500px;
  height: auto;
}
</style>
