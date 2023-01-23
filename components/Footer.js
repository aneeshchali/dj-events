import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link href="/about">About This Project</Link>
      </p>
      <p>hello!!</p>
    </footer>
  );
}

export default Footer;
