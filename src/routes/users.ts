import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const router = Router()

const prisma = new PrismaClient()

router.get('/', async (request, response) => {
    const users = await prisma.user.findMany()
    return response.send(users)
})

router.post('/', async (request, response) => {
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email()
    })
    const { name, email } = createUserSchema.parse(request.body)

    await prisma.user.create({
        data: { name, email }
    })

    return response.status(201).send()
})

export default router
