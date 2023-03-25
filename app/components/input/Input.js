import { useEffect, useState } from "react";
import "regenerator-runtime";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import submitPrompt from "../../api/prompt";
import DOMPurify from "dompurify";
import { PropagateLoader } from "react-spinners";

// use speechly polyfill for browser support
const appId = "c95dfa5c-ef43-437c-8400-f64515f67846";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function Input() {
  const [isReady, setIsReady] = useState(false);
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

  useEffect(() => {
    setIsReady(true);
  }, []);

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

  // function that finds a particular word in a string and bolds it
  function highlightWord(word, string) {
    if (!word || !string) return;

    const regex = new RegExp(word, "gi");
    return string.replace(regex, `<b>${word}</b>`);
  }

  if (!isReady) {
    return null;
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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
        {/* word input */}
        <div className="word">
          <input
            type="text"
            className="word-input"
            value={speech}
            onChange={(e) => setSpeech(e.target.value)}
          />
        </div>

        {/* submit button */}
        <button className="submit-btn" onClick={onSubmit} disabled={isLoading || !speech}>
          submit
        </button>
      </div>

      {/* loader */}
      {isLoading && <PropagateLoader color="#005277" className="loader" />}

      {/* {isLoading && <div className="loader">loading...</div>} */}

      <div className="response">
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightWord(speech, response.definition)) }}
        ></div>
        <br />
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightWord(speech, response.example)) }}
        ></div>
      </div>
    </div>
  );
}

// Export the component
export default Input;
