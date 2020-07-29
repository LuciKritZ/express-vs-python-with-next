import Layout from "../components/Layout";
import Comparison from "../components/Comparison";
import fetch from "isomorphic-unfetch";

const Index = (props) => (
  <Layout>
    <div>
      <h1>
        Welcome to BitInfo
      </h1>
      <p>Check current bitcoin rate</p>
      <Comparison totalRecords={props.totalRecords} />
    </div>
  </Layout>
);

Index.getInitialProps = async function () {
  const nodeAPI = await fetch('http://localhost:4000/');
  const nodeAPIData = await nodeAPI.json();
  return {
    totalRecords: nodeAPIData
  }
}

export default Index;
