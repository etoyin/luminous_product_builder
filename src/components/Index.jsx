import React, { useEffect, useState } from 'react'
import Form from './Form';


function Index() {
  // let body = document.getElementsByTagName("body");
  const[itemRemove, setItemRemove] = useState(true);
  const [currentDragId, setCurrentDragId] = useState("");
  const [currentRemoveDragId, setCurrentRemoveDragId] = useState("");

  const[showForm, setShowForm] = useState(false)

  const [panelCounter, setPanelCounter] = useState(0);
  const [inverterCounter, setInverterCounter] = useState(0);
  const [batteryCounter, setBatteryCounter] = useState(0);

  const handleDragStart = (e) => {
    setCurrentDragId(e.target.getAttribute("data-id"));
    setItemRemove(false);
    console.log(e.target.getAttribute("data-id"));
    console.log(inverterCounter);
      console.log(panelCounter);
      console.log(batteryCounter);
  }

  // This function is for when you are removing from the drop zone
  const handleDropDragStart = (e) => {
    setCurrentRemoveDragId(e.target.getAttribute("data-id"))
    console.log(e.target.getAttribute("data-id"));
    // setDropDepth(2);
    setItemRemove(true);
    // console.log(itemRemove);
  }

  const handleDragEnter = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    // setDropDepth(dropDepth + 1);
    // console.log(dropDepth);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e.target.className)
    if ( e.target.getAttribute("data-id") == "drop-target" ) {
      console.log(inverterCounter);
      console.log(panelCounter);
      console.log(batteryCounter);
      // document.getElementById("demo").innerHTML = "Left the dropzone";
      console.log("left");
      if(currentRemoveDragId == "panel"){
        setPanelCounter(panelCounter < 0 ? 0 : panelCounter - 1);
      }
      if(currentRemoveDragId== "battery"){
        setBatteryCounter(batteryCounter < 0 ? 0 : batteryCounter - 1)
      }
      if(currentRemoveDragId == "inverter"){
        setInverterCounter(inverterCounter < 0 ? 0 : inverterCounter - 1);
      }
    }
    // setMouseLeave(true);
    // setDropDepth(dropDepth - 1);
    
  }
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("hhhhhhhhhh")
  }

  const handleDrop = (e) => {
    // console.log(e.target);
    if(!itemRemove){
      if(currentDragId == "panel"){
        // setShowPanel(true);
        setPanelCounter(panelCounter + 1);
      }
      if(currentDragId == "battery"){
        // setShowBattery(true);
        setBatteryCounter(batteryCounter + 1);
      }
      if(currentDragId == "inverter"){
        // setShowInverter(true);
        setInverterCounter(inverterCounter + 1);
      }
    }
  }

  const managebattery = (i) => {
    setBatteryCounter(batteryCounter + i);
    console.log(batteryCounter);
  }
  const managePanel = (i) => {
    setPanelCounter(panelCounter + i);
  }
  const manageInverter = (i) => {
    setInverterCounter(inverterCounter + i);
  }

  const handleClick = () => {
    if((panelCounter + inverterCounter + batteryCounter) > 0 ){
      setShowForm(true);
    }
    else{
      alert("You need to pick at least one component to Request A Quote")
    }
  }
  const close = () => {
    setShowForm(false);
  }

  const handleDragEnd = () => {
    // console.log("dragging Ends.....")
  }
  return (
  
    <div className="w-full mt-10">
      {
        showForm &&
        <Form close={close} counters={{panelCounter, inverterCounter, batteryCounter}} />
      }

      <main>
        <div className="flex flex-wrap ">
          <div className="drag-items w-full lg:w-1/3 px-10">
              <h2 className="text-2xl uppercase mb-2 font-semibold">Our products</h2>
              <p className="text-sm">You can choose for the product below or combine any two or more products and see the configuration</p>
              <div className=" flex flex-wrap sm:flex-no-wrap lg:flex-wrap  ">
                <div className="w-32 md:w-40 h-40 p-1 flex justify-between items-center shadow-lg m-2">
                  <button 
                    onClick={() => {managePanel(-1)}}
                    className="border border-gray-300 text-center"
                    disabled={panelCounter < 1}>
                      <i className="text-lg las la-minus"></i>
                  </button>
                  <div className="w-24">
                    <img src="img/panel.png" onDragEnd={handleDragEnd} onDragStart={handleDragStart} data-id="panel" className='w-full' alt="" srcset="" draggable="true"/>
                    <p className="text-center text-xs font-semibold">545W Solar Panel</p>
                  </div>
                  <button
                    onClick={() => {managePanel(1)}} 
                    className="border cursor-pointer border-gray-300 text-center"><i className="text-lg las la-plus"></i>
                  </button>
                </div>
                <div className="w-30 md:w-36 h-40 flex justify-between items-center shadow-lg m-2">
                  <button 
                    onClick={() => {manageInverter(-1)}} 
                    disabled={inverterCounter < 1}
                    className="border border-gray-300 text-center"><i className="text-lg las la-minus"></i>
                  </button>
                  <div className="w-24">
                    <img src="img/inverter2.png" onDragStart={handleDragStart} data-id="inverter" className='w-full' alt="" srcset="" draggable="true"/>
                    <p className="text-center relative -top-2 text-xs font-semibold">Arnergy 5kVA Inverter</p>
                  </div>
                  <button 
                    onClick={() => {manageInverter(1)}}
                    className="border cursor-pointer border-gray-300 text-center"><i className="text-lg las la-plus"></i>
                  </button>
                </div>
                <div className="w-32 md:w-40 h-40 flex justify-between items-center shadow-lg m-2">
                  <button 
                    onClick={() => {managebattery(-1)}}
                    disabled={batteryCounter < 1}
                    className="border cursor-pointer border-gray-300 text-center"><i className="text-lg las la-minus"></i></button>
                  <div className="w-24">
                    <img src="img/battery2.png" onDragStart={handleDragStart} data-id="battery" className='w-full' alt="" srcset="" draggable="true"/>
                    <p className="text-center text-xs font-semibold">Arnergy 5.12kWh Battery</p>
                  </div>
                  <button 
                    onClick={() => {managebattery(1)}}
                    className="border cursor-pointer border-gray-300 text-center"><i className="text-lg las la-plus"></i></button>
                </div>
              </div>
          </div>
          <div className="flex flex-wrap w-full lg:w-2/3 p-5">
            <div 
              onDrop={e => handleDrop(e)}
              onDragOver={e => handleDragOver(e)}
              onDragEnter={e => handleDragEnter(e)}
              onDragLeave={e => handleDragLeave(e)}
              data-id="drop-target"
              className="flex justify-center items-center h-96 p-10 w-full md:w-7/12 border border-gray-300 rounded-xl shadow-xl">
              {/* <p className='text-4xl uppercase text-gray-200'>Drop Items Here</p> */}
              {
                inverterCounter > 0 && 
                <>
                  <p className="relative text-sm -right-32 font-semibold -top-10 sm:-top-20 z-5">
                    5kVA X <span className='text-red-600'>{inverterCounter}</span>
                  </p>
                  <img src="img/inverter2.png" 
                    data-id="inverter" 
                    onDragStart={handleDropDragStart}
                    className={`w-24 sm:w-32 relative top-16 ${panelCounter > 0 ? 'left-20': ""} z-5`} alt="" srcset="" />
                </>
              }
              {
                panelCounter > 0 &&
                <>
                  <img src="img/panel.png" 
                    data-id="panel" 
                    onDragStart={handleDropDragStart}
                    className='relative left-5 top-2 w-48 sm:w-56' alt="" srcset="" />
                  <p className="relative text-sm font-semibold break-keep -top-28 -left-10 z-5">
                    545W X <span className='text-red-600'>{panelCounter}</span>
                  </p>
                </>
              }
              {
                batteryCounter > 0 &&
                <>
                  <img src="img/battery2.png" 
                    data-id="battery" 
                    onDragStart={handleDropDragStart}
                    className={`w-20 sm:w-28 relative top-20 ${panelCounter > 0 ? "right-24": ""}`} alt="" srcset=""/>
                    <p className={`relative text-sm font-semibold z-5 ${panelCounter > 0 ? "-left-32": "-left-24"}`}>
                      5.12kWh X <span className='text-red-600'>{batteryCounter}</span>
                    </p>
                </>
              }
            </div>
            <div className="result-items p-5 w-full md:w-5/12">
              <div className="p-2 rounded-lg ">
                <div className="sys my-2 text-base ">
                  <span className="">Hybrid Inverter Capacity:</span>
                  <span className="text-blue-600 font-semibold"> {inverterCounter * 5}kVA</span>
                </div>
                <div className="sys my-2 text-base">
                  <span className=" ">Solar Panel Capactiy:</span>
                  <span className="text-green-600 font-semibold"> {Math.round(((panelCounter * 545/1000) + Number.EPSILON) * 100) / 100}kWp</span>
                </div>
                <div className="sys my-2 text-base">
                  <span className=" ">Battery Backup Capacity:</span>
                  <span className="text-red-600 font-semibold"> {Math.round(batteryCounter * 5.12)}hours</span>
                </div>
              </div>
              {/* <div className='w-full bg-black h-1' /> */}
              <hr className='my-2'/>
              <div className="p-2 rounded-lg">
                <div className="sys my-2 text-base ">
                  <span className="">Max. Load You Can Connect:</span>
                  <span className="text-blue-600 font-semibold"> {inverterCounter * 5 * 0.8}kVA</span>
                </div>
                <div className="sys my-2 text-base">
                  <span className=" ">Your Daily Power Generation (from PV):</span>
                  <span className="text-green-600 font-semibold"> {Math.round(((panelCounter * 3.5 * 0.75 * 545/1000) + Number.EPSILON) * 100) / 100}kW/Day</span>
                </div>
                <div className="sys my-2 text-base">
                  <span className="">Your Backup time (with 1kW load):</span>
                  <span className="text-red-600 font-semibold"> {Math.round(batteryCounter * 5.12 / 1)}hours</span>
                </div>
                <div className="sys my-2 text-base">
                  <span className="">Your Backup time (with 3kW load):</span>
                  <span className="text-red-600 font-semibold"> {Math.round(batteryCounter * 5.12 / 3)}hours</span>
                </div>
                <div className="sys my-2 text-base">
                  <span className="">Your Backup time (with 5kW load):</span>
                  <span className="text-red-600 font-semibold"> {Math.round(batteryCounter * 5.12 / 5)}hours</span>
                </div>
                <div className="sys my-2 text-base">
                  <span className="">Your Backup time (with 10kW load):</span>
                  <span className="text-red-600 font-semibold"> {
                    (batteryCounter * 5.12 / 10) >= 1 ?
                    Math.round(batteryCounter * 5.12 / 10) + "hours"
                    :
                    Math.round(batteryCounter * 5.12 * 60 / 10) + "mins"
                    }</span>
                </div>
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={handleClick}
                  className="bg-blue-600 w-48 rounded-lg shadow-xl border text-white p-2">Request A Quote</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Index
