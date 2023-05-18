from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import requests
import datefinder
from datetime import datetime
import os

# Função para leitura dos arquivos
def readFile(path):
    f = open(path, "r", errors='ignore', encoding = "ISO-8859-1")
    archive = f.read()
    f.close()
    return archive

dup = [] # Lista de duplicatas
archive = "bloco" # Nome do arquivo
maxArch = 5 # Máximo de arquivos verificados
limit = 500 # Limite de noticias por arquivo gerado
count = 0 # Contador de noticias armazenadas

path = [] # Lista com todas as noticias encontradas

# Pega dados dos arquivos
for i in range(0, maxArch):
    nameArch = "pantanal"+str(i+1)+".csv"
    if(os.path.isfile(nameArch)):
        file = readFile(nameArch).split("\n")
        file = filter(None, file)
        file = list(map(lambda el: el.split(";"), file))
        
        if(len(path) == 0):
            path.extend(file)
        else:
            path.extend(file[1:])

# Acessa todas as noticias a partir da linha 1
for new in path[1:]:
    title = new[0] 
    link = new[-1] 
    content = ""
    print(new[0], link)

    try:

        # Verifica se existe uma duplicata
        try:
            dupExists = dup.index(title)
        except:
            dupExists = False
        
        if(dupExists == False):

            # Preparando Request
            req = Request(link, headers={'User-Agent': "Mozilla/5.0"})
            webpage = urlopen(req, timeout=10).read()

            # Acessando conteúdo da página pesquisada
            with requests.Session() as c:
                # Adiciona na lista de possiveis duplicatas
                dup.append(title)
                
                soup = BeautifulSoup(webpage, 'html5lib')
                            
                # For para cada item encontrado
                for item in soup.find_all('p'):
                    content += item.get_text()

                # Filtro para o titulo, porém não da certo para a tag H1            
                # if(soup.find("h1") != None):
                #     title = soup.find("h1").get_text()

            # Troca toda ocorrencia de ";" para "," para evitar possiveis problemas de formatação no csv 
            # Remove também toda formatação de espaços ou identações
            content = content.replace(";", ",").replace("\n", "").replace("\t", "")
            
            # Procura possiveis data encontrada no content
            dt = datefinder.find_dates(content)
            dtNew = ""    
            
            # Em caso de não encontrar nada no content
            if (content == ""):
              content = new[1] # Coloca como content a descrição encontrada no google 

            # Procura e pega a primeira data no content
            for data in dt:
                if (dtNew == "" and datetime.strptime("01/01/2020", "%d/%m/%Y") <= data): 
                    dtNew = data.strftime('%d/%m/%Y %H:%M')
                
                content = content.replace(data.strftime('%d/%m/%Y'), "")
                content = content.replace(data.strftime('%Y-%m-%d'), "")

            # Em caso de não encontrar data no content
            if (dtNew == ""):
                # dtNew = new[2] # Pega formato da data encontrada no google news
                dtNew = datetime.now().strftime('%d/%m/%Y 00:00') # Pega data atual como substituta
            
            # Verifica a existencia de todos os campos pegos e grava no arquivo csv
            if(title != None and content != "" and link != None):
                count += 1
                block = str((count // limit) + 1) # Número do arquivo - para organização
                nameArch = archive+block+".csv"

                # Apenas para deixar descrito o que é cada coluna no arquivo
                if(not os.path.isfile(nameArch)):
                    document = open(nameArch, "a")
                    document.write("{}; {}; {}; {}; {} \n".format("title", "date", "link", "content", "feeling"))
                    document.close()   

                # Salva a noticia no  arquivo
                document = open(nameArch, "a",  errors='ignore')
                document.write("{}; {}; {}; {}; \n".format(title, dtNew, link, content))
                document.close() 

    except Exception as error:
        print(error) # Em caso de erro é exibido a mensagem