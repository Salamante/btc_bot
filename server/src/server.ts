import express, { Request, response, Response, Router } from 'express'
import path from 'path'
import cors from 'cors'
import { json } from 'body-parser'
import { Server } from 'socket.io'
import { io } from 'socket.io-client'
import http from 'http'
import { client } from 'websocket'

const pathBuild: string = path.join(__dirname + '/../../client/dist/')
const app = express()
app.use(cors())
app.use(express.static(pathBuild))
const port: String = '8081'
const server = http.createServer(app)
const socket = new Server(server, {
	cors: {
		origin: "http://localhost:3001",
		credentials: true
	}
})

/**
 * @middlewares
 */
const jsonParser = json()

let cli = new client()
// cli.on('connectFailed', (error) => {
// 	console.log('Connect Error: ' + error.toString());
// });
// cli.connect("wss://ws-feed.exchange.coinbase.com")

// cli.on('connect', (connection) => {
// 	console.log("connected")
// 	connection.on('message', (msg) => {
// 		if (msg.type === 'utf8') {
// 			console.log("Received: '" + msg.utf8Data + "'");
// 		}
// 	})
// 	connection.on('error', function(error) {
// 		console.log("Connection Error: " + error.toString());
// 	});
// 	connection.send('{"type": "subscribe", "product_ids": ["BTC-USD"], "channels": ["ticker_1000"]}')
// })




socket.on('connection', (socket) => {
	console.log("a user connected")
})

app.get('/test', jsonParser, (req: Request, res: Response) => {
	// res.sendFile(pathBuild + 'index.html')
	res.send({
		a: "foo",
		b: "bar"
	})
	socket.emit('test', 'hello world')
})

server.listen(port, () => {
	console.log(`Listening on port: http://localhost:${port}`)
})