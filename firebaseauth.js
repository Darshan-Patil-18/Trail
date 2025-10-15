<<<<<<< HEAD
// firebaseauth.js

// --- START: FIREBASE SDK IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    linkWithCredential
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    doc, 
    updateDoc, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// --- END: FIREBASE SDK IMPORTS ---


const firebaseConfig = {
    apiKey: "AIzaSyBre-Xou2Tsd8RJYwHVl-YHzZUg2txD_tI",
    authDomain: "lostandfound-8d249.firebaseapp.com",
    projectId: "lostandfound-8d249",
    storageBucket: "lostandfound-8d249.firebasestorage.app",
    messagingSenderId: "107194636963",
    appId: "1:107194636963:web:0d1bd5a718c8321f653d16"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- START: AUTHENTICATION EXPORTS (No changes here) ---
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    linkWithCredential
};
// --- END: AUTHENTICATION EXPORTS ---


// --- START: NEW FIRESTORE & LOCALSTORAGE FUNCTIONS ---

// 1. Save item data (text to Firebase, full object to localStorage)
export async function saveItem(item) {
    // Save the full item (including image) to localStorage first
    saveItemToLocalStorage(item);

    // Prepare a new object for Firestore without the image data
    const firestorePayload = { ...item };
    delete firestorePayload.imageBase64; // Remove image before sending to Firebase

    try {
        // Add the text-only data to the "items" collection in Firestore
        const docRef = await addDoc(collection(db, "items"), firestorePayload);
        console.log("Document written to Firestore with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document to Firestore: ", e);
        // If Firestore fails, we should ideally remove it from localStorage to avoid inconsistency
        // For now, we'll just log the error.
        throw e;
    }
}

// 2. Get all items by merging Firestore data with localStorage images
export async function getAllItems() {
    const firestoreItems = [];
    const q = query(collection(db, "items"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        firestoreItems.push(doc.data());
    });
    
    // Now, enrich with local data (status and images)
    return enrichItemsWithLocalData(firestoreItems);
}

// 3. Get a specific user's items by merging Firestore data with localStorage images
export async function getUserItems(userId) {
    const firestoreItems = [];
    const q = query(collection(db, "items"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        firestoreItems.push(doc.data());
    });

    // Now, enrich with local data (status and images)
    return enrichItemsWithLocalData(firestoreItems);
}

// 4. Mark an item as returned (updates localStorage and Firestore)
export async function markAsReturned(itemId) {
    markAsReturnedInLocalStorage(itemId); // Main logic handled by localStorage

    // Also update the status in Firestore for consistency
    const q = query(collection(db, "items"), where("id", "==", itemId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const firestoreDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "items", firestoreDoc.id), {
            status: 'returned',
            returnedDate: new Date().toISOString()
        });
    }
}

