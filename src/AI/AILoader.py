import torch
import socketio

# Carregando o modelo
modelo = torch.load("arquivo.pt")

# Conectando ao servidor socket.io do Node.js
sio = socketio.Client()
sio.connect('http://localhost:3000')

# Realizando a inferência
entrada = [1, 2, 3, 4, 5]  # exemplo de entrada
saida = modelo(entrada)

# Calculando as porcentagens
softmax = torch.nn.Softmax(dim=0)
probabilidades = softmax(saida)
positivo, negativo, neutro = probabilidades.tolist()

# Enviando as porcentagens para o JavaScript
sio.emit('porcentagens_de_sentimento', {'positivo': positivo, 'negativo': negativo, 'neutro': neutro})

# Fechando a conexão
sio.disconnect()