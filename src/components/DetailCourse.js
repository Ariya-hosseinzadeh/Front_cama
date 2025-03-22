import { useContext, useEffect, useState } from "react"
import {AuthContext} from './Context/AuthContext'
const DetailCourse=(props)=>{
    const {fetchWithAuth}=useContext(AuthContext)
    const id=props.id
    const content_type=props.content_type
    const [errors,setError]=useState(null)
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
            
              if (content_type===12){
                try{
                    let response = await fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-request/${id} `,{method:'GET'});
                    if(response.ok){
                        let data = await response.json();
                        setDetail({...data})
                    }
                    if(!response.ok){
                        let errorData = await response.json();
                        throw errorData
                    }
            }
            catch (error){
                setError({...error})

            }}
            
              else if(content_type===30){
                try{
                    const response = await fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-create/${id}`,{method:'GET'});
                    if(response.ok){
                        let data=await response.json()
                        setDetail({...data})

                    }
                    if(!response.ok){
                        let errorData=await response.json()
                        throw errorData
                    }
                }
                catch(error){
                    setError({...error})
                }
                
            
          };
      
          
        }
        fetchData();
          
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