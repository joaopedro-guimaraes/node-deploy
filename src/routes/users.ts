import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'
import bcrypt from 'bcrypt'

const router = Router()

const prisma = new PrismaClient()

router.get('/', async (request, response) => {
  console.log('GET /users')
  const users = (await prisma.user.findMany()).map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }))
  return response.json(users)
})

router.post('/', async (request, response) => {
  console.log('POST /users')
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
  })
  const { name, email, password } = createUserSchema.parse(request.body)

  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(password, salt)

  await prisma.user.create({
    data: { 
      name, 
      email, 
      password: hash 
    }
  })

  return response.status(201).send()
})

export default router
