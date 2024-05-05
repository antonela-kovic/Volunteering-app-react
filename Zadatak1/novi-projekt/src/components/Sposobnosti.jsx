import { useState, useEffect } from 'react';
import "./Sposobnosti.css";

const SliderComponent = () => {
  const [detectiveValue, setDetectiveValue] = useState(100);
  const [skillsValue, setSkillsValue] = useState(90);
  const [jsValue, setJsValue] = useState(77);

  useEffect(() => {
  }, [detectiveValue, skillsValue, jsValue]);

  return (
    <article id="rcorners2">
      <h1 className="naslov1">Sposobnosti</h1>
      <hr />
      <h4 className="podnaslov2">Detektivske vjestine</h4>
      <div className="skill">
        <label htmlFor="detective"></label>
        <input
          type="range"
          id="detective"
          value={detectiveValue}
          onChange={(e) => setDetectiveValue(e.target.value)}
        />
        <span id="detectiveValue">{detectiveValue}%</span>
      </div>
      <h4 className="podnaslov2">Borilačke vještine</h4>
      <div className="skill">
        <label htmlFor="skills"></label>
        <input
          type="range"
          id="skills"
          value={skillsValue}
          onChange={(e) => setSkillsValue(e.target.value)}
        />
        <span id="skillsValue">{skillsValue}%</span>
      </div>
      <h4 className="podnaslov2">JavaScript</h4>
      <div className="skill">
        <label htmlFor="js"></label>
        <input
          type="range"
          id="js"
          value={jsValue}
          onChange={(e) => setJsValue(e.target.value)}
        />
        <span id="jsValue">{jsValue}%</span>
      </div>
    </article>
  );
};

export default SliderComponent;