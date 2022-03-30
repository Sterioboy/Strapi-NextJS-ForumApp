import { react, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Displayforum from "./Components/Displayforum";
import { readForum, createQuestion } from "./api";

export default function Home() {
  const [question, setQuestions] = useState({});
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readForum();
      console.log(result.data.data);
      setResponse(result.data.data);
    };
    fetchData();
  }, []);

  return <Displayforum response={response} />;
}
