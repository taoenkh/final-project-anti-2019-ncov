import time
import requests
import json

url = "http://localhost:3001/transact"
start = time.time()
transact = {
 "recipient":"04651705117713bd681b2cc2e4f75ee6bc268c0f0941b319bece1f58157be000a8d67a7d6",
 "amount": 1
}

f = open('result.txt','w')

count_transact = 0

def mineBlock(f):
    mineurl = "http://localhost:3002/mine-transactions"
    mine = requests.get(mineurl)
    # print(mine)
    # while mine is None:
    #     print("Mining...")
    print(mine.json())
    print("Mining")

def sendtransact():
    global count_transact
    x = requests.post(url, json=transact)
    count_transact += 1
    print("Transacation sent...")

while True:
    end = time.time()
    diff = end - start
    
    # if count_transact % 10 and count_transact != 0:
    #     mineBlock(f)
    # else: 
    sendtransact()
    count_transact += 1
    if diff >= 5:
        break