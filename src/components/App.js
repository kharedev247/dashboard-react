import { createContext } from "react";
import Layout from "./Layout";
import Header from "./Header";
import Speakers from "./Speakers";

export const ThemeContext = createContext();

function App() {
  return (
    <Layout startingTheme="light">
      <div>
        <Header />
        <Speakers />
      </div>
    </Layout>
  );
}

export default App;
