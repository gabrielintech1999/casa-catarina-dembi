import bcrypt from "bcryptjs";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
  
// Função de login com Firestore
export async function loginUser({
  phone,
  password,
}: {
  phone: string;
  password: string;
}) {
  const q = query(collection(db, "customers"), where("phone", "==", phone));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (passwordMatch) {
      return { id: userDoc.id, ...userData };
    } else {
      throw new Error("A palavra-passe ou número de telefone estão incorretos.");
    }
  } else {
    throw new Error("Nenhum usuário com essas credenciais foi encontrado!");
  }
}

export async function createCustomer(
  name: string,
  address: string,
  phone: string,
  password: string,
  acceptedTerms: boolean // Add this parameter
) {
  const customerRef = doc(collection(db, "customers"), phone);
  const customerSnap = await getDoc(customerRef);

  if (customerSnap.exists()) {
    throw new Error("Usuário já existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const customerData = {
    name,
    address,
    phone,
    password: hashedPassword,
    acceptedTerms,
    createdAt: new Date().toISOString(),
  };

  await setDoc(customerRef, customerData);

  return { id: customerRef.id, ...customerData }; // Return the created customer
}
