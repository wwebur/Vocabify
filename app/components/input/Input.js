import { useEffect, useState } from "react";
import "regenerator-runtime";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import submitPrompt from "../../api/prompt";

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
  }

  // Return a JSX element that displays the speech and a button to start listening
  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      <button onClick={SpeechRecognition.startListening} disabled={listening}>
        Start
      </button>
      {/* <button onClick={SpeechRecognition.stopListening} disabled={!listening}>
        Stop
      </button> */}
      <button onClick={reset} disabled={!speech}>
        Reset
      </button>

      <p>{speech}</p>
      {isLoading ? <div>loading...</div> : <button onClick={onSubmit}>Submit</button>}

      <div className="response">{response.definition}</div>
      <br />
      <div className="response">{response.example}</div>
    </div>
  );
}

// Export the component
export default Input;
