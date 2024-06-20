import Accordion from 'react-bootstrap/Accordion';
import '../assets/css/glossar.css';
import FAQDictionary from "../util/FAQDictionary";

const Glossar = () => {
  return (
    <Accordion flush className="rounded-accordion ps-2">
      {(Object.values(FAQDictionary)).map((entry, index) => (
                <Accordion.Item key={index} eventKey={index} className="rounded-accordion">
                    <Accordion.Header>{entry.name}</Accordion.Header>
                    <Accordion.Body>
                      {(entry.long.length == 0) ? entry.short : entry.long}
                      {(entry.link.length != 0) ? <><br /><a href={entry.link}>Weitere Informationen</a></> : ""}
                    </Accordion.Body>
                </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default Glossar;