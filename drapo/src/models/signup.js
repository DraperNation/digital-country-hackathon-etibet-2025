const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require('firebase/auth');
const { firestore, auth, authClient } = require('../config/firebase');
const { omit } = require('lodash');
const { generateDID } = require('../utils/ether');

const SignupModel = {
  registerUser: async (userData) => {
    try {
      const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.fullName,
      });

      const userDoc = {
        ...omit(userData, ['email', 'password', 'displayName']),
        uid: userRecord.uid,
        publicId: crypto.randomUUID(),
        did: generateDID(userRecord.uid),
        reputation: 0,
        createdAt: new Date(),
        fileNumber: crypto.randomUUID(),
      };

      // Store user in Firestore
      await firestore.collection('users').doc(userRecord.uid).set(userDoc);
      console.log(`User ${userRecord.uid} registered successfully`);
      return { success: true, uid: userRecord.uid };
    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, error: error.message };
    }
  },

  loginUser: async (email, password) => {
    try {
      // ✅ Validate Inputs
      if (!email || typeof email !== 'string') {
        console.log(email, typeof email);
        throw new Error('Invalid email format');
      }
      if (!password || typeof password !== 'string') {
        throw new Error('Invalid password format');
      }
      const userCredential = await signInWithEmailAndPassword(
        authClient,
        email,
        password,
      );
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  },
};

module.exports = SignupModel;
