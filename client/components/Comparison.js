import moment from "moment";

class Comparison extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      countNode: 0,
      countPython: 0,
      totalRecords: this.props.totalRecords,
      nodeButtonClicked: false,
      pythonButtonClicked: false,
      timeTakenExpress: 0,
      timeTakenFastAPI: 0,
      responseData: {},
      loading: false,
      apiCallStart: [],
      apiCallEnd: [],
    }
  }

  nodeClicked = () => {
    this.setState({
      totalRecords: 0,
      nodeButtonClicked: true,
      pythonButtonClicked: false,
      loading: true,
      apiCallStart: moment.now()
    }, async () => {
      await fetch(`http://localhost:4000/insert_and_delete/count/${this.state.countNode}`).then( async(res) => {
        const nodeAPIData = await res.json();
        this.setState({
          responseData: nodeAPIData,
          countNode: 0,
          totalRecords: nodeAPIData.length,
          loading: false,
          apiCallEnd: moment.now()
        });
      });
    })
  }

  pythonClicked = () => {
    this.setState({
      totalRecords: 0,
      pythonButtonClicked: true,
      nodeButtonClicked: false,
      loading: true,
      apiCallStart: moment.now()
    }, async () => {
      await fetch(`http://localhost:8000/insert_and_delete/count/${this.state.countPython}`).then( async(res) => {
        const pythonAPIData = await res.json();
        this.setState({
          responseData: pythonAPIData,
          countPython: 0,
          totalRecords: pythonAPIData.length,
          loading: false,
          apiCallEnd: moment.now()
        });
      });
    })
  }

  render() {

    return (
      <div>
        <br />
        <div className="row">
          <div className="col col-6 d-block justify-content-center align-items-center">
            <label>
              Enter the number of entries you want to add from Node API:
              <input value={this.state.countNode} type="number" className="form-control" onChange={e => this.setState({ countNode: e.target.value })}></input>
            </label>
            <button onClick={this.nodeClicked} className="btn btn-secondary mx-4 py-2" disabled={this.state.countNode ? false : true}>Test</button>
          </div>
          <div className="col col-6 d-block justify-content-center align-items-center">
            <label>
              Enter the number of entries you want to add from Python API:
              <input value={this.state.countPython} type="number" className="form-control" onChange={e => this.setState({ countPython: e.target.value })}></input>
            </label>
            <button onClick={this.pythonClicked} className="btn btn-secondary mx-4 py-2" disabled={this.state.countPython ? false : true}>Test</button>
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-12 px-0">
            <h1>Results</h1>
          </div>
          {
            this.state.nodeButtonClicked && (
              <div className="col-12 px-0">
                {
                  this.state.loading ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                :
                  <div>
                    <p>Computation Time: {moment(this.state.responseData.endTime).diff(moment(this.state.responseData.startTime), "milliseconds")} milliseconds</p>
                    <p>Count value: {this.state.responseData.length}</p>
                    <p>Start Time: {this.state.responseData.startTime}</p>
                    <p>End Time: {this.state.responseData.endTime}</p>
                    <p>API Response Time: {moment(this.state.apiCallEnd).diff(moment(this.state.apiCallStart), "milliseconds")} milliseconds</p>
                  </div>
                }
              </div>
            )
          }
          {
            this.state.pythonButtonClicked && (
              <div className="col-12 px-0">
                {
                  this.state.loading ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                :
                  <div>
                    <p>Computation Time: {moment.unix(this.state.responseData.endTime).diff(moment.unix(this.state.responseData.startTime), "milliseconds")} milliseconds</p>
                    <p>Count value: {this.state.responseData.length}</p>
                    <p>Start Time: {this.state.responseData.startTime}</p>
                    <p>End Time: {this.state.responseData.endTime}</p>
                    <p>API Response Time: {moment(this.state.apiCallEnd).diff(moment(this.state.apiCallStart), "milliseconds")} milliseconds</p>
                  </div>
                }
              </div>
            )
          }
          {
            !this.state.nodeButtonClicked && !this.state.pythonButtonClicked && (
              <div className="col-12 px-0">
                No results to show.
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Comparison;
