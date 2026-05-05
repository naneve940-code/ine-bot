const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// 🔥 TOKEN (trim กันพัง)
const LINE_TOKEN = "7HPS1MoE5TpJTpb+MQXwQICqoDQ/RVsx5feC72mHccxbIEryGnH7HjjwBVLS01VtV4jkaKtiftJAhsNhq6kLixWf6rqeXc2K4Wl1HfV6soSSad9UfN1YK0nwhzcolP/5oSPSYEf4lSc8hhDjBjHy7gdB04t89/1O/w1cDnyilFU=".trim();

app.get("/", (req, res) => {
  res.send("Bot is running ✔️");
});

app.post("/webhook", async (req, res) => {
  try {
    const events = req.body.events || [];

    for (const event of events) {
      if (event.type !== "message" || !event.message.text) continue;

      const text = event.message.text;
      const replyToken = event.replyToken;

      await axios.post(
        "https://api.line.me/v2/bot/message/reply",
        {
          replyToken: replyToken,
          messages: [
            {
              type: "text",
              text: "คุณพิมพ์ว่า: " + text
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + LINE_TOKEN
          }
        }
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.log("ERROR:", err.response?.data || err);
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
