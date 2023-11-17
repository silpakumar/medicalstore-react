import { Link   } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; 



function MedicineListItem(props){
    var user = useSelector(store =>store.auth.user)
    // const location = useLocation();
    
    
    function deleteMedicine() {
        const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
        if (confirmDelete) {

        
        axios.delete('https://medicalstore.mashupstack.com/api/medicine/' + props.medicine.id,
         {headers:{Authorization: "Bearer " + user.token}
        }).then(response =>{
            
            props.refresh()

        })
    }
    }
    return <div className="card">
        <div className="card-body">
            {props.medicine.name}
            <button className="btn btn-danger float-right mr-2" 
            onClick={deleteMedicine}>Delete</button>

            <Link to={"/blog/medicines/" + props.medicine.id + "/edit"} 
            className ="btn btn-secondary float-right mr-2">Edit</Link>

            <Link to={"/blog/medicines/"+props.medicine.id+"/view"} 
            className="btn btn-primary float-right mr-2">View</Link>


        </div>
    </div>


}

export default MedicineListItem;