import React , {useContext} from "react";
import { UidContext } from "../../Appcontent";
import UpdateProfil from "./updateProfil.component"
import Login from "../login.component";


const Profil = ()=>{
    const uid = useContext(UidContext);
    return(
        <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Login {...true}/>
        </div>
      )}
    </div>
    )
}

export default Profil ;