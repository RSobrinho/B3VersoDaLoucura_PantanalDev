from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import random
import requests
import html5lib
import os

# root = "https://google.com/"
archive = "pantanal"
dup = []
# query = ["b3"]
query = ["b3", "b3 investidor", "b3 bolsa de valores", "b3 cotacao", "b3 acoes"] # Lista de pesquisas - Não aceita caracteres especiais
num = 100 # Número de noticias por página
limit = 500 # Limite de noticias por arquivo gerado
count = 0 # Contador de noticias armazenadas
pages = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100]

# Verifica se arquivo csv existe e apaga
# if(os.path.isfile(archive)):
#     os.remove(archive)

# Realiza um for atráves das pages
for page in pages : 

    # Realiza um for atráves das query - implementado desse jeito para deixar mais aleatório
    for q in query:
        
        # Links utilizado para pesquisa, onde o último foi o que trouxe mais noticias 
        # link = "https://www.google.com/search?q="+str(q).replace(" ", "%20")+"&tbm=nws&sxsrf=APwXEdd4WplW1U866Oi0W3zXpLoNlF_Imw:1681353590194&source=lnt&tbs=qdr:d&sa=X&ved=2ahUKEwjByvCb6qX-AhW0s5UCHfApAZYQpwV6BAgBEBw&biw=1536&bih=754&dpr=1.25" # Ultimas 24 horas
        # link = "https://www.google.com/search?q="+str(q).replace(" ", "%20")+"&tbm=nws&sxsrf=APwXEddRj9CC10mMEFKcZlR_1M1bVyhWOA:1682186293598&source=lnt&tbs=qdr:m&sa=X&ved=2ahUKEwi_g-ejiL7-AhU5jZUCHY-DCQ8QpwV6BAgCEB4&biw=1536&bih=754&dpr=1.25" # Utilmo mês
        # link = "https://www.google.com/search?q="+str(q).replace(" ", "%20")+"&tbas=0&tbm=nws&sxsrf=APwXEdfxSxbkkummzGM1RrPKF9b6HrsMEQ:1682197753156&source=lnt&tbs=qdr:y&sa=X&ved=2ahUKEwjJ9ZL8sr7-AhUGpJUCHZrbBIQQpwV6BAgBEB8&biw=1536&bih=754&dpr=1.25" # Ultimo ano
        # link = "https://www.google.com/search?q="+str(q).replace(" ", "%20")+"&tbas=0&biw=1536&bih=754&sxsrf=APwXEdfKazbqFtkiPp2Z_OFnimbdc2j0dA%3A1682197756841&source=lnt&tbs=cdr%3A1%2Ccd_min%3A1%2F1%2F2020%2Ccd_max%3A&tbm=nws" # Desde 2020
        link = "https://www.google.com/search?q="+str(q).replace(" ", "%20")+"&tbas=0&tbs=cdr:1,cd_min:1/1/2017,lr:lang_1pt&tbm=nws&sxsrf=APwXEdclVuQrgls4z9tt-x0-JUeU9kfrYw:1682198361057&source=lnt&lr=lang_pt&sa=X&ved=2ahUKEwipooKetb7-AhUMrJUCHckHDkoQpwV6BAgBEBY&biw=1536&bih=754&dpr=1.25" # Desde 2017 Somente em Português

        # Preparando o Request
        headers = {'User-Agent': "Mozilla/5.0"}
        newLink = link+"&num="+str(num)+"&start="+str(page)
        req = Request(newLink, headers={'User-Agent': "Mozilla/5.0"})
        webpage = urlopen(req).read()

        # Exibindo link da pesquisa feita
        print(newLink)
        
        # Acessando conteúdo da página pesquisada
        with requests.Session() as c:
            soup = BeautifulSoup(webpage, 'html5lib')
            
            # For para cada item encontrado
            for item in soup.find_all('div', attrs={"class": "Gx5Zad"}):

                # Verifica se existe um link com https em sua estrutura
                try:
                    linkExists = (item.find("a", href=True)['href']).index("https")
                except:
                    linkExists = False

                # Verifica a existencia do link e partir disso pega os outros campos
                if(item.find("a", href=True) and linkExists):
                    
                    title = (item.find("div", attrs={"class": "BNeawe vvjwJb AP7Wnd"}).get_text())
                    desc = (item.find("div", attrs={"class": "BNeawe s3v9rd AP7Wnd"}).get_text())
                    date = (item.find("span", attrs={"class": "r0bn4c rQMQod"}).get_text())
                    raw_link = (item.find("a", href=True)['href']).split("/url?q=")[1].split("&sa=U&")[0]    

                    # Troca toda ocorrencia de ";" para "," para evitar possiveis problemas de formatação no csv 
                    title = title.replace(";", ",")
                    desc = desc.replace(";", ",")

                    # Verifica se existe uma duplicata
                    try:
                        dupExists = dup.index(title)
                    except:
                        dupExists = False

                    # Verifica a existencia de todos os campos pegos, se não existe duplicate e grava no arquivo csv
                    if(title != None and desc != None and date != None and raw_link != None and dupExists == False):
                        
                        count += 1
                        block = str((count // limit) + 1) # Número do arquivo - para organização
                        nameArch = archive+block+".csv"
                        # print(count)

                        # Apenas para deixar descrito o que é cada coluna no arquivo
                        if(not os.path.isfile(nameArch)):
                            document = open(nameArch, "a")
                            document.write("{}; {}; {}; {} \n".format("title", "description", "date", "link"))
                            document.close()    

                        # Adiciona na lista de possiveis duplicatas
                        dup.append(title)

                        # Salva a noticia no arquivo
                        document = open(nameArch, "a", errors='ignore', encoding = "ISO-8859-1")
                        document.write("{}; {}; {}; {} \n".format(title, desc, date, raw_link))
                        document.close()        
   

# Seria interessante depois de executar tudo, pegar todo o documento e remover as duplicatas, ou fazer isso durante a inserção...

# if pra verificar noticia repetida (tanto pelo nome (verificar sites bot) quanto link (para verificar repeticao do msm site))

# aumentar a quantitdade de tags

# iterador pra entrar em todos os sites

# vefificacao para texto completo de cada site (analisar ps encadeados, pra pegar o pai desses ps)

# verificacao (dificil) de datas e horas de cada site, inumeras verificacoes para forma generica desses data
# pegar todas as "possiveis datas+horas" que baterem com a lista de nossos patterns que vaoms criar, e com mais ifs reduzir a 1, se n conseguir, guarda os 2 fds

