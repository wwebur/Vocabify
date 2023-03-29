import { json } from "@remix-run/node";

export let loader = async () => {
  return json(
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
          url: "/",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": "application/manifest+json",
      },
    },
  );
};
