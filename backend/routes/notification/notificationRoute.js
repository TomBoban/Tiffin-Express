// smsRoutes.js
const express = require("express");
const twilio = require("twilio");

const notificationRouter = express.Router();

// Create a new Twilio client instance
const accountSid = "AC5e3d233cfdd3baf3900df57309fbabfe";
const authToken = "e74a9cf184fc759d95acb49b9fe8ae04";
const twilioClient = twilio(accountSid, authToken);

notificationRouter.post("/send-notification", async (req, res) => {
  const { phoneNumber, message } = req.body;

  try {
    const smsResult = await twilioClient.messages.create({
      body: message,
      from: "+14059274411", // Use the Twilio phone number you've purchased
      to: phoneNumber,
    });

    
    res.status(200).json({ message: "SMS sent successfully." });
  } catch (error) {
    console.error("Error sending SMS: ", error);
    res.status(500).json({ error: "Failed to send SMS." });
  }
});

module.exports = notificationRouter;
