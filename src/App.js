import React, { useState } from 'react';

function App() {
  const [receivedData, setReceivedData] = useState('');

  const connectToDevice = async () => {
    try {
      const device = await navigator.usb.requestDevice({ filters: [] });
      await device.open();
      await device.claimInterface(0);
      console.log("hello");
      const endpointIn = 1; // Adjust endpoint number
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
    <div className="App">
      <h1>WebUSB Example</h1>
      <button onClick={connectToDevice}>Connect and Read</button>
      <div>
        <h2>Received Data:</h2>
        <pre>{receivedData ? JSON.stringify([...receivedData], null, 2) : 'No data received'}</pre>
      </div>
    </div>
  );
}

export default App;
