import React, { useState } from "react";
import { API_URL } from "@/config/index";

import styles from "@/styles/Form.module.css";

const ImageUpload = ({ evtId, imageUploaded }) => {
  const [Image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", Image);
    formData.append("ref", "api::events.events");
    formData.append("refId", evtId);
    formData.append("field", "image");
    console.log(formData);
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      console.log("imgUpload");
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image {evtId}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.files}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
};

export default ImageUpload;