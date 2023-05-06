import app from './app'
import io from 'socket.io'
const port = process.env.PORT ? Number(process.env.PORT) : 8080
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

io.on('connection', (socket) => {
  console.log('Cliente conectado')

  socket.on('porcentagens_de_sentimento', (data) => {
    console.log('Porcentagens de sentimento recebidas: ', data.positivo, data.negativo, data.neutro)
    // fazer algo com as porcentagens recebidas
  })
})
