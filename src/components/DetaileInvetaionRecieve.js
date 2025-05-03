import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./Context/AuthContext"
import { toast } from "react-toastify"


const DetialeInventaionRecieve=(props)=>{
    const{fetchWithAuth}=useContext(AuthContext)
    const id=props.id
    const [dataInvite,setInvite]=useState([])
    const [responseInvite,setResponse]=useState(false)
    const [dataSend,setData]=useState({
        description:'',
        status:''
    })
    useEffect(
        ()=>{ 
            const ReciveInvite=async ()=>{
                try{
                    let response=await fetchWithAuth(
                        `https://127.0.0.1:8000//classroom/detail-my-inventation-recive/${id}`
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
        fetchWithAuth(`https://127.0.0.1:8000//classroom/detail-my-inventation-recive/${id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
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
                                    {item.creator_name}
                                </h4>
                                <h4>
                                    {item.code_Creator}
                                </h4>
                                <h6>
                                    {item.status}
                                </h6>
                                <p>
                                    {item.description}
                                </p>  
                                
                                <div>
                                    <button onClick={()=>setResponse(!responseInvite)}>
                                        پاسخ دادن 
                                    </button>
                                </div>
                            </div>
                            
                        
                    )
                }
                {
                    responseInvite && (
                        <form onSubmit={handleSubmit}>
                    <label>
                        توضیحات پاسختان را وارد کنید
                        <input type="text" name="description" value={dataSend.description} onChange={(e)=>setData({...dataSend,description:e.target.value})}/>
                    </label>
                    <label>
                    وضعیت پاسخ:
                    </label>

                    <select name="status" value={dataSend.status} onChange={(e)=>setData({...dataSend,status:e.target.value})}>
                        <option>
                           وضعیت پاسختان را انتخاب کنید
                        </option>
                        <option value={'pending'}>
                        Pending
                        </option>
                        <option value={'accepted'}>
                        Accepted
                        </option>
                        <option value={'rejected'}>
                        Rejected
                        </option>
                    </select>
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
export default DetialeInventaionRecieve