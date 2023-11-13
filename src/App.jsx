import logo from "./logo.svg";
import "./App.css";
import Table from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import BarChart from "./BarChartComponent";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const descriptions = ["On visualise ici un score moyen d'activité de chaque utilisateur sur le forum prenant en compte 4 critères: Le nombre moyen de secondes passées sur la plateforme par jour, le nombre maximum de jours de connexion d'affilées, le nombre de messages répondus et le nombre de fichiers envoyés.",
    "",
    "",
    "",
    ""]
  const [data, setData] = useState([]);
  var [scores, setScores] = useState([]);
  var [labels, setLabels] = useState([]);
  var [description, setDescription] = useState(descriptions[0]);
  var [title, setTitle] = useState("Ranking");


  

  function setResponse(response) {
    var datas = Object.entries(response.data).map(([cle, valeur]) => ({cle,...valeur,
    }));
    datas.sort((a, b) => a.classement - b.classement);
    setScores(datas.map((value)=>(value.score)));
    setLabels(datas.map((value) => (value.cle)));
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
        setDescription(descriptions[0])
        break;
      case "Max Signin Days For All Users":
        fetchAPI("maxSigninDays");
        setTitle("Max Signin Days For All Users")
        setDescription(descriptions[1])
        break;
      case "Replied messages For All Users":
        fetchAPI("repliedMessages");
        setTitle("Replied messages For All Users")
        setDescription(descriptions[2])
        break;
      case "Spent Time Per Day For All Users":
        fetchAPI("spentTimePerDay");
        setTitle("Spent Time Per Day For All Users")
        setDescription(descriptions[3])
        break;
      case "File shared Per Personn":
        fetchAPI("filePerPersonn");
        setTitle("File shared Per Personn")
        setDescription(descriptions[4])
        break;
      default:
        fetchAPI("ranking");
        setTitle("Ranking")
        setDescription(descriptions[0])
    }
  }
 

// return (
//   <div className="App">
//     <h1>{title}</h1>
//     <div className="select-container">
//       <Form.Select
//         aria-label="Default select example"
//         onClick={selectOnclick}
//         className="select-input smaller">
//         <option value="Ranking">Ranking</option>
//         <option value="Max Signin Days For All Users">Max Signin Days For All Users</option>
//         <option value="Replied messages For All Users">Replied messages For All Users</option>
//         <option value="Spent Time Per Day For All Users">Spent Time Per Day For All Users</option>
//         <option value="File shared Per Personn">File shared Per Personn</option>
//       </Form.Select>
//     </div>
//     <div className="flex-container">
//       <div className="table-container">
//         <Table striped bordered hover size="sm" Light  >
//           <thead>
//             <tr>
//               <th>Ranking</th>
//               <th>Name</th>
//               <th>Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((value) => (
//               <tr key={value.cle}>
//                 <td>{value.classement}</td>
//                 <td>{value.cle}</td>
//                 <td>{value.score}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       <div className="chart-container">
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt excepturi expedita cum! Doloribus sit quam ipsum adipisci iure sed et enim nam? Corporis perspiciatis nobis rem recusandae cupiditate quo deleniti.</p>
//         <BarChart datas={scores} title={title} labels={labels} />
//       </div>
//     </div>
//   </div>
// );
return (
  <div className="App">
    <h1>{title}</h1>
    <div className="select-container">
      <Form.Select
        aria-label="Default select example"
        onClick={selectOnclick}
        className="select-input smaller"
      >
        <option value="Ranking">Ranking</option>
        <option value="Max Signin Days For All Users">Max Signin Days For All Users</option>
        <option value="Replied messages For All Users">Replied messages For All Users</option>
        <option value="Spent Time Per Day For All Users">Spent Time Per Day For All Users</option>
        <option value="File shared Per Personn">File shared Per Personn</option>
      </Form.Select>
    </div>
    <div className="flex-container">
      <div className="containers table-container">
        <Table responsive>
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

      <div className="containers chart-container">
        <p>
          {description}
        </p>
        <BarChart datas={scores} title={title} labels={labels} />
      </div>
    </div>
  </div>
);
            }
export default App;
