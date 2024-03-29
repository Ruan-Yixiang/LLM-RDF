import OpenOPC
import time
import json
import win32timezone
import os
import sys

# opc = OpenOPC.client()
# opc.connect('National Instruments.Variable Engine.1')

# if sys.argv[1] == "read":
#     print(opc.read(sys.argv[2]))
# elif sys.argv[1] == "write":
#     print(opc.write((sys.argv[2], sys.argv[3])))

# json_text = json.dumps(dat)

# while True:

#     print (opc.read('SimLib.OpcCMD'))
#     print (opc.read('SimLib.OpcRPD'))
#     print (opc.read('SimLib.OpcSTA'))
#     # print (opc.read('SimLib.SimCMD'))
#     opc.write(('SimLib.OpcCMD', json_text))
#     # print(opc.list('SimLib.Variable1'))
#     time.sleep(2)

res = os.popen("C:\\Users\\luche\\Documents\\OPC\\dist\\test\\test.exe read SimLib.OpcCMD").read()
