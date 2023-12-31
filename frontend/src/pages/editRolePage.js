import { useLocation } from 'react-router-dom';
import HREditRole from '../component/HREditRole';

export default function EditRolePage(props) {
    const location = useLocation();
    const role = location.state.role
    
    return (
        <div className='editRolePage'>
            <section className="py-26 lg:py-36 w-full relative table bg-top bg-no-repeat" id="home">
                <div className="absolute inset-0 bg-gradient-to-t to-slate-950/50 via-slate-950/75 from-slate-950"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="font-medium leading-normal text-4xl mb-5 mt-10 text-white">Edit Role Listing</h3>
                    </div>
                </div>
            </section>
            <div>
                <HREditRole role={role}/>
            </div>
        </div>
    )
}