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

export const getFirebaseItems = async (coll) => {
  try {
    const snapshot = await db
      .collection(coll)
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

export const addFirebaseItem = async (coll, item) => {
  try {
    const todoRef = db.collection(coll);
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (coll, item, id) => {
  try {
    const todoRef = db.collection(coll).doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (coll, item) => {
  const todoRef = db.collection(coll).doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};

export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export const storeUserInfo = async (user) => {
  const { uid } = user;
  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await db.collection("users").doc(uid).set({ name: user.displayName });
    return {
      name: user.displayName,
      id: uid,
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
}

export const updateUser = async (user, image) => {
  try {
    const userDoc = await firebase.firestore().collection("users").doc(user.id).get();
    if (userDoc.exists) {
      await firebase.firestore().collection("users").doc(user.id).update({ ...userDoc.data(), image: image });
    }
  } catch (err) {
    console.log(err);
  }
}

export const uploadImage = async (image) => {
  const ref = firebase.storage().ref().child(`/images/${image.name}`);
  let downloadUrl = "";
  try {
    await ref.put(image);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
}; 