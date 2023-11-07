import logo from "./logo.svg";
import "./App.css";
import Table from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import BarChart from "./BarChartComponent";

function App() {
  const [data, setData] = useState([]);
  var [scores, setScores] = useState([]);
  var [labels, setLabels] = useState([]);
  var [title, setTitle] = useState("Ranking");

  function setResponse(response) {
    var datas = Object.entries(response.data).map(([cle, valeur]) => ({cle,...valeur,
    }));
    datas.sort((a, b) => a.classement - b.classement);
    setScores(datas.map((value)=>(value.score)));
    setLabels(datas.map((value)=>(value.cle))) ;
    // console.log(datas);
    setData(datas);
  }

  function fetchAPI(endpoint) {
    axios.get(`http://127.0.0.1:8000/${endpoint}`).then(setResponse);
  }

  

  useEffect(() => {
    fetchAPI("ranking");
  }, []);
  

  function selectOnclick(value) {
    switch(value.target.value){
      case "Ranking":
        fetchAPI("ranking");
        setTitle("Ranking")
        break;
      case "Max Signin Days For All Users":
        fetchAPI("maxSigninDays");
        setTitle("Max Signin Days For All Users")
        break;
      case "Replied messages For All Users":
        fetchAPI("repliedMessages");
        setTitle("Replied messages For All Users")
        break;
      case "Spent Time Per Day For All Users":
        fetchAPI("spentTimePerDay");
        setTitle("Spent Time Per Day For All Users")
        break;
      case "File shared Per Personn":
        fetchAPI("filePerPersonn");
        setTitle("File shared Per Personn")
        break;
      default:
        fetchAPI("ranking");
        setTitle("Ranking")
    }
  }
 
return (
  <div className="App">
    <h1>{title}</h1>
    <Form.Select aria-label="Default select example" onClick={selectOnclick}>
      <option>Open this select menu</option>
      <option value="Ranking">Ranking</option>
      <option value="Max Signin Days For All Users">Max Signin Days For All Users</option>
      <option value="Replied messages For All Users">Replied messages For All Users</option>
      <option value="Spent Time Per Day For All Users">Spent Time Per Day For All Users</option>
      <option value="File shared Per Personn">File shared Per Personn</option>
    </Form.Select>
    <div className="flex-container">
      <div className="table-container">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <tr key={value.cle}>
                <td>{value.classement}</td>
                <td>{value.cle}</td>
                <td>{value.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="chart-container">
        <BarChart datas={scores} title={title} labels={labels} />
      </div>
    </div>
  </div>
);
            }
export default App;
