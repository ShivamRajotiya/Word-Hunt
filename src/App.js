import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { alpha, Container, Switch } from "@mui/material";
import Header from "./Components/Header/Header";
import Definition from "./Components/Definitions/Definitions";
import DarkMode from "./Components/DarkMode";
import { grey } from "@mui/material/colors";
import { withStyles } from "@mui/styles";

function App() {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState(`en`);
  const [meanings, setMeanings] = useState([]);
  const [LightMode, setLightMode] = useState(false);
  const PurpleSwitch = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);
  async function dictionaryApi() {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(meanings);

  useEffect(() => {
    dictionaryApi();
  }, [category, word]);
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: LightMode ? "#fff" : "#282c34",
        color: LightMode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: "0", right: 15, paddingTop: 10 }}
        >
          <span>{LightMode ? "Dark" : "Light"} Mode</span>
          <PurpleSwitch
            checked={LightMode}
            onChange={() => setLightMode(!LightMode)}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          LightMode={LightMode}
        />
        {meanings && (
          <Definition
            word={word}
            meanings={meanings}
            category={category}
            LightMode={LightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
