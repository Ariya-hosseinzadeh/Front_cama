import { useState, useEffect,useContext } from "react";
import { Outlet,NavLink,Link} from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '../static/logo/Kama.webp'
import { AuthContext } from "../components/Context/AuthContext";
import { label } from "framer-motion/client";

const Layout = () => {

  const [navbar, setNavbar] = useState(false);
  const{user}=useContext(AuthContext)
  const{logout}=useContext(AuthContext)
  
  // جلوگیری از اسکرول صفحه هنگام باز بودن منو
  useEffect(() => {
    document.body.style.overflow = navbar ? "hidden" : "auto";
  }, [navbar]);
  
  return (
    <div className="bg-[#F0FDF4] min-h-screen">
      {/* نوار بالای صفحه */}
      <header className="bg-[#0B3954] shadow-md text-white sticky top-0 z-50 backdrop-blur-md bg-opacity-90 transition-all">
        <div className="flex items-center justify-between h-16 px-6">
          {/* دکمه باز/بسته کردن منو (در موبایل) */}
          <button onClick={() => setNavbar(!navbar)} className="text-slate-900 dark:text-white text-3xl md:hidden">
            {navbar ? <X /> : <Menu />}
          </button>

          {/* لوگو یا عنوان */}
          

          {/* دکمه‌های تنظیمات */}
          <div className="flex gap-4">
            <button className="text-slate-900 dark:text-white text-xl">Lang</button>
            <button className="text-slate-900 dark:text-white text-xl">Dark</button>
          </div>
          <div className="w-24 bg-white h-5/6">
            <img src={logo} />
          </div>
        </div>

        {/* نوار ناوبری */}
        <nav
  className={`absolute top-16 left-0 w-full bg-[#6c63ff] shadow-md md:relative md:top-0 md:flex md:justify-center transition-transform duration-300 ${navbar ? "block" : "hidden md:block"}`}
>
  <ul className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0 w-full">
    {/* {[
      { to: "/", label: "خانه" },
      { to: "/sing-in", label: "ورود" },
      { to: "/profile", label: "صفحه شخصی" },
      { to: "/course-hall", label: "تالار انتظار" },
      { to: "/course-record", label: "دوره‌ها" },
      { to: "/course", label: "کلاس‌های من" },
      { to: "/complaint", label: "شکایات" },
      { to: "/university", label: "دانشگاه" },
      { to: "/community", label: "انجمن‌ها" },
      { to: "/about-cama", label: "درباره کاما" },
    ].map((item, index) => (
      <li key={index} className="w-full md:w-auto flex justify-center">
        <NavLink to={item.to} className="block px-4 py-2 hover:bg-[#16A34A] rounded-md w-full md:w-auto text-center" activeClassName="block px-4 py-2 md:w-auto text-center  bg-violet-700" onClick={()=>setNavbar(!navbar)}>
          {item.label}
        </NavLink>
      </li>
    ))} */}
    <li className="w-full md:w-auto flex justify-center">
    {user ? (
        <button onClick={logout} className="block px-4 py-2 rounded-md w-full md:w-auto text-center transition hover:bg-[#16A34A] focus:bg-slate-700 active:bg-violet-700 text-white">خروج</button>
      ) : (
        <>
          <NavLink to="/sing-in" className={({ isActive }) =>`block px-4 py-2 rounded-md w-full md:w-auto text-center transition ${
           isActive ? "bg-violet-700 text-white" : "hover:bg-[#16A34A]"
          }`} onClick={() => setNavbar(!navbar)}>"ثبت نام/ورود</NavLink>
          
        </>
      )}
    </li>
    {[
      // { to:`${user?'/log-out':'/sing-in'}`, label: `${user?"خروج":"ثبت نام/ورود"}` },
      // // {to:'/sing-in',label:'ثبت نام/ورود'},
      { to: "/", label: "خانه" },  
      { to: "/profile", label: "صفحه شخصی" },
      { to: "/course-hall", label: "تالار انتظار" },
      { to: "/course-record", label: "دوره‌ها" },
      { to: "/course", label: "ایجاد کلاس" },
      { to: "/community", label: "انجمن" },
      { to: "/about-cama", label: "درباره کاما" },
    ].map((item, index) => (
      <li key={index} className="w-full md:w-auto flex justify-center">
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md w-full md:w-auto text-center transition ${
              isActive ? "bg-violet-700 text-white" : "hover:bg-[#16A34A] focus:bg-slate-700"
            }`
          }
          onClick={() => setNavbar(!navbar)}
        >
          {item.label}
        </NavLink>
      </li>
    ))}
  </ul>
</nav>

      </header>

      <main className="p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-300 py-10 px-6 sm:px-12 lg:px-24">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* درباره کاما */}
    <div>
      <h2 className="text-xl font-bold text-white mb-3">درباره کاما</h2>
      <p className="text-sm leading-6">
        کاما یک پلتفرم آموزشی است که ارتباط مستقیم میان دانشجویان و اساتید را فراهم می‌کند.
      </p>
    </div>

    {/* لینک‌های مهم */}
    <div>
      <h2 className="text-xl font-bold text-white mb-3">لینک‌های مهم</h2>
      <ul className="space-y-2">
        <li><Link to="/about" className="hover:text-white">درباره ما</Link></li>
        <li><Link to="/contact" className="hover:text-white">تماس با ما</Link></li>
        <li><Link to="/faq" className="hover:text-white">سوالات متداول</Link></li>
        <li><Link to="/terms" className="hover:text-white">شرایط و قوانین</Link></li>
      </ul>
    </div>

    {/* دسترسی سریع */}
    <div>
      <h2 className="text-xl font-bold text-white mb-3">دسترسی سریع</h2>
      <ul className="space-y-2">
        <li><Link to="/sign-in" className="hover:text-white">ورود / ثبت‌نام</Link></li>
        <li><Link to="/teach" className="hover:text-white">تدریس در کاما</Link></li>
        <li><Link to="/consult" className="hover:text-white">درخواست مشاوره</Link></li>
      </ul>
    </div>

    {/* شبکه‌های اجتماعی */}
    <div>
      <h2 className="text-xl font-bold text-white mb-3">ما را دنبال کنید</h2>
      <div className="flex space-x-4">
        <a href="https://linkedin.com" target="_blank" className="hover:text-white">
          <i className="fab fa-linkedin text-xl"></i>
        </a>
        <a href="https://instagram.com" target="_blank" className="hover:text-white">
          <i className="fab fa-instagram text-xl"></i>
        </a>
        <a href="https://twitter.com" target="_blank" className="hover:text-white">
          <i className="fab fa-twitter text-xl"></i>
        </a>
        <a href="https://youtube.com" target="_blank" className="hover:text-white">
          <i className="fab fa-youtube text-xl"></i>
        </a>
      </div>
    </div>
  </div>

  {/* کپی‌رایت */}
  <div className="text-center text-sm text-gray-500 border-t border-gray-700 mt-8 pt-4">
    © 2025 کاما. تمامی حقوق محفوظ است.
  </div>
</footer>

    </div>
  );
};

export default Layout;
// mport { useState,useEffect } from "react";
// import { Outlet, Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// const Layout=()=>{
//     const[navbar,setNavbar]=useState(false)
//     useEffect(() => {
//         if (navbar) {
//           document.body.style.overflow = "hidden";
//         } else {
//           document.body.style.overflow = "auto";
//         }
//       }, [navbar]);
//     //کتابخانه npm install lucide-react
//     return(
//        <div className="bg-slate-100">
//             <header>
//             <div >
//                 <div className="grid grid-cols-4 h-20">
//                 <div className="flex items-center justify-between h-20 px-4 bg-slate-300">
//                     <button onClick={() => setNavbar(!navbar)} className="text-slate-900 dark:text-white text-3xl">
//                         {navbar ? <X /> : <Menu />}
//                     </button>
//                     <button className="text-slate-900 dark:text-white text-3xl">lang</button>
//                     <button className="text-slate-900 dark:text-white text-3xl">dark</button>
//             </div>
//                     <div className='bg-slate-600 col-span-2 grid grid-cols-8 grid-rows-4'>
//                         <div className=" bg-slate-50 col-start-2 col-end-8 row-span-2 row-start-2">

//                         </div>
//                     </div>
//                     <div className='bg-slate-900'></div>
//                 </div>
//             </div>
            
//                 {
//                     navbar?
//                     <nav className={`flex left-0 top-20 w-full bg-zinc-100 shadow-md transition-transform duration-300 ${navbar ? "translate-y-0" : "-translate-y-full"}`}>
//                 <ul className="p-4 space-y-2">
                    
//                     <li>
//                         <Link to='/profile'>صفحه شخصی</Link>
//                     </li>
//                     <li>
//                         <Link to='/sing-in'>ورود</Link>
//                     </li>
//                     <li>
//                         <Link to='/'>خانه</Link>
//                     </li>
//                     <li>
//                         <Link to='/course-hall'>تالار انتظار </Link>
//                     </li>
//                     <li>
//                         <Link to='/course-record'>دوره ها</Link>
//                     </li>
//                     <li>
//                         <Link to='/course'>کلاس های من</Link>
//                     </li>
//                     <li>
//                         <Link to='/complaint'>شکایات</Link>
//                     </li>
//                     <li>
//                         <Link to='uninvercity'>دانشگاه</Link>
//                     </li>
//                     <li>
//                         <Link to='/community'>انجمن ها</Link>
//                     </li>
//                     <li>
//                         <Link to='/about-cama'>درباره کاما</Link>
//                     </li>
                    
//                 </ul>
//             </nav>: <div></div>
//                 }
            
//         </header>
            
//             <main>
//                 <Outlet/>
                
//             </main>
//             <footer>

//             </footer>
//        </div>
//     )
// }
// export default Layout;