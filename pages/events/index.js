import Layout from "@/components/Layout";
import Item from "@/components/Item";
import { API_URL } from "@/config/index";

export default function EventsPage({ fevents }) {
  return (
    <Layout>
      <h1>Events</h1>
      {fevents.length === 0 && <h3>No events to show</h3>}

      {fevents.map((evt) => (
        <Item key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/event?populate=*`);
  const events = await res.json();
  const fevents = events.data
  return {
    props: { fevents },
    revalidate: 1,
  };
}
