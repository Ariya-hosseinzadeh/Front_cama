import { useEffect, useState } from "react"

const DetailCourse=({id})=>{
    const [isloading,setLoading]=useState(true)
    const [detail,setDetail]=useState(
        {
            Title:"",
            LinkAccess:'',
            username:'',
            CodeCreator:'',
            description:'',
            CountClass:'',
            SuggestedTime:'',
            is_private:false,
            created_at:'',

        }
    )
    useEffect(()=>{
            
        const fetchData = async () => {
            try {
              const response = await fetch(`http://127.0.0.1:8000/classroom/detail-request/${id}`);
              const detailCart = await response.json();
              setDetail(
                  {...detailCart}
              )
              console.error(detailCart)
            } catch (error) {
              console.error("خطا در دریافت اطلاعات:", error);
            } finally {
              setLoading(false);
      
            }
          };
      
          fetchData();
          
          console.log(detail)
        },[]
    )
    return(
        <>
            <div>
                <ul>
                    <li>
                        {detail.Title}
                    </li>
                    <li>
                        {detail.LinkAccess}
                    </li>
                    <li>
                        {detail.description}
                    </li>
                    <li>
                        {detail.username}
                    </li>
                    <li>
                        {detail.CodeCreator}
                    </li>
                    <li>
                        {detail.CountClass}
                    </li>
                    <li>
                        {detail.SuggestedTime}
                    </li>
                    <li>
                        {detail.is_private}
                    </li>
                    <li>
                        {detail.created_at}
                    </li>
                </ul>
            </div>
        </>
    )
}
export default DetailCourse