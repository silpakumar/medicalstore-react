import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EditMedicine() {
    const { medicineId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpirydate] = useState('');

    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user);

    useEffect(() => {
        if (user && user.token) {
            axios.get(`https://medicalstore.mashupstack.com/api/medicine/${medicineId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            })
                .then(response => {
                    setName(response.data.name);
                    setCompany(response.data.company);
                    setExpirydate(response.data.expiry_date);
                })
                .catch(error => {
                    console.error("Error fetching medicine data:", error);
                });
        }
    }, [medicineId, user]);

    function updateMedicine() {
        axios.post(`https://medicalstore.mashupstack.com/api/medicine/${medicineId}`, {
            name: name,
            company: company,
            expiry_date: expiry_date
        }, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
            .then(response => {
                navigate("../blog/medicines");
            })
            .catch(error => {
                console.error("Error updating medicine:", error);
            });
    }

    return (
        <div style={{ backgroundImage: 'url("https://mldi5dmmdvnt.i.optimole.com/w:1024/h:683/q:90/f:avif/https://simtechdev.com/wp-content/uploads/2022/07/volodymyr-hryshchenko-e8YFkjN2CzY-unsplash.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-6 my-5 p-5">
                        <h1 className="text-center text-secondary">Edit</h1>
                        <div className="form-group">
                            <label>name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>company:</label>
                            <textarea
                                className="form-control"
                                value={company}
                                onChange={(event) => { setCompany(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>expiry_date:</label>
                            <input type="date"
                                className="form-control"
                                value={expiry_date}
                                onChange={(event) => { setExpirydate(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={updateMedicine}>Submit</button>
                        </div>
                        {/* Go Back Button */}
                        <div className="form-group">
                            <Link to="../blog/medicines" className="btn btn-secondary">Go Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditMedicine;
