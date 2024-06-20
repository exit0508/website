import { Route, Switch } from "wouter";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import { useState, useEffect } from "react";

function App() {
  const [post, setPosts] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/hello");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        console.log(posts);
        setPosts(posts);
        setLoading(false);
      } catch (err: any) {
        setError(err.message ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
            <Route path="/portfolio" component={Portfolio} />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
