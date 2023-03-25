import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: ENV.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function submitPrompt(word = "") {
  if (!configuration.apiKey) {
    //   error: {
    //     message: "OpenAI API key not configured, please follow instructions in README.md",
    //   },
    return;
  }

  if (word.trim().length === 0) {
    return Promise.reject({ message: "Please enter a valid word" });
  }

  try {
    const test = 0;

    if (test) {
      //   res.status(200).json({
      //     result: ``,
      //   });
      //   return;
    }

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(word),
      temperature: 0.3,
      max_tokens: 3000,
    });

    console.log(completion.data.choices[0]);
    return completion.data.choices[0].text;
    // res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      //   res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      //   res.status(500).json({
      //     error: {
      //       message: "An error occurred during your request.",
      //     },
      //   });
    }
  }
}

function generatePrompt(word) {
  return `Define the word ${word}. Then give me an example of its use in a sentence.
  Return in json format like: {"definition": "<definition>", "example": "<example>"}`;
}
// Word: Quixotic.Definition: Having or showing ideas, plans, etc., that are not practical or sensible, but   that are hoped for and believed in anyway.
// Example: He had a quixotic plan to build a time machine.`;
