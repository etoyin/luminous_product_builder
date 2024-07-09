import React, { useState } from 'react';
import Ratings from './data'

function Calculator() {
    console.log(Ratings);
    const [appData, setAppData] = useState({
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
            let filtered = Ratings.ratings.filter((each) => {
                return e.target.value == each.name;
            });

            let fields = appData.fields
            fields[i] = {
                ...appData.fields[i],
                load: filtered[0].value,
            };
            setAppData({
                ...appData,
                fields:fields
            });
        }
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
      <div className="p-4 sm:p-10">
        <div className="flex flex-wrap">
            <div className="w-full p-2 sm:p-5 md:w-7/12 border border-gray-300 rounded-lg shadow-xl my-5 md:mr-10 bg-gray-100">
                <div className="flex p-2 text-xs text-red-500">
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
                                        <option selected>Choose an Appliance</option>
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
                    <button className='shadow-lg bg-blue-600 uppercase text-xs font-semibold p-3 mt-2 rounded-full text-white' onClick={() => handleAddInput()}>Add Another Appliance</button>
                </div>

            </div>
            <div className="w-full p-2 sm:p-5 md:w-4/12 border border-gray-300 rounded-lg shadow-lg my-5 bg-gray-100">mmmm</div>
        </div>
      </div>
    </div>
  )
}

export default Calculator