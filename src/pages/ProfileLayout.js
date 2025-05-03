// import { useState } from "react";
// import { Outlet, NavLink } from "react-router-dom";
// import { Menu, X } from 'lucide-react'; // or heroicons
// import { Transition } from '@headlessui/react';

// export default function ProfileLayout() {
//   const [open, setOpen] = useState(false);
//   const [openCourses, setOpenCourses] = useState(false);

//   const navItem = (to, label) => (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
//          ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`
//       }
//       onClick={() => setOpen(false)}
//     >
//       {label}
//     </NavLink>
//   );

//   return (
//     <div className="flex h-screen bg-background text-foreground">
//       {/* Mobile header */}
//       <header className="flex md:hidden items-center justify-between px-4 py-2 border-b">
//         <h1 className="text-xl font-semibold">پروفایل</h1>
//         <button onClick={() => setOpen(!open)} aria-label="منو">
//           {open ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </header>

//       {/* Sidebar / Drawer */}
//       <Transition
//         show={open}
//         enter="transition-transform duration-200"
//         enterFrom="-translate-x-full"
//         enterTo="translate-x-0"
//         leave="transition-transform duration-200"
//         leaveFrom="translate-x-0"
//         leaveTo="-translate-x-full"
//         className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 md:relative md:translate-x-0 md:shadow-none"
//       >
//         <aside className="flex flex-col h-full p-4">
//           <nav className="flex-1 space-y-2 text-sm font-medium">
//             {navItem('information-private', 'اطلاعات شخصی')}
//             {navItem('topics', 'پست‌ها')}
//             {navItem('articles', 'مقالات')}
//             {navItem('messages', 'پیام‌ها')}

//             <button
//               onClick={() => setOpenCourses(!openCourses)}
//               className="flex items-center justify-between w-full px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
//             >
//               <span>اطلاعات کلاس‌ها</span>
//               <svg
//                 className={`w-4 h-4 transform transition-transform ${openCourses ? 'rotate-180' : ''}`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//             <Transition
//               show={openCourses}
//               enter="transition-opacity duration-200"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="transition-opacity duration-150"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <ul className="pl-6 space-y-1">
//                 {navItem('information-course/my-course-request', 'کلاس‌های درخواست شده')}
//                 {navItem('information-course/my-course-create', 'کلاس‌های ایجاد شده')}
//               </ul>
//             </Transition>
//           </nav>
//           <button
//             onClick={() => setOpen(false)}
//             className="mt-auto md:hidden text-sm text-gray-500 hover:underline"
//           >بستن منو</button>
//         </aside>
//       </Transition>

//       {/* Main content */}
//       <main className="flex-1 overflow-auto p-4 md:p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// }




import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

const navItemClass = ({ isActive }) =>
  `block px-4 py-2 rounded-md transition-colors ${
    isActive ? "bg-primary text-red-600" : "hover:bg-muted"
  }`;

const ProfileLayout = () => {
  
 const [subInformationCourse,setsubInformationCourse]=useState(false)
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r p-4 space-y-4">
        <nav>
          <ul className="space-y-2 text-sm font-medium">
            <li><NavLink to="informatoion-private" className={navItemClass}>اطلاعات شخصی</NavLink></li>
            <li><NavLink to="topics" className={navItemClass}>پست‌ها</NavLink></li>
            <li><NavLink to="articles" className={navItemClass}>مقالات</NavLink></li>
            <li><NavLink to="messages" className={navItemClass}>پیام‌ها</NavLink></li>
            <li>
            <button className="block px-4 py-2 font-bold text-gray-500" onClick={()=>setsubInformationCourse(!subInformationCourse)}>کلاس های من</button>
                {subInformationCourse &&
                  <>
                     
                  <ul  className="pl-4 space-y-1 text-sm">
                    <li><NavLink to="information-course/my-course-request" className={navItemClass}>کلاس‌های درخواست شده</NavLink></li>
                    <li><NavLink to="information-course/my-course-create" className={navItemClass}>کلاس‌های ایجاد شده</NavLink></li> 
                     
                </ul>
                <button className="block px-4 py-2 font-bold text-gray-500">
                        دعوت های من 
                      </button>  
                      <ul>
                        <li>
                          <NavLink to='information-course/my-course-request/inventation-send' className={navItemClass}>
                            دعوت های ارسالی 
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='information-course/my-course-request/inventation-recieve' className={navItemClass}>
                            دعوت های دریافتی
                          </NavLink>
                        </li>
                      </ul>
                      <ul>
                      <button className="block px-4 py-2 font-bold text-gray-500">
                        پیشنهادهای من 
                      </button>  
                        <li>
                          <NavLink to='information-course/my-course-request/proposal-send'>
                              پیشنهاد های ارسالی 
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='information-course/my-course-request/proposal-recieve'>
                            پیشنهاد های دریافتی 
                          </NavLink>
                        </li>
                      </ul>
                  </>
                
                }
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};
export default ProfileLayout




// import { Outlet, NavLink } from "react-router-dom";
// const ProfileLayout=()=>{
//     return(
//         <>
//             <div className="flex">
//                 <aside className="w-64 p-4 border-r">
//                     <ul>
//                         <li><NavLink to="informatoion-private">اطلاعات شخصی</NavLink></li>
//                         <li><NavLink to="topics">پست‌ها</NavLink></li>
//                         <li><NavLink to="articles">مقالات</NavLink></li>
//                         <li><NavLink to="messages">پیام‌ها</NavLink></li>
//                         <li>
//                             <NavLink to="information-course">اطلاعات کلاس ها
//                                 <li>
//                                      <NavLink to='information-course/my-course-create'>
//                                         کلاس های ایجاد شده
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                      <NavLink to='information-course/my-course-request'>
//                                         کلاس های درخواست شده
//                                     </NavLink>
//                                 </li>
//                             </NavLink>
//                         </li>
                            
                            
//                     </ul>
//                 </aside>
//                 <main className="flex-1 p-4">
//                 <Outlet />
//                 </main>
//             </div>
//         </>
//     )
// }
// export default ProfileLayout