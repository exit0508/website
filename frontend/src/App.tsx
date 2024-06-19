import { Route, Switch } from "wouter";
import fetchAllPosts from "./utils/notion";

import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";

function App() {
  const result = fetchAllPosts();
  console.log(result);
  return (
    <div>
      <Header />

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/portfolio" component={Portfolio} />
      </Switch>
    </div>
  );
}

export default App;
