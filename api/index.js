var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server");

// app/env.server.js
function getEnv() {
  return {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  };
}

// app/entry.server.jsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
global.ENV = getEnv();
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.jsx",
          lineNumber: 47,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.jsx",
          lineNumber: 90,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  loader: () => loader,
  meta: () => meta
});

// app/utils/client/sw-hook.js
var import_react2 = require("@remix-run/react"), import_react3 = require("react"), isMount = !0;
function useSWEffect() {
  let location = (0, import_react2.useLocation)(), matches = (0, import_react2.useMatches)();
  function isPromise(p) {
    return typeof p == "object" && typeof p.then == "function";
  }
  (0, import_react3.useEffect)(() => {
    var _a;
    let mounted = isMount;
    if (isMount = !1, "serviceWorker" in navigator)
      if (navigator.serviceWorker.controller)
        (_a = navigator.serviceWorker.controller) == null || _a.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches: matches.filter((route) => route.data ? Object.values(route.data).filter((elem) => isPromise(elem)).length === 0 : !0),
          manifest: window.__remixManifest
        });
      else {
        let listener = async () => {
          var _a2;
          await navigator.serviceWorker.ready, (_a2 = navigator.serviceWorker.controller) == null || _a2.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches: matches.filter((route) => route.data ? Object.values(route.data).filter((elem) => isPromise(elem)).length === 0 : !0),
            manifest: window.__remixManifest
          });
        };
        return navigator.serviceWorker.addEventListener("controllerchange", listener), () => {
          navigator.serviceWorker.removeEventListener("controllerchange", listener);
        };
      }
  }, [location, matches]);
}

