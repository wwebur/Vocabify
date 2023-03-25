import Input from "../components/input/Input";
import styles from "~/index.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function Index() {
  // console.log(ENV);

  return (
    <div className="app">
      <div className="header">
        <h1>wordbot</h1>
      </div>

      <div className="main">
        <h2>gimme a word.</h2>
        <Input />
      </div>
    </div>
  );
}
