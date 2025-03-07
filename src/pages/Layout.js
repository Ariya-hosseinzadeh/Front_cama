import { Outlet, Link } from "react-router-dom";
import Headers from "../Layout/Header";
const Layout=()=>{
    return(
        <>  
        <header>
           <Headers/>
        <nav>
                <ul>
                    
                    <li>
                        <Link to='/profile'>صفحه شخصی</Link>
                    </li>
                    <li>
                        <Link to='/sing-in'>ورود</Link>
                    </li>
                    <li>
                        <Link to='/'>خانه</Link>
                    </li>
                    <li>
                        <Link to='/course-hall'>تالار انتظار </Link>
                    </li>
                    <li>
                        <Link to='/course-record'>دوره ها</Link>
                    </li>
                    <li>
                        <Link to='/course'>کلاس های من</Link>
                    </li>
                    <li>
                        <Link to='/complaint'>شکایات</Link>
                    </li>
                    <li>
                        <Link to='uninvercity'>دانشگاه</Link>
                    </li>
                    <li>
                        <Link to='/community'>انجمن ها</Link>
                    </li>
                    <li>
                        <Link to='/about-cama'>درباره کاما</Link>
                    </li>
                    
                </ul>
            </nav>
        </header>
            
            <main>
                <Outlet/>
                
            </main>
            <footer>

            </footer>
            
        </>

    )
}
export default Layout;