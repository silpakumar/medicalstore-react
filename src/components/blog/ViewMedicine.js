import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { useSelector } from "react-redux";

function ViewMedicine() {
    var {medicineId} = useParams()
    var [medicine,setMedicine] = useState({
        name:'',
        company:'',
        expiry_date:'',
    })
    const user = useSelector(store =>store.auth.user)

    useEffect(()=> {
        if (user && user.token) {
        axios.get('https://medicalstore.mashupstack.com/api/medicine/' + medicineId, {
          headers: { Authorization: "Bearer " + user.token },
        }).then (response=>{
            setMedicine(response.data)
        })
        .catch(error => {
            console.error("Error fetching medicine data:", error);
        });
    }
    }, [medicineId, user]);

    const getBackgroundColor = () => {
        const currentDate = new Date();
        const expiryDate = new Date(medicine.expiry_date);

        if (expiryDate < currentDate) {
            return 'red'
        } else {
            return 'green';
        }
    }

    


    return(
        <div style={{ backgroundImage: 'url("https://img.freepik.com/premium-photo/3d-rendering-multi-colored-pills-capsules_44282-112.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
        <Navbar/>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6 my-5 p-5">
                 
                <div className="card" >
                        <div className="card-header" style={{ backgroundColor: getBackgroundColor() }}><h2>Details</h2></div>
                        <div className="card-body">
                            <h5>Name : {medicine.name} </h5>
                            <h5>Company Name : {medicine.company}</h5>
                            <h5>Expired_date : {medicine.expiry_date}</h5>

                        </div>
                      
                    </div>
                    <div className="text-center mt-3">
                     <Link to="/blog/medicines" className="btn btn-secondary">Go Back</Link>
                    </div>

                </div>
            </div>
            
        </div>
        
        <div className="container text-center">
          <div id="demo" className="carousel slide " data-ride="carousel">
            <ul className="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" className="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
            </ul>
            <div className="carousel-inner">
            <div className="carousel-item active">
                <img src="https://img.freepik.com/free-vector/flat-design-healthcare-service-sale-banner_23-2150766982.jpg"
                 alt="medicines" width="600" height="200" className="mx-auto d-block"/>
              </div>
              <div className="carousel-item ">
                <img src="https://onlinemedicinestoresite.files.wordpress.com/2017/10/online-medicine-store-1-638.jpg" 
                alt="medicines" width="600" height="200" className="mx-auto d-block"/>
              </div>
              <div className="carousel-item">
                <img src="https://img.freepik.com/free-psd/3d-background-with-medical-elements-sale_23-2150732527.jpg" 
                alt="medicines" width="600" height="200" className="mx-auto d-block"/>
              </div>
        
            </div>
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
          </div>
        </div>
        
       
    </div>
    )
}
export default ViewMedicine;