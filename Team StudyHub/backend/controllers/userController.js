import prisma from '../config/database-sql.js'

export async function updateProfile(req,res,next){
  try{
    const data = req.body
    const updated = await prisma.user.update({ where: { id: Number(req.user.id) }, data })
    const u = { ...updated }
    delete u.password
    res.json(u)
  }catch(err){ next(err) }
}

export async function getUsers(req,res,next){
  try{
    const users = await prisma.user.findMany({ select: { id:true, fullName:true, email:true, institution:true } })
    res.json(users)
  }catch(err){ next(err) }
}
