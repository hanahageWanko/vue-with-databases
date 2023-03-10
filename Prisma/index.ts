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
app.use(express.json())
const prisma = new PrismaClient()

/********************************
 * routing
 */
app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

app.get(
  '/tasks',
  async (req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> => {
    const tasks = await prisma.tasks.findMany()
    return res.json(tasks)
  }
)

app.post(
  '/tasks',
  async (req: Request, res: Response): Promise<express.Response<any, Record<string, any>>> => {
    const { task, completed } = req.body
    const newTask = await prisma.tasks.create({
      data: {
        task,
        completed
      }
    })
    return res.json(newTask)
  }
)

app.put('/tasks', async (req: Request, res: Response) => {
  const id = Number(req.body.id)
  const { completed }: { completed: boolean } = req.body
  try {
    const update = await prisma.tasks.update({
      where: {
        id
      },
      data: {
        completed
      }
    })
    return res.json(update)
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
})

app.delete('/tasks', async (req: Request, res: Response) => {
  const id = Number(req.body.id)
  try {
    const response = await prisma.tasks.delete({
      where: {
        id
      }
    })
    return res.json(response)
  } catch (e) {
    return res.status(400).json(e)
  }
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
