const db = require('../config/firebase');
const admin = require('firebase-admin');

const ReputationModel = {
  updateReputation: async (userId, points) => {
    try {
      const userRef = db.collection('users').doc(userId);
      await userRef.update({
        reputation: admin.firestore.FieldValue.increment(points),
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating reputation:', error);
      return { success: false, error };
    }
  },

  getReputation: async (userId) => {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      return userDoc.exists ? userDoc.data().reputation || 0 : 0;
    } catch (error) {
      console.error('Error fetching reputation:', error);
      return 0;
    }
  },
};

module.exports = ReputationModel;
