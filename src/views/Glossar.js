import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import '../assets/css/glossar.css';
import FAQDictionary from "../util/FAQDictionary";
import { useLocation } from 'react-router-dom';

const Glossar = () => {
  const location = useLocation();
  const { openAccordion } = location.state || {};
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    // Find the index of the accordion item that should be open
    const openIndex = Object.values(FAQDictionary).findIndex(entry => entry.name === openAccordion);
    if (openIndex !== -1) {
      setActiveKey(`${openIndex}`); // Ensure the key is in the correct format (string if necessary)
    }
  }, [openAccordion]);

  return (
    <Accordion flush className="rounded-accordion ps-2" activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
      {(Object.values(FAQDictionary)).map((entry, index) => (
        <Accordion.Item key={index} eventKey={`${index}`} className="rounded-accordion">
          <Accordion.Header>{entry.name}</Accordion.Header>
          <Accordion.Body>
            {(entry.long.length === 0) ? entry.short : entry.long}
            {(entry.link.length !== 0) ? <><br /><a href={entry.link}>Weitere Informationen</a></> : ""}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default Glossar;