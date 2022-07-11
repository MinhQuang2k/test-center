from io import StringIO
import sys
import json

def get_user_solution ():
   import user_solution
    

def get_result_test_case(input_test_case):
   _input = ' '.join(input_test_case[1:])
   f = StringIO(_input) 
   sys.stdin = f
   get_user_solution()
   f.close()

def check_result():
   pass

def run():
   get_result_test_case(sys.argv)
    
run()


# array type
# #!/bin/python3

# import math
# import os
# import random
# import re
# import sys

# def a (param1, param2):
#     res = []
#     for i in param2:
#         res.append(i+param1)
#     print(res)

# param1 = int(input())
# param2_count = int(input())
# param2 = []
# for i in range(param2_count):
#     param2_item = int(input())
#     param2.append(param2_item)
# result = a(param1, param2)

# string type
# import math
# import os
# import random
# import re
# import sys

# def a (param1):
#     return param1 *2

# param1 = int(input())

# result = a(param1)
# print(result)
