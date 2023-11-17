import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useState ,useEffect } from "react";
import checkAuth from "./auth/checkAuth";


function Home() {
    const user = useSelector(store => store.auth.user);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
         setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); 
    
        
    }, []);

    if (!user) {
        return <div>Loading...</div>;
      }
    

      return (
        <div>
          <Navbar></Navbar>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="text-center my-6">Welcome To Medical store, {user.email} !!</h1>
                <p className="text-right text-secondary">Date and Time: {currentDateTime.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="container">
          <div id="demo" className="carousel slide mx-auto" data-ride="carousel">
            <ul className="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" className="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
            </ul>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg" alt="medicines" width="1100" height="500" />
              </div>
              <div className="carousel-item">
                <img src="https://t4.ftcdn.net/jpg/00/75/78/31/360_F_75783184_fCmgIS3e05tWlGhNPe5aOEWknoxb6Pzb.jpg" alt="medicines" width="1100" height="500" />
              </div>
              <div className="carousel-item">
                <img src="https://raisingchildren.net.au/__data/assets/image/0026/49346/medicines-that-can-poisonnarrow.jpg" alt="medicines" width="1100" height="500" />
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
      );
      
    
}

export default checkAuth(Home);