// app/root.jsx
var import_react4 = require("@remix-run/react");
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), meta = () => ({
  charset: "utf-8",
  title: "vocabify",
  viewport: "width=device-width,initial-scale=1",
  description: "Personal AI-powered vocabulary teacher.",
  "og:image": "https://vocabify.vercel.app/social.png"
}), loader = async () => ({ ENV: getEnv() });
function App() {
  let data = (0, import_react4.useLoaderData)();
  return useSWEffect(), /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Meta, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("link", { rel: "manifest", href: "/resources/manifest.webmanifest" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Links, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 22,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Outlet, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 25,
        columnNumber: 20
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Scripts, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 25,
        columnNumber: 42
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.ENV=${JSON.stringify(data.ENV)}`
          }
        },
        void 0,
        !1,
        {
          fileName: "app/root.jsx",
          lineNumber: 26,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.LiveReload, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 31,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 24,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.jsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/routes/resources/manifest[.]webmanifest.js
var manifest_webmanifest_exports = {};
__export(manifest_webmanifest_exports, {
  loader: () => loader2
});
var import_node2 = require("@remix-run/node"), loader2 = async () => (0, import_node2.json)(
  {
    short_name: "vocabify",
    name: "vocabify",
    start_url: "/",
    display: "standalone",
    background_color: "#d3d7dd",
    theme_color: "#c34138",
    shortcuts: [
      {
        name: "Homepage",
        url: "/"
      }
    ]
  },
  {
    headers: {
      "Cache-Control": "public, max-age=600",
      "Content-Type": "application/manifest+json"
    }
  }
);

// app/routes/index.jsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  links: () => links
});

// app/components/input.js
var import_react6 = require("react"), import_regenerator_runtime = require("regenerator-runtime"), import_speech_recognition_polyfill = require("@speechly/speech-recognition-polyfill"), import_react_speech_recognition = __toESM(require("react-speech-recognition"));

// app/api/prompt.js
var import_dompurify = __toESM(require("dompurify")), import_openai = require("openai"), configuration = new import_openai.Configuration({
  apiKey: ENV.OPENAI_API_KEY
}), openai = new import_openai.OpenAIApi(configuration);
async function submitPrompt(word = "") {
  if (!configuration.apiKey)
    return Promise.reject({});
  if (word = import_dompurify.default.sanitize(word), word.trim().length === 0)
    return Promise.reject({ message: "Please enter a valid word" });
  try {
    return (await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(word),
      temperature: 0.5,
      max_tokens: 3e3
    })).data.choices[0].text;
  } catch (error) {
    return Promise.reject({ error });
  }
}
function generatePrompt(word) {
  return `Define the word ${word}. Then give me an example of its use in a sentence. Use proper grammar and punctuation. 
  
  Return in json format like: {"definition": "<definition>", "example": "<example>"}`;
}

// app/components/input.js
var import_dompurify3 = __toESM(require("dompurify")), import_react_spinners = require("react-spinners");

// app/components/response.js
var import_dompurify2 = __toESM(require("dompurify")), import_react5 = require("react"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function Response2({ query, data }) {
  let responseRef = (0, import_react5.useRef)();
  (0, import_react5.useEffect)(() => {
    responseRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  function boldQuery(query2, response) {
    if (!query2 || !response)
      return;
    let regex = new RegExp(query2, "gi");
    return response.replace(regex, `<b>${query2}</b>`);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "response", ref: responseRef, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      "div",
      {
        dangerouslySetInnerHTML: {
          __html: import_dompurify2.default.sanitize(boldQuery(query, data.definition))
        }
      },
      void 0,
      !1,
      {
        fileName: "app/components/response.js",
        lineNumber: 24,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("br", {}, void 0, !1, {
      fileName: "app/components/response.js",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      "div",
      {
        dangerouslySetInnerHTML: {
          __html: `"${import_dompurify2.default.sanitize(boldQuery(query, data.example))}"`
        }
      },
      void 0,
      !1,
      {
        fileName: "app/components/response.js",
        lineNumber: 30,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/response.js",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}

// app/components/input.js
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), appId = "c95dfa5c-ef43-437c-8400-f64515f67846", SpeechlySpeechRecognition = (0, import_speech_recognition_polyfill.createSpeechlySpeechRecognition)(appId);
import_react_speech_recognition.default.applyPolyfill(SpeechlySpeechRecognition);
function Input() {
  let [isReady, setIsReady] = (0, import_react6.useState)(!1), [query, setQuery] = (0, import_react6.useState)(""), [speechInput, setSpeechInput] = (0, import_react6.useState)(""), [response, setResponse] = (0, import_react6.useState)(""), [isLoading, setIsLoading] = (0, import_react6.useState)(!1), [error, setError] = (0, import_react6.useState)(""), genericError = "Something went wrong :(<br/>Please try again.", { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = (0, import_react_speech_recognition.useSpeechRecognition)();
  (0, import_react6.useEffect)(() => {
    transcript && (setSpeechInput(transcript), import_react_speech_recognition.default.stopListening());
  }, [transcript]), (0, import_react6.useEffect)(() => {
    setIsReady(!0);
  }, []);
  async function onSubmit(e) {
    e.preventDefault(), setQuery(speechInput), setResponse(""), setIsLoading(!0), setError("");
    try {
      let response2 = await submitPrompt(speechInput), formattedResult = JSON.parse(response2.replace(/\n/g, ""));
      setResponse(formattedResult), setIsLoading(!1);
    } catch (error2) {
      setError(error2.message || genericError), setIsLoading(!1);
    }
  }
  function reset() {
    setQuery(""), setSpeechInput(""), setResponse(""), resetTranscript(), import_react_speech_recognition.default.stopListening(), setError("");
  }
  return isReady ? browserSupportsSpeechRecognition ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "input-component", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { children: [
      "say or type a word/phrase/whatever,",
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/components/input.js",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      "get a definition and example."
    ] }, void 0, !0, {
      fileName: "app/components/input.js",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("form", { onSubmit, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "buttons", children: [
        !listening && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "button-container", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
            "button",
            {
              className: "start-microphone",
              type: "button",
              tabIndex: "-1",
              onClick: import_react_speech_recognition.default.startListening
            },
            void 0,
            !1,
            {
              fileName: "app/components/input.js",
              lineNumber: 87,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("path", { d: "M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" }, void 0, !1, {
            fileName: "app/components/input.js",
            lineNumber: 95,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/components/input.js",
            lineNumber: 94,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/input.js",
          lineNumber: 86,
          columnNumber: 13
        }, this),
        listening && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "button-container", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
            "button",
            {
              className: "stop-microphone",
              type: "button",
              tabIndex: "-1",
              onClick: import_react_speech_recognition.default.stopListening
            },
            void 0,
            !1,
            {
              fileName: "app/components/input.js",
              lineNumber: 103,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("path", { d: "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4z" }, void 0, !1, {
            fileName: "app/components/input.js",
            lineNumber: 112,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/components/input.js",
            lineNumber: 111,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/input.js",
          lineNumber: 102,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "button-container", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("button", { type: "button", tabIndex: "-1", onClick: reset, disabled: !speechInput, children: "reset" }, void 0, !1, {
          fileName: "app/components/input.js",
          lineNumber: 121,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/components/input.js",
          lineNumber: 120,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/input.js",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      listening && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "listening", children: "listening..." }, void 0, !1, {
        fileName: "app/components/input.js",
        lineNumber: 127,
        columnNumber: 23
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "input-container", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          "input",
          {
            tabIndex: "1",
            type: "text",
            className: "word-input",
            value: speechInput,
            placeholder: "type something",
            onChange: (e) => setSpeechInput(e.target.value)
          },
          void 0,
          !1,
          {
            fileName: "app/components/input.js",
            lineNumber: 131,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          "button",
          {
            type: "submit",
            className: "submit-btn",
            onClick: onSubmit,
            disabled: isLoading || !speechInput,
            children: "submit"
          },
          void 0,
          !1,
          {
            fileName: "app/components/input.js",
            lineNumber: 141,
            columnNumber: 11
          },
          this
        ),
        error && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          "div",
          {
            className: "error",
            dangerouslySetInnerHTML: {
              __html: import_dompurify3.default.sanitize(error)
            }
          },
          void 0,
          !1,
          {
            fileName: "app/components/input.js",
            lineNumber: 152,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/input.js",
        lineNumber: 129,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/input.js",
      lineNumber: 82,
      columnNumber: 7
    }, this),
    isLoading && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react_spinners.PropagateLoader, { color: "#005277", className: "loader" }, void 0, !1, {
      fileName: "app/components/input.js",
      lineNumber: 163,
      columnNumber: 21
    }, this),
    response && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Response2, { data: response, query }, void 0, !1, {
      fileName: "app/components/input.js",
      lineNumber: 166,
      columnNumber: 20
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/input.js",
    lineNumber: 74,
    columnNumber: 5
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { children: "Browser doesn't support speech recognition." }, void 0, !1, {
    fileName: "app/components/input.js",
    lineNumber: 70,
    columnNumber: 12
  }, this) : null;
}
var input_default = Input;

// app/styles/index.css
var styles_default = "/build/_assets/index-DUDNNKNR.css";

// app/styles/input.css
var input_default2 = "/build/_assets/input-NBPD6YXT.css";

// app/routes/index.jsx
var import_react7 = require("react"), import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function links() {
  return [
    {
      rel: "stylesheet",
      href: styles_default
    },
    {
      rel: "stylesheet",
      href: input_default2
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "apple-touch-icon.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "favicon-16x16.png"
    },
    {
      rel: "icon",
      type: "image/x-icon",
      href: "favicon.ico"
    },
    { rel: "manifest", href: "site.webmanifest" }
  ];
}
function Index() {
  let [isReady, setIsReady] = (0, import_react7.useState)(!1);
  return (0, import_react7.useEffect)(() => {
    setIsReady(!0);
  }, []), isReady ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "app", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "header", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h1", { children: "vocabify" }, void 0, !1, {
      fileName: "app/routes/index.jsx",
      lineNumber: 56,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/index.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "main", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(input_default, {}, void 0, !1, {
      fileName: "app/routes/index.jsx",
      lineNumber: 60,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/index.jsx",
      lineNumber: 59,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.jsx",
    lineNumber: 54,
    columnNumber: 5
  }, this) : null;
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "b35feeb6", entry: { module: "/build/entry.client-HP5ZXVQM.js", imports: ["/build/_shared/chunk-DEMPFQNT.js", "/build/_shared/chunk-FN3KWL4V.js", "/build/_shared/chunk-4IYZMDEG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-DSAQHILR.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-2HXDMQY7.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/resources/manifest[.]webmanifest": { id: "routes/resources/manifest[.]webmanifest", parentId: "root", path: "resources/manifest.webmanifest", index: void 0, caseSensitive: void 0, module: "/build/routes/resources/manifest[.]webmanifest-B7J2LRZ4.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-B35FEEB6.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/resources/manifest[.]webmanifest": {
    id: "routes/resources/manifest[.]webmanifest",
    parentId: "root",
    path: "resources/manifest.webmanifest",
    index: void 0,
    caseSensitive: void 0,
    module: manifest_webmanifest_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
