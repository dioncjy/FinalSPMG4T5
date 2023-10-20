import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Router} from 'react-router-dom';
import AboutUs from './main/aboutus';
import './assets/css/tailwind.css'
import './assets/libs/@mdi/font/css/materialdesignicons.min.css'
import './assets/libs/@iconscout/unicons/css/line.css'
import './assets/libs/tobii/css/tobii.min.css'
import './assets/images/favicon.ico'
import BlogDetail from './main/blog-detail';
import Blogs from './main/blogs';
import ContactUs from './main/contactus';
import IndexFour from './main/index-four';
import IndexThree from './main/index-three';
import IndexTwo from './main/index-two';
import Index from './main';
import Login from './main/login';
import Pricing from './main/pricing';
import ResetPassword from './main/reset-password';
import Services from './main/services';
import Signup from './main/signup';
import Team from './main/team';
import Switcher from './component/Switcher';
import ScrollToTop from './component/Scroll-top';
import IndexHr from './main/index-hr';
import IndexStaff from './main/index-staff';
import Roles from './pages/roles';
import StaffApplicationForm from './pages/staffApplicationFormPage';
import ListingPage from './pages/listingPage';
import AddRolePage from './pages/addRolePage';
import EditRolePage from './pages/editRolePage';
import ViewApplicantDetails from './pages/viewApplicantDetails';
import RoleApplicantsPage from './pages/viewApplicantsByRole';
import NavbarSmallLight from './component/navbar-small-light';
import { useRoleContext } from './context/roleContext';

export default function App() {
  const { selectedRole } = useRoleContext();
  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add('light');
  }, []);

  return (
    <BrowserRouter >
    <NavbarSmallLight userRole={selectedRole}/>
      <ScrollToTop />
        <Routes>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blog-detail" element={<BlogDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/index-four" element={<IndexFour />} />
          <Route path="/index-three" element={<IndexThree />} />
          <Route path="/index-two" element={<IndexTwo />} />
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/team" element={<Team />} />
          <Route path="/" element={<Index />} />
          <Route path="/index-hr" element={<IndexHr />} />
          <Route path="/index-staff" element={<IndexStaff />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/staffApplicationForm" element={<StaffApplicationForm />} />
          <Route path="/viewApplicantDetails" element={<ViewApplicantDetails />} />
          {/* <Route path="/listingPage" element={<ListingPage />} /> */}

          <Route path="/viewApplicantsByRole" element={<RoleApplicantsPage />} />

          <Route path="/listingPage/:id" element={<ListingPage />} />
          <Route path="/addRolePage" element={<AddRolePage />} />
          <Route path="/editRolePage/:role_name" element={<EditRolePage />} />
        </Routes>
      <Switcher />
    </BrowserRouter>
  )
};