import React, { useState } from 'react'




function FormC(props) {
    // let capa = props.counters.inverterCounter * 5;
    // let batt = Math.round(props.counters.batteryCounter * 5.12)
    // let gen = Math.round(((props.counters.panelCounter * 3.5 * 545/1000) + Number.EPSILON) * 100) / 100;
    const [data, setData] = useState({
        name: "",
        email: "",
        
        reach: "",
        phone:"",
        time: "",
        heard: "",
        
        daily_power: `${props.appData.required_time} kWp`,
        battery: `${props.appData.night_power} kWh`,
        load: `${props.appData.load} kW`,
        grid: `${props.appData.grid_time} kWp`,
        n_error: false,
        email_error: false,

        heard_error: false,
        reach_error: false,
        phone_error: false,
        time_error: false
    })

    const handleChange = (event) => {
        // let name = ;
        setData({...data, [event.target.name]: event.target.value});
        console.log(data);
    }
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(data);
        if( data.name.length > 0 && data.email.length > 0 && data.phone.length > 0 
            && data.heard.length > 0 && data.time.length > 0 && data.reach.length > 0
        ){
            setData({...data, n_error: false, 
                email_error: false, 
                heard_error: false, 
                reach_error: false,
                time_error: false,
                phone_error: false
            });

            
            let message = `
                <div style="margin:0; padding: 10px;  font-family:sans; font-size: large;">
                    <div style="padding:5px 20px; font-weight: bold; text-align: center; margin: auto; width: fit-content; background-color: #034564; color: white;">
                        <p>${data.name}</p>
                        <p>${data.email} </p>
                    </div>
                    <div style="padding: 20px; margin: auto; width:700px;  color: #034564;">
                        <p>I would like to request the following quote:</p>
                        <ul style="line-height: 30px;">
                        <li>Required Daily Power Generation: <span style="color:#e65858">${data.daily_power}</span></li>
                        <li>Required Solar Battery Capacity: <span style="color:#e65858">${data.battery}</span></li>
                        <li>Maximum Load you can connect to: <span style="color:#e65858">${data.load}</span></li>
                        <li>Hours of grid electricity in my location: <span style="color:#e65858">${data.grid}</span></li>
                        </ul>
                        <p>Below are my contact details:</p> 
                        <ul style="line-height: 30px;">
                        <li>WhatsApp Phone number: <span style="color:#e65858">${data.phone}.</span></li>
                        <li>I will like to be contacted via <span style="color:#e65858">${data.reach}</span> at <span style="color:#e65858">${data.time}\n </span></li>
                        <li>I heard about Arnergy through <span style="color:#e65858">${data.heard}</span></li> 
                        </ul>
                    </div>
                </div>
            
            `
            
            let formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            // formData.append("daily_power", data.daily_power);
            // formData.append("battery", data.battery);
            // formData.append("load", data.load);
            // formData.append("grid", data.grid);
            // formData.append("phone", data.phone);
            // formData.append("time", data.reach);
            // formData.append("heard", data.heard);
            formData.append("message", message);
            formData.append("subject", 'Solar Calcualtor Quotation Request');
            
            fetch("https://anergy-quotations.thekreativestack.com/submit_calculator_form.php", {
                method: 'POST',
                body: formData
            })
            .then((result) => result.json())
            .then(result => {
                alert(result.message);
                console.log(result.message);
                
            })
            
            // console.log("kkkkkkkk");
        }
        else{
            let email_valid = validateEmail(data.email);
            console.log(email_valid);
            setData({...data, 
                n_error: (data.name.length < 1),
                // loc_error: (data.address.length < 1),
                email_error: (!email_valid), 
                heard_error: (data.heard.length < 1), 
                reach_error: (data.reach.length < 1),
                time_error: (data.time.length < 1),
                phone_error: (data.phone.length < 1)
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
    <div className='bg-black z-10 overflow-y-auto bg-opacity-50 md:flex md:justify-center md:items-center fixed left-0 top-0 w-full h-full'>
        <div className="w-full mx-auto bg-white rounded-lg border shadow-lg sm:w-9/12 md:w-7/12 lg:w-6/12">
            <div onClick={close} className="cursor-pointer text-right"><i className="las la-times text-3xl"></i></div>
            <div className="flex justify-center p-5 items-center">
                <div class="w-full">
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Name
                        </label>
                        <input 
                            onChange={handleChange}
                            value={data.name}
                            name="name"
                            className={`${data.n_error ? "border-red-500": ""} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="grid-first-name" type="text" />
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
                                <p class="text-red-500 text-xs italic">Please fill in a valid email.</p>
                            }
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                            <label class="flex items-center uppercase tracking-wide h-10 text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                WhatsApp Number
                            </label>
                            <input 
                                onChange={handleChange}
                                value={data.phone}
                                name="phone"
                                class={`${data.phone_error ? "border-red-500": ""} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-city" type="number" placeholder=""/>
                            {
                                data.phone_error &&
                                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                            }
                        </div>
                        <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                            <label class="flex items-center uppercase tracking-wide h-10 text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                What time will you like us to call you?
                            </label>
                            <div class="relative">
                                <input 
                                    value={data.time}
                                    onChange={handleChange}
                                    name="time"
                                    class={`${data.time_error ? "border-red-500": ""} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-city" type="time" placeholder=""/>
                            {
                                data.time_error &&
                                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                            }
                            </div>
                        </div>
                        <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                            <label class="flex items-center uppercase h-10 tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                How will you like us to reach you?
                            </label>
                            <select 
                                value={data.reach}
                                onChange={handleChange}
                                name="reach"
                                className={`${data.phone_error ? "border-red-500": ""} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-zip">
                                    <option value="">Select an option</option>
                                    <option value="WhatsApp">Via WhatsApp</option>
                                    <option value="Phone Call">Via Phone Call</option>
                            </select>
                            {
                                data.reach_error &&
                                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                            }
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                            <label class="flex items-center uppercase h-10 tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                Required Daily Power Generation <i className="ml-2 text-lg las la-sun"></i>
                                {/* <i class="las la-bolt"></i> */}
                            </label>
                            <input 
                                disabled={true}
                                value={data.daily_power}
                                name="capacity"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
                        </div>
                        <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                            <label class="flex items-center uppercase h-10 tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                Required Solar Battery Capacity <i className="ml-2 text-lg las la-battery-half"></i>
                            </label>
                            <div class="relative">
                                <input 
                                    disabled={true}
                                    value={data.battery}
                                    name="power_gen"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
                            </div>
                        </div>
                        <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                            <label class="flex items-center uppercase h-10 tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                Maximum Load you can connect to <i className="ml-2 text-lg las la-cubes"></i>
                            </label>
                            <input 
                                value={data.load}
                                name="backup"
                                disabled={true}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
                        </div>
                        
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                            <label class="flex items-center uppercase h-10 tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                Grid Electricity Time <i className="ml-2 text-lg las la-network-wired"></i>
                            </label>
                            <input 
                                value={data.grid}
                                name="backup"
                                disabled={true}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
                        </div>
                        <div class="w-full md:w-8/12 px-3">
                            <label class="flex items-center uppercase h-10 tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                How did you hear about us?
                            </label>
                            <select 
                                onChange={handleChange}
                                value={data.heard}
                                name="heard"
                                autoComplete='address'
                                class={`${data.heard_error ? "border-red-500": ""} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} type="text">
                                    <option value="">Select an option</option>
                                    <option value="Social Media">Social Media</option>
                                    <option value="Through a friend">Through a Friend</option>
                                    <option value="Flyers">Flyers</option>
                                    <option value="Billboard Ad">Billboard advert</option>
                                    <option value="Television advert">Television advert</option>
                                    <option value="other">Other</option>
                            </select>
                            {
                                data.heard_error &&
                                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                            }
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

export default FormC
