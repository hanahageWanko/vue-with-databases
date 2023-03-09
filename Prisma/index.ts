/**********
 * imports
 */
import express from 'express'
import type { Request, Response } from 'express'

/**********
 * variables
 */
const app = express()
const port = 3000

/**********
 * methods
 */

// Response送信
app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

// listen
app.listen(port, () => console.log(`Example app listening on port${port}!`))
