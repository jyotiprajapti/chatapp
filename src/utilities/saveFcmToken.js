 
 
import { doc, setDoc } from 'firebase/firestore';
import { database } from '../config/firebase'; // Firestore instance
 export const saveFcmToken = async (userId, token) => {
        try {
            const userRef = doc(database, "users", userId);
            await setDoc(userRef, { fcmToken: token }, { merge: true }); // Merge keeps existing data
            console.log('FCM Token saved successfully.');
        } catch (error) {
            console.error('Error saving FCM token:', error);
        }
    };