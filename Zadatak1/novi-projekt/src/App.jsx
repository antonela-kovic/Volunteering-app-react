import Podaci from "./components/Podaci";
import Sposobnosti from "./components/Sposobnosti";
import './App.css'


function App(){
    return (
        <div>
          <header>
            <h1 >Bru Batman</h1>
          </header>
          <nav>
            <img src='./batman.jpg' alt='' />
          </nav>
          <br/>
          <section id="okvir">
             <Podaci datumRodenja={"30.ožujka 1988"} adresa={"Batman Cave 1,Gotham City"} kontakt={"Bat signal"} />
          </section>
          <br/>
          <Sposobnosti/> 
        </div>
    )
}
 export default App

 