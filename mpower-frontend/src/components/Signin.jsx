import React from 'react'
import '../assets/static/css/signin.css'
const Signin = () => {
  return (
    <>
    <div className="login-container">
        <div className="login-form">
        <h3 className="text-center mb-4">Login</h3>
        <form>
            <div className="mb-3">
            <label for="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" required/>
            </div>
            <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" required/>
            </div>
            <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <div className="text-center mt-3">
            <a href="#">Forgot password?</a>
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default Signin