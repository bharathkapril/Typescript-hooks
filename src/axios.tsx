import React, { useState, useEffect } from "react";
import axios from "axios";

function Axi() {
  const [act, setAct] = useState("");
  const BaseURL = "https://www.boredapi.com/api/activity";

  const fun = async () => {
    try {
      const res = await axios.get(BaseURL);
      setAct(res.data.activity);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fun();
  }, []);

  const change = () => {
    fun();
  };

  return (
    <>
      {act ? (
        <h1 style={{ color: "green", fontFamily: "sans-serif" }}>{act}</h1>
      ) : (
        <h1 style={{ color: "red" }}>Loading...</h1>
      )}
      <button onClick={change}>Change</button>
    </>
  );
}

export default Axi;
