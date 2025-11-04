import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { portfolioUrl } = await req.json();

    if (!portfolioUrl || portfolioUrl.trim() === "") {
      return NextResponse.json(
        { error: "Portfolio URL is required!" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are Roastify — a brutally honest yet hilarious AI roast master. Roast user portfolios with humor, sarcasm, and constructive criticism. Be witty, confident, and brutally funny — but never rude or disrespectful.",
          },
          {
            role: "user",
            content: `Roast this portfolio: ${portfolioUrl}`,
          },
        ],
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    const roastText = data?.choices?.[0]?.message?.content || "No roast generated.";

    return NextResponse.json({ roast: roastText });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
