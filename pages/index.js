import Layout from "@/components/Layout";
import Item from "@/components/Item";
import axios from "axios";

import { API_URL } from "@/config/index";

import Link from "next/link";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <Item key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <button className="btn-secondary">View All Events</button>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  return {
    props: { events },
    revalidate: 1,
  };
}
