import "./App.css";
import { useState } from "react";

import Prikaz from "./Prikaz";
import Tipka from "./Tipka";

function App() {
  const currentDate = new Date().toLocaleDateString();
  const [brojaci, postaviBrojace] = useState({prvi: 5, drugi: 10});
 
  function uvecajPrvi(){
    const novi = {
      prvi: brojaci.prvi + 1,
      drugi: brojaci.drugi
    }
    postaviBrojace(novi)
  }
 
  function uvecajDrugi(){
    let novi = {...brojaci}
    novi.drugi += 1
    postaviBrojace(novi)
  }
  function umanjiPrvi(){
    if(brojaci.prvi > 0){
      const novi = {
        prvi: brojaci.prvi - 1,
        drugi: brojaci.drugi
      }
      postaviBrojace(novi)
    }
  }
 
  function umanjiDrugi(){
    if (brojaci.drugi > 0) { // Provjera da li je brojac.drugi veci od 0
      const novi = {
        prvi: brojaci.prvi,
        drugi: brojaci.drugi - 1
      }
      postaviBrojace(novi)
    }
  }

  return (
    <div className="app-container">
      <h5>{currentDate}</h5>
      <div className="container">
        <div className="column">
           <img src='/Chelsea_FC.svg.webp' alt="Chelsa" className="sideImage" />
           <p>Chelsea</p>
        </div>
        <Prikaz broj={brojaci.prvi} />
        <span className="colon">:</span> {/* Add colon with appropriate class */}
        <Prikaz broj={brojaci.drugi} />
        <div className="column">
           <img src='/Arsenal_FC.svg.webp' alt="Arsenal" className="sideImage" />
           <p>Arsenal</p>
        </div>
      </div>

      <div className="container2">
        <Tipka natpis="-" akcija={umanjiPrvi} />
        {/* <Tipka natpis="0" akcija={() => postaviBroj(0)} /> */}
        <Tipka natpis="+" akcija={uvecajPrvi} />
        <Tipka natpis="-" akcija={umanjiDrugi} />
        <Tipka natpis="+" akcija={uvecajDrugi} />
      </div>
    </div>
  );
}

export default App;
