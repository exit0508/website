import Hero from "../components/Hero";
import Projects from "./Projects";

const Home = () => {
  return (
    <div className="container">
      <Hero />
      <h2 className="text-5xl mt-10">Projects</h2>
      <Projects />
    </div>
  );
};

export default Home;
