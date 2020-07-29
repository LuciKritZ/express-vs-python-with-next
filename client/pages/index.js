import Layout from "../components/Layout";
import Comparison from "../components/Comparison";
import fetch from "isomorphic-unfetch";

const Index = (props) => (
  <Layout>
    <div>
      <h1>
        Welcome to PerformRight
      </h1>
      <p>Do performance testing for insering data.</p>
      {
        props.errorLoadingData ? (
          <h3>Sorry for inconvineance. API not working. Try restarting the servers again.</h3>
        )
        :
        (
          <Comparison totalRecords={props.totalRecords} />
        )
      }
    </div>
  </Layout>
);

Index.getInitialProps = async function () {
  try{
    const nodeAPI = await fetch('http://localhost:4000/');
    const nodeAPIData = await nodeAPI.json();
    return {
      totalRecords: nodeAPIData,
      errorLoadingData: false,
    }
  }
  catch(error) {
    console.log(error);
  }
  return {
    totalRecords: {},
    errorLoadingData: true,
  }
}

export default Index;
