import { useEffect, useRef, useState } from "react";
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
  const [speech, setSpeech] = useState("");
  const [speechInput, setSpeechInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState("");
  const responseRef = useRef();
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    // when user says word, save word and turn off mic.
    if (transcript) {
      setSpeechInput(transcript);
      SpeechRecognition.stopListening();
    }
  }, [transcript]);

  // scroll to results
  useEffect(() => {
    if (response) {
      responseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setSpeech(speechInput);
    setResponse("");
    setIsLoading(true);
    setShowError(false);

    // submit openai prompt
    try {
      const response = await submitPrompt(speechInput);
      const formattedResult = JSON.parse(response.replace(/\n/g, ""));
      setResponse(formattedResult);
      setIsLoading(false);
    } catch (error) {
      setShowError(true);
      setIsLoading(false);
    }
  }

  function reset() {
    setSpeech("");
    setSpeechInput("");
    setResponse("");
    resetTranscript();
    SpeechRecognition.stopListening();
    setShowError(false);
  }

  // function that finds a particular word in a string and bolds it
  function highlightWord(word, string) {
    if (!word || !string) {
      return;
    }

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
    <div className="input-component">
      <h2>
        give a word/phrase/whatever,
        <br />
        get a definition and example.
      </h2>

      {/* form */}
      <form onSubmit={onSubmit}>
        <div>
          {/* record button */}
          {!listening && (
            <button type="button" tabIndex="-1" onClick={SpeechRecognition.startListening}>
              record
            </button>
          )}

          {/* stop recording button */}
          {listening && (
            <button type="button" tabIndex="-1" onClick={SpeechRecognition.stopListening}>
              stop
            </button>
          )}

          {/* reset button */}
          <button type="button" tabIndex="-1" onClick={reset} disabled={!speechInput}>
            reset
          </button>
        </div>

        {listening && <div className="listening">listening...</div>}

        <div className="input-container">
          {/* word input */}
          <input
            tabIndex="1"
            type="text"
            className="word-input"
            value={speechInput}
            placeholder="type something"
            onChange={(e) => setSpeechInput(e.target.value)}
          />

          {/* submit button */}
          <button
            type="submit"
            className="submit-btn"
            onClick={onSubmit}
            disabled={isLoading || !speechInput}
          >
            submit
          </button>

          {/* error message */}
          {showError && (
            <div className="error">
              Something went wrong :( <br />
              Please try again.
            </div>
          )}
        </div>
      </form>

      {/* loader */}
      {isLoading && <PropagateLoader color="#005277" className="loader" />}

      {/* response */}
      {response && (
        <div className="response" ref={responseRef}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(highlightWord(speech, response.definition)),
            }}
          ></div>
          <br />
          <div
            dangerouslySetInnerHTML={{
              __html: `"${DOMPurify.sanitize(highlightWord(speech, response.example))}"`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

// Export the component
export default Input;
