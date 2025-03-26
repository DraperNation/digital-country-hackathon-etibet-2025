const { firestore } = require('../config/firebase');

const UserModel = {
  getUser: async (userId) => {
    try {
      const userDoc = await firestore.collection('users').doc(userId).get();
      if (!userDoc.exists) return null;
      return userDoc.data();
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  updateUser: async (userId, updates) => {
    try {
      await firestore.collection('users').doc(userId).update(updates);
      return { success: true };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error };
    }
  },
};

module.exports = UserModel;
