import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Supabase removed. Use Firebase from lib/firebase/config.ts
  // TODO: Add Firebase session logic here if needed
  return NextResponse.next({ request })
}
