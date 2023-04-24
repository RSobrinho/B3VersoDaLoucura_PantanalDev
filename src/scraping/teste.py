from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import requests

root = "https://www.google.com/"
link = "https://www.google.com/search?q=B3&tbm=nws&ei=rHU5ZMSkIrub1sQPmOqN4A4&start=0&sa=N&ved=2ahUKEwjEqsGe3Kn-AhW7jZUCHRh1A-w4ChDy0wN6BAgBEAQ&biw=1172&bih=973&dpr=1"

def removeTrash(linkToRefine):
  trashLists = ['&sa=U&' , '/&sa', '&sa', '.ghtml', '.html']
  
  for item in trashLists:
     index = linkToRefine.find(item)
     if(index != -1):
        print(index)
        linkToRefine = linkToRefine[0: index]

  return linkToRefine


req = Request(link, headers={'User-Agent': 'Mozilla/5.0'})
webpage = urlopen(req).read()
with requests.Session() as c:
    soup = BeautifulSoup(webpage, 'html5lib')
    for item in soup.find_all('div', attrs={'class': 'Gx5Zad'}):
        raw_link = (item.find('a', href=True)['href'])
        link = raw_link.replace('/url?q=', '')
        link = removeTrash(link)

        print(link)