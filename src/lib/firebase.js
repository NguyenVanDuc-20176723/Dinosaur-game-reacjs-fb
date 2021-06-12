import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDt6Cf5Ve0HtQ9tENtjVQHqXZrA2j1ssOk",
  authDomain: "game4-e6ad7.firebaseapp.com",
  projectId: "game4-e6ad7",
  storageBucket: "game4-e6ad7.appspot.com",
  messagingSenderId: "836474866852",
  appId: "1:836474866852:web:8de344a11f4a6a30142a31"
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