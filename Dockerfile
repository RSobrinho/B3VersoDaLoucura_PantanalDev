# Define a imagem base que será utilizada.
# No seu caso, você está usando Node.js, então você pode usar uma imagem base do Node.js.
FROM node:16

# Cria um diretório na imagem para o aplicativo.
WORKDIR /app

# Copia o arquivo package.json para o diretório do aplicativo na imagem.
COPY package.json .

# Executa o comando npm install para instalar todas as dependências do aplicativo.
RUN npm install

# Copia o restante dos arquivos do aplicativo para a imagem.
COPY . .

# Executa o comando npm run build para compilar o TypeScript para JavaScript.
RUN npm run build

# Define a variável de ambiente PORT.
ENV PORT=8082

# Expõe a porta do aplicativo.
EXPOSE ${PORT}

# Define o comando para iniciar o aplicativo.
CMD [ "npm", "start" ]