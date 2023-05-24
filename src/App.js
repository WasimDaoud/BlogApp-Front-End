import { Children, useEffect } from "react";
import Layout from "./layout/Layout";

function App() {
  return (
    <div>
        <Layout>{Children}</Layout>
    </div>
  );
}

export default App;
