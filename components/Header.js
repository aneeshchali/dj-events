import React from "react";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Dj Events</Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {user ? (
            // If logged in
            <>
              <li>
                <Link legacyBehavior href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link legacyBehavior href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
