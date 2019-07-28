import requests
from bs4 import BeautifulSoup
baseURL="https://www.parlzim.gov.zw/component/k2/"

def read():
    file=open("mps.csv","r")
    return file.readlines()

def getPicture(name):
    pageURL=baseURL+"hon-"+name
    print(pageURL)
    page=requests.get(baseURL+"hon-"+name)
    return page.text

#print(getPicture(1))

lines=read()
newlines=[]
new=open("mps-images.csv","a+")
for line in lines:
    name=line.split(',')[0].lower().replace(" ","-")
    while True:
        try:
            page=getPicture(name)
            break
        except Exception as e:
            print(e)
    soup = BeautifulSoup(page, "html.parser")
    try:
        image = soup.find("meta",  property="og:image")["content"]
        temp=line.strip()+","+image
        print(temp)
        new.write(temp+"\n")
    except:
        image=""
new.close()

    
    
