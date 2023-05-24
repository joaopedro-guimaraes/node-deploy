import express from 'express'
import users from './routes/users'

const app = express()

app.use(express.json())

app.use('/users', users)

app.get('/test', (request, response) => {
    return response.status(200).send({ message: 'OK' })
})

app.listen(process.env.PORT ? Number(process.env.PORT) : 3333, () => {
    console.log('HTTP Server Running')
})
