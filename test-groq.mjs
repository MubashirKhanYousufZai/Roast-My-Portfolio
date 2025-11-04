// test-groq.mjs
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function test() {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",    // use a supported model from Groq docs :contentReference[oaicite:1]{index=1}
      messages: [
        { role: "user", content: "Say hi from Groq!" }
      ],
      temperature: 0.7,
      max_tokens: 100
    });
    console.log("✅ Groq Test Success:", response.choices[0].message.content);
  } catch (err) {
    console.error("❌ Groq Test Error:", err);
  }
}

test();
