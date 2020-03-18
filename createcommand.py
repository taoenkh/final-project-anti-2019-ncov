f = open('/Users/tao/Desktop/UCD/Winter 2020/ECS 251/ip.txt','r')

iplist = f.readlines()

f.close()

wr = open('cmd.txt','w')
httpc = 2
p2pc = 3
peers = []
for i in iplist[:-1]:
    print(i)
    peers.append(f"ws://{i.strip()}:500{p2pc - 1}")
    wr.write(f"HTTP_PORT=300{httpc} P2P_PORT=500{p2pc} PEERS={','.join(peers)} npm run dev\n")
    httpc += 1
    p2pc += 1
print(peers)

wr.close()




