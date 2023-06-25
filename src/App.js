import { useEffect, useState } from 'react';
import './App.css';
import { tenureData } from './Components/Constants';
import { numberWithCommas } from './Components/Config';

function App() {
  const [cost, setCost] = useState(0);
  const [intereset, setIntereset] = useState(0);
  const [fee, setFee] = useState(0);
  const [downpayment, setDownpayment] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (downpayment) => {
    if(!cost) return;
    const loanAmt = cost - downpayment;
    const rateOfInterest = intereset / 100;
    const numOfYears = tenure / 12;
    const EMI = (loanAmt * rateOfInterest * ( 1 + rateOfInterest ) ** numOfYears ) / (( 1 + rateOfInterest )** numOfYears - 1 );
    return Number(EMI / 12).toFixed(0)
  }



  const calculateDP = (emi) => {
    if(!cost) return;
    const downPymentPercent = 100 - (emi/calculateEMI(0)) * 100;
    return Number((downPymentPercent/100)*cost).toFixed(0)
  }

  useEffect(()=>{
    if(!(cost > 0)){
      setDownpayment(0);
      setEmi(0)
    }
    const emi = calculateEMI(downpayment);
    setEmi(emi)
  }, [tenure])

  const updateEmai = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownpayment(dp.toFixed(0));
    const emi = calculateEMI(dp);
    setEmi(emi);
  }

  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    const dp = calculateDP(emi);
    setDownpayment(dp);
  }


  return (
    <div className="App">
      <span className='title' style={{ fontSize: 30, marginTop: 10 }}>EMI Calculator Anuj Baba</span>
      <span className='title'>Total Cost of Asset</span>
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder='Total Cost of Assets'
      />

      <span className='title'>Interest Rate (in %)</span>
      <input
        type="number"
        value={intereset}
        onChange={(e) => setIntereset(e.target.value)}
        placeholder='Interest Rate (in %)'
      />

      <span className='title'>Processing Fee (in %)</span>
      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder='Processing Fee (in %)'
      />

      <span className='title'>Down Payment</span>
      <span className='title' style={{textDecoration: "underLine" }}>Total Down Payment -{" "}
        {numberWithCommas((Number(downpayment) + (cost - downpayment) * (fee / 100)).toFixed(0))}
      </span>
      <div>
        <input
          type="range"
          min={0}
          max={cost}
          className='slider'
          value={downpayment}
          onChange={updateEmai}
        />
        <div className="lables">
          <label>0%</label>
          <b>{numberWithCommas(downpayment)}</b>
          <label>100%</label>
        </div>
      </div>

      <span className='title'>Loan per Month</span>
      <span className='title' style={{textDecoration: "underLine" }}>Total Loan Amount -{" "}
        {numberWithCommas((emi * tenure).toFixed(0))}
      </span>
      <div>
        <input
          type="range"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          className='slider'
          value={emi}
          onChange={updateDownPayment}
        />
        <div className="lables">
          <label>{numberWithCommas(calculateEMI(cost))}</label>
          <b>{numberWithCommas(emi)}</b>
          <label>{numberWithCommas(calculateEMI(0))}</label>
        </div>
      </div>

      <span className='title'>Tenure</span>
      <div className='tenureContainer'>  
      {tenureData.map((t) => {
        return (
          <button className={`tenure ${t === tenure ? 'selected' : ''}`} onClick={() => setTenure(t)}>{t}</button>
        )

      })}
      </div>
      
    </div>
  );
}

export default App;
