import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/Context/AuthContext"
import DetialeInventaionRecieve from "../../components/DetaileInvetaionRecieve"
import DetialeProposalSend from "../../components/DetailProposalSend"


const ProposalSend=()=>{
    const [myProposal,setProposals]=useState([])
    const [selectInvitations,setSelectInvitations]=useState(null)
    const {fetchWithAuth}=useContext(AuthContext)
    useEffect(
        ()=>{
            fetchWithAuth('https://127.0.0.1:8000/classroom/proposal-send/',{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                }

            })
            .then(
                res=> {
                    if(res.ok){
                        return res.json()
                    }
                    else{
                        return res.json().then(
                            errorData=>{return Promise.reject(errorData)}
                        )
                    }
                }
            )
            .then(
                data=>setProposals(data)
            )
            .catch(
                error=>console.log(error)
            )
        },[]
    )
    return(
        <>
        
            <div>
                {
                    console.log(myProposal)
                }
            {
                selectInvitations===null?
                <div>
                {
                    myProposal.map(
                        (item) => 
                        <div>
                            <button key={item.id} onClick={()=>setSelectInvitations(item.id)}>
                                <ul key={item.id}>
                                    <li>
                                        {item.course_name}
                                    </li>
                                    <li>
                                        {item.message}
                                    </li>
                                    <li>
                                        {item.status}
                                    </li>
                                </ul>
                                tesst
                            </button>
                         </div>

                        
                    )
                }
            </div>:
            <div>
                <DetialeProposalSend id={selectInvitations}/>
            </div>
            }
        
            </div>
        </>
    )
}
export default ProposalSend