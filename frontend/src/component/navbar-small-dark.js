import logo_dark from '../assets/images/logo-dark.png';
import logo_light from '../assets/images/logo-light.png';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Link as Link1 } from 'react-scroll';

export default function NavbarSmallLight() {
   const [isOpen, setMenu] = useState(true);



    window.addEventListener("scroll", windowScroll);
    useEffect(() => {
    }, []);

    function windowScroll() {
        const navbar = document.getElementById("navbar");
        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            if (navbar !== null) {
                navbar?.classList.add("is-sticky");
            }
        } else {
            if (navbar !== null) {
                navbar?.classList.remove("is-sticky");
            }
        }

        const mybutton = document.getElementById("back-to-top");
        if (mybutton != null) {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                mybutton.classList.add("flex");
                mybutton.classList.remove("hidden");
            } else {
                mybutton.classList.add("hidden");
                mybutton.classList.remove("flex");
            }
        }
    }
    const toggleMenu = () => {
        setMenu(!isOpen)
    }
    return (
        <>
            <nav className="navbar" id="navbar">
                <div className="container flex flex-wrap items-center justify-end">
                    <a className="navbar-brand md:me-8" href="/index">
                        <span className="inline-block dark:hidden">
                            <img src={logo_dark} className="l-dark" alt="" />
                            <img src={logo_light} className="l-light" alt="" />
                        </span>
                        <img src={logo_light} className="hidden dark:inline-block" alt="" />
                    </a>

                    <div className="nav-icons flex items-center lg_992:order-2 ms-auto lg:ms-4">

                        <ul className="list-none menu-social mb-0">
                            <li className="inline">
                                <Link to="/login" 
                                    className="h-9 w-9 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i
                                        className="uil uil-user"></i></Link>
                            </li>
                        </ul>

                        <button data-collapse="menu-collapse" type="button" onClick={toggleMenu}
                            className="collapse-btn inline-flex items-center ms-3 text-slate-950 dark:text-white lg_992:hidden"
                            aria-controls="menu-collapse" aria-expanded="false">
                            <span className="sr-only">Navigation Menu</span>
                            <i className="mdi mdi-menu text-[24px]"></i>
                        </button>
                    </div>
                    <div className={`${isOpen === true ? 'navigation lg_992:order-1 lg_992:flex hidden ms-auto' : 'navigation lg_992:order-1 lg_992:flex block ms-auto'}`} id="menu-collapse">
                        <ul className="navbar-nav" id="navbar-navlist">
                            <li className={`nav-item`}>
                                <Link1 to="home" activeClass="active" spy={true} smooth={true} duration={500} className="nav-link">Home</Link1>
                            </li>
                            <li className={`nav-item`}>
                                <Link1 to="features" activeClass="active" spy={true} smooth={true} duration={500} className="nav-link">Services</Link1>
                            </li>
                            <li className={`nav-item`}>
                                <Link1 to="pricing" activeClass="active" spy={true} smooth={true} duration={500} className="nav-link">Pricing</Link1>
                            </li>
                            <li className={`nav-item`}>
                                <Link1 to="testi" activeClass="active" spy={true} smooth={true} duration={500} className="nav-link">Review</Link1>
                            </li>
                            <li className={`nav-item`}>
                                <Link1 to="blog" spy={true} smooth={true} duration={500} className="nav-link">Blog</Link1>
                            </li>
                            <li className={`nav-item`}>
                                <Link1 to="contact" activeClass="active" spy={true} smooth={true} duration={500} className="nav-link">Contact us</Link1>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
