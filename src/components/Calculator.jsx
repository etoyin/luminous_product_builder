import React, { useEffect, useState } from 'react';
import Ratings from './data';
import { recommendBattery, recommendInverter, recommendPanel } from './conditions';

function Calculator() {
    console.log(Ratings);
    const [rerenderMonitor ,setRerenderMonitor] = useState(true);
    const [appData, setAppData] = useState({
        grid_time: 0,
        night_power: 0,
        load: 0,
        daily_power: 0,
        required_time: 0,
        fields: [
            {
                appliance: "",
                quantity: "",
                load: "",
                day: "",
                night: ""
            },
            {
                appliance: "",
                quantity: "",
                load: "",
                day: "",
                night: ""
            }
        ]
    });

    useEffect(() => {
        let load = 0;
        let day_hours = 0;
        let night_hours = 0
        let number_of_appliances = 0;
        appData.fields.forEach((each) => {
            load = load + (Number(each.quantity) * Number(each.load));
            //if no load and quantity are added
            if(Number(each.quantity) * Number(each.load) <= 0){
                return
            }
            night_hours = Number(night_hours) + Number(each.night);
            day_hours = Number(day_hours) + Number(each.day);
            number_of_appliances++;
        });
        setAppData({
            ...appData,
            load: load/1000,
            daily_power: Math.round((((load / 1000) * (day_hours / number_of_appliances)) + Number.EPSILON) * 100) / 100,
            night_power: Math.round((((load / 1000) * (night_hours / number_of_appliances)) + Number.EPSILON) * 100) / 100,
            required_time: Math.round(((Math.round((((load / 1000) * (day_hours / number_of_appliances)) + Number.EPSILON) * 100) / 100 - (appData.load * appData.grid_time)) + Number.EPSILON) * 100) / 100
        })
    }, [rerenderMonitor]);

    const handleChange = (i, e) => {
        let fields = appData.fields
        fields[i] = {
            ...appData.fields[i],
            [e.target.name]: e.target.value,
        };
        setAppData({
            ...appData,
            fields:fields
        });
        if(e.target.name == 'appliance'){
            let filteblue = Ratings.ratings.filter((each) => {
                return e.target.value == each.name;
            });

            let fields = appData.fields
            fields[i] = {
                ...appData.fields[i],
                load: filteblue[0].value,
            };
            setAppData({
                ...appData,
                fields:fields
            });
        }
        setRerenderMonitor(!rerenderMonitor);
    }
    const handleGridChange = (e) => {
        setAppData({
            ...appData,
            grid_time: e.target.value
        });
        setRerenderMonitor(!rerenderMonitor);
    }
    const handleDeleteInput = (index, e) => {
        e.preventDefault();
        const newRes = {...appData};
        newRes.fields.splice(index, 1);
        setAppData(newRes);
        // setData(newRes);
        // console.log(newRes);
    };
    const handleAddInput = () => {
        setAppData({
            ...appData,
            fields: [
                ...appData.fields,
                {
                    appliance: "",
                    quantity: "",
                    load: "",
                    day: "",
                    night: ""
                }
            ]
        })
    };
  return (
    <div>
      <div className="p-4 sm:p-10 font-quicksand">
        <div className="flex flex-wrap">
            <div className="w-full p-2 sm:p-5 md:w-7/12 xl:w-6/12 border border-gray-100 rounded-lg shadow-xl my-5 md:mr-10  bg-[#f1f2f4]">
                
                <div className="hidden sm:flex my-2">
                    <div className="mx-1">
                        <select
                            onChange={(e) => handleChange(i, e)}
                            name='appliance'
                            value=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hidden sm:block invisible block w-full sm:w-[130px] p-2.5 ">
                        </select>
                        <div className="no-scrollbar border-none text-[#fe7029] h-6 sm:h-[60px] w-full resize-none p-2 text-xs">
                            Appliance
                        </div>
                    </div>
                    <div className="mx-1">
                    <input
                        value="{each.quantity}"
                        name='quantity'
                        id="" 
                        type='number'
                        placeholder='Quantity'
                        className="text-sm rounded-lg block border border-gray-300 hidden sm:block invisible w-full p-2.5 "/>
                        <div className="no-scrollbar border-none text-[#fe7029] h-6 sm:h-[60px] w-full resize-none p-2 text-xs">
                            Quantity
                        </div>
                    </div>
                    <div className="mx-1">
                    <input
                        value="{each.quantity}"
                        name='quantity'
                        id="" 
                        type='number'
                        placeholder='Quantity'
                        className="text-sm rounded-lg block border border-gray-300 hidden sm:block invisible w-full p-2.5 "/>
                        <div className="no-scrollbar border-none text-[#fe7029] h-6 sm:h-[60px] w-full resize-none p-2 text-xs">
                            Load
                        </div>
                    </div>
                    <div className="mx-1">
                    <input
                        value="{each.quantity}"
                        name='quantity'
                        id="" 
                        type='number'
                        placeholder='Quantity'
                        className="text-sm rounded-lg block border border-gray-300 hidden sm:block invisible w-full p-2.5 "/>
                        <div className="no-scrollbar border-none text-[#fe7029] h-6 sm:h-[60px] w-full resize-none p-2 text-xs">
                            Daytime Operating Hours
                        </div>
                    </div>
                    <div className="mx-1">
                    <input
                        value="{each.quantity}"
                        name='quantity'
                        id="" 
                        type='number'
                        placeholder='Quantity'
                        className="text-sm rounded-lg block border border-gray-300 hidden sm:block invisible w-full p-2.5 "/>
                        <div className="no-scrollbar border-none text-[#fe7029] h-6 sm:h-[60px] w-full resize-none p-2 text-xs">
                            Night time Operating Hours
                        </div>
                    </div>
                    <div 
                        className="flex items-center cursor-pointer">
                        <i className="las la-trash-alt hidden sm:block invisible"></i>
                    </div>
                </div>
                {
                    appData.fields.map((each, i) => {
                        return (
                            <div key={i} className="sm:flex my-2">
                                <div className="mx-1">
                                    <select
                                        onChange={(e) => handleChange(i, e)}
                                        name='appliance'
                                        value={each.appliance}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-[130px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Choose an Appliance</option>
                                        {Ratings.ratings.map((option, j) => {
                                            return (
                                                <option key={j} value={option.name}>{option.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mx-1">
                                    <input 
                                        onChange={(e) => handleChange(i, e)}
                                        value={each.quantity}
                                        name='quantity'
                                        id="" 
                                        type='number'
                                        placeholder='Quantity'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div className="mx-1">
                                    <input 
                                        name='load'
                                        onChange={(e) => handleChange(i, e)}
                                        value={each.load}
                                        placeholder="load"
                                        disabled={true}
                                        id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div className="mx-1">
                                    <input 
                                        name='day'
                                        onChange={(e) => handleChange(i, e)}
                                        value={each.day}
                                        type='number'
                                        placeholder="Daytime Operating hours"
                                        id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div className="mx-1">
                                    <input 
                                        name='night'
                                        onChange={(e) => handleChange(i, e)}
                                        value={each.night}
                                        type='number'
                                        placeholder="Night time Operating hours"
                                        id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div 
                                    onClick={(e) => handleDeleteInput(i, e)}
                                    className="flex items-center cursor-pointer">
                                    <i className="las la-trash-alt"></i>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="">
                    <button className='shadow-lg bg-[#fe7532] uppercase text-xs font-bold p-3 mt-2 rounded-full text-[#fff]' onClick={() => handleAddInput()}>Add Another Appliance</button>
                </div>

            </div>
            <div className="w-full p-2 sm:p-2 md:w-4/12 xl:w-5/12 border-8 border-white rounded-xl shadow-xl my-5 bg-[#f1f2f4]">
                <div className="font-semibold mt-2 flex text-white flex-wrap justify-center items-center mx-auto" >
                    <div className="bg-[#1994cb] text-base shadow py-3 xl:py-5 xl:px-7 px-5 mr-5 md:mr-3 lg:mr-5 rounded-full">Total Load Capacity</div>
                    
                    <div 
                        className="text-xs sm:text-sm xl:text-base font-bold shadow-lg rounded-full text-center w-20 h-20 sm:w-24 sm:h-24 xl:w-28 xl:h-28 border-8 border-[#f1f2f4] bg-[#1994cb] flex items-center justify-center">
                        {appData.load}kW
                    </div>
                </div>
                <div className="my-3 font-semibold flex text-white flex-wrap justify-between items-center">
                    <div className="flex mb-1 items-center w-[220px] sm:w-max m-auto justify-between">
                        <div className="small-bars bg-[#1994cb] text-[10px] shadow py-2 px-1 mr-1 font-bold rounded-full">Daytime Power Consumption</div>
                        <div 
                            className="small-circle text-[10px] sm:text-[12px] font-bold shadow-lg rounded-full text-center w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] border-4 border-[#f1f2f4] bg-[#1994cb] flex items-center justify-center xl:text-sm xl:w-20 xl:h-20">
                            {isNaN(appData.daily_power)? "0": appData.daily_power} kW
                        </div>
                    </div>
                    <div className="flex mb-1 items-center w-[220px] m-auto sm:w-max justify-between">
                        <div className="small-bars bg-[#1994cb] text-[10px] shadow py-2 px-1 mr-1 font-bold rounded-full">Night-time Backup Needed</div>
                        <div 
                            className="small-circle text-[10px] sm:text-[12px] font-bold shadow-lg rounded-full text-center w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] border-4 border-[#f1f2f4] bg-[#1994cb] flex items-center justify-center xl:text-sm xl:w-20 xl:h-20">
                            {isNaN(appData.night_power)? "0" : appData.night_power} kW
                        </div>
                    </div>
                    
                </div>
                <div className="w-full my-3 h-[1.5px] bg-gray-300"></div>
                
                <div className="">
                    <p className="text-base text-center text-[#fe7532] font-bold mb-2">
                        Your Perfect Solar Recommendation
                    </p>
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="w-full sm:w-[150px] xl:w-5/12 m-auto">
                            <div className="rounded-full font-bold p-3 sm:p-0 sm:px-3 bg-[#f0f1f7] text-center text-[10px] xl:p-4 xl:text-sm shadow-inner border ">
                                How many hours on average everyday do you have grid electricity in your location?
                            </div>
                            <p className="text-sm flex justify-center">
                                <input 
                                    onChange={handleGridChange}
                                    value={appData.grid_time > 0 ? appData.grid_time:""}
                                    name='grid_time'
                                    id="" 
                                    type='number'
                                    placeholder='How many hours?'
                                    max="24"
                                    className="remove-arrow relative -top-1 h-8 w-8 xl:w-12 xl:h-12 bg-white border-2 border-[#f1f2f4] shadow text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 p-2.5"/>
                            </p>
                        </div>
                        <div className="w-full sm:w-7/12 m-auto text-white">
                            <div className="flex items-center w-[220px] xl:w-full 2xl:w-80 m-auto justify-between my-1">
                                <div className="small-bars bg-[#fe7532] text-[9px] font-bold shadow py-2 px-1 mr-1 rounded-full">Required Daily Power Generation</div>
                                <div 
                                    className="text-[10px] sm:text-[12px] font-bold shadow-lg rounded-full text-center w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] border-4 border-[#f1f2f4] bg-[#fe7532] flex items-center justify-center xl:text-sm xl:w-20 xl:h-20">
                                    {isNaN(appData.required_time)? 
                                    "0": 
                                    (appData.required_time < 0 ? 0 : appData.required_time )} kWp
                                </div>
                            </div>
                            <div className="flex items-center w-[220px] xl:w-full 2xl:w-80 m-auto justify-between my-1">
                                <div className="small-bars bg-[#fe7532] text-[9px] shadow font-bold py-2 px-1 mr-1 rounded-full">Required Solar Battery Capacity</div>
                                <div 
                                    className="text-[10px] sm:text-[12px] font-bold shadow-lg rounded-full text-center w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] border-4 border-[#f1f2f4] bg-[#fe7532] flex items-center justify-center xl:text-sm xl:w-20 xl:h-20">
                                    {isNaN(appData.night_power)? "0" : appData.night_power} kWh
                                </div>
                            </div>
                            <div className="flex items-center w-[220px] xl:w-full 2xl:w-80 m-auto justify-between my-1">
                                <div className="small-bars bg-[#fe7532] text-[9px] shadow py-2 font-bold px-1 mr-1 rounded-full">Maximum Load you can connect to</div>
                                <div 
                                    className="text-[10px] sm:text-[12px] font-bold shadow-lg rounded-full text-center w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] border-4 border-[#f1f2f4] bg-[#fe7532] flex items-center justify-center xl:text-sm xl:w-20 xl:h-20">
                                    {isNaN(appData.load)? "0" : appData.load} kW
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full my-3 h-[2px] bg-gray-300"></div>
                <div className="">
                    <p className="text-base text-center text-[#1994cb] xl:text-base font-semibold mb-1">
                        Here is Your Most Suitable Solar System Option 
                    </p>
                    <p className="text-[8px] xl:text-sm bg-[#1994cb] font-bold p-1 text-center rounded-full shadow text-white">
                        After reviewing your entry and need, here is a suitable solar system to cover all your energy needs.
                    </p>
                    <div className="p-3 border mt-2 border-green-700 bg-[#bbf7d0] rounded-lg">
                        <div className="bg-white text-base xl:text-lg text-green-800 w-min px-3 font-semibold rounded-full mx-auto">Recommendations</div>
                        <div className="flex flex-wrap justify-center mt-3">
                                {
                                    recommendPanel(appData.required_time) &&
                                    <div className="rounded-lg my-1 mx-1 flex flex-col w-[84px] xl:w-36 items-center px-2 bg-green-700 min-h-5 text-white">
                                        <div className="text-base text-center xl:text-lg">
                                        {
                                            recommendPanel(appData.required_time)[0]
                                        }
                                        </div>
                                        <div className="text-[8px] xl:text-xs text-center">
                                            {
                                                recommendPanel(appData.required_time)[1]
                                            }
                                        </div>
                                    </div>
                                }

                                {
                                    (appData.night_power === 0 || appData.night_power > 1.5) &&
                                    <div className="rounded-lg my-1 mx-1 flex flex-col w-[84px] xl:w-36 items-center px-3 bg-green-700 min-h-5 text-white">
                                        <div className="text-base xl:text-lg text-center">
                                        {
                                            recommendInverter(appData.load)[0]
                                        }
                                        </div>
                                        <div className="text-[8px] xl:text-xs text-center">
                                            {
                                                recommendInverter(appData.load)[1]
                                            }
                                        </div>
                                    </div>
                                }
                            {
                                console.log(recommendBattery(appData.night_power))
                            }
                            {
                            recommendBattery(appData.night_power) && 
                            <div className="flex flex-wrap my-1 mx-1 justify-between items-center">
                            
                                <div className="rounded-lg flex flex-col w-[84px] xl:w-36 items-center px-2 bg-black min-h-5 text-white">
                                    <div className="text-base text-center xl:text-lg">
                                    {
                                        recommendBattery(appData.night_power)[0][0]
                                    }
                                    </div>
                                    <div className="text-[8px] text-center xl:text-xs">
                                        {
                                            recommendBattery(appData.night_power)[0][1]
                                        }
                                    </div>
                                </div>
                                {
                                    recommendBattery(appData.night_power).length > 1 &&
                                    <div className='text-xs mx-1 font-bold'>
                                        or
                                    </div>
                                }
                                {
                                    recommendBattery(appData.night_power).length > 1 &&
                                    <div className="rounded-lg flex flex-col w-[84px] xl:w-36 items-center px-2 bg-white min-h-5 text-black font-semibold">
                                        <div className="text-base text-center xl:text-lg">
                                        {
                                            recommendBattery(appData.night_power)[1][0]
                                        }
                                        </div>
                                        <div className="text-[8px] text-center xl:text-xs">
                                            {
                                                recommendBattery(appData.night_power)[1][1]
                                            }
                                        </div>
                                    </div>
                                }
                                    
                             
                            </div>
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator