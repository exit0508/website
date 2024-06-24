import { Route, Switch } from "wouter";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import { useProjects } from "./contexts";

function App() {
  const { loading } = useProjects();

  return (
    <div>
      {loading ? (
        <h1>Error</h1>
      ) : (
        <>
          <Header />

          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
