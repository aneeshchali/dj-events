import React from "react";
import { useRouter } from "next/router";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import DashboardEvents from "@/components/DashboardEvents";

import styles from "@/styles/Dashboard.module.css";
import { API_URL } from "@/config/index";

const dashboard = ({ events, token }) => {
  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm("are u sure")) {
      const res = await fetch(`${API_URL}/api/event/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };
  return (
    <Layout>
      <div className={styles.dash}>
        <h1>dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvents
            key={evt.id}
            evt={evt}
            handleDelete={deleteEvent}
          ></DashboardEvents>
        ))}
      </div>
    </Layout>
  );
};

export default dashboard;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/event/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: { events, token },
  };
}
