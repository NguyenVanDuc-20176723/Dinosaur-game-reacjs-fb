import firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyCXOZQopSVKZnazl02Kz_ai374OEQfGbwM",
//   authDomain: "fir-sample-e7c33.firebaseapp.com",
//   projectId: "fir-sample-e7c33",
//   storageBucket: "fir-sample-e7c33.appspot.com",
//   messagingSenderId: "1012402618605",
//   appId: "1:1012402618605:web:e93df80e5dd89edd2c0ce4"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBRf-R3Z0yx6SpCubHQBl5xVs10uGGAatk",
  authDomain: "dinosaur-game-199ef.firebaseapp.com",
  projectId: "dinosaur-game-199ef",
  storageBucket: "dinosaur-game-199ef.appspot.com",
  messagingSenderId: "364375239011",
  appId: "1:364375239011:web:7eb44d427b3aabeecb8b56"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};

