<script setup>
import Swal from "sweetalert2";
import { ref } from "vue";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../main";
// import Swal from "sweetalert2";

const menu = ref({
  nameTH: "",
  nameEng: "",
  price: 0,
  detail: "",
});

const allMenu = ref([]);

async function addUserData() {
  try {
    const docRef = await addDoc(collection(db, "foodmenu"), menu.value);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function showMenu() {
  allMenu.value = [];
  const querySnapshot = await getDocs(collection(db, "foodmenu"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // allMenu.value.push({ ...doc.data(), id: doc.id });\
    const myDoc = ref({ id: doc.id, data: doc.data() });
    console.log(doc.id, " => ", doc.data());
    // console.log(allMenu.value);
    console.log(myDoc);
    allMenu.value.push(myDoc.value);
  });
}

async function removeData(foodID) {
  await deleteDoc(doc(db, "foodmenu", foodID));
  showMenu();
}
</script>
<template>
  <form>
    <div class="flex-container">
      <div class="flex-items">
        <h1>Insert Items</h1>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">ชื่อเมณูTH</span>
          <input
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            v-model="menu.nameTH"
            required
          />
        </div>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">ชื่อเมนูeng</span>
          <input
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            v-model="menu.nameEng"
            required
          />
        </div>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">ราคา</span>
          <input
            type="number"
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            v-model="menu.price"
            required
          />
        </div>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">รายละเอียด</span>
          <input
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            v-model="menu.detail"
            required
          />
        </div>
      </div>
    </div>
  </form>
  <button @click="addUserData()">เพิ่มข้อมูล</button>
  <br />
  <div>
    <button @click="showMenu()">แสดงเมนู</button>
    <table>
      <tr>
        <th>เมนูภาษาไทย</th>
        <th>MenuEng</th>
        <th>ราคา</th>
        <th>รายละเอียด</th>
      </tr>
      <tr v-for="(item, index) in allMenu" :key="index">
        <td>{{ item.data.nameTH }}</td>
        <td>{{ item.data.nameEng }}</td>
        <td>{{ item.data.price }}</td>
        <td>{{ item.data.detail }}</td>
        <td>
          <button @click="removeData(item.id)">ลบ</button><br />{{ item.id }}
        </td>
      </tr>
    </table>
  </div>
  <br />
</template>

<style></style>
