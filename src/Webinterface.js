import React, { useState } from 'react'

const Webinterface = () => {
  const [validBarcode, setValidBarcode] = useState(false);
  const [barcodeChecked, setBarcodeChecked] = useState(false);
  function checkBarcodeValid(event){
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    for (let [key, value] of formData.entries()) {
      if(key === 'barcodeInput' && value == 99999){
        console.log("VALID");
      }else{
        console.log("invalid");
      }
    }
    setBarcodeChecked(true);
  }
  return (
    <div>
      <form onSubmit={checkBarcodeValid}>
        <input name="barcodeInput" type="text"></input>
        <button>Check valid barcode</button>
      </form>
    </div>
  )
}

export default Webinterface