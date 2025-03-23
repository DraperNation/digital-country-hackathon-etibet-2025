const admin = require("firebase-admin");

const db = admin.firestore();

const verifyToken = async (token) => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const createUserProfile = async (user) => {
  await db.collection("users").doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};

const getUserProfile = async (uid) => {
  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists) throw new Error("User not found");
  return userDoc.data();
};

const updateUserProfile = async (uid, updates) => {
  await db.collection("users").doc(uid).update(updates);
};

module.exports = {
  verifyToken,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
};
