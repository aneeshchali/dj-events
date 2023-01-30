import Layout from "@/components/Layout";
import Item from "@/components/Item";
import Link from "next/link";
import { API_URL } from "@/config/index";

const PER_PAGE = 2;

export default function EventsPage({ fevents, tpage, page }) {
  return (
    <Layout>
      <h1>Events</h1>
      {fevents.length === 0 && <h3>No events to show</h3>}

      {fevents.map((evt) => (
        <Item key={evt.id} evt={evt} />
      ))}

      {page > 1 && (
        <Link legacyBehavior href={`events?page=${+page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
      {page < tpage && (
        <Link legacyBehavior href={`events?page=${+page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const res = await fetch(
    `${API_URL}/api/event?pagination[page]=${page}&pagination[pageSize]=2&populate=*`
  );
  const events = await res.json();
  const fevents = events.data;
  return {
    props: { fevents, tpage: events.meta.pagination.pageCount, page },
  };
}
