import Footer from '../component/footer';
import Features from '../component/features';
import {Button} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { useRoleContext } from '../context/roleContext';

export default function Index() {
    const {selectedRole, setSelectedRole} = useRoleContext();

    const staffLoginData = {
        username : "staff",
        password : 12345,
        staff_id : 140001 
    }

    const HRLoginData = {
        username : "hr",
        password : 12345
    }

    const navigate = useNavigate();
    
    const handleStaffClick = () => {
        setSelectedRole(staffLoginData)
        navigate("/index-staff")
    }

    const handleHRClick = () => {
        setSelectedRole(HRLoginData)
        navigate("/index-hr")
    }

    return (
        <>
            <section className="py-36 lg:py-56 w-full relative table bg-[url('../../assets/images/bg/bg.jpg')] bg-top bg-no-repeat" id="home">
                <div className="absolute inset-0 bg-gradient-to-t to-slate-950/50 via-slate-950/75 from-slate-950"></div>
                <div className="container">
                    <div className="flex flex-col pb-8 text-center mt-10">
                        <div className="text-white text-3xl">
                            <p className="">Welcome, you are logging in as: </p>
                        </div>
                        
                        <div className="py-8">
                            <Button onClick={handleStaffClick} size="md" className="bg-violet-600">Staff</Button>
                        </div>
                        
                        <div>
                            <Button onClick={handleHRClick} size="md" className="bg-violet-600">HR</Button>
                        </div>
                    </div>
                </div>
            </section>
            <Features />
            <Footer />
        </>
    )
}
