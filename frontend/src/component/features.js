import React from 'react'
import image from '../assets/images/blog/1.jpg';
import image1 from '../assets/images/blog/2.jpg';
import image2 from '../assets/images/blog/3.jpg';
import { Link } from "react-router-dom";

export default function BlogsNews() {
    const featuresData = [
        {
            image: image,
            title: 'Apply for Role Listings',
            detail: 'Browse available role listings and apply for one that matches you!',
        },
        {
            image: image1,
            title: 'View Skill-Role requirements',
            detail: 'Easily identify skills needed for a role!',
        },
        {
            image: image2,
            title: 'Add & Edit Role Listings',
            detail: 'Be able to add new role listings or edit existing ones!',
        }

    ]
    return (
        <>
            <div className="container lg:py-24 py-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-2xl text-xl font-medium">What to Expect</h3>
                    <p>No matter if you are an HR or staff, SBRP has something in store for you! Join us today!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px] mt-8">
                    {featuresData.map((item, index) => (
                        <div className="blog relative rounded-md shadow shadow-slate-200 dark:shadow-gray-800 overflow-hidden" key={index}>
                            <img src={item.image} alt="" />

                            <div className="content p-6">
                                <Link to="/blog-detail" className="text-lg hover:text-violet-600 dark:text-white dark:hover:text-violet-600 transition duration-500 ease-in-out font-medium h5">{item.title}</Link>
                                <p className="text-slate-400 mt-3">{item.detail}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}