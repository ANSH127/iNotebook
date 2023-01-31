import React from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        let name = document.getElementById("name").value
        let email = document.getElementById("email").value
        let pass = document.getElementById("password").value
        let cpass = document.getElementById("cpassword").value
        console.log(name,email,pass,cpass)
        if (pass!==cpass) {
            document.getElementById("validation").style.display="block";
            setTimeout(() => {
            document.getElementById("validation").style.display="none";
              
            }, 3000);
        }
      else{
        const respone = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass ,name:name})
        });
        const json = await respone.json()
        console.log(json)
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert("Account Created Successfully","success")


        }
        else {
            if(json.error==='Sorry a user with this email already exist'){
              document.getElementById('emailvalidation').style.display='block';
              setTimeout(() => {
              document.getElementById('emailvalidation').style.display='none';
                
              }, 3000);
            }
            else{
              props.showAlert("Invalid Credentials","danger")
              // alert(json.error)
            }
        }

         }

    }

  return (<section className="vh-100" style={{ "backgroundColor": "#eee" }}>

    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="">
        <div className="card text-black">
          <div>
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="name" className="form-control" />
                      <label className="form-label" htmlFor="name">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="email" className="form-control" />
                      <label className="form-label" htmlFor="email">Your Email</label>
                      <div  style={{'height':'5px'}}>
                      <p id='emailvalidation' style={{'color':'red','display':'none','marginTop':'-10px'}}>Email already exists</p></div>
                    
                      
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="password" className="form-control" autoComplete="on" minLength={5} required />
                      <label className="form-label" htmlFor="password" >Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="cpassword" className="form-control" autoComplete="on" minLength={5} required/>
                      <label className="form-label" htmlFor="cpassword">Repeat your password</label>
                      <div className="container" style={{'height':'10px'}}>
                      <p id='validation' style={{'color':'red','display':'none','marginLeft':'-12px'}}>Password didn't match</p></div>
                    </div>
                  </div>


                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt='' />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
  )
}

export default Signup