import firebase from "firebase";
import "firebase/firestore";

const login = async (email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        return {
            isSuccess: true
        };
    } catch (error) {
        return {
            isSuccess: false,
            error: error.message
        };
    }
};

const signup = async newUserObj => {
    const { email, password, firstName, lastName } = newUserObj;
    try {
        const res = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        const db = firebase.firestore();
        await db
            .collection("users")
            .doc(res.user.uid)
            .set({
                firstName: firstName,
                lastName: lastName,
                initials: firstName[0] + lastName[0]
            });
        return {
            isSuccess: true
        };
    } catch (error) {
        return {
            isSuccess: false,
            error: error.message
        };
    }
};

const logout = async () => {
    await firebase.auth().signOut();
};

const renderAll = async collectionName => {
    const db = firebase.firestore();
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        };
    });
    return data;
};

const renderWithLimit = async (collectionName, limit) => {
    const db = firebase.firestore();
    const snapshot = await db
        .collection(collectionName)
        .limit(limit)
        .get();
    const data = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        };
    });
    return data;
};

const render = async (collectionName, id) => {
    const db = firebase.firestore();
    const doc = await db
        .collection(collectionName)
        .doc(id)
        .get();
    if (doc.exists) {
        return {
            id: doc.id,
            ...doc.data()
        };
    } else {
        return null;
    }
};

const trackUser = trackUserFunc => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            const userStore = await render("users", user.uid);
            const userObj = {
                ...userStore,
                id: user.uid,
                email: user.email
            };
            trackUserFunc(userObj);
        } else {
            trackUserFunc(null);
        }
    });
    return unsubscribe;
};

const syncWithFirebase = async (collectionName, synDataFunc, limit = null) => {
    const db = firebase.firestore();
    if (limit) {
        const unsubscribe = db
            .collection(collectionName)
            .orderBy("createdAt", "desc")
            .limit(limit)
            .onSnapshot(async snapshot => {
                let docs = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                synDataFunc(docs);
            });
        return unsubscribe;
    } else {
        const unsubscribe = db
            .collection(collectionName)
            .orderBy("createdAt", "desc")
            .onSnapshot(async snapshot => {
                let docs = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                synDataFunc(docs);
            });
        return unsubscribe;
    }
};

const create = async (collectionName, data) => {
    const db = firebase.firestore();
    await db.collection(collectionName).add(data);
};

const update = async (collectionName, id, data) => {
    const db = firebase.firestore();
    await db
        .collection(collectionName)
        .doc(id)
        .update(data);
};

const query = async (collectionName, key, operator, value) => {
    const db = firebase.firestore();
    const snapshot = await db
        .collection(collectionName)
        .where(key, operator, value)
        .get();
    if (snapshot.empty === false) {
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    } else {
        return null;
    }
};

const uploadFile = async (folderName, fileName, file) => {
    const ref = firebase.storage().ref(`${folderName}/${fileName}`);
    try {
        const snapshot = await ref.put(file);
        const url = await snapshot.ref.getDownloadURL();
        return {
            url,
            isSuccess: true
        };
    } catch (err) {
        return {
            error: err.message,
            isSuccess: false
        };
    }
};

const paginateQuery = async (collectionName, pageNumber, perPage, query) => {
    var data = [];
    const db = firebase.firestore();
    let collection = db.collection(collectionName);

    for (let key in query) {
        collection = collection.where(key, "==", query[key]);
    }

    const r = await collection.get();
    const total = r.docs.length;
    const totalPageRes =
        total % perPage == 0
            ? total / perPage
            : Number(Math.floor(total / perPage) + 1);

    const res = await collection.limit(perPage * pageNumber).get();

    let i = 0;
    res.forEach(doc => {
        if (i >= (pageNumber - 1) * perPage) {
            data.push({
                id: doc.id,
                ...doc.data()
            });
        }
        i += 1;
    });
    return { totalPageRes, data };
};

export default {
    login,
    signup,
    logout,
    trackUser,
    syncWithFirebase,
    renderAll,
    renderWithLimit,
    render,
    create,
    update,
    query,
    uploadFile,
    paginateQuery
};
