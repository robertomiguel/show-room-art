import { DocumentData, DocumentSnapshot, Firestore, collection, deleteDoc, doc, getDocs, limit, query, setDoc, where } from "firebase/firestore"
import { PersonalData } from "appType";

export const personal = (db: Firestore) => {

    return {
        getById: async (personalId: string, password?: string | null) => {
            try {
                  const q = query(
                    collection(db, 'personal'),
                    where("id", "==", personalId),
                    where("password", "==", password ?? null),
                    where("enabled", "==", true),
                    limit(1),
                  )
                  const querySnapshot: DocumentData = await getDocs(q);
                  const res = querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data())[0]
                  if (res?.id) {
                        return res as PersonalData
                  }
                  return { error: 'showAccessPassForm'} as PersonalData;
            } catch {
                return null;
            }
        },

        getByUid: async (personalId: string, uid: string) => {
            try {
                  const q = query(
                    collection(db, 'personal'),
                    where("id", "==", personalId),
                    where("uid", "==", uid),
                    where("enabled", "==", true),
                    limit(1),
                  )
                  const querySnapshot: DocumentData = await getDocs(q);
                  return querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data())[0]
            } catch {
                return null;
            }
        },

        update: async (personalId: string, data: PersonalData) => {
            const docRef = doc(db, 'personal', personalId);
            await setDoc(docRef, data, { merge: true });
        },

        create: async (personalId: string, data: PersonalData) => {
            const docRef = doc(db, 'personal', personalId);
            await setDoc(docRef, data);
        },

        delete: async (personalId: string) => {
            const docRef = doc(db, 'personal', personalId);
            await deleteDoc(docRef);
        }
    }
}
