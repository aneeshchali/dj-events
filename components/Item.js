import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Item.module.css";

const Item = ({ evt }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.attributes.image
              ? evt.attributes.image.data.attributes.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={170}
          alt="image"
        />
      </div>
      <div className={styles.info}>
        <span>
          {evt.attributes.date} at {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>
      <div style={styles.link}>
        <Link href={`/events/${evt.attributes.slug}`}>
          <button className="btn">Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Item;
