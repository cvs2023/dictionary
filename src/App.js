import axios from "axios";
import { useEffect, useState } from "react";
import List from "./pages/list";
import "./App.css";

//get css from description
//install axios

export default function App() {
  const [keyWord, setKeyWord] = useState("");
  const [result, setResult] = useState(null);
  const api = "https://api.dictionaryapi.dev/api/v2/entries/en";

  async function handleSearch(e) {
    try {
      const res = await axios.get(`${api}/${keyWord}`);
      setResult(res.data[0]);
    } catch (e) {
      console.log({ e });
    }
  }

  function handleOnSelection() {
    const selection = window.getSelection().toString();
    setKeyWord(selection);
    handleSearch();
  }

  function something(e) {
    if (e.keyCode === 13) {
      handleSearch();
    }
  }

  function handleClear() {
    setKeyWord("");
    setResult(null);
  }
  useEffect(() => {
    if (keyWord) {
      handleSearch();
    }
    if (keyWord.length == 0) {
      handleClear();
    }
  }, [keyWord]);

  return (
    <div className="App">
      <div className="main-header">
        <input
          className="input-tag"
          value={keyWord}
          autoFocus
          placeholder="Type the word here"
          onKeyDown={(e) => something(e)}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <button className="button" type="submit" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* <button
        // disabled={result}
        className="button"
        type="submit"
        onClick={handleClear}
      >
        Clear
      </button> */}
      {result && <List {...{ result }} />}
    </div>
  );
}
