import { React, useState } from "react";
import { createQuestion } from "../api";
import style from "../../styles/Home.module.css";
import Link from "next/Link";

export default function Uploadforum() {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* Send data to Strapi */
  const sendData = (e) => {
    const newQuestion = {
      data: {
        Username: username,
        Title: title,
        Questions: description,
      },
    };
    createQuestion(newQuestion);
  };
  return (
    <div className={style.uploadpage}>
      <div className={style.topcont}>
        <h1>Ask a question</h1>
        <Link href="/">
          <button>Forum</button>
        </Link>
      </div>
      <div className={style.formcont}>
        <form className={style.uploadform}>
          <input
            type="text"
            placeholder="Enter your name"
            maxLength="74"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your title"
            maxLength="74"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Enter your description"
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={(e) => sendData(e)}>Submit Question</button>
        </form>
      </div>
    </div>
  );
}
