import FAQDictionary from "../util/FAQDictionary";
import { Accordion } from "react-bootstrap";

const FAQEntries = () => {
    function parseBody(entry) {
        let body = (entry.long.length == 0) ? entry.short : entry.long;
        if (entry.links.length != 0) {
            body += `<br>` + `<a href="${entry.link}">Weitere Informationen</a>`;
        }
        return body;
    }

    return (
        <Accordion alwaysOpen flush className="rounded-accordion ps-2">
            {FAQDictionary.map((entry, index) => (
                <Accordion.Item key={index} eventKey={index} className="rounded-accordion">
                    <Accordion.Header>{entry.name}</Accordion.Header>
                    <Accordion.Body>{parseBody(entry)}</Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
  );
}

export default FAQEntries;