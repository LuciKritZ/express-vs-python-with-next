import Head from "next/head";
import Navbar from "./Navbar";

const Layout = (props) => (
  <main>
    <Head>
      <title>BitInfo</title>
      <meta name="description" content="Get bitcoin prices in USD, EUR and GBP" />
    </Head>
    <Navbar />
    <div className="container">
      {props.children}
    </div>
  </main>
);

export default Layout;
