import { Col, Row } from 'react-bootstrap';
import '../assets/css/sfDevComponent.css';
import sfDevChart from '../charts/sfDevChart';

const SfDevComponent = (props: any) => {
  const chartData = sfDevChart({ sfData: props.selectedBaseCourse });

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