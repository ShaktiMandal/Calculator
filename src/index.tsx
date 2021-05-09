import classes from './index.module.css';
import  { Fragment, useState } from 'react';
import ReactDOM from 'react-dom'


export default  function App(): JSX.Element{

  const [operator, setOperator] = useState("");
  const [leftNumber, setLeftNumber] = useState(0);
  const [eqution, SetEquation] = useState("");
  const [equationString, setEquationString] = useState("");
  const [selectIndex, setIndex] = useState(0);
  const [calculatedNumber, setCalculatedNumber] = useState(0);

  const OnClearDisplay = () : void => {
    SetEquation("");
    setCalculatedNumber(0);
    setIndex(0);
    setOperator("");
    setEquationString("")
  }

  const OnRemoveNumber = () : void => {

    let updatedString = eqution.substring(0, eqution.length -1);
    SetEquation(updatedString);

  }

  const OnSelectedNumber = (digit: string) : void =>{
     var updatedEquation = eqution.concat(digit);   
     setEquationString(updatedEquation);

     if(digit.includes("+")|| digit.includes("-") || digit.includes("*")|| digit.includes("/"))
     {        
          var addNumber : number = GetEuqationResult(updatedEquation, digit);
          setCalculatedNumber(addNumber);
          setLeftNumber(addNumber); 
          SetEquation(addNumber + digit);
          setIndex((addNumber + digit).indexOf(digit)); 
          setOperator(digit);
     }
     else if(digit.includes("="))
     {
        let operation = GetOperation();
        if(operation !== "")
        {
            PerformOperation(operation);
        }
     }
     else
     {
        SetEquation(updatedEquation);
     }
  }

  const GetEuqationResult = (updatedEquation: string, digit: string) :number =>{

      let addNumber : number = 0;
      let temp = selectIndex;
      let currentOperator = operator;
      let prevousNumber = leftNumber;
      let currentIndex = updatedEquation.indexOf(digit);
      if(selectIndex === currentIndex)
      {
        currentIndex = updatedEquation.length - 1;
      }
      temp = temp === 0 ? temp : temp+1;
      let number = updatedEquation.slice(temp, currentIndex);

      switch(operator)
      {
          case "+":
            {
              addNumber = prevousNumber + parseFloat(number);
              break;
            }
          case "-":
            {
              addNumber = prevousNumber - parseFloat(number);
              break;
            }
          case "*":
            {
              addNumber = prevousNumber * parseFloat(number);
              break;
            }
          case "/":
            {
              addNumber = prevousNumber / parseFloat(number);
              break;
            }
          default:
            {
              addNumber = addNumber + parseFloat(number);
            }
      }

      return addNumber;
  }

  const GetOperation = () : string => {

        if(equationString.includes("/"))
        {
          return "/";
        }

        if(equationString.includes("*"))
        {
          return "*";
        }

        if(equationString.includes("+"))
        {
          return "+";
        }

        if(equationString.includes("-"))
        {
          return "-";
        }

        return "";
  }

  const PerformOperation = (digit: string):void =>{

      let calculatedNumber :number = 0;
      let index = equationString.indexOf(digit);
      let leftNumber = equationString.substring(0, index);
      let rightNumber = equationString.substring(index + 1 , equationString.length);

      switch(digit)
      {
          case "/":
          {
            calculatedNumber = parseFloat(leftNumber) / parseFloat(rightNumber);
            break;
          }
          case "*":
          {
            calculatedNumber = parseFloat(leftNumber) * parseFloat(rightNumber);
            break;
          }
          case "+":
          {
            calculatedNumber = parseFloat(leftNumber) + parseFloat(rightNumber);
            break;
          }
          case "-":
          {
            calculatedNumber = parseFloat(leftNumber) - parseFloat(rightNumber);
            break;
          }
      };     
      setCalculatedNumber(calculatedNumber);
  }

  return(
    <Fragment>
      <div className={classes.Header}>
          <h1>Calculator</h1>
      </div>
      <div className={classes.MainContainer}>
        <div className={classes.CalculatorDisplay}>
              <div>{eqution}</div>
              <div>{calculatedNumber}</div>
        </div>
        <div className={classes.KeypadArea}>

                  <div  className= {classes.ActionArea}>
                    <div onClick={()=> OnClearDisplay()}>Clear</div>
                    <div onClick ={() => OnRemoveNumber()}>Remove</div>
                  </div>
                  <div  className= {classes.ContainerRow}>
                   <div onClick={() => OnSelectedNumber("9")} className = {classes.ContainerRowDiv}>9</div>
                   <div onClick={() => OnSelectedNumber("8")} className = {classes.ContainerRowDiv}>8</div>
                   <div onClick={() => OnSelectedNumber("7")} className = {classes.ContainerRowDiv}>7</div>
                   <div onClick={() => OnSelectedNumber("6")} className = {classes.ContainerRowDiv}>6</div>
                  </div>
                  <div className= {classes.ContainerRow}> 
                    <div onClick={() => OnSelectedNumber("5")} className={classes.ContainerRowDiv}>5</div>
                    <div onClick={() => OnSelectedNumber("4")} className={classes.ContainerRowDiv}>4</div>
                    <div onClick={() => OnSelectedNumber("3")} className={classes.ContainerRowDiv}>3</div>
                    <div onClick={() => OnSelectedNumber("2")} className={classes.ContainerRowDiv}>2</div>
                    </div>
                  <div className= {classes.ContainerRow}>
                    <div onClick={() => OnSelectedNumber("1")} className={classes.ContainerRowDiv}>1</div>
                    <div onClick={() => OnSelectedNumber("0")} className={classes.ContainerRowDiv}>0</div>
                    <div onClick={() => OnSelectedNumber("+")} className={classes.ContainerRowDiv}>+</div>
                    <div onClick={() => OnSelectedNumber("-")} className={classes.ContainerRowDiv}>-</div>
                  
                  </div>
                  <div className= {classes.ContainerRow}>
                    <div onClick={() => OnSelectedNumber("*")} className={classes.ContainerRowDiv}>*</div>
                    <div onClick={() => OnSelectedNumber("/")} className={classes.ContainerRowDiv}>/</div>
                    <div onClick={() => OnSelectedNumber("=")} className={classes.ContainerRowDiv}>=</div>
                    <div onClick={() => OnSelectedNumber(".")} className={classes.ContainerRowDiv}>.</div>
                  </div>

        </div>
      </div>
    </Fragment>   
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
  



