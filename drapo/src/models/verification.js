const db = require('../config/firebase');

const VerificationModel = {
  requestVerification: async (userId, docType) => {
    try {
      const requestRef = db.collection('verificationRequests').doc();
      await requestRef.set({
        userId,
        docType,
        status: 'pending',
        requestedAt: new Date(),
      });
      return { success: true, requestId: requestRef.id };
    } catch (error) {
      console.error('Error requesting verification:', error);
      return { success: false, error };
    }
  },

  checkVerificationStatus: async (requestId) => {
    try {
      const requestDoc = await db
        .collection('verificationRequests')
        .doc(requestId)
        .get();
      if (!requestDoc.exists) return null;
      return requestDoc.data();
    } catch (error) {
      console.error('Error checking verification status:', error);
      return null;
    }
  },
};

module.exports = VerificationModel;
