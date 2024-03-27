import type { NextRequest } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { DateTime } from "luxon";
import { hashCode } from "../utils";

export function getToken(request: NextRequest) {
  const userId = request.headers.get("user-id");

  if (userId) {
    const sessionId = hashCode(userId);
    const expires = DateTime.utc()
      .plus({ minutes: 60 })
      .set({ millisecond: 0 })
      .toSeconds();

    if (process.env.NEXT_PUBLIC_CENTRIFUGE_SECRET) {
      const assertion = jsonwebtoken.sign(
        {
          sub: sessionId,
          exp: expires,
        },
        process.env.NEXT_PUBLIC_CENTRIFUGE_SECRET,
        { algorithm: "HS256" },
      );

      return new Response(JSON.stringify({ data: { token: assertion, expires: expires, sessionId: sessionId } }), { status: 200 } );      
    } else {
      return new Response(JSON.stringify({ message: "error - missing CENTRIFUGE_SECRET" }), { status: 405 } );      
    }
  }

  return new Response(JSON.stringify({ message: "error - missing userId header" }), { status: 405 } );
}
