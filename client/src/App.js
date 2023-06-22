import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateDog from "./components/CreateDog/CreateDog";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import DetailDog from "./components/DetailDog/DetailDog";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={"/home/createDog"} component={CreateDog} />
        <Route path={"/home/:id"} component={DetailDog} />
        <Route path={"/home"} component={Home} />
        <Route path={"/"} component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
