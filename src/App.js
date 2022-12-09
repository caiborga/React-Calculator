/*
+++ Comments: +++
Input: 
  - operand (Buttons and Input field -> to enable keyboard entry) -> "numbers" only for mathjs.evaluate
  - operator (Buttons) 

Output: 
  - result of two operands and specific operator (result div)

Misc.:
  - formulaIsSet avoids additional "0" after clicking "B=" repeatedly

*/

//Styling
import './App.css';

//Functions / Libraries
import { useState } from 'react';
import { Row, Col, Input } from 'antd';
import { evaluate, sqrt, pi } from 'mathjs';

//Components
import Btn from './components/Btn.js';



function App() {

  const [result, setResult] = useState("0")
  const [operand, setOperand] = useState("0")
  const [formulaIsSet, setFormulaIsSet] = useState(false)

  function handleChange (event) {
    setOperand(String(event.target.value))
  }

  function changeOperand(value){
    if (operand === "0"){
      setOperand(value)
    }else{
      setOperand(operand + value)
    }
  }

  function changeResult(operator){
    // Set result as "formula"
    if (operator !== "=" && result === "0"){
      let formula = operand + " " + operator
      setFormulaIsSet(true)
      setResult(formula)
      setOperand("0")
    }else{
      switch(operator){
        case '+':
          setResult(String(parseFloat(result) + parseFloat(operand)))
          setOperand("0")
          return
        case '-':
          setResult(String(parseFloat(result) - parseFloat(operand)))
          setOperand("0")
          return
        case '*':
          setResult(String(parseFloat(result) * parseFloat(operand)))
          setOperand("0")
          return 
        case '/':
          setResult(String(parseFloat(result) / parseFloat(operand)))
          setOperand("0")
          return
        case '=':
          if (formulaIsSet){
            setResult(evaluate(result+operand))
            setOperand("0")
            setFormulaIsSet(false)
          }
          return
        default:
          return
      }
    }
  }

  function plusMinusChange(){
    setOperand(operand * -1)
  }

  function square(){
    setOperand(String(operand*operand))
  }

  function squareRoot() {
    if(operand < 0){
      setOperand("0")
      alert("Impossible to determine root of negative value")
    }else{
      setOperand(String(sqrt(operand)))
    }
  }

  return (
  <div>

    <header><br></br></header>

    <div key="wrapper" className="wrapper">
      <Row>
        <Col span={24}>
          <div key="DResult" className="result">{result}</div>
        </Col>
      </Row>
      
      <Row>
        <Col span={24}>
          <Input key="IInput" className="input" type="number" value={operand} onChange={(event)=>handleChange(event)} />
        </Col>
      </Row>
      
      <Row align="end">
        <Btn key="Bpi"value="π" width="8" function={()=>changeOperand(pi)}/>
        <Btn key="B7" value="7" width="4" function={()=>changeOperand("7")}/>
        <Btn key="B8" value="8" width="4" function={()=>changeOperand("8")}/>
        <Btn key="B9" value="9" width="4" function={()=>changeOperand("9")}/>
        <Btn key="B/" value="/" width="4" function={()=>changeResult("/")}/>
      </Row>

      <Row align="end">
        <Btn key="B+-" value="+/-" width="8" function={()=>plusMinusChange()}/>
        <Btn key="B4" value="4" width="4" function={()=>changeOperand("4")}/>
        <Btn key="B5" value="5" width="4" function={()=>changeOperand("5")}/>
        <Btn key="B6" value="6" width="4" function={()=>changeOperand("6")}/>
        <Btn key="B*"value="*" width="4" function={()=>changeResult("*")}/>
      </Row>

      <Row align="end">
        <Btn key="Bx2" value="x²" width="8" function={()=>square()}/>
        <Btn key="B1" value="1" width="4" function={()=>changeOperand("1")}/>
        <Btn key="B2" value="2" width="4" function={()=>changeOperand("2")}/>
        <Btn key="B3" value="3" width="4" function={()=>changeOperand("3")}/>
        <Btn key="B-"value="-" width="4" function={()=>changeResult("-")}/>
        
      </Row>

      <Row align="end">
        <Btn key="Bsqrt" value="√" width="8" function={()=>squareRoot()}/>
        <Btn key="BCE" value="CE" width="4" function={()=>setOperand("0")}/>
        <Btn key="B0" value="0" width="4" function={()=>changeOperand("0")}/>
        <Btn key="BC" value="C" width="4" function={()=>{setOperand("0"); setResult("0")}}/>
        <Btn key="B+" value="+" width="4" function={()=>changeResult("+")}/>
      </Row>

      <Row align="end">
        <Btn key="B=" value="=" width="16" function={()=>changeResult("=")}/>
      </Row>
    </div>

  </div>
  );
}

export default App;
