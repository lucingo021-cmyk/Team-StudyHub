import prisma from '../config/database-sql.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

function signToken(user){
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' })
}

export async function register(req,res,next){
  try{
    const { fullName, email, password } = req.body
    if(!fullName || !email || !password) return res.status(400).json({ success:false, message:'Missing fields' })
    const existing = await prisma.user.findUnique({ where: { email } })
    if(existing) return res.status(400).json({ success:false, message:'Email already in use' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { fullName, email, password: hashed } })
    const token = signToken(user)
    const u = { ...user }
    delete u.password
    res.status(201).json({ success:true, token, user: u })
  }catch(err){ next(err) }
}

export async function login(req,res,next){
  try{
    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({ success:false, message:'Missing fields' })
    const user = await prisma.user.findUnique({ where: { email } })
    if(!user) return res.status(400).json({ success:false, message:'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(400).json({ success:false, message:'Invalid credentials' })
    const token = signToken(user)
    const u = { ...user }
    delete u.password
    res.json({ success:true, token, user: u })
  }catch(err){ next(err) }
}

export async function forgotPassword(req,res,next){
  try{
    const { email } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if(!user) return res.status(404).json({ success:false, message:'No user' })
    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetHash = crypto.createHash('sha256').update(resetToken).digest('hex')
    const expire = new Date(Date.now() + 60*60*1000) // 1 hour
    await prisma.user.update({ where: { id: user.id }, data: { resetPasswordToken: resetHash, resetPasswordExpire: expire } })
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset/${resetToken}`
    // For dev: return URL in response
    res.json({ success:true, resetUrl })
  }catch(err){ next(err) }
}

export async function resetPassword(req,res,next){
  try{
    const { token } = req.params
    const { password } = req.body
    const hash = crypto.createHash('sha256').update(token).digest('hex')
    const user = await prisma.user.findFirst({ where: { resetPasswordToken: hash, resetPasswordExpire: { gt: new Date() } } })
    if(!user) return res.status(400).json({ success:false, message:'Invalid or expired token' })
    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed, resetPasswordToken: null, resetPasswordExpire: null } })
    const u = await prisma.user.findUnique({ where: { id: user.id } })
    const tokenJwt = signToken(u)
    const uu = { ...u }
    delete uu.password
    res.json({ success:true, token: tokenJwt, user: uu })
  }catch(err){ next(err) }
}

export async function getMe(req,res,next){
  try{
    const user = await prisma.user.findUnique({ where: { id: Number(req.user.id) } })
    if(!user) return res.status(404).json({ success:false, message:'No user' })
    const u = { ...user }
    delete u.password
    res.json(u)
  }catch(err){ next(err) }
}
