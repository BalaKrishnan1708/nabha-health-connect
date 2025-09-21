import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { appointmentId, action } = await request.json()

    // Check if video service API keys are available
    const agoraAppId = process.env.NEXT_PUBLIC_AGORA_APP_ID
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID

    if (!agoraAppId && !twilioAccountSid) {
      return NextResponse.json(
        {
          error:
            "Video service not configured. Please add NEXT_PUBLIC_AGORA_APP_ID or TWILIO_ACCOUNT_SID to environment variables.",
        },
        { status: 500 },
      )
    }

    // Generate video call token (simplified)
    const token = `video_token_${appointmentId}_${Date.now()}`

    return NextResponse.json({
      token,
      channelName: `consultation_${appointmentId}`,
      appId: agoraAppId,
      message: "Video consultation token generated successfully",
    })
  } catch (error) {
    console.error("Video consultation error:", error)
    return NextResponse.json(
      {
        error: "Failed to initialize video consultation",
      },
      { status: 500 },
    )
  }
}
