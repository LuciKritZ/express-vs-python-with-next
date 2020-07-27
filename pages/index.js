import Layout from "../components/Layout";
import Prices from "../components/Prices";
import fetch from "isomorphic-unfetch";

const Index = (props) => (
  <Layout>
    <div>
      <h1>
        Welcome to BitInfo
      </h1>
      <p>Check current bitcoin rate</p>
      <Prices bpi={props.bpi} />
    </div>
  </Layout>
);

Index.getInitialProps = async function () {
  const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
  const data = await res.json();
  return {
    bpi: data.bpi
  }
}

export default Index;
