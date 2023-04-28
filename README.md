# B3VersoDaLoucura_PantanalDev

App desenvolvido para um projeto do [</pantanal.dev>](https://pantanal.dev) com o intuito de entregar uma aplicação com Front e uma API REST baseada em um modelo de IA não supervisionado, com o objetivo de detectar sentimentos e retornar uma avaliação sobre a notícia com relação ao mercado, e o intuito de suprir a necessidade de se aferir a identidade da B3 na internet.

## 💻 Instalando App

### Requisitos

Para instalar o projeto e rodar o App, você deve instalar em seu dispositivo:

- [Git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com) (Optional)

### Instalação

Clone o projeto para um pasta em seu dispositivo ou faça o download do zip no github e descompacte-o numa pasta em seu dispositivo.

```
git clone https://github.com/RSobrinho/B3VersoDaLoucura_PantanalDev.git
```

Na pasta do projeto, abra o terminal e rode o seguinte comando:

```
npm install
```

Esse comando irá instalar todas as dependências do projeto

## 🚀 Rodando o App

## ☕ Usando App

## ☕ Scraping

Todos os códigos e arquivos relacionados ao scraping se encontram nesse diretório do git "src/scraping/", para mais detalhes de como executar o código e o como é feito, acesse o arquivo 'webscraping.ipynb' que é um arquivo de colab do Google utlizado pelo time, ou acesses os arquivos a baixo que possuem comentários da execução.

### No Google Search

O arquivo 'pantanal.py' é responsável por realizar o scraping de noticias relacionadas a B3 no próprio Google News e gravar em arquivos 'pantanalX.csv', cada documento possui no máximo 500 noticias cada organizadas por: titulo, descrição, data, link de notica, é obrigatório rodar esse código primeiro para poder executar o próximo scraping

### Por noticias

O arquivo 'datasets.py' é responsável por realizar o scraping detalhado das noticias relacionadas a B3 e gravar em arquivos 'datasetsX.csv', cada documento possui também no maximo 500 noticias cada organizadas por: titulo, data, link, conteúdo e sentimento da notica, esses documentos que serviram de base para realizar a rotulação e organização dos datasets.

## 🔗 Deploy

## 🛠️ Documentação da API

## 🛠️ Rotas da API

## 🛠️ Testes App
