import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "styles/Item.module.css";

const Item = ({ evt }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image ? evt.image : "/images/event-default.png"}
          width={170}
          height={170}
          alt="image"
        />
      </div>
      <div className={styles.info}>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div style={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <button className="btn">Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Item;
