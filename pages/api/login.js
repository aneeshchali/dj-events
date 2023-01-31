import cookie from "cookie";

import { API_URL } from "@/config/index";

export default async (req, res) => {
  console.log("pist req send here");
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const strapiRES = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    console.log(">>>>>>>>>>>>>>>>>>>");

    const data = await strapiRES.json();

    console.log({ strapiRES });
    console.log({ data });

    if (strapiRES.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "devlopment",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      console.log(">>>>>");
      res.status(data.error?.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
