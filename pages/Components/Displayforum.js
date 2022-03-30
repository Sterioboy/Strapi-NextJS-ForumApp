import React, { useState } from "react";
import style from "../../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
//MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Displayforum({ response }) {
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState("");
  const [name, setName] = useState("");

  const submitAnswer = (id, old) => {
    /* id sets onabort;y on refresh */
    try {
      console.log(id, old);
      axios.put(`http://localhost:1337/api/strapi-forums/${id}`, {
        data: {
          Answers: [...old, [name, answer]],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ m: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3" component="div">
          Tech Forum
        </Typography>
        <Link href="/upload">
          <Button variant="contained">Ask a question</Button>
        </Link>
      </Box>

      <Box sx={{ m: 2 }}>
        <Typography variant="h4" component="div">
          Questions
        </Typography>

        {response.map((response, index) => (
          <Box sx={{ my: 2 }} key={index}>
            <Box>
              <Typography variant="h5" component="div">
                {response.attributes.Title}
              </Typography>
              <Typography component="p">
                Posted By:
                {
                  <Typography color="primary" fontWeight={700}>
                    {response.attributes.Username}{" "}
                  </Typography>
                }
              </Typography>
            </Box>
            <Box
              sx={{
                height: 100,
                border: "2px solid black",
                borderRadius: "8px",
                p: 1,
                my: 1,
              }}
            >
              <Typography>{response.attributes.Questions}</Typography>
            </Box>
            <div className={style.answercont}>
              <h2 className={style.subheading}>Answers</h2>
              <div className={style.inputanswer}>
                <form>
                  <textarea
                    type="text"
                    rows="1"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <textarea
                    type="text"
                    placeholder="Enter your answer"
                    rows="3"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const id = response.id;
                      const old = response.attributes.Answers;
                      submitAnswer(id, old);
                    }}
                  >
                    Post
                  </button>
                </form>
              </div>
              <button
                className={style.showanswer}
                onClick={() => setShow(!show)}
              >
                {show ? "Hide Answers" : "Show Answers"}
              </button>
              {show ? (
                <div className={style.answers}>
                  {response.attributes.Answers &&
                    response.attributes.Answers.map((answers, i) => (
                      <div className={style.eachanswer} key={i}>
                        <p className={style.username}>{answers[0]}</p>
                        <p className={style.answertext}>{answers[1]}</p>
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
}
