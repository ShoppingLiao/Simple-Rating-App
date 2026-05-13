import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addData = (data) => {
  return addDoc(collection(db, 'satisfaction_data'), {
    created: serverTimestamp(),
    ...data,
  });
};

export default {};
