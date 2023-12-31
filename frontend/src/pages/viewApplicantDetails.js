import React from 'react';
import ApplicantsListWithFilters from '../component/applicantsList';

export default function applicantPage() {
    return (
        <div className='applicant-cards'>
            <section className="py-26 lg:py-36 w-full relative table bg-top bg-no-repeat" id="home">
                <div className="absolute inset-0 bg-gradient-to-t to-slate-950/50 via-slate-950/75 from-slate-950"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="font-medium leading-normal text-4xl mb-5 mt-10 text-white">View Applicant Details</h3>
                    </div>
                </div>
            </section>
            <div>
                <ApplicantsListWithFilters />
            </div>
        </div>
    )
}