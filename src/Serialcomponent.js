import React, { useState } from 'react'

const Serialcomponent = () => {
    const [receivedData, setReceivedData] = useState('');
    const [resultStatus, setResultStatus] = useState('');
    const [actualData, setActualData] = useState('');
    const textDecoder = new TextDecoderStream();
    let reader = textDecoder.readable.getReader();
    let keepReading = true;
    let readableStreamClosed;
    let port;
    async function sendDataBackToSerialPort(result) {
        const textEncoder = new TextEncoderStream();
        const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        const writer = textEncoder.writable.getWriter();
        await writer.write(result);
        await writableStreamClosed;
        writer.releaseLock();
    }
    const setActualDataFromValue = async (data) => {
        
        console.log("data received is " + data);
        const dataArray = data.split(' ');
        let actualDataInArray = dataArray[1];
        actualDataInArray = actualDataInArray.replace(/\r?\n|\r/, "");

        let expectedData = "http://TEST-MOD-DELHI-GURGAON";
        if (actualDataInArray == expectedData) {
            setResultStatus('PASS');
        } else {
            setResultStatus('FAILED');
        }
        
        console.log(resultStatus);
        setActualData(actualDataInArray);
        setReceivedData(data);
        //reader.cancel();
        //await readableStreamClosed.catch(() => { /* Ignore the error */ });
        //await sendDataBackToSerialPort(resultStatus);
    }
    const readUntilClosed = async () => {
        const usbVendorId = 0x05F9;
        port = await navigator.serial.requestPort({ filters: [{ usbVendorId }] });
        await port.open({ baudRate: 9600 });
        while (port.readable && keepReading) {
            readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {
                        console.log("unlocking reader");
                        break;
                    }
                    setTimeout(()=>{
                        if(value){
                            setActualDataFromValue(value);
                        }
                    },1000);
                   
                    
                }

            }
            catch (error) {
                console.error('Error:', error);
                reader.cancel();
                await readableStreamClosed.catch(() => { /* Ignore the error */ });
            } finally {
                reader.releaseLock();
            }
        }
        await port.close();
    }
    const closeConnection = async () => {
        keepReading = false;
        reader.cancel();
    }
    return (
        <>
            <h1>Usb-Com3 Barcode Reader </h1>
            <button onClick={readUntilClosed}>Connect and Read</button>
            <button onClick={closeConnection}>Close-Connection</button>
            <div>
                <h2>Received Data:</h2>
                <pre>{receivedData ? receivedData : 'No data received'}</pre>
                <h2>Actual Data:</h2>
                <pre>{actualData ? actualData : 'No data received'}</pre>
                <h2>RESULT: </h2>
                <b><pre style={{ color: 'GREEN' }}>{resultStatus ? resultStatus : 'No RESULT'}</pre></b>
            </div>
        </>
    )
}

export default Serialcomponent