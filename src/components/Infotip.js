import { BsExclamationTriangleFill, BsInfoCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { OperationCanceledException } from "typescript";

const Infotip = ({entry, type}) => {
    const navigate = useNavigate();
    const navigateToGlossar = () => {
        navigate("/admin/glossar", {state: { openAccordion: entry.name} });
    }

    const htmlContent = `<b>${entry.name}</b><br/>${entry.short}`;

    return (
        <div>
        <a data-tooltip-id={String(entry.name)}
           data-tooltip-html={htmlContent}
           onClick={navigateToGlossar}
        >
            {(type == "info") ? <BsInfoCircleFill/> : <BsExclamationTriangleFill/>}
        </a>
        <Tooltip style={{zIndex: "1000"}} id={String(entry.name)}/>
        </div>
    )
}

export default Infotip;