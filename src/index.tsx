import classes from './index.module.css';
import  { Fragment, useState } from 'react';


export default  function App(): JSX.Element{

  const [operator, setOperator] = useState("");
  const [leftNumber, setLeftNumber] = useState(0);
  const [selectedNumber, setNumber] = useState("");
  const [equationString, setEquationString] = useState("");
  const [selectIndex, setIndex] = useState(0);
  const [calculatedNumber, setCalculatedNumber] = useState(0);
  const [indexMap, setIndexMap] = useState(new Array<number>());

  const OnClearDisplay = () : void => {
    setNumber("");
    setCalculatedNumber(0);
    setIndex(0);
    setIndexMap(new Array<number>());
    setOperator("");
    setEquationString("")
  }

  const OnRemoveNumber = () : void => {

    let updatedString = selectedNumber.substring(0, selectedNumber.length -1);
    setNumber(updatedString);

  }

  const OnSelectedNumber = (digit: string) : void =>{
     var updatedString = selectedNumber.concat(digit);   
     setEquationString(updatedString);
     if(digit.includes("+")
     || digit.includes("-") 
     || digit.includes("*")
     || digit.includes("/")
     )
     {
        let temp = selectIndex;
        let previousIndexMap = indexMap;
        let currentOperator = operator;
        let prevousNumber = leftNumber;
        let currentIndex = updatedString.indexOf(digit);
        previousIndexMap.push(currentIndex);
        setIndexMap(previousIndexMap);
        if(selectIndex === currentIndex)
        {
          currentIndex = updatedString.length - 1;
        }
        temp = temp === 0 ? temp : temp+1;
        let number = updatedString.slice(temp, currentIndex);
             
        if(number !== "0")
        {
          var addNumber : number = 0;
          switch(currentOperator)
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
          setCalculatedNumber(addNumber);
          setLeftNumber(addNumber); 
          setNumber(addNumber + digit);
          setIndex((addNumber + digit).indexOf(digit)); 
          setOperator(digit);        
        }

     }
     else if(digit.includes("="))
     {
        let isCalculationRequired : boolean = true;
        var calculatedNumber :number = 0;
        var updatedEquation : string  = "";

        if(equationString.includes("/"))
        {
          let index = equationString.indexOf("/");


          let leftNumber = equationString.substring(0, index);
          let rightNumber = equationString.substring(index + 1 , equationString.length);

          calculatedNumber = parseFloat(leftNumber) / parseFloat(rightNumber);
         
        }
        else if(equationString.includes("*"))
        {
          let index = equationString.indexOf("*");


          let leftNumber = equationString.substring(0, index);
          let rightNumber = equationString.substring(index + 1 , equationString.length);

          calculatedNumber = parseFloat(leftNumber) * parseFloat(rightNumber);
        }
        else if(equationString.includes("+"))
        {
          let index = equationString.indexOf("+");


          let leftNumber = equationString.substring(0, index);
          let rightNumber = equationString.substring(index + 1 , equationString.length);
          calculatedNumber = parseFloat(leftNumber) + parseFloat(rightNumber);
        }
        else if(equationString.includes("-"))
        {
          let index = equationString.indexOf("-");


          let leftNumber = equationString.substring(0, index);
          let rightNumber = equationString.substring(index + 1 , equationString.length);

          calculatedNumber = parseFloat(leftNumber) - parseFloat(rightNumber);
        }

        setCalculatedNumber(calculatedNumber);
     }
     else
     {
      setNumber(updatedString);
     }
  }

  return(
    <Fragment>
      <div className={classes.Header}>
          <h1>Calculator</h1>
      </div>
      <div className={classes.MainContainer}>
        <div className={classes.CalculatorDisplay}>
              <div>{selectedNumber}</div>
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
  



