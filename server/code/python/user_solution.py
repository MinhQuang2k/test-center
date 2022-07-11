#!/bin/python3

import math
import os
import random
import re
import sys

def functionName (param1, param2, param3):
    return [[1,2,3],[3,2,3]]

param1 = bool(input())
param2_count = int(input())
param2 = []
for i in range(param2_count):
    param2_item = str(input())
    param2.append(param2_item)
param3_rows = int(input())
param3_columns = int(input())
param3 = []
for i in range(param3_rows): 
    param3_temp = input()
    param3.append(list(map(str, param3_temp.split())))
result = functionName(param1, param2, param3)
resultParts = []
for row in result:
    resultParts.append(' '.join(map(str, row)))
print('\n'.join(map(str, resultParts)))