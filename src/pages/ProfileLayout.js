import { Outlet, NavLink } from "react-router-dom";
const ProfileLayout=()=>{
    return(
        <>
            <div className="flex">
                <aside className="w-64 p-4 border-r">
                    <ul>
                        <li><NavLink to="informatoion-private">اطلاعات شخصی</NavLink></li>
                        <li><NavLink to="topics">پست‌ها</NavLink></li>
                        <li><NavLink to="articles">مقالات</NavLink></li>
                        <li><NavLink to="messages">پیام‌ها</NavLink></li>
                        <li><NavLink to="information-course">اطلاعات کلاس ها</NavLink></li>
                    </ul>
                </aside>
                <main className="flex-1 p-4">
                <Outlet />
                </main>
            </div>
        </>
    )
}
export default ProfileLayout