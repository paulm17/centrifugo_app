import { NextRequest } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { DateTime } from "luxon";

export async function refreshToken(request: NextRequest) {
  const sessionId = request.headers.get("session-id");

  if (sessionId) {
    const expires = DateTime.utc().plus({ minutes: 60 }).toSeconds();

    if (process.env.NEXT_PUBLIC_CENTRIFUGE_SECRET) {
      const assertion = jsonwebtoken.sign(
        {
          sub: sessionId,
          exp: expires,
        },
        process.env.NEXT_PUBLIC_CENTRIFUGE_SECRET,
        { algorithm: "HS256" },
      );

      return new Response(JSON.stringify(
        { data: { token: assertion, expires: expires } }),
        { status: 200 },
      );
      return new Response("ok", {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ data: { message: "error - missing CENTRIFUGE_SECRET" } }),
        {
          status: 405,
        },
      );
    }
  }

  return new Response(
    JSON.stringify({ data: { message: "error - missing userId header" } }),
    {
      status: 405,
    },
  );
}
