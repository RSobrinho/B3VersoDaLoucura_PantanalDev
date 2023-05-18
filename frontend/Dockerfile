# 1. Etapa de construção
FROM node:14 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos restantes para o diretório de trabalho
COPY . .

# Constrói a aplicação
RUN npm run build

# 2. Etapa de execução
FROM nginx:1.21.1-alpine

# Copia os arquivos estáticos da etapa de construção para a pasta de html do NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração do NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80
