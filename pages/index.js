import Layout from "@/components/Layout";
import Item from "@/components/Item";

import { API_URL } from "@/config/index";

import Link from "next/link";

export default function Home({ fevents }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {fevents.length === 0 && <h3>No events to show</h3>}

      {fevents.map((evt) => (
        <Item key={evt.id} evt={evt} />
      ))}

      {fevents.length > 0 && (
        <Link href="/events">
          <button className="btn-secondary">View All Events</button>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/event?populate=*`);
  const events = await res.json();

  const fevents = events.data;
 
  return {
    props: { fevents },
    revalidate: 1,
  };
}
