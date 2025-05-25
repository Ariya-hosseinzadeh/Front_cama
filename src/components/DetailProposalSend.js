import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./Context/AuthContext"
import { toast } from "react-toastify"


const DetialeProposalSend=(props)=>{
    const{fetchWithAuth}=useContext(AuthContext)
    const id=props.id
    const [dataPropsor,setDataPropsor]=useState([])
    const [responsePropsor,setResponse]=useState(false)
    const [dataSend,setData]=useState({
        message:'',
        price:'',
        agreement_price:true,
        
    })
    useEffect(
        ()=>{ 
            const ReciveInvite=async ()=>{
                try{
                    let response=await fetchWithAuth(
                        `https://127.0.0.1:8000/classroom/my-proposal-send/${id}`
                        ,{
                            method:'GET',
                           
                        }
                        
                    )
                    if(response.ok){
                        let data=await response.json()
                        setDataPropsor([data])
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
        fetchWithAuth(`https://127.0.0.1:8000/classroom/my-proposal-send/${id}/`,{
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
    const DeleteProposal=()=>{
        fetchWithAuth(`https://127.0.0.1:8000/classroom/my-proposal-send/${id}/`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            
        })
        .then(
            res=>{
                if (res.ok){
                    toast.success('پیشنهاد شما با موفقیت حذف شد')
                }
                else{
                    toast.error('خطا در انجام فرآیند')
                }
            }
        )
        
        
    }
    return(
        <>
            <div>
                
                {
                    dataPropsor.map(
                        (item)=>
                            
                            <div key={item.id} >
                                <h3>
                                    {item.Course_name}
                                </h3>
                                <h4>
                                    {item.user_proposal_name}
                                </h4>
                                <h4>
                                    {item.price}
                                </h4>
                                <h6>
                                    {item.status}
                                </h6>
                                <p>
                                    {item.message}
                                </p>  
                                <p>
                                    {item.created_at}
                                </p>
                                <div>
                                    <button onClick={()=>setResponse(!responsePropsor)}>
                                       ویرایش کردن
                                    </button>
                                </div>
                                
                                <div>
                                    <button onClick={()=>DeleteProposal()}>
                                        حذف کردن
                                    </button>
                                </div>
                            </div>
                            
                        
                    )
                }
                {
                    responsePropsor && (
                        <form onSubmit={handleSubmit}>
                    <label>
                        message:
                        <input type="text" name="message" value={dataSend.message} onChange={(e)=>setData({...dataSend,message:e.target.value})}/>
                    </label>
                    <label>
                    price:
                    <input name="price" value={dataSend.price} onChange={(e)=>setData({...dataSend,price:e.target.value})}/>
                    </label>
                    
                    <label>
                        agreement_price:
                        <input type="checkbox" value={dataSend.agreement_price} onChange={(e)=>setData({...dataSend,agreement_price:e.target.value})}/>
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
export default DetialeProposalSend