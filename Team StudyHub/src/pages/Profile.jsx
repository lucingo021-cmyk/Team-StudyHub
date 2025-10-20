import React from 'react'
import apiClient from '../api-client'

export default function Profile(){
  const [user,setUser]=React.useState(null)

  React.useEffect(()=>{
    apiClient.getProfile().then(u=>setUser(u)).catch(()=>setUser(null))
  },[])

  if(!user) return <div>Please login to view profile</div>
  return (
    <div>
      <h2>Profile</h2>
      <div>Name: {user.fullName}</div>
      <div>Email: {user.email}</div>
      <div>Institution: {user.institution}</div>
    </div>
  )
}
