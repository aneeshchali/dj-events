const res = await fetch(`${API_URL}/api/event?populate=*`);
const events = await res.json();

const yevents = events.data;


export default function handler(req, res) {
  const evt = yevents.filter((val) => val.attributes.slug === req.query.slug);

  if (req.method === "GET") {
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
