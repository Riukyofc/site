import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1WkVRT7q0GsDalUyhvQ3pgHbdLtthiWc",
  authDomain: "rkystudio-b8c89.firebaseapp.com",
  projectId: "rkystudio-b8c89",
  storageBucket: "rkystudio-b8c89.firebasestorage.app",
  messagingSenderId: "41582447919",
  appId: "1:41582447919:web:91b2e0600428b38191a5da"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    console.log("Tentando adicionar documento...");
    const docRef = await addDoc(collection(db, "products"), {
      name: "Teste via Node",
      type: "Web",
      price: 0,
      createdAt: new Date()
    });
    console.log("Documento escrito com ID: ", docRef.id);
    
    console.log("Lendo documentos...");
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
    });
    process.exit(0);
  } catch (e) {
    console.error("Erro no teste: ", e);
    process.exit(1);
  }
}

test();
