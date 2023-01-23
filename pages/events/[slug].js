import { useRouter } from "next/router";
import React from "react";

function EventPage() {
  //   const router = useRouter();
  return (
    <div>
      {/* <h2>{router.query.slug}</h2>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        go to home
      </button> */}
      <h1>EventPage</h1>
    </div>
  );
}

export default EventPage;
