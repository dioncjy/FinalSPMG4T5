import React from 'react'
import image from '../assets/images/client/04.jpg';
import image1 from '../assets/images/client/05.jpg';
import image2 from '../assets/images/client/06.jpg';
import image3 from '../assets/images/client/07.jpg';
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from 'react-feather';

export default function MeetOurs() {
    const MeetOursdata = [
        {
            image: image,
            title: 'Jack John',
            type: 'Designer'
        },
        {
            image: image1,
            title: 'Krista John',
            type: 'Designer'
        },
        {
            image: image2,
            title: 'Roger Jackson',
            type: 'Designer'
        },
        {
            image: image3,
            title: 'Johnny English',
            type: 'Designer'
        },
    ]
    return (
        <>
            <div className="container lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-2xl text-xl font-medium">Meet Our Teammates</h3>
                    <p className="text-slate-400 max-w-xl mx-auto">This is just a simple text made for this unique and awesome
                        template, you can replace it with any text.</p>
                </div>
                <div className="grid md:grid-cols-12 grid-cols-1 mt-8 gap-[30px]">
                    {MeetOursdata.map((item, index) => (
                        <div className="lg:col-span-3 md:col-span-6" key={index} >
                            <div className="group text-center">
                                <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                    <img src={item.image} className="" alt="" />

                                    <ul
                                        className="list-none absolute top-1/2 -translate-y-1/2 -end-20 group-hover:end-5 transition-all duration-500 ease-in-out">
                                        <li className=""><Link to=""
                                            className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                        <li className="mt-1"><Link to=""
                                            className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                        <li className="mt-1"><Link to=""
                                            className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                    </ul>
                                </div>

                                <div className="content mt-3">
                                    <Link to=""
                                        className="text-lg hover:text-violet-600 transition-all duration-500 ease-in-out h5">{item.title}</Link>
                                    <p className="text-slate-400">{item.type}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
