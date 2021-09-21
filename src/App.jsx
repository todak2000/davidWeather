import LandingPage from "./pages/landing/index";
import HistoricalReport from "./pages/partials/HistoricalReport";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/historical" component={HistoricalReport} />
    </Switch>
  </Router>
);

export default App;
