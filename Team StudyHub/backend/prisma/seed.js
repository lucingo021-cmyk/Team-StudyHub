import prisma from '../config/database-sql.js'
import bcrypt from 'bcryptjs'

async function main(){
  const email = 'test@example.com'
  const existing = await prisma.user.findUnique({ where: { email } })
  if(existing){
    console.log('Test user already exists')
    return
  }
  const password = await bcrypt.hash('password', 10)
  await prisma.user.create({ data: { fullName: 'Test User', email, password } })
  console.log('Created test user: test@example.com / password')
}

main().catch(e=>{
  console.error(e)
}).finally(async ()=>{
  await prisma.$disconnect()
})
