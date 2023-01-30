import Layout from "@/components/Layout";
import Item from "@/components/Item";
import qs from "qs";
import { useRouter } from "next/router";

import { API_URL } from "@/config/index";

import Link from "next/link";

export default function Home({ fevents }) {
  const router = useRouter();

  return (
    <Layout>
      <h1>Search Results for:{router.query.term}</h1>

        <Link href="/events">
          <button className="btn-secondary">Back to Events</button>
        </Link>
     
      {fevents.length === 0 && <h3>No events to show</h3>}

      {fevents.map((evt) => (
        <Item key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $containsi: term,
            },
          },
          {
            performers: {
              $containsi: term,
            },
          },
          {
            description: {
              $containsi: term,
            },
          },
          {
            venue: {
              $containsi: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const res = await fetch(`${API_URL}/api/event?populate=*&${query}`);

  const events = await res.json();

  const fevents = events.data;

  return {
    props: { fevents },
  };
}
