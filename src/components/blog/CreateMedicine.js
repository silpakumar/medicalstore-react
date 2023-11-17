import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

function CreateMedicine() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [expiry_date, setExpirydate] = useState('');
  var navigate = useNavigate();
  var user = useSelector(store => store.auth.user);

  function createMedicine() {

    axios.post('https://medicalstore.mashupstack.com/api/medicine', {
      name: name,
      company: company,
      expiry_date: expiry_date
    }, {
      headers: { Authorization: "Bearer " + user.token }
    }).then(response => {
      navigate('/blog/medicines');
    });
  }
  function goBack() {
    navigate(-1); 
  }
  
  return (
    <div style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/top-view-pills-with-syringe_23-2148021462.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 my-2 p-5">
            <h1 className="text-center text-success">Add Medicine</h1>
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
              <input
                type="text"
                className="form-control"
                value={company}
                onChange={(event) => { setCompany(event.target.value) }}
              />
            </div>
            <div className="form-group">
              <label>expiry_date:</label>
              <input
                type="date"
                className="form-control"
                value={expiry_date}
                onChange={(event) => { setExpirydate(event.target.value) }}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary float-right" onClick={createMedicine}>Submit</button>
            </div>
            <div className="form-group">
              <button className="btn btn-secondary" onClick={goBack}>Go Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMedicine;
