import time
import requests

url = "http://localhost:3002/transact"
public_key_url = "http://localhost:3002/public-key"
pk = requests.get(public_key_url)
d = dict(pk.json())
public_key = d['pulbicKey']
start = time.time()

transact = {
 "recipient":public_key,
 "amount": 1
}




# x = requests.post(url, json = transact)
# print(x.json())

def mineBlock():
    """
    Function that triggers mining request
    :return: None
    """
    minurl = "http://localhost:3002/mine-transactions"
    mine = requests.get(minurl)
    print("Block mined")

Timeperiod = 10
# time period to continuously send transactions and mining

transactcounter = 0
while True:
    end = time.time()
    diff = end - start

    transactcounter += 1
    if transactcounter % 10 == 0:
        print(transactcounter)
        #mineBlock(f)
    else:
        #print(transactcounter,'called')
        x = requests.post(url, json=transact)
        #print(x.json())


    if diff >= Timeperiod:
        break


print(f"{ transactcounter } transactions processed in {int(diff)} seconds")