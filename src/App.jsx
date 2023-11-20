import "./App.css";
import BasicTable from "./components/TableComponent";
import ApexChart from "./components/ApexChartComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import BarChartComponent from "./components/BarChartComponent";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const descriptions = ["On visualise ici un score moyen d'activité de chaque utilisateur sur le forum prenant en compte 4 critères: Le nombre moyen de secondes passées sur la plateforme par jour, le nombre maximum de jours de connexion d'affilées, le nombre de messages répondus et le nombre de fichiers envoyés.",
    "On peut voir ici pour chaque utilisateur le temps moyen de connexion par jour en secondes.",
    "On peut voir ici pour chaque utilisateur le nombre maximum de jours de connexion d'affilées.",
    "On peut voir ici pour chaque utilisateur le nombre de messages répondus.",
    "On peut voir ici pour chaque utilisateur le nombre de fichiers envoyés."]
  const titles = [
    "Classement général",
    "Temps moyen de connexion par jour en secondes",
    "Nombre maximum de jours de connexion d'affilées",
    "Nombre de messages répondus",
    "Nombre de fichiers envoyés"
  ]
  const [data, setData] = useState([]);
  var [scores, setScores] = useState([]);
  var [labels, setLabels] = useState([]);
  var [description, setDescription] = useState(descriptions[0]);
  var [title, setTitle] = useState(titles[0]);


  

  function setResponse(response) {
    var datas = Object.entries(response.data).map(([cle, valeur]) => ({cle,...valeur,
    }));
    datas.sort((a, b) => a.classement - b.classement);
    setScores(datas.map((value)=>(value.score)));
    setLabels(datas.map((value) => (value.cle)));
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
        setTitle(titles[0])
        setDescription(descriptions[0])
        break;
      case "Spent Time Per Day For All Users":
        fetchAPI("spentTimePerDay");
        setTitle(titles[1])
        setDescription(descriptions[1])
        break;
      case "Max Signin Days For All Users":
        fetchAPI("maxSigninDays");
        setTitle(titles[2])
        setDescription(descriptions[2])
        break;
      case "Replied messages For All Users":
        fetchAPI("repliedMessages");
        setTitle(titles[3])
        setDescription(descriptions[3])
        break;
      case "File shared Per Personn":
        fetchAPI("filePerPersonn");
        setTitle(titles[4])
        setDescription(descriptions[4])
        break;
      default:
        return;
    }
  }
 

return (
  <div className="App">
    <h1>{title}</h1>
    <div className="select-container">
      <Form.Select style={{backgroundColor: "#FFFAF8"}}
        aria-label="Default select example"
        onClick={selectOnclick}
        className="select-input smaller">
        <option value="Ranking">Classement général</option>
        <option value="Max Signin Days For All Users">Nombre maximum de jours de connexion d'affilées</option>
        <option value="Replied messages For All Users">Nombre de messages répondus</option>
        <option value="Spent Time Per Day For All Users">Temps moyen de connexion par jour en secondes</option>
        <option value="File shared Per Personn">Nombre de fichiers envoyés</option>
      </Form.Select>
    </div>
    
    <div className="flex-container">
      <div className="containers table">
        <BasicTable data={data}/>
      </div>
        <div className="apex-chart">
          <div className="containers chart">
            <p>{description}</p>
          </div>
          <div className="containers chart">
            <BarChartComponent datas={scores} title={title} labels={labels} />
          </div> 

          <div className="containers chart">
            <ApexChart datas={scores} labels={labels}/>
          </div>
        </div>
      
    </div>
    
  </div>
);
            }
export default App;
