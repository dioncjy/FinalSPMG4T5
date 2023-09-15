import React from 'react'

export default function Footer() {

    return (
        <>
            <footer className="footer bg-slate-950 text-gray-200 dark:text-gray-200">
                <div className="py-[30px] px-0 border-t border-slate-800">
                    <div className="container text-center">
                        <div className="grid md:grid-cols-12 items-center">
                            <div className="md:col-span-6">
                                <div className="md:text-start text-center">
                                    <p className="text-gray-400">©
                                        {new Date().getFullYear()} SBRP - All Rights Reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
