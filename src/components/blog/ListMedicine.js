import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import MedicineListItem from "./MedicineListItem";
import { Link } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";


function ListMedicine() {
  const [medicines, setMedicines] = useState([]);
  const user = useSelector((store) => store.auth.user);

  const fetchMedicines = useCallback(() => {
    if (user && user.token) {
      axios.get("https://medicalstore.mashupstack.com/api/medicine", 
        {
          headers: { Authorization: "Bearer " + user.token },

        })
        .then((response) => {
          setMedicines(response.data);
          
        });
    }
  }, [user]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  return (
    <div style={{ backgroundImage: 'url("https://img.freepik.com/premium-photo/falling-red-white-capsules-pink-background_434420-2130.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Medicines</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/blog/medicines/create" className="btn btn-success mb-2">
              Create Medicine
            </Link>
            {medicines.map((medicine) => (<MedicineListItem key={medicine.id} medicine={medicine} refresh={fetchMedicines}
            />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListMedicine);
