import axios from "axios";
import { useEffect, useState } from "react";
import List from "./pages/list";
import "./App.css";
import { API_LINK } from "./utils/links";
import UseDebounce from "./customHook/UseDebounce";
export default function App() {
  const [keyWord, setKeyWord] = useState("");
  const [result, setResult] = useState(null);

  function handleOnSelection() {
    const selection = window.getSelection().toString();
    if (selection) {
      setKeyWord(selection);
    }
  }

  function onClickEnter(e) {
    if (e.keyCode === 13) {
      handleSearch();
    }
  }

  function handleClear() {
    setKeyWord("");
    setResult(null);
  }

  async function handleSearch(e) {
    try {
      const response = await axios.get(`${API_LINK}/${keyWord}`);
      setResult(response.data[0]);
    } catch (e) {
      console.log({ e });
    }
  }
  const debouncedSearch = UseDebounce(handleSearch, 800);

  useEffect(() => {
    debouncedSearch();
    if (keyWord.length == 0) {
      handleClear();
    }
  }, [keyWord]);

  return (
    <div className="App" onMouseUp={() => handleOnSelection()}>
      <div className="main-header">
        <input
          className="input-tag"
          value={keyWord}
          autoFocus
          placeholder="Type the word here"
          onKeyDown={(e) => onClickEnter(e)}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <button className="button" type="submit" onClick={debouncedSearch}>
          Search
        </button>
      </div>

      {result && <List {...{ result }} />}
    </div>
  );
}
