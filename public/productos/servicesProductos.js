import {firebaseConfig} from '../env.js'

// Your web app's Firebase configuration
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const db = firebase.firestore();

const create = (data) => {
  return db.collection("products").add(data);
};

const update = (id, data) => {
  const recordRef = db.collection("products").doc(id);
  return recordRef.update(data);
};

const delet = (id) => {
  return db.collection("products")
  .doc(id)
  .delete()
}

const suscribe = (cb) => {
  return db.collection("products").onSnapshot(cb);
};

export default {
  create,
  update,
  delet,
  suscribe
}