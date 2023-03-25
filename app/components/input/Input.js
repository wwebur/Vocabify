import { useEffect, useState } from "react";
import "regenerator-runtime";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import submitPrompt from "../../api/prompt";

// use speechly polyfill
const appId = "c95dfa5c-ef43-437c-8400-f64515f67846";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function Input() {
//   console.log(ENV);

  // Use a state variable to store the user's speech
  const [speech, setSpeech] = useState("");
  const [response, setResponse] = useState("");

  // Use the useSpeechRecognition hook to get the transcript and resetTranscript functions
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Update the speech state variable whenever the transcript changes
  useEffect(() => {
    setSpeech(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  async function onSubmit() {
    setResponse("");

    // submit openai prompt
    try {
      const response = await submitPrompt(speech);
      const formattedResult = JSON.parse(response.replace(/\n/g, ""));
      setResponse(formattedResult);
      //   setIsLoading(false);
    } catch (error) {
      console.error(error);
      //   setIsLoading(false);
      //   setShowError(true);
    }
  }

  // Return a JSX element that displays the speech and a button to start listening
  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>

      <p>{speech}</p>
      <button onClick={onSubmit}>Submit</button>

      <div className="response">{response.definition}</div>
      <br />
      <div className="response">{response.example}</div>
    </div>
  );
}

// Export the component
export default Input;
