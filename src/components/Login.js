import React from 'react'
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        let email = document.getElementById("email").value
        let pass = document.getElementById("password").value
        const respone = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass })
        });
        const json = await respone.json()
        console.log(json)
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Logged in Successfully","success")
            navigate("/")


        }
        else {
            // alert('invalid')
            props.showAlert("Invalid Details","danger")

        }

    }
    return (
        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <div className="mb-3">
        //             <label htmlhtmlFor="email" className="form-label">Email address</label>
        //             <input type="email" className="form-control" id="email" name='email' />
        //             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        //         </div>
        //         <div className="mb-3">
        //             <label htmlhtmlFor="password" className="form-label">Password</label>
        //             <input type="password" name='password' className="form-control" id="password" autoComplete="on" />
        //         </div>
        //         <button type="submit" className="btn btn-primary" >Submit</button>
        //     </form>
        // </div>
        
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4 my-3">
                                <input type="email"  className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" id="email" name='email' />
                                <label className="form-label" htmlFor="email">Email address</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input type="password" id="password" className="form-control form-control-lg"
                                    placeholder="Enter password" name='password' autoComplete="on"/>
                                <label className="form-label" htmlFor="password">Password</label>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{"paddingLeft":"2.5rem","paddingRight":"2.5rem"}}>Login</button>
                                
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            
        
    )
}

export default Login