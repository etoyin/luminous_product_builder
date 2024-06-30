import React, { useEffect, useState } from 'react'


function Index() {
  // let body = document.getElementsByTagName("body");
  const [showPanel, setShowPanel] = useState(false);
  const [showInverter, setShowInverter] = useState(false);
  const [showBattery, setShowBattery] = useState(false);

  const[itemRemove, setItemRemove] = useState(true);
  const [currentDragId, setCurrentDragId] = useState("");
  const [currentRemoveDragId, setCurrentRemoveDragId] = useState("");

  // const[dropDepth, setDropDepth] = useState(0)

  const [panelCounter, setPanelCounter] = useState(0);
  const [inverterCounter, setInverterCounter] = useState(0);
  const [batteryCounter, setBatteryCounter] = useState(0);

//   useEffect(() => {
//     if(dropDepth <= 1 && mouseLeave){
//       console.log("Dropdepth less than or equal to 1");
//     }
//  }, [dropDepth]);

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
        setShowPanel(true);
        setPanelCounter(panelCounter + 1);
      }
      if(currentDragId == "battery"){
        setShowBattery(true);
        setBatteryCounter(batteryCounter + 1);
      }
      if(currentDragId == "inverter"){
        setShowInverter(true);
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

  const handleDragEnd = () => {
    // console.log("dragging Ends.....")
  }
  return (
    <div>
      <div className="">
        <header className='my-10'>
          <div className="w-56 text-center mx-auto">
            <img className='w-full' src="/img/luminous.png" alt="Luminous Logo" />
            <span className="uppercase mx-auto text-xl text-center">product builder</span>
          </div>
          
        </header>
        <main>
          <div className="flex flex-wrap ">
            <div className="drag-items w-full md:w-1/3 px-10">
                <h2 className="text-2xl uppercase mb-2 font-semibold">Our products</h2>
                <p className="text-sm">You can choose for the product below or combine any two or more products and see the configuration</p>
                <div className=" flex flex-wrap ">
                  <div className="w-40 h-40 p-1 flex justify-between items-center shadow-lg m-2">
                    <button 
                      onClick={() => {managePanel(-1)}}
                      className="border border-gray-300 text-center"
                      disabled={panelCounter < 1}>
                        <i className="text-lg las la-minus"></i>
                    </button>
                    <div className="w-24">
                      <img src="img/panel.png" onDragEnd={handleDragEnd} onDragStart={handleDragStart} data-id="panel" className='w-full' alt="" srcset="" draggable="true"/>
                    </div>
                    <button
                      onClick={() => {managePanel(1)}} 
                      className="border cursor-pointer border-gray-300 text-center"><i className="text-lg las la-plus"></i>
                    </button>
                  </div>
                  <div className="w-40 h-40 flex justify-between items-center shadow-lg m-2">
                    <button 
                      onClick={() => {manageInverter(-1)}} 
                      disabled={inverterCounter < 1}
                      className="border border-gray-300 text-center"><i className="text-lg las la-minus"></i>
                    </button>
                    <div className="w-24">
                      <img src="img/inverter.png" onDragStart={handleDragStart} data-id="inverter" className='w-full' alt="" srcset="" draggable="true"/>
                    </div>
                    <button 
                      onClick={() => {manageInverter(1)}}
                      className="border cursor-pointer border-gray-300 text-center"><i className="text-lg las la-plus"></i>
                    </button>
                  </div>
                  <div className="w-40 h-40 flex justify-between items-center shadow-lg m-2">
                    <button 
                      onClick={() => {managebattery(-1)}}
                      disabled={batteryCounter < 1}
                      className="border cursor-pointer border-gray-300 text-center"><i className="text-lg las la-minus"></i></button>
                    <div className="w-24">
                      <img src="img/battery.png" onDragStart={handleDragStart} data-id="battery" className='w-full' alt="" srcset="" draggable="true"/>
                    </div>
                    <button 
                      onClick={() => {managebattery(1)}}
                      className="border cursor-pointer border-gray-300 text-center"><i className="text-lg las la-plus"></i></button>
                  </div>
                </div>
            </div>
            <div className="flex flex-wrap w-full md:w-2/3 p-5">
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
                    <p className="relative text-4xl -right-32 -top-10 z-5">x{inverterCounter}</p>
                    <img src="img/inverter.png" 
                      data-id="inverter" 
                      onDragStart={handleDropDragStart}
                      className={`w-36 relative top-16 ${panelCounter > 0 ? 'left-20': ""} z-5`} alt="" srcset="" />
                  </>
                }
                {
                  panelCounter > 0 &&
                  <>
                    <img src="img/panel.png" 
                      data-id="panel" 
                      onDragStart={handleDropDragStart}
                      className='relative  left-5 w-56' alt="" srcset="" />
                    <p className="relative text-4xl -top-28 -left-10 z-5">x{panelCounter}</p>
                  </>
                }
                {
                  batteryCounter > 0 &&
                  <>
                    <img src="img/battery.png" 
                      data-id="battery" 
                      onDragStart={handleDropDragStart}
                      className={`w-36 relative top-20 ${panelCounter > 0 ? "right-24": ""}`} alt="" srcset=""/>
                      <p className="relative text-4xl -left-32 z-5">x{batteryCounter}</p>
                  </>
                }
              </div>
              <div className="result-items flex items-center p-5 w-full md:w-5/12">
                <div className="bg-blue-200 p-2 rounded-lg">
                  <div className="sys text-lg ">
                    <span className="font-semibold">System Capacity:</span>
                    <span className="text-blue-600 font-semibold"> {inverterCounter * 5}kVA</span>
                  </div>
                  <div className="sys text-lg">
                    <span className="font-semibold ">Daily power generation:</span>
                    <span className="text-green-600 font-semibold"> {Math.round(((panelCounter * 3.5 * 545/1000) + Number.EPSILON) * 100) / 100}kWp</span>
                  </div>
                  <div className="sys text-lg">
                    <span className="font-semibold ">Backup time (with 1kW load):</span>
                    <span className="text-red-600 font-semibold"> {Math.round(batteryCounter * 5.12)}hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Index
