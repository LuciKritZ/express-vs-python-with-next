import Head from "next/head";
import Navbar from "./Navbar";

const Layout = (props) => (
  <main>
    <Head>
      <title>PerformRight</title>
      <meta name="description" content="Gets the computation time difference in Node (Express) and Python (Flask API) API request in PostgreSQL." />
    </Head>
    <Navbar />
    <div className="container">
      {props.children}
    </div>
  </main>
);

export default Layout;
