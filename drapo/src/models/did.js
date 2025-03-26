const db = require('../config/firebase');

const DIDModel = {
  createDID: async (userId, didData) => {
    try {
      await db.collection('users').doc(userId).update({ did: didData });
      return { success: true };
    } catch (error) {
      console.error('Error creating DID:', error);
      return { success: false, error };
    }
  },

  getDID: async (userId) => {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      return userDoc.exists ? userDoc.data().did || null : null;
    } catch (error) {
      console.error('Error fetching DID:', error);
      return null;
    }
  },
};

module.exports = DIDModel;
