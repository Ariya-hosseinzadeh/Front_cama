import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./Context/AuthContext"
import { toast } from "react-toastify"


const DetialeInventaionSend=(props)=>{
    const{fetchWithAuth}=useContext(AuthContext)
    const id=props.id
    const [dataInvite,setInvite]=useState([])
    const [responseInvite,setResponse]=useState(false)
    const [dataSend,setData]=useState({
        description:''
        
    })
    useEffect(
        ()=>{ 
            const ReciveInvite=async ()=>{
                try{
                    let response=await fetchWithAuth(
                        `https://127.0.0.1:8000//classroom/detail-my-inventation-send/${id}`
                        ,{
                            method:'GET',
                           
                        }
                        
                    )
                    if(response.ok){
                        let data=await response.json()
                        setInvite([data])
                    }
                    if(!response.ok){
                        let errorData=await response.json()
                        throw errorData
                    }
                }
                catch(error){
                    console.log(error)
                }
            }
            ReciveInvite()
        },[id]
    )
    const handleSubmit=(e)=>{
        e.preventDefault()
        let data={...dataSend}
        fetchWithAuth(`https://127.0.0.1:8000//classroom/detail-my-inventation-send/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(
            res=>res.ok?res.json():Promise.reject(res)
        )
        .then(
            data=>console.log(data)
        )
        .catch(
            error=>
                toast.error('error')
        )
    }
const DeleteInvent=()=>{
    fetchWithAuth(`https://127.0.0.1:8000//classroom/detail-my-inventation-send/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    }
    )
    .then(res=>res.ok?res.json():Promise.reject(res))
    .then(data=>
        toast.success('دعوت تان با موفقیت حذف شد')
    )
    .catch(
        error=>toast.error(error)
    )
}
    return(
        <>
            <div>
                
                {
                
                    dataInvite.map(
                        (item)=>
                            
                            <div key={item.id} >
                                <h3>
                                    {item.Course_name}
                                </h3>
                                <h4>
                                    {item.teacher_name}
                                </h4>
                                <h4>
                                    {item.code_teacher}
                                </h4>
                                <h6>
                                    {item.status}
                                </h6>
                                <p>
                                    {item.description}
                                </p>  
                                <p>
                                    {item.created_at}
                                </p>
                                <div>
                                    <button onClick={()=>setResponse(!responseInvite)}>
                                        ویرایش کردن
                                    </button>
                                </div>
                                <div>   
                                    <button onClick={()=>DeleteInvent()}>
                                        حذف دعوت 
                                    </button>
                                </div>
                            </div>
                            
                        
                    )
                }
                {
                    responseInvite && (
                        <form onSubmit={handleSubmit}>
                    <label>
                        توضیحات :
                        <input type="text" placeholder="توضیحات دعوت تان را تغییر دهید" name="description" value={dataSend.description} onChange={(e)=>setData({...dataSend,description:e.target.value})}/>
                    </label>
                    
                    <button>
                        send
                    </button>
                </form>
                    )
                }
            </div>
        </>
    )
}
export default DetialeInventaionSend