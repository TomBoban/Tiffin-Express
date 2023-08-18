// smsRoutes.js
const express = require("express");
const twilio = require("twilio");

const notificationRouter = express.Router();

// Create a new Twilio client instance
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioClient = twilio(accountSid, authToken);

notificationRouter.post("/send-notification", async (req, res) => {
  const { phoneNumber, message } = req.body;

  try {
    const smsResult = await twilioClient.messages.create({
      body: message,
      from: "+14059274411",
      to: phoneNumber,
    });

    res.status(200).json({ message: "SMS sent successfully." });
  } catch (error) {
    console.error("Error sending SMS: ", error);
    res.status(500).json({ error: "Failed to send SMS." });
  }
});

module.exports = notificationRouter;
