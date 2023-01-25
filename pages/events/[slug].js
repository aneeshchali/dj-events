import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventPage({ evt }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading..</h1>;
  }

  const deleteEventHandler = async (e) => {
    if (confirm("are u sure")) {
      console.log(evt.id);
      const res = await fetch(`${API_URL}/api/event/${evt.id}`, {
        method: "DELETE",
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
      {/* <h2>{router.query.slug}</h2>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
      data = {a:1,b:2}

        go to home
      </button> */}
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`events/edit/${evt.attributes.id}`}>
            <FaPencilAlt />
            Edit Event
          </Link>
          <button className={styles.delete} onClick={deleteEventHandler}>
            <FaTimes /> Delete Event
          </button>
        </div>
        <span>
          {evt.attributes.date} at {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        <ToastContainer />
        {evt.attributes.image && (
          <div className={styles.image}>
            <Image
              src={evt.attributes.image.data?.attributes.formats.large.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue:{evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link legacyBehavior href="/events">
          <a className={styles.back}>Go Back {"<"}</a>
        </Link>
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/event?populate=*`);
  const events = await res.json();
  const fevents = events.data;

  const paths = fevents.map((val) => ({
    params: {
      slug: val.attributes.slug,
    },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/event?populate=*&filters[slug][$eq]=${slug}`
  );

  const events = await res.json();
  const fevents = events.data;

  return { props: { evt: fevents[0] }, revalidate: 1 };
}

export default EventPage;

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);

//   const events = await res.json();

//   return { props: { evt: events[0] } };
// }

// export default EventPage;
