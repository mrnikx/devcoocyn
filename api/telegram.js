export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = "8336749061:AAFMJHBvzGpiK4AElLs6VRynpyHWmIWNqs4";  // 🔑 توکن ربات
    const chatId = "-4894053122";            // 🆔 آیدی شما یا گروه

    const text = req.body.text || "بدون پیام";

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML"
        })
      });

      const data = await response.json();

      if (data.ok) {
        res.status(200).json({ success: true, message: "پیام با موفقیت ارسال شد ✅" });
      } else {
        res.status(500).json({ success: false, error: data });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
