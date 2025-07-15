const express = require("express");
const { Client } = require("@line/bot-sdk");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};
const client = new Client(config);
app.use(express.static("public"));
app.post("/send-message", async (req, res) => {
  try {
    const { userId, resultText } = req.body;
    if (!userId || !resultText) {
      return res.status(400).json({ error: "userId and resultText are required." });
    }
    const message = {
      type: "text",
      text: resultText,
    };
    await client.pushMessage(userId, message);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: error.message });
  }
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
