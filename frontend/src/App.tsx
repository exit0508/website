import { Route, Switch } from "wouter";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import { useProjects } from "./contexts";

function App() {
  const { loading } = useProjects();

  return (
    <div className="w-full h-screen bg-bg dark:bg-bgDark text-black dark:text-white">
      <Header />
      <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {loading ? (
          <h1>Error</h1>
        ) : (
          <>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/projects" component={Projects} />
            </Switch>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
