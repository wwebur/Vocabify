"use strict";
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

// server.js
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_vercel = require("@remix-run/vercel");

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});

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
var import_jsx_runtime = require("react/jsx-runtime");
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
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
var import_jsx_runtime2 = require("react/jsx-runtime"), meta = () => ({
  charset: "utf-8",
  title: "vocabify",
  viewport: "width=device-width,initial-scale=1",
  description: "Personal AI-powered vocabulary teacher.",
  "og:image": "https://vocabify.vercel.app/social.png"
}), loader = async () => ({ ENV: getEnv() });
function App() {
  let data = (0, import_react4.useLoaderData)();
  return useSWEffect(), /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("link", { rel: "manifest", href: "/resources/manifest.webmanifest" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.Outlet, {}),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.ScrollRestoration, {}),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.ENV=${JSON.stringify(data.ENV)}`
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.LiveReload, {})
    ] })
  ] });
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

// app/components/input/Input.js
var import_react5 = require("react"), import_regenerator_runtime = require("regenerator-runtime"), import_speech_recognition_polyfill = require("@speechly/speech-recognition-polyfill"), import_react_speech_recognition = __toESM(require("react-speech-recognition"));

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

// app/components/input/Input.js
var import_dompurify2 = __toESM(require("dompurify")), import_react_spinners = require("react-spinners"), import_jsx_runtime3 = require("react/jsx-runtime"), appId = "c95dfa5c-ef43-437c-8400-f64515f67846", SpeechlySpeechRecognition = (0, import_speech_recognition_polyfill.createSpeechlySpeechRecognition)(appId);
import_react_speech_recognition.default.applyPolyfill(SpeechlySpeechRecognition);
function Input() {
  let [isReady, setIsReady] = (0, import_react5.useState)(!1), [speech, setSpeech] = (0, import_react5.useState)(""), [speechInput, setSpeechInput] = (0, import_react5.useState)(""), [response, setResponse] = (0, import_react5.useState)(""), [isLoading, setIsLoading] = (0, import_react5.useState)(!1), [error, setError] = (0, import_react5.useState)(""), genericError = "Something went wrong :(<br/>Please try again.", responseRef = (0, import_react5.useRef)(), { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = (0, import_react_speech_recognition.useSpeechRecognition)();
  (0, import_react5.useEffect)(() => {
    transcript && (setSpeechInput(transcript), import_react_speech_recognition.default.stopListening());
  }, [transcript]), (0, import_react5.useEffect)(() => {
    response && responseRef.current.scrollIntoView({ behavior: "smooth" });
  }, [response]), (0, import_react5.useEffect)(() => {
    setIsReady(!0);
  }, []);
  async function onSubmit(e) {
    e.preventDefault(), setSpeech(speechInput), setResponse(""), setIsLoading(!0), setError("");
    try {
      let response2 = await submitPrompt(speechInput), formattedResult = JSON.parse(response2.replace(/\n/g, ""));
      setResponse(formattedResult), setIsLoading(!1);
    } catch (error2) {
      setError(error2.message || genericError), setIsLoading(!1);
    }
  }
  function reset() {
    setSpeech(""), setSpeechInput(""), setResponse(""), resetTranscript(), import_react_speech_recognition.default.stopListening(), setError("");
  }
  function highlightWord(word, string) {
    if (!word || !string)
      return;
    let regex = new RegExp(word, "gi");
    return string.replace(regex, `<b>${word}</b>`);
  }
  return isReady ? browserSupportsSpeechRecognition ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "input-component", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("h2", { children: [
      "say or type a word/phrase/whatever,",
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("br", {}),
      "get a definition and example."
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("form", { onSubmit, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "buttons", children: [
        !listening && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "button-container", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              className: "start-microphone",
              type: "button",
              tabIndex: "-1",
              onClick: import_react_speech_recognition.default.startListening
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" }) })
        ] }),
        listening && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "button-container", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              className: "stop-microphone",
              type: "button",
              tabIndex: "-1",
              onClick: import_react_speech_recognition.default.stopListening
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4z" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "button-container", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", tabIndex: "-1", onClick: reset, disabled: !speechInput, children: "reset" }) })
      ] }),
      listening && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "listening", children: "listening..." }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "input-container", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "input",
          {
            tabIndex: "1",
            type: "text",
            className: "word-input",
            value: speechInput,
            placeholder: "type something",
            onChange: (e) => setSpeechInput(e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            type: "submit",
            className: "submit-btn",
            onClick: onSubmit,
            disabled: isLoading || !speechInput,
            children: "submit"
          }
        ),
        error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: "error",
            dangerouslySetInnerHTML: {
              __html: import_dompurify2.default.sanitize(error)
            }
          }
        )
      ] })
    ] }),
    isLoading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_spinners.PropagateLoader, { color: "#005277", className: "loader" }),
    response && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "response", ref: responseRef, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          dangerouslySetInnerHTML: {
            __html: import_dompurify2.default.sanitize(highlightWord(speech, response.definition))
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          dangerouslySetInnerHTML: {
            __html: `"${import_dompurify2.default.sanitize(highlightWord(speech, response.example))}"`
          }
        }
      )
    ] })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Browser doesn't support speech recognition." }) : null;
}
var Input_default = Input;

// app/styles/index.css
var styles_default = "/build/_assets/index-ZATGWBZN.css";

// app/styles/input.css
var input_default = "/build/_assets/input-DKO6KXIL.css";

// app/routes/index.jsx
var import_react6 = require("react"), import_jsx_runtime4 = require("react/jsx-runtime");
function links() {
  return [
    {
      rel: "stylesheet",
      href: styles_default
    },
    {
      rel: "stylesheet",
      href: input_default
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
  let [isReady, setIsReady] = (0, import_react6.useState)(!1);
  return (0, import_react6.useEffect)(() => {
    setIsReady(!0);
  }, []), isReady ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "app", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "header", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { children: "vocabify" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "main", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Input_default, {}) })
  ] }) : null;
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "8465fdb5", entry: { module: "/build/entry.client-IANMSCRX.js", imports: ["/build/_shared/chunk-SMRQ4EEP.js", "/build/_shared/chunk-5HKR6QTR.js", "/build/_shared/chunk-G5WX4PPA.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-VOJIHQN3.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-ERYWT2MK.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/resources/manifest[.]webmanifest": { id: "routes/resources/manifest[.]webmanifest", parentId: "root", path: "resources/manifest.webmanifest", index: void 0, caseSensitive: void 0, module: "/build/routes/resources/manifest[.]webmanifest-6FW753FO.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-8465FDB5.js" };

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

// server.js
var server_default = (0, import_vercel.createRequestHandler)({ build: server_build_exports, mode: "production" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
