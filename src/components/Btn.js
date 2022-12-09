import '../App.css';
import { Col, Button } from 'antd'

function Btn(props) {
  
  return (
    <Col span={props.width}>
        <Button className="button" onClick={props.function}>{props.value}</Button>
    </Col>
  );
}

export default Btn;