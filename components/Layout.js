import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import React from "react";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={styles}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "DJ events | find the hottest parties",
  description: "Find the latest Dj and other musical parties",
  keywords: "music , dj , edm, events",
};

export default Layout;
