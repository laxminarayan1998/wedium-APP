const admin = require("firebase-admin");

const serviceAccount = require("../../config/greenwave.json");
const User = require("../../models/user");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendNotification = async (req, res) => {
  try {
    const title = req.body.title;
    const body = req.body.body;

    const user = await User.findById(req.body.to);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await firebaseAdmin.messaging().send({
      token: user.fcmToken,
      notification: req.body.data,
    });

    return res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Failed: ${error.message}` });
  }
};

exports.sendNotificationToRoles = async (userId, message) => {
  try {
    let user;

    if (userId === "ADMIN") {
      user = await User.findOne({ role: "ADMIN" });
    } else {
      user = await User.findOne({ uid: userId });
    }

    if (!user || user.length === 0) {
      return console.log({ message: "User not found" });
    }

    if (user.fcmToken) {
      await firebaseAdmin.messaging().send({
        token: user.fcmToken,
        notification: message,
      });
      console.log({
        message: `Notification sent successfully to ${user.uid}`,
      });
    } else {
      console.log({ message: `User ${user.uid} does not have an FCM token` });
    }

    console.log({ message: "All notifications sent successfully" });
  } catch (error) {
    console.log(error);
    console.log({ message: `Failed: ${error.message}` });
  }
};
