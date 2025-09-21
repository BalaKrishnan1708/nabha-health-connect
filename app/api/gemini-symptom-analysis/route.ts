import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { symptoms, patientAge, patientGender } = await request.json()

    // Check if Gemini API key is available
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Gemini API key not configured. Please add GOOGLE_GEMINI_API_KEY to environment variables.",
        },
        { status: 500 },
      )
    }

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `As a medical AI assistant, analyze these symptoms and provide guidance. 
            
Patient Information:
- Age: ${patientAge}
- Gender: ${patientGender}
- Symptoms: ${symptoms}

Please provide:
1. Possible conditions (with confidence levels)
2. Recommended actions
3. Urgency level (Low/Medium/High)
4. When to seek immediate medical attention

Important: This is for informational purposes only and should not replace professional medical advice.`,
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error("Failed to get response from Gemini API")
    }

    const data = await response.json()
    const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text

    return NextResponse.json({
      analysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Gemini API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze symptoms. Please try again later.",
      },
      { status: 500 },
    )
  }
}
