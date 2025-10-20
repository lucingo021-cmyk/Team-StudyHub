import React from 'react'
import apiClient from '../api-client'

export default function Login({onLogin}){
  const [email,setEmail]=React.useState('test@example.com')
  const [password,setPassword]=React.useState('password')
  const [msg,setMsg]=React.useState('')

  async function submit(e){
    e.preventDefault()
    try{
      const res = await apiClient.login({email,password})
      localStorage.setItem('token', res.token)
      setMsg('Logged in')
      onLogin && onLogin()
    }catch(err){
      setMsg('Login failed')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Login</button>
      </form>
      <div>{msg}</div>
    </div>
  )
}
