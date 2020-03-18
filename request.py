import time
import requests
f = open('ECS 251/ip.txt','r')


iplist = f.readlines()

def geturl(node,num,route):
    public_key_url = f"http://{node.strip()}:300{num}/{route}"
    return public_key_url

public_key_url1 = geturl(iplist[1],2,'public-key')
public_key_url2 = geturl(iplist[3],4,'public-key')

pk = requests.get(public_key_url1)
pk1 = requests.get(public_key_url2)

d = dict(pk.json())
public_key = d['pulbicKey']
d1 = dict(pk1.json())
public_key1 = d1['pulbicKey']
start = time.time()

transact1 = {
 "recipient":public_key,
 "amount": 1
}


transact2 = {
 "recipient":public_key1,
 "amount": 1
}





# x = requests.post(url, json = transact)
# print(x.json())

def mineBlock(url, num):
    """
    Function that triggers mining request
    :return: None
    """
    minurl = f"http://{url.strip()}:300{num}/mine-transactions"
    mine = requests.get(minurl)
    print("Block mined")

Timeperiod = 60
# time period to continuously send transactions and mining

transactcounter = 0
while True:
    end = time.time()
    diff = end - start

    transactcounter += 1
    if transactcounter % 10 == 0:

        if transactcounter // 10%2 == 0:
            mineBlock(iplist[2],2)
        else:
            mineBlock(iplist[0],0)

    else:
        if transactcounter // 10 % 2 == 0:
            x = requests.post(iplist[2].strip(), json=transact1)

        else:
            x = requests.post(iplist[0].strip(), json=transact2)




    if diff >= Timeperiod:
        break


print(f"{ transactcounter } transactions processed in {int(diff)} seconds")