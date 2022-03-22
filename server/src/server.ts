import express, { Request, response, Response, Router } from 'express'
import path from 'path'
import cors from 'cors'
import { Server } from 'socket.io'
import { io } from 'socket.io-client'
import http from 'http'
import CoinbasePro from 'coinbase-pro'

const pathBuild: string = path.join(__dirname + '/../../client/dist/')
const app = express()
app.use(cors())
app.use(express.static(pathBuild))
const port: String = '8081'
const server = http.createServer(app)
const socket = new Server(server)

const ws = new CoinbasePro.WebsocketClient(['BTC-USD', 'ETH-USD'])
ws.on('message', data => {
  console.log(data)
});

// socket.on('connection', (socket) => {
// 	console.log("a user connected")
// })

// app.get('/', (req: Request, res: Response) => {
// 	res.sendFile(pathBuild + 'index.html')
// })

server.listen(port, () => {
	console.log(`Listening on port: http://localhost:${port}`)
})