import { API_URL } from "@/config";

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    console.log(req.body);
    res.status(200).json({});
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};