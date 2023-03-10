/**********
 * imports
 */
import express from 'express'
import type { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import cors from 'cors'

/**********
 * variables
 */
const app = express()
const port = 3000

app.use(cors())
const prisma = new PrismaClient()

/********************************
 * routing
 */
app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

app.get('/tasks', async (req: Request, res: Response) => {
  const tasks = await prisma.tasks.findMany()
  return res.json(tasks)
})

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  return res.json(users)
})

app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    })
    return res.json(user)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    return res.status(400).json(e)
  }
})

// listen
app.listen(port, () => console.log(`Example app listening on port${port}!`))
