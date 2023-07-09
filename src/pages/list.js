const List = ({ result }) => {
  console.log(result);
  const { word, phonetics, meanings } = result;

  function playAudio() {
    try {
      let audio = new Audio(phonetics[0].audio);
      audio.play();
    } catch (e) {
      console.log({ e });
    }
  }

  return (
    <div className="result-block">
      <div className="">
        <div className="word">
          <h3 className="pad"> Word </h3>
          <p>{word}</p>

          <p className="pad"> {meanings[0].partOfSpeech} </p>
          <p className="pad"> {phonetics.length !== 0 && phonetics[0].text}</p>
          <div className="pad">
            <button className="audio" onClick={playAudio}>
              {" "}
              <i className="fa fa-volume-up" aria-hidden="true"></i>
              Sample audio{" "}
            </button>
          </div>
        </div>

        <div className="meaning">
          <h3 className="pad">Meaning </h3>
          <p>{meanings[0].definitions[0].definition}</p>
        </div>

        <div className="synonyms">
          <h3 className="pad">Synonyms </h3>
          <p className="items">
            {meanings[0].synonyms.length &&
              meanings[0].synonyms.map((item, index) => {
                return (
                  <p className="" key={index}>
                    &nbsp;{item},
                  </p>
                );
              })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default List;
