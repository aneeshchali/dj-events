import React from "react";
import { parseCookies } from "@/helpers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import { useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import moment from "moment/moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

function EditEventPage({ evt, token }) {
  const router = useRouter();
  const [values, SetValues] = useState({
    name: evt.data.attributes.name,
    performers: evt.data.attributes.performers,
    venue: evt.data.attributes.venue,
    address: evt.data.attributes.address,
    date: evt.data.attributes.date,
    time: evt.data.attributes.time,
    description: evt.data.attributes.description,
  });

  const [imgPreview, SetImgPreview] = useState(
    evt.data.attributes.image
      ? evt.data.attributes.image.data?.attributes.formats.thumbnail.url
      : null
  );

  const [showModal, SetShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const HasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (HasEmptyFields) {
      toast.error("Please fill in all empty fields");
    }

    const res = await fetch(`${API_URL}/api/event/${evt.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: values }),
    });

    // const fdata = res.data.attributes.slug;

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorized");
        return;
      }
      toast.error("Something went wrong");
    } else {
      const evt = await res.json();

      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/api/event/${evt.data.id}?populate=*`);
    const data = await res.json();
    SetImgPreview(
      data.data.attributes.image.data.attributes.formats.thumbnail.url
    );
    SetShowModal(false);
  };

  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label hrmlfor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
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
              value={moment(values.date).format("yyyy-MM-DD")}
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

        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Events Image</h2>
      {imgPreview ? (
        <Image src={imgPreview} height={100} width={170} />
      ) : (
        <div>
          <p>No Image Uploaded</p>
        </div>
      )}
      <div>
        <button onClick={() => SetShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => SetShowModal(false)}>
        <ImageUpload
          evtId={evt.data.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/event/${id}?populate=*`);
  const evt = await res.json();

  return {
    props: {
      evt,
      token,
    },
  };
}
