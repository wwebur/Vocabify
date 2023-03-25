import { useEffect, useState } from "react";
import "regenerator-runtime";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import submitPrompt from "../../api/prompt";
import BarLoader from "react-spinners/BarLoader";
import PacmanLoader from "react-spinners/PacmanLoader";

// use speechly polyfill for browser support
const appId = "c95dfa5c-ef43-437c-8400-f64515f67846";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function Input() {
  //   console.log(ENV);
  const [speech, setSpeech] = useState("hibernation");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    // when user says word, save word and turn off mic.
    if (transcript) {
      setSpeech(transcript);
      SpeechRecognition.stopListening();
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  async function onSubmit() {
    setResponse("");
    setIsLoading(true);

    // submit openai prompt
    try {
      const response = await submitPrompt(speech);
      const formattedResult = JSON.parse(response.replace(/\n/g, ""));
      setResponse(formattedResult);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      //   setShowError(true);
    }
  }

  function reset() {
    setSpeech("");
    setResponse("");
    resetTranscript();
    SpeechRecognition.stopListening();
  }

  // Return a JSX element that displays the speech and a button to start listening
  return (
    <div className="input">
      <h2>gimme a word.</h2>

      <div>
        <button onClick={SpeechRecognition.startListening} disabled={listening}>
          record
        </button>
        {/* <button onClick={SpeechRecognition.stopListening} disabled={!listening}>
        Stop
      </button> */}
        <button onClick={reset} disabled={!speech}>
          reset
        </button>
      </div>

      {listening && <div className="listening">listening...</div>}

      <div className="input-container">
        <div className="word">
          <input
            type="text"
            className="word-input"
            value={speech}
            onChange={(e) => setSpeech(e.target.value)}
          />
        </div>
        <button className="submit-btn" onClick={onSubmit} disabled={isLoading || !speech}>
          submit
        </button>
      </div>

      {/* {isLoading && <BarLoader color="#36d7b7" />} */}
      {/* <PacmanLoader color="#484848" /> */}

      {isLoading && <div className="loading">loading...</div>}

      <div className="response">{response.definition}</div>
      <br />
      <div className="response">{response.example}</div>
    </div>
  );
}

// Export the component
export default Input;
