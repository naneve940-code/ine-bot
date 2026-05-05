const express = require("express");
const app = express();

app.use(express.json());

// 🔥 LINE token (ใส่ของคุณ)
const LINE_TOKEN = "7HPS1MoE5TpJTpb+MQXwQICqoDQ/RVsx5feC72mHccxbIEryGnH7HjjwBVLS01VtV4jkaKtiftJAhsNhq6kLixWf6rqeXc2K4Wl1HfV6soSSad9UfN1YK0nwhzcolP/5oSPSYEf4lSc8hhDjBjHy7gdB04t89/1O/w1cDnyilFU=";

app.get("/", (req, res) => {
  res.send("Bot is running ✔️");
});

app.post("/webhook", (req, res) => {
  try {
    const events = req.body.events || [];

    events.forEach(async (event) => {
      if (event.type !== "message") return;

      const text = event.message.text;
      const replyToken = event.replyToken;

      await fetch("https://api.line.me/v2/bot/message/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LINE_TOKEN}`
        },
        body: JSON.stringify({
          replyToken: replyToken,
          messages: [
            {
              type: "text",
              text: "คุณพิมพ์ว่า: " + text
            }
          ]
        })
      });
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(200);
  }
});

// 🔥 สำคัญมากสำหรับ Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
