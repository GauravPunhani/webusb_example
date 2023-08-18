import React from 'react';
import Usbcomponent from './Usbcomponent';
import Webinterface from './Webinterface';
import Serialcomponent from './Serialcomponent';
import { BrowserRouter as Router , Link, Routes, Route } from 'react-router-dom';
import './App.css'
function App() {
  

  return (
    <div >
      USB Device Barcode Reader APP<br/><br/>
      <Router>
        <div className="inline">
      
            <Link to="/usbdevices" className="padding" >Test Pure Usb Devices</Link>
            
            <Link to="/usbserialdevices" className="padding">Test Usb-Com Devices</Link>
        </div>
        <Routes>
          <Route path='/usbdevices' element={<Usbcomponent/>}></Route>
          
          <Route path='/usbserialdevices' element={<Serialcomponent/>}></Route>
       </Routes>
      </Router>      
    </div>
  );
}

export default App;
