import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import { useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

function AddEventPage() {
  const router = useRouter();
  const [values, SetValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const HasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (HasEmptyFields) {
      toast.error("Please fill in all empty fields");
    }

    const res = await fetch(`${API_URL}/api/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: values }),
    });

    // const fdata = res.data.attributes.slug;

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const evt = await res.json();
    
      debugger;
      router.push(`/events/${evt.data.attributes.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetValues({ ...values, [name]: value });
  };

  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label hrmlfor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}

export default AddEventPage;
