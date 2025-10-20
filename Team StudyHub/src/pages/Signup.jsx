import React from 'react'
import apiClient from '../api-client'

export default function Signup({onSignup}){
  const [fullName,setFullName]=React.useState('Test User')
  const [email,setEmail]=React.useState('test2@example.com')
  const [password,setPassword]=React.useState('password')
  const [msg,setMsg]=React.useState('')

  async function submit(e){
    e.preventDefault()
    try{
      const res = await apiClient.signup({fullName,email,password})
      localStorage.setItem('token', res.token)
      setMsg('Signed up')
      onSignup && onSignup()
    }catch(err){
      setMsg('Signup failed')
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <div><input value={fullName} onChange={e=>setFullName(e.target.value)} /></div>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Signup</button>
      </form>
      <div>{msg}</div>
    </div>
  )
}
