import Input from "../components/input/Input";
import styles from "~/index.css";
import { useState, useEffect } from "react";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  // console.log(ENV);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>wordbot</h1>
      </div>

      <div className="main">
        <Input />
      </div>
    </div>
  );
}
