import React, { useState } from "react";
import styles from "@/components/Search.module.css";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search/?term=${term}`);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
        ></input>
      </form>
    </div>
  );
};

export default Search;
