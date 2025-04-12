import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../src/components/Context/AuthContext'
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Layout from './pages/Layout';
import CourseHall from './pages/CourseHall';
import CourseRecord from './pages/CourseRecord';
import Complaint from './pages/Complaint';
import Community from "./pages/Community";
import Signin from "./pages/Singin";
import ProfileLayout from "./pages/ProfileLayout";
import Univercity from "./pages/Univercity"
import Nopage from "./pages/Nopage"
import AboutCama from "./pages/AboutCama"
import Course from "./pages/Course"
import ScrollFix from './components/ScrollFix';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InformationProfile from './Profile/InformationPrivate'
import Articles from './Profile/Articles'
import Topics from './Profile/Topics'
import Messages from './Profile/Messages'
import InformationCorse from './Profile/InformationCourse'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <ToastContainer autoClose={2000} />
    <AuthProvider>
    <BrowserRouter>
    <ScrollFix/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='profile' element={<ProfileLayout/>} >
            <Route path='informatoion-private' element={<InformationProfile/>}/>
            <Route path='information-course' element={<InformationCorse/>}/>
            <Route path='articles' element={<Articles/>}/>
            <Route path='messages' element={<Messages/>}/>
            <Route path='topics' element={<Topics/>}/>
          </Route>
          <Route path='sing-in' element={<Signin/>}/>
          <Route path='about-cama' element={<AboutCama/>}/>
          <Route index element={<Home/>}/>
          <Route path='course-hall' element={<CourseHall/>}/>
          <Route path='course' element={<Course/>}/>
          <Route path='course-record' element={<CourseRecord/>}/>
          <Route path='univercity' element={<Univercity/>}/>
          <Route path='complaint' element={<Complaint/>}/>
          <Route path='community' element={<Community/>}/>
          <Route path='*' element={<Nopage/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
    </>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
