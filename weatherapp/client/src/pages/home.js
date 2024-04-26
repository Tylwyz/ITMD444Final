import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css';

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()



  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
      <Link
                to={'/login'}
                className='login-button'
              >
                Login Button
              </Link>
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  )
}

export default Home