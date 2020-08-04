import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export const addData = (data) => {
  return db.collection('satisfaction_data').add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    ...data,
  });
};

export default {};
