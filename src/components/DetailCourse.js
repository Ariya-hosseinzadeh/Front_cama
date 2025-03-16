import { useEffect, useState } from "react"

const DetailCourse=(props)=>{
    const id=props.id
    const content_type=props.content_type
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
    const [suggestionCourse,setsuggestion]=useState(false)
    useEffect(()=>{
            
        const fetchData = async () => {
            try {
              if (content_type===12){
                const response = await fetch(`https://127.0.0.1:8000/classroom/detail-course-request/${id}`);
                const detailCart = await response.json();
              setDetail(
                  {...detailCart}
              )
              console.error(detailCart)
              }
              else if(content_type===30){
                const response = await fetch(`https://127.0.0.1:8000/classroom/detail-course-create/${id}`);
                const detailCart = await response.json();
              setDetail(
                  {...detailCart}
              )
              console.error(detailCart)
              }
              else{
                console.log('error unknown')
              }
              
            } catch (error) {
              console.error("خطا در دریافت اطلاعات:", error);
            } finally {
              setLoading(false);
      
            }
          };
      
          fetchData();
          
          console.log(detail)
        },[id, content_type]
    )
const handleeventClick=()=>{
    setsuggestion(!suggestionCourse)
}
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
                <button onClick={handleeventClick}>
                    پیشنهاد دادن
                </button>
            </div>
            <div>
                {
                    suggestionCourse&&(
                        <div>
                            <form>
                                <input type="text" placeholder=""/>
                            </form>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default DetailCourse