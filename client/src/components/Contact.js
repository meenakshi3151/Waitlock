import React from "react";
import "../App.css";
import "tailwindcss/tailwind.css";
import ContactImage from "../images/contact.jpg"
export default function Contact() {
    const sectionStyle = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${ContactImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
    

    return (

        <div>
            <section className="text-gray-700 body-font relative" style={sectionStyle} 
>
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-4xl text-4xl font-medium title-font mb-4 text-black">
                            Contact Us
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-xl text-black">
                           Reach out to us in case of query!!
                        </p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label for="name" className="leading-7 text-xl text-gray-900">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label
                                        for="email"
                                        className="leading-7 text-xl text-gray-900"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label
                                        for="message"
                                        className="leading-7 text-xl text-gray-900"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button className="flex mx-auto text-white bg-indigo-800 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                    Send
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
