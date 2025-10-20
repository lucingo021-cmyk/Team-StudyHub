import jwt from 'jsonwebtoken'
import prisma from '../config/database-sql.js'

export async function protect(req,res,next){
  const auth = req.headers.authorization
  if(!auth || !auth.startsWith('Bearer ')) return res.status(401).json({message:'Not authorized'})
  const token = auth.split(' ')[1]
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: Number(decoded.id) } })
    if(!user) return res.status(401).json({message:'User not found'})
    req.user = { id: user.id, email: user.email, role: user.role, fullName: user.fullName }
    next()
  }catch(err){
    return res.status(401).json({message:'Token invalid', error: String(err)})
  }
}