// 5. Delete an item (deletes from localStorage and Firestore)
export async function deleteItem(itemId) {
    deleteItemInLocalStorage(itemId); // Main logic handled by localStorage

    // Also delete the document from Firestore
    const q = query(collection(db, "items"), where("id", "==", itemId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const firestoreDoc = querySnapshot.docs[0];
        await deleteDoc(doc(db, "items", firestoreDoc.id));
    }
}
// --- END: NEW FIRESTORE & LOCALSTORAGE FUNCTIONS ---


// --- START: LOCAL STORAGE HELPER FUNCTIONS (Modified) ---

function saveItemToLocalStorage(item) {
    const items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
    items.push(item);
    localStorage.setItem('lostFoundItems', JSON.stringify(items));
}

function deleteItemInLocalStorage(itemId) {
    let items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
    items = items.filter(item => item.id !== itemId);
    localStorage.setItem('lostFoundItems', JSON.stringify(items));
}

function markAsReturnedInLocalStorage(itemId) {
    const items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
    const updatedItems = items.map(item => {
        if (item.id === itemId) {
            return {
                ...item,
                status: 'returned',
                returnedDate: new Date().toISOString()
            };
        }
        return item;
    });
    localStorage.setItem('lostFoundItems', JSON.stringify(updatedItems));
}

// This new helper function merges the data
function enrichItemsWithLocalData(firestoreItems) {
    const localItems = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
    
    return firestoreItems.map(fsItem => {
        const localItem = localItems.find(li => li.id === fsItem.id);
        if (localItem) {
            // Return a merged object, prioritizing local data for status and image
            return {
                ...fsItem, // Base data from firestore
                imageBase64: localItem.imageBase64, // Image from local
                status: localItem.status,           // Status from local
                returnedDate: localItem.returnedDate, // Returned date from local
            };
        }
        return fsItem; // Fallback if not found locally for some reason
    }).filter(item => {
        // Final filter to ensure only items present in localStorage are shown
        const localItem = localItems.find(li => li.id === item.id);
        return !!localItem;
    });
=======
// firebaseauth.js

// --- START: FIREBASE SDK IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    linkWithCredential
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    doc, 
    updateDoc, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// --- END: FIREBASE SDK IMPORTS ---


const firebaseConfig = {
    apiKey: "AIzaSyBre-Xou2Tsd8RJYwHVl-YHzZUg2txD_tI",
    authDomain: "lostandfound-8d249.firebaseapp.com",
    projectId: "lostandfound-8d249",
    storageBucket: "lostandfound-8d249.firebasestorage.app",
    messagingSenderId: "107194636963",
    appId: "1:107194636963:web:0d1bd5a718c8321f653d16"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- START: AUTHENTICATION EXPORTS (No changes here) ---
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    linkWithCredential
};
// --- END: AUTHENTICATION EXPORTS ---


// --- START: NEW FIRESTORE & LOCALSTORAGE FUNCTIONS ---

// 1. Save item data (text to Firebase, full object to localStorage)
export async function saveItem(item) {
    // Save the full item (including image) to localStorage first
    saveItemToLocalStorage(item);

    // Prepare a new object for Firestore without the image data
    const firestorePayload = { ...item };
    delete firestorePayload.imageBase64; // Remove image before sending to Firebase

    try {
        // Add the text-only data to the "items" collection in Firestore
        const docRef = await addDoc(collection(db, "items"), firestorePayload);
        console.log("Document written to Firestore with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document to Firestore: ", e);
        // If Firestore fails, we should ideally remove it from localStorage to avoid inconsistency
        // For now, we'll just log the error.
        throw e;
    }
}

// 2. Get all items by merging Firestore data with localStorage images
export async function getAllItems() {
    const firestoreItems = [];
    const q = query(collection(db, "items"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        firestoreItems.push(doc.data());
    });
    
    // Now, enrich with local data (status and images)
    return enrichItemsWithLocalData(firestoreItems);
}

// 3. Get a specific user's items by merging Firestore data with localStorage images
export async function getUserItems(userId) {
    const firestoreItems = [];
    const q = query(collection(db, "items"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        firestoreItems.push(doc.data());
    });

    // Now, enrich with local data (status and images)
    return enrichItemsWithLocalData(firestoreItems);
}

// 4. Mark an item as returned (updates localStorage and Firestore)
export async function markAsReturned(itemId) {
    markAsReturnedInLocalStorage(itemId); // Main logic handled by localStorage

    // Also update the status in Firestore for consistency
    const q = query(collection(db, "items"), where("id", "==", itemId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const firestoreDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "items", firestoreDoc.id), {
            status: 'returned',
            returnedDate: new Date().toISOString()
        });
    }
}

// 5. Delete an item (deletes from localStorage and Firestore)
export async function deleteItem(itemId) {
    deleteItemInLocalStorage(itemId); // Main logic handled by localStorage

    // Also delete the document from Firestore
    const q = query(collection(db, "items"), where("id", "==", itemId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const firestoreDoc = querySnapshot.docs[0];
        await deleteDoc(doc(db, "items", firestoreDoc.id));
    }
}
// --- END: NEW FIRESTORE & LOCALSTORAGE FUNCTIONS ---


// --- START: LOCAL STORAGE HELPER FUNCTIONS (Modified) ---

function saveItemToLocalStorage(item) {
    const items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
    items.push(item);
    localStorage.setItem('lostFoundItems', JSON.stringify(items));
}

function deleteItemInLocalStorage(itemId) {
    let items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
    items = items.filter(item => item.id !== itemId);
    localStorage.setItem('lostFoundItems', JSON.stringify(items));
}

function markAsReturnedInLocalStorage(itemId) {
    const items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
    const updatedItems = items.map(item => {
        if (item.id === itemId) {
            return {
                ...item,
                status: 'returned',
                returnedDate: new Date().toISOString()
            };
        }
        return item;
    });
    localStorage.setItem('lostFoundItems', JSON.stringify(updatedItems));
}

// This new helper function merges the data
function enrichItemsWithLocalData(firestoreItems) {
    const localItems = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
    
    return firestoreItems.map(fsItem => {
        const localItem = localItems.find(li => li.id === fsItem.id);
        if (localItem) {
            // Return a merged object, prioritizing local data for status and image
            return {
                ...fsItem, // Base data from firestore
                imageBase64: localItem.imageBase64, // Image from local
                status: localItem.status,           // Status from local
                returnedDate: localItem.returnedDate, // Returned date from local
            };
        }
        return fsItem; // Fallback if not found locally for some reason
    }).filter(item => {
        // Final filter to ensure only items present in localStorage are shown
        const localItem = localItems.find(li => li.id === item.id);
        return !!localItem;
    });
>>>>>>> a0964edae81f73cf82874f371ad265614942fd70
}