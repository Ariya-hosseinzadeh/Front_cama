import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/Context/AuthContext"
import DetialeProposalRecieve from '../../components/DetialeProposalRecieve'
import { data } from "react-router-dom"


const ProposalRecieve=()=>{
    const [proposals,setProposals]=useState([])
    const [selectProposal,setSelectProposals]=useState(null)
    const {fetchWithAuth}=useContext(AuthContext)
    useEffect(
        ()=>{
            fetchWithAuth('https://127.0.0.1:8000/classroom/proposal-courses/',{
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
                console.log(proposals)
            }
            {
                selectProposal===null?
                <div>
                    
                {
                    proposals.map(
                        (item) => 
                        <button key={item.id} onClick={()=>setSelectProposals(item.id)}>
                            <ul key={item.id}>
                            <li>
                                {item.course_name}
                            </li>
                            <li>
                                {item.user_proposal_name}
                            </li>
                            <li>
                                {item.status}
                            </li>
                            <li>
                                {item.created_at}
                            </li>
                        </ul>
                        </button>
                    )
                }
            </div>:
            <div>
                <DetialeProposalRecieve id={selectProposal}/>
            </div>
            }
        
            </div>
        </>
    )
}
export default ProposalRecieve