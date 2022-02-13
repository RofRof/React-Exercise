import { useRef, useState } from 'react'
import '../styles/calculator.css'

function Calculator() {
  const add1 = useRef()
  const add2 = useRef()
  const add3 = useRef()

  const [sum, setSum] = useState()

  const add = (num1, num2, num3) => {
    const array = [num1, num2, num3]
    const isEmpty = (currentVal) => currentVal !== ""
    const checkParams = array.every(isEmpty)
  
    if(checkParams === true) {
      
      if(!isNaN(parseInt(num1)) || !isNaN(parseInt(num2)) || isNaN(parseInt(num3))) {
        setSum(parseInt(num1) + parseInt(num2) + parseInt(num3))
      }
    }
    else if(!isNaN(parseInt(num1) && !isNaN(parseInt(num2)))){
      setSum(`${num1}, ${num2}`)
    }
    else if(!isNaN(parseInt(num1))) {
      setSum(num1)
    }
    
    // if(checkParams === false){
    //   setSum(`${num1}, ${num2}, ${num3}`)
    // }
    
  }

  return (
    <div className="calculator">
      <div>
        <label>Parameter 1:</label>
        <input type="text" ref={add1}/>
      </div>
      <div>
        <label>Parameter 2:</label>
        <input type="text" ref={add2}/>
      </div>
      <div>
        <label>Parameter 3:</label>
        <input type="text" ref={add3}/>
      </div>
      <div>
        <input type="submit" value="Add" onClick={() => add(add1.current.value, add2.current.value, add3.current.value)}/>
      </div>
      <div>
        <p>={sum}</p>
      </div>
    </div>
  );
}

export default Calculator;
