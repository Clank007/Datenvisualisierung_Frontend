import { Col, Row } from 'react-bootstrap';
import '../assets/css/sfDevComponent.css';
import sfDevChart from '../charts/sfDevChart';

const SfDevComponent = (props) => {
  const chartData = sfDevChart(props.selectedBaseCourse);

  return (
    <div className='sfDevContainer'>
      <Col>
        <Row className='sfDevChart pe-0'>
          {chartData}
        </Row>
      </Col>
    </div>
  );
};

export default SfDevComponent;