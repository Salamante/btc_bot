import express, { Request, response, Response, Router } from 'express'
import path from 'path'
import cors from 'cors'

const app = express()
const port: String = '8081'
const pathBuild: string = path.join(__dirname + '/../../client/dist/')

app.use(cors())
app.use(express.static(pathBuild))

app.get('/', (req: Request, res: Response) => {
	res.sendFile(pathBuild + 'index.html')
})

app.listen(port, () => {
	console.log(`Listening on port: http://localhost:${port}`)
})