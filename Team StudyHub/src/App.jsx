import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

export default function App(){
  const [route, setRoute] = React.useState('login')
  return (
    <div style={{padding:20,fontFamily:'Arial'}}>
      <nav style={{marginBottom:20}}>
        <button onClick={()=>setRoute('login')}>Login</button>
        <button onClick={()=>setRoute('signup')}>Signup</button>
        <button onClick={()=>setRoute('profile')}>Profile</button>
      </nav>
      {route==='login' && <Login onLogin={()=>setRoute('profile')} />}
      {route==='signup' && <Signup onSignup={()=>setRoute('profile')} />}
      {route==='profile' && <Profile />}
    </div>
  )
}
