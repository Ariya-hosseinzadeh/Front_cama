import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Profile from "./pages/Profile";
import Univercity from "./pages/Univercity"
import Nopage from "./pages/Nopage"
import AboutCama from "./pages/AboutCama"
import Course from "./pages/Course"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='profile' element={<Profile/>} />
          <Route path='sing-in' element={<Signin/>}/>
          <Route index element={<Home/>}/>
          <Route path='course-hall' element={<CourseHall/>}/>
          <Route path='course' element={<Course/>}/>
          <Route path='course-record' element={<CourseRecord/>}/>
          <Route path='univercity' element={<Univercity/>}/>
          <Route path='complaint' element={<Complaint/>}/>
          <Route path='community' element={<Community/>}/>
          <Route path='about-cama' element={<AboutCama/>}/>
          <Route path='*' element={<Nopage/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
