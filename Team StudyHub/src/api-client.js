const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function logErr(e){
  console.error('[local] API Error:', e)
}

async function request(path, opts={}){
  const headers = opts.headers || {}
  const token = localStorage.getItem('token')
  if(token) headers['Authorization'] = `Bearer ${token}`
  headers['Content-Type'] = headers['Content-Type'] || 'application/json'
  const res = await fetch(`${API_URL}${path}`, {...opts, headers})
  if(!res.ok){
    const errText = await res.text()
    logErr(errText)
    throw new Error(errText)
  }
  return res.json()
}

const apiClient = {
  login: (data)=> request('/auth/login',{method:'POST', body:JSON.stringify(data)}),
  signup: (data)=> request('/auth/register',{method:'POST', body:JSON.stringify(data)}),
  forgotPassword: (data)=> request('/auth/forgot',{method:'POST', body:JSON.stringify(data)}),
  resetPassword: (token,data)=> request(`/auth/reset/${token}`,{method:'PUT', body:JSON.stringify(data)}),
  getProfile: ()=> request('/auth/me',{method:'GET'}),
  updateProfile: (data)=> request('/users',{method:'PUT', body:JSON.stringify(data)}),
  getDocuments: ()=> request('/documents',{method:'GET'}),
  uploadDocument: (formData)=> {
    const token = localStorage.getItem('token')
    return fetch(`${API_URL}/documents`,{method:'POST', body:formData, headers: token?{Authorization:`Bearer ${token}`}:undefined}).then(r=>r.json())
  },
  deleteDocument: (id)=> request(`/documents/${id}`,{method:'DELETE'}),
  generateTimetable: (opts)=> request('/timetable/generate',{method:'POST', body:JSON.stringify(opts)}),
  getTimetables: ()=> request('/timetable',{method:'GET'}),
  generateTest: (opts)=> request('/practice-tests/generate',{method:'POST', body:JSON.stringify(opts)}),
  submitTest: (id,answers)=> request(`/practice-tests/${id}/submit`,{method:'POST', body:JSON.stringify({answers})}),
  getJobs: ()=> request('/career/jobs',{method:'GET'}),
  getJobById: (id)=> request(`/career/jobs/${id}`,{method:'GET'}),
  applyToJob: (id,cv)=> request(`/career/jobs/${id}/apply`,{method:'POST', body:JSON.stringify({cv})}),
  getCompanies: ()=> request('/career/companies',{method:'GET'}),
  sendMessage: (chatId,message)=> request(`/chat/${chatId}/messages`,{method:'POST', body:JSON.stringify({message})})
}

export default apiClient
