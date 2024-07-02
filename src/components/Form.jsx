import React, { useState } from 'react'

import emailjs from 'emailjs-com';

const SERVICE_ID = "service_6m4g25h";
const TEMPLATE_ID = "template_g1khc67";
const PUBLIC_KEY = "qYBtwCh8_GIe15Pwp";


function Form(props) {
    let capa = props.counters.inverterCounter * 5;
    let batt = Math.round(props.counters.batteryCounter * 5.12)
    let gen = Math.round(((props.counters.panelCounter * 3.5 * 545/1000) + Number.EPSILON) * 100) / 100;
    const [data, setData] = useState({
        name: "",
        email: "",
        address: "",
        capacity: `${capa}kVA`,
        power_gen: `${gen}kWp`,
        backup: `${batt}hours`,
        f_error: false,
        email_error: false,
        loc_error: false
    })

    const handleChange = (event) => {
        // let name = ;
        setData({...data, [event.target.name]: event.target.value});
        console.log(data);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(data);
        if( data.name.length > 0 && data.email.length > 0 && data.address.length > 0 ){
            setData({...data, fn_error: false, ln_error: false, loc_error: false});

            
            let message = `I would like to request the following quote \n 
                            System Capacity: ${data.capacity} \n
                            Daily Power Generation: ${data.power_gen} \n
                            Backup Time: ${data.backup} \n
                            
                            My Location: ${data.address}`
            
            var form = document.createElement("form");
            var FN = document.createElement("input");
            FN.setAttribute("name", "user_name");
            FN.setAttribute("value", data.name);

            var EM = document.createElement("input");
            EM.setAttribute("name", "user_email");
            EM.setAttribute("value", data.email);

            var FROM = document.createElement("input");
            EM.setAttribute("name", "from_name");
            EM.setAttribute("value", data.name);

            var MSS = document.createElement("input");
            MSS.setAttribute("name", "message");
            MSS.setAttribute("value", message);

            form.appendChild(FN); 
            form.appendChild(EM); 
            form.appendChild(MSS); 
            form.appendChild(FROM); 



            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                alert('Message Sent Successfully');
                props.close();
            }, (error) => {
                console.log(error.text);
                alert('Something went wrong!')
            });
            
            // console.log("kkkkkkkk");
        }
        else{
            setData({...data, 
                fn_error: (data.first_name.length < 1),
                ln_error: (data.last_name.length < 1),
                loc_error: (data.address.length < 1)
            })
            
            // if(data.address.length < 1){
            //     setData({...data, loc_error: true})
            // }
            console.log("lllllllllll");
            console.log(data.name.length);
            // console.log(data.first_name.length);
        }
    }

    const close = () => {
        props.close()
    }
  
    return (
    <div className='bg-black z-10 bg-opacity-50 flex justify-center items-center fixed left-0 top-0 w-screen h-screen'>
        <div className="w-full bg-white rounded-lg border shadow-lg sm:w-9/12 md:w-7/12 lg:w-6/12">
            <div onClick={close} className="cursor-pointer text-right"><i className="las la-times text-3xl"></i></div>
            <div className="flex justify-center p-5 items-center">
                <div class="w-full">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Name
                        </label>
                        <input 
                            onChange={handleChange}
                            value={data.name}
                            name="name"
                            className={`${data.n_error ? "border-red-500": ""} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-first-name" type="text" />
                        {
                            data.n_error &&
                            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                        }
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Email
                            </label>
                            <input 
                                onChange={handleChange}
                                value={data.email} type="email"
                                name="email"
                                className={`${data.email_error ? "border-red-500": ""} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-email" />
                            {
                                data.email_error &&
                                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                            }
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Location
                            </label>
                            <input 
                                onChange={handleChange}
                                value={data.address}
                                name="address"
                                autoComplete='address'
                                class={`${data.loc_error ? "border-red-500": ""} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} type="text" />
                            {
                                data.loc_error &&
                                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                            }
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                            <label class="flex items-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                System Capacity <i className="ml-2 text-lg las la-bolt"></i>
                            </label>
                            <input 
                                disabled={true}
                                value={data.capacity}
                                name="capacity"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
                        </div>
                        <div class="w-full md:w-5/12 px-3 mb-6 md:mb-0">
                            <label class="flex items-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                Daily Power Generation <i className="ml-2 text-lg las la-solar-panel"></i>
                            </label>
                            <div class="relative">
                                <input 
                                    disabled={true}
                                    value={data.power_gen}
                                    name="power_gen"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
                            </div>
                        </div>
                        <div class="w-full md:w-3/12 px-3 mb-6 md:mb-0">
                        <label class="flex items-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                            Backup Time <i className="ml-2 text-lg las la-battery-half"></i>
                        </label>
                        <input 
                            value={data.backup}
                            name="backup"
                            disabled={true}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button 
                            onClick={handleSubmit}
                            className="bg-blue-600 w-48 rounded-lg mt-2 shadow-xl border text-white p-2">
                                Send Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Form
