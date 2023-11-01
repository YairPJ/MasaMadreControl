import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const downloadCollections = async (path) => {
  try {
    const data = [];
    const querySnapshot = await getDocs(collection(db, path));
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    console.error("Error al descargar colecciones:", error);
    return error;
  }
}
