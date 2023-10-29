import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Router} from 'react-router-dom';
import './assets/css/tailwind.css'
import './assets/libs/@mdi/font/css/materialdesignicons.min.css'
import './assets/libs/@iconscout/unicons/css/line.css'
import './assets/libs/tobii/css/tobii.min.css'
import './assets/images/favicon.ico'
import Index from './main';
import Login from './main/login';
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
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/index-hr" element={<IndexHr />} />
          <Route path="/index-staff" element={<IndexStaff />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/staffApplicationForm" element={<StaffApplicationForm />} />
          <Route path="/viewApplicantDetails" element={<ViewApplicantDetails />} />
          {/* <Route path="/listingPage" element={<ListingPage />} /> */}

          <Route path="/viewApplicantsByRole/:listingId" element={<RoleApplicantsPage />} />

          <Route path="/listingPage/:id" element={<ListingPage />} />
          <Route path="/addRolePage" element={<AddRolePage />} />
          <Route path="/editRolePage/:role_name" element={<EditRolePage />} />
        </Routes>
      <Switcher />
    </BrowserRouter>
  )
};