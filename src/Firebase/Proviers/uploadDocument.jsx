
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../FirebaseConfig';

export const uploadDocument = async (path, data) => {
    const ref = doc(db, path);
    
    try {
        await setDoc(ref, data, { merge: true });
        return { success: true, error: null };
    } catch (error) {
        console.error("Error al cargar el documento:", error);
        return { success: false, error };
    }
}
