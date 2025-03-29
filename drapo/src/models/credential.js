const db = require('../config/firebase');

const CredentialModel = {
  addCredential: async (userId, credentialData) => {
    try {
      const credRef = db
        .collection('users')
        .doc(userId)
        .collection('credentials')
        .doc();
      await credRef.set(credentialData);
      return { success: true, id: credRef.id };
    } catch (error) {
      console.error('Error adding credential:', error);
      return { success: false, error };
    }
  },

  getCredentials: async (userId) => {
    try {
      const credsRef = await db
        .collection('users')
        .doc(userId)
        .collection('credentials')
        .get();
      return credsRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching credentials:', error);
      return [];
    }
  },
};

module.exports = CredentialModel;
