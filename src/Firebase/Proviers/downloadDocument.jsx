
import { getDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const downloadDocument = async(path) => {
    const docRef = doc(db, path);
    const data = await getDoc(docRef);

    if (data.exists()) {
    return data.data()
    } else {
    console.log("No such document!");
    }
}
