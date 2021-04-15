import "./App.css";
import Chatbar from "./Components/Chatbar";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Components/Login";
import { useStateValue } from "./Components/StateProvider";

function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login/>
      ) : (
        <div className="Green-color">
          <h2>whats app clone</h2>
          <div className="app-body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chatbar />
                </Route>
                <Route path="/">
                  <Chatbar />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
