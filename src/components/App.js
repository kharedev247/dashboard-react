import Layout from "./Layout";
import Header from "./Header";
import Speakers from "./Speakers";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  return (
    // this scenario can be used when the username is fetched from cookie and user is automatically get signed in
    <AuthProvider initialLoggedInUser="Krish">
      <Layout startingTheme="light">
        <div>
          <Header />
          <Speakers />
        </div>
      </Layout>
    </AuthProvider>
  );
}

export default App;
