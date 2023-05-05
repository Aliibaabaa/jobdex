import React from 'react';
import './App.css';
import Navbarr from './components/Navbarr';
import { Routes, Route } from "react-router-dom";
import Hero from './components/Hero';
import CompReviews from './components/CompReviews';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp/SignUp';
import Footer from './components/Footer';
import NewUser from './components/SignUp/NewUser';
import PersonalDetails from './components/SignUp/PersonalDetails';
import Education from './components/ProfileDetails/Education';
import AddInfo from './components/ProfileDetails/AddInfo';
import MyProfile from './components/ProfileDetails/MyProfile';
import WorkExperience from './components/ProfileDetails/WorkExp';
import UploadResume from './components/ProfileDetails/UploadResume';
import Skills from './components/ProfileDetails/Skills';
import Home from './components/Home';

function App() {

  return (
    <>
      <nav>
        <Navbarr />
      </nav>

      <br /> <br />

      <hr />
      <main>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>

        <Routes>
          <Route path="/JobList" element={<Hero />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/companyreviews" element={<CompReviews />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/perdetails" element={<PersonalDetails />} />
          <Route path="/prof-educ" element={<Education />} />
          <Route path="/prof-workexp" element={<WorkExperience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/addinfo" element={<AddInfo />} />
          <Route path="/upresume" element={<UploadResume />} />
        </Routes>

      </main >
      <br></br>
      <footer>
        <div className="tag">
          <Footer />
        </div>
      </footer>
    </>


  );
}

export default App;
