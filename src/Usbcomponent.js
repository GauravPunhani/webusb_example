import React, { useState }  from 'react'

const Usbcomponent = () => {
    const [receivedData, setReceivedData] = useState('');

  const connectToDevice = async () => {
    try {
      const device = await navigator.usb.requestDevice({ filters: [] });
      console.log("productid: "+ device.productId);
      console.log("vendorid: "+ device.vendorId);
      console.log(device.manufacturerName);
      await device.open();
      await device.releaseInterface(0);
      await device.claimInterface(1);
      const endpointIn = 2; // Adjust endpoint number
      const result = await device.transferIn(endpointIn, 64);
      const data = result.data;

      setReceivedData(data);
      
      await device.releaseInterface(0);
      await device.close();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
        <h1>WebUSB Example</h1>
      <button onClick={connectToDevice}>Connect and Read</button>
      <div>
        <h2>Received Data:</h2>
        <pre>{receivedData ? JSON.stringify([...receivedData], null, 2) : 'No data received'}</pre>
      </div>
    </div>
  )
}

export default Usbcomponent