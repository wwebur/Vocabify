import { useSWEffect } from "~/utils/client/sw-hook";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { getEnv } from "./env.server";
export const meta = () => ({
  charset: "utf-8",
  title: "vocabify",
  viewport: "width=device-width,initial-scale=1",
  description: "Personal AI-powered vocabulary teacher.",
  "og:image": "https://vocabify.vercel.app/social.png",
}); // expose environment variables to the client.
export const loader = async () => {
  return { ENV: getEnv() };
};
export default function App() {
  const data = useLoaderData();
  useSWEffect();
  return (
    <html lang="en">
      <head>
        <Meta />
        <link rel="manifest" href="/resources/manifest.webmanifest" />
        <Links />
      </head>
      <body>
        <Outlet /> <ScrollRestoration /> <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV=${JSON.stringify(data.ENV)}`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
}
