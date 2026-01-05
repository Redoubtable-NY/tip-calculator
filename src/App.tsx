import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [currentCheck, setCurrentCheck] = useState("0")
  const [currentTip, setCurrentTip] = useState("0")
  const [selectedRadio, setSelectedRadio] = useState("Solo meal")
  const [showResult, setShowResult] = useState(false)
  const [tipAmount, setTipAmount] = useState("0")

  function roundToTwoDecimals(value: number){
    const factor = Math.pow(10, 2)
    return Math.round(value*factor) / factor
  }

  function handleChange(event:{target: HTMLInputElement}){
    setSelectedRadio(event.target.value)
  }

  function GeneratedResult(){
    return(
      <div className='generated-result'>
        <h2>Tip total</h2>
        <p>The "{selectedRadio}" final tip is shown below. To adjust the results, edit the form and reclick “Calculate tip".</p>
        <div id='tip-amount'>
          <p>Final tip</p>
          <p id="calculated-tip">${tipAmount}</p>
        </div>
      </div>
    )
  }

  function DefaultResult(){
    return(
      <div className='default-result'>
        <img src='/images/illustration-empty.svg' alt=""/>
        <h2>Final tip amount shown here</h2>
        <p>Complete the form and click “Calculate tip" to see what the tip should be.</p>
      </div>
    )
  }

  function handleReset(){
    setShowResult(false)
    setCurrentCheck("0")
    setCurrentTip("0")
  }

  function handleClick(){
    setShowResult(true)
    setTipAmount((!Number.isNaN(Number.parseInt(currentCheck)) && !Number.isNaN(Number.parseInt(currentTip)) ? roundToTwoDecimals(Number.parseInt(currentCheck) * ((Number.parseInt(currentTip))/100)).toFixed(2) : "0"))
  }

  return (
    <main>
      <section>
        <div id='headline-and-link'>
          <h1>Tip Calculator</h1>
          <button onClick={() => handleReset()}>Clear All</button>
        </div>
        <form>
          <label> Check total
            <div className='input-container'>
                <span>$</span><input 
                  maxLength={5}
                  type='number'
                  className='tip-related-entries'
                  value={currentCheck}
                  onChange={(e) => {setCurrentCheck((e.target.value))}}
                />
            </div>
          </label>
          <label> Tip percentage (whole numbers 1% - 99%)
            <div className='input-container'>
                <input 
                  maxLength={2}
                  type='number'
                  className='tip-related-entries'
                  value={currentTip}
                  onChange={(e) => setCurrentTip((e.target.value))}
                /><span>%</span>
            </div>
          </label> 
          <fieldset>
            <legend>Meal type</legend>
                <label htmlFor="Solo-meal" className='form-control'>
                  <input 
                    type="radio" 
                    id="Solo meal" 
                    value="Solo meal" 
                    name='meal type'
                    checked={selectedRadio === "Solo meal"}
                    onChange={(e) => handleChange(e)}/>
                  Solo meal
                </label>
                <label htmlFor="Group-meal" className='form-control'>
                  <input 
                    type="radio" 
                    id="Group meal" 
                    value="Group meal" 
                    name='meal type'
                    checked={selectedRadio === "Group meal"}
                    onChange={(e) => handleChange(e)}/>
                  Group meal
                </label>
          </fieldset>
          <button type='button' onClick={() => handleClick()}>
            <img src='/images/icon-calculator.svg'/>Calculate tip</button>
        </form>
      </section>
      <section className='results-container'>
        {showResult ? <GeneratedResult /> : <DefaultResult /> }
      </section>
    </main>
  )
}

export default App
