import Title from "../components/Title";

const About = () => {
  return (
    <>
      <Title />
      <div className="mt-10">
        <div>
          <h1 className="text-2xl mb-5">Motivation</h1>
          <h2 className="text-xl mb-2">Empathy</h2>
          <p className="text-xl mb-10">
            Emphasis is the most essential part of my motivation. If I found
            "ontological design" to be a first, it makes me much more certain of
            it. There are many taken for granted for invisible existence. I
            would like to interact with them with empathy and corperate them to
            make a more comfortable society. I will not stick to "specific
            means". I'll always give priority to solving problems. However,
            because of my academic background, I have an interest in
            human-digital interaction. I have broad interests in interface
            design, so it would be great if I could help you with my design and
            front-end development skills!
          </p>
        </div>
        <div>
          <h1 className="text-2xl mb-5">Skills</h1>
          <p className="mt-3">
            I own basic skills using below them ,and am an autonomous
            self-learner.
          </p>
          <h3 className="mt-2">Tech skillset</h3>
          <ul>
            <li>Figma / Adobe XD</li>
            <li>CSS / HTML</li>
            <li>Typescript / Javascript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Git</li>
          </ul>
          <h3 className="mt-2">Others</h3>
          <ul>
            <li>Japanese (NativeLevel)</li>
            <li>English (Conversational Level)</li>
            <li>Facilitate discussions</li>
            <li>Qualitative analysis for user interface and experience</li>
          </ul>
        </div>
        {/* <div>
          <h1 className="text-2xl mb-10">Timeline</h1>
        </div> */}
      </div>
    </>
  );
};

export default About;
