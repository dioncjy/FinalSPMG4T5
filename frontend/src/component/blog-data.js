import image from '../assets/images/blog/1.jpg';
import image1 from '../assets/images/blog/2.jpg';
import image2 from '../assets/images/blog/3.jpg';
import image3 from '../assets/images/blog/4.jpg';
import image4 from '../assets/images/blog/5.jpg';
import image5 from '../assets/images/blog/6.jpg';
import image6 from '../assets/images/blog/7.jpg';
import image7 from '../assets/images/blog/8.jpg';
import image8 from '../assets/images/blog/9.jpg';
import React from 'react'
import { Link } from "react-router-dom";

export default function BlogData() {
    const BlogDatadata = [
        {
            image: image,
            title: 'Introducing new tools for your design.',
            detail: 'The phrasal sequence of the is now so that many campaign and benefit',
            more: 'Read More',
        },
        {
            image: image1,
            title: 'The Right Hand of Business IT World',
            detail: 'The phrasal sequence of the is now so that many campaign and benefit',
            more: 'Read More',
        },
        {
            image: image2,
            title: 'Truck Side Advertising Isn It Time for action.',
            detail: 'The phrasal sequence of the is now so that many campaign and benefit',
            more: 'Read More',
        },
        {
            image: image3,
            title: 'Introducing new tools for your design.',
            detail: 'The phrasal sequence of the is now so that many campaign and benefit',
            more: 'Read More',
        },
        {
            image: image4,
            title: 'The Right Hand of Business IT World',
            detail: 'The phrasal sequence of the is now so that many campaign and benefit',
            more: 'Read More',
        },
        {
            image: image5,
            title: 'Truck Side Advertising Isn It Time for action.',
            detail: 'The phrasal sequence of the is now so that many campaign and benefit',
            more: 'Read More',
        },
        {
            image: image6,
            title: 'Introducing new tools for your design.',
            detail: 'The phrasal sequence of the is now so that many campaign and benefit',
            more: 'Read More',
        },
        {
            image: image7,
            title: 'The Right Hand of Business IT World',
            detail: 'The phrasal sequence of the is now so that many campaign and benefit',
            more: 'Read More',
        },
        {
            image: image8,
            title: 'Truck Side Advertising Isn It Time for action.',
            detail: 'The phrasal sequence of the is now so that many campaign and benefit',
            more: 'Read More',
        }
    ]

    return (
        <>
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">

                    {BlogDatadata.map((item, index) => (

                        <div className="blog relative rounded-md shadow shadow-slate-200 dark:shadow-gray-800 overflow-hidden">
                            <img src={item.image} alt="" />

                            <div className="content p-6">
                                <Link to="/blog-detail" className="text-lg hover:text-violet-600 dark:text-white dark:hover:text-violet-600 transition duration-500 ease-in-out font-medium h5">{item.title}</Link>
                                <p className="text-slate-400 mt-3">{item.detail}</p>

                                <div className="mt-5">
                                    <Link to="" className="hover:text-violet-600 dark:hover:text-violet-600 after:bg-violet-600 dark:text-white transition duration-500">{item.more}<i className="uil uil-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}
