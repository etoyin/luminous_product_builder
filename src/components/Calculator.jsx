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
            night_power: Math.round((((load / 1000) * (night_hours / number_of_appliances)) + Number.EPSILON) * 100) / 100
        })
    }, [rerenderMonitor])
    

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
            <div className="w-full p-2 sm:p-5 md:w-7/12 border border-gray-100 rounded-lg shadow-xl my-5 md:mr-10  bg-[#f9f9f9]">
                <div className="flex p-2 text-xs text-[#fe7029]">
                    <div className="w-3/12">Appliances</div>
                    <div className="w-3/12">Quantity</div>
                    <div className="w-2/12">Load</div>
                    <div className="w-2/12">Daytime Operating Hours</div>
                    <div className="w-2/12">Nighttime Operating Hours</div>
                </div>
                {
                    appData.fields.map((each, i) => {
                        return (
                            <div key={i} className="sm:flex my-2">
                                <div className="mx-1">
                                    <select id="" 
                                        onChange={(e) => handleChange(i, e)}
                                        name='appliance'
                                        value={each.appliance}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                    <button className='shadow-lg bg-[#182e4d] uppercase text-xs font-bold p-3 mt-2 rounded-full text-[#fe7029]' onClick={() => handleAddInput()}>Add Another Appliance</button>
                </div>

            </div>
            <div className="w-full p-2 sm:p-5 md:w-4/12 text-white border border-gray-100 rounded-lg shadow-lg my-5 bg-[#182e4d]">
                <div className="font-semibold">
                    <span className="text-[#fe7029] mr-3 uppercase text-center text-lg">
                        Total Load Capacity:
                    </span>
                    <span className="text-lg text-center">
                        {appData.load} kW
                    </span>
                </div>
                <div className="my-3 font-semibold">
                    <span className="text-[#fe7029] mr-3 text-center text-base">
                        Daily Power Generation:
                    </span>
                    <span className="text-base text-center">
                        {isNaN(appData.daily_power)? "0": appData.daily_power} kW
                    </span>
                </div>
                <div className="font-semibold">
                    <span className="text-[#fe7029] mr-3 text-center text-base">
                        Nighttime Backup Needed: 
                    </span>
                    <span className="text-base text-center">
                        {isNaN(appData.night_power)? "0" : appData.night_power} kW
                    </span>
                </div>
                <hr className='w-9/12 my-3'/>
                <div className="">
                    <p className="text-lg text-[#fe7029] font-semibold mb-2">
                        Let's Recommend A Perfect Solar System.
                    </p>
                    <p className="text-sm">
                        How many hours on average everyday do you have grid electricity in your location?
                        <input 
                            onChange={handleGridChange}
                            value={appData.grid_time}
                            name='grid_time'
                            id="" 
                            type='number'
                            placeholder='How many hours?'
                            max="24"
                            className="ml-3 h-8 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </p>
                    <div className="my-1 font-semibold">
                        <span className="text-[#fe7029] mr-3 text-center text-sm">
                            Daily Power Generation Needed:
                        </span>
                        <span className="text-sm text-center">
                            {isNaN(appData.daily_power - (appData.load * appData.grid_time))? 
                            "0": 
                            Math.round(((appData.daily_power - (appData.load * appData.grid_time)) + Number.EPSILON) * 100) / 100} kW
                        </span>
                    </div>
                    <div className="my-1 font-semibold">
                        <span className="text-[#fe7029] mr-3 text-center text-sm">
                            Solar Battery Required :
                        </span>
                        <span className="text-sm text-center">
                            {isNaN(appData.night_power)? "0" : appData.night_power} kW
                        </span>
                    </div>
                    <div className="my-1 font-semibold">
                        <span className="text-[#fe7029] mr-3 text-center text-sm">
                            Expected Maximum Load :
                        </span>
                        <span className="text-sm text-center">
                            {isNaN(appData.load)? "0" : appData.load} kW
                        </span>
                    </div>
                </div>
                <hr className='w-9/12 my-3'/>
                <div className="">
                    <p className="text-lg text-[#fe7029] font-semibold mb-2">
                        Here is Your Most Suitable Solar System Option 
                    </p>
                    <p className="text-sm">
                        After reviewing your entry and need, here is a suitable solar system to cover all your energy needs.
                    </p>
                    <div className="my-1 font-semibold">
                        <span className="text-[#fe7029] mr-3 text-center text-sm">
                            Recommend: {
                                recommendPanel(appData.daily_power)
                            }
                        </span>
                    </div>
                    {
                        console.log(appData.night_power)
                    }
                    {
                        (appData.night_power === 0 || appData.night_power > 1.5) &&
                        <div className="my-1 font-semibold">
                            <span className="text-[#fe7029] mr-3 text-center text-sm">
                                Recommend: {
                                    // console.log(appData.load)
                                    recommendInverter(appData.load)
                                }
                            </span>
                        </div>
                    }
                    <div className="my-1 font-semibold">
                        <span className="text-[#fe7029] mr-3 text-center text-sm">
                            {
                                // console.log(appData.load)
                                recommendBattery(appData.night_power)
                            }
                        </span>
                    </div>
                    
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator