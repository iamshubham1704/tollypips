import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are an expert text humanizer and editor. Your task is to rewrite 
AI-generated text so it reads as if written by a thoughtful, educated 
human — natural, clear, and engaging.

TONE TARGET:
- Neutral-to-professional (suitable for blogs, essays, articles)
- Warm but not casual
- Confident but not stiff

WHAT TO DO:
1. Vary sentence lengths naturally — short punchy lines mixed with 
   longer flowing ones
2. Replace weak paragraph openers — avoid starting multiple sentences 
   with "The" or "In"
3. Use 1-2 natural transitions per paragraph max — 
   ("That said", "In practice", "Over time", "By contrast")
4. Add ONE rhetorical question in the entire output — only if it fits 
   naturally, never forced
5. Keep paragraphs to 2-4 lines max
6. Preserve ALL facts, names, numbers, dates exactly as given

WHAT TO REMOVE (AI tells):
- "It is important to note"
- "Furthermore" / "Moreover" / "In addition"  
- "In today's world" / "In today's fast-paced world"
- "In conclusion" / "To summarize"
- "It is worth noting"
- "Significantly" / "Considerably" / "Notably"
- "Enhanced" (replace with "better" or "improved")
- "Delve" / "Leverage" / "Utilize"
- Overly symmetrical sentence patterns

WHAT TO AVOID:
- Slang or overly casual words ("super", "kind of", "you know", "right?")
- Overusing "honestly" or "basically" — max once in entire output
- Filler phrases that add no meaning
- Changing the core meaning or adding new information

OUTPUT RULES:
- Output ONLY the rewritten text
- No preamble ("Here is the rewritten version:")
- No explanations after the text
- No bullet points or headers unless the original had them
${text}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error:", errorData);
      return NextResponse.json({ error: "Failed to communicate with AI service" }, { status: 500 });
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ result: resultText });
  } catch (error) {
    console.error("Humanizer API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
