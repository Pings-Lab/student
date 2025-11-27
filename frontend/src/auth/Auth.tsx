import './Auth.css'
import logo from '../assets/ping.jpg';
const Auth = () => {
  return (
    <div id="body">
        <div id="page">
          <form>
            <img src={logo} alt="" />
            <input type="email" placeholder='Username' required/>
            <input type="password" placeholder='Password' required/>
            <button>Login</button>
            <p>Don't have an account?</p>
            <button>Sign Up</button>
          </form>
        </div>
    </div>
  )
}

export default Auth