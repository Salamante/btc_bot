import express, { Request, response, Response, Router } from 'express'
import path from 'path'
import cors from 'cors'
import { Server } from 'socket.io'
import { io } from 'socket.io-client'
import http from 'http'
import CoinbasePro from 'coinbase-pro'
import { client } from 'websocket'

const pathBuild: string = path.join(__dirname + '/../../client/dist/')
const app = express()
app.use(cors())
app.use(express.static(pathBuild))
const port: String = '8081'
const server = http.createServer(app)
const socket = new Server(server)

let cli = new client()
cli.on('connectFailed', (error) => {
	console.log('Connect Error: ' + error.toString());
});
cli.connect("wss://ws-feed.exchange.coinbase.com")

cli.on('connect', (connection) => {
	console.log("connected")
	connection.on('message', (msg) => {
		if (msg.type === 'utf8') {
			console.log("Received: '" + msg.utf8Data + "'");
		}
	})
	connection.on('error', function(error) {
		console.log("Connection Error: " + error.toString());
	});
	connection.send('{"type": "subscribe", "product_ids": ["BTC-USD"], "channels": ["ticker_1000"]}')
})




// const client = io("wss://ws-feed.exchange.coinbase.com")

// const ws = new CoinbasePro.WebsocketClient(
//   ['BTC-USD'],
//   'wss://ws-feed.exchange.coinbase.com',
//   {
//     key: 'ab0f2cb30f1fd9e4e13650f32c912a1a',
//     secret: 'yH8Ar2TMD8dDGVIpJoo6uFWsqkRC/8pwrD5KKPThAcu9lE4cPXsWgqkqIkkMXNcXZXgE3tMCPOz30B9AjctSxQ==',
//     passphrase: 'aovhvx3t1o7',
//   },
//   { channels: ['ticker'] }
// );
// ws.emit('message', {
// 	"type": "unsubscribe",
// 	"product_ids": [
// 			"ETH-USD",
// 			"ETH-EUR"
// 	],
// 	"channels": ["ticker"]
// })
// ws.on('message', data => {
// 	console.log(data)
// });

// client.on('connect', () => {
// 	console.log('Connected!!')
// })
// client.on('message', (msg) => {
// 	console.log(msg)
// })
// client.emit('message', {
// 	"type": "subscribe",
// 	"product_ids": [
// 			"ETH-USD",
// 			"ETH-EUR"
// 	],
// 	"channels": [
// 			"level2",
// 			"heartbeat",
// 			{
// 					"name": "ticker",
// 					"product_ids": [
// 							"ETH-BTC",
// 							"ETH-USD"
// 					]
// 			}
// 	]
// })

socket.on('connection', (socket) => {
	console.log("a user connected")
})

app.get('/', (req: Request, res: Response) => {
	res.sendFile(pathBuild + 'index.html')
})

server.listen(port, () => {
	console.log(`Listening on port: http://localhost:${port}`)
})