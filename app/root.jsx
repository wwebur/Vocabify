import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { getEnv } from "./env.server";

export const meta = () => ({
  charset: "utf-8",
  title: "wordbot",
  viewport: "width=device-width,initial-scale=1",
  description: "Personal AI-powered vocabulary teacher.",
  "og:image": "https://wordbot.vercel.app/social.png",
});

// expose environment variables to the client.
export const loader = async ({ request }) => {
  return {
    ENV: getEnv(),
  };
};

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script dangerouslySetInnerHTML={{ __html: `window.ENV=${JSON.stringify(data.ENV)}` }} />
        <LiveReload />
      </body>
    </html>
  );
}
