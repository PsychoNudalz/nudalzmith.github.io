
# import pandas as pd
# from openpyxl.workbook import Workbook
# 
# 
# # get current directory

# pd.read_json(parent+"/ProjectsInfo/Projects.json").to_excel(parent+"/ProjectsInfo/Projects.xlsx")


import json
import csv
import os

path = os.getcwd()
parent = os.path.abspath(os.path.join(path, os.pardir))
jsonFilePath = parent + "/ProjectsInfo/Projects.json"
# jsonFilePath = parent + "/ProjectsInfo/Test.json"
csvFilePath = parent + "/ProjectsInfo/Projects.csv"
projectJSONTitle = "projects"
jsonFilePath2 = parent + "/ProjectsInfo/Projects_2.json"


# Opening JSON file and loading the data
# into the variable data
def MakeCSV():
    # with open(jsonFilePath) as json_file:
    #     jsondata = json.load(json_file)
    # 
    # data_file = open(csvFilePath, 'w', newline='')
    # csv_writer = csv.writer(data_file)
    # 
    # count = 0
    # for data in jsondata:
    #     print(data)
    #     if count == 0:
    #         header = data.keys()
    #         csv_writer.writerow(header)
    #         count += 1
    #     csv_writer.writerow(data.values())
    # 
    # data_file.close()
    # 

    print(jsonFilePath)
    try:
        with open(jsonFilePath,"r", encoding='windows-1252') as json_file:
            data = json.load(json_file)

    except:
        with open(jsonFilePath, encoding='utf-8') as json_file:
            data = json.load(json_file)
            
    print(data)

    employee_data = data[projectJSONTitle]

    # now we will open a file for writing
    data_file = open(csvFilePath, 'w')

    # create the csv writer object
    csv_writer = csv.writer(data_file)

    # Counter variable used for writing
    # headers to the CSV file
    count = 0

    for emp in employee_data:
        if count == 0:
            # Writing headers of CSV file
            header = emp.keys()
            csv_writer.writerow(header)
            count += 1

        # Writing data of CSV file
        print(emp.values())
        csv_writer.writerow(emp.values())
        
    data_file.close()


def MakeJSON():
    # create a dictionary
    data = {}
    dataString = ""

    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='windows-1252') as csvf:
        csvReader = csv.DictReader(csvf)

        # Convert each row into a dictionary
        # and add it to data
        count = 0
        headers = []

        # for c, line in enumerate(csvReader, 1):
        #     pass
        # maxSize = c
        # 
        for rows in csvReader:
            data = rows
            if not (data["projectName"] == ""):
                dataString += json.dumps(data, indent=2)
                dataString += ","
                count += 1

    dataString = dataString[:-1]
    finalData = "{ \"projects\": [\n" + dataString + "\n]}"

    print(finalData)
    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='windows-1252') as jsonf:
        jsonf.write(finalData)


userInput = ""
while userInput != "x":
    userInput = input("Input Make: (C->CSV, J->JSON, X->EXIT) ")
    userInput.lower()
    if (userInput == "c"):
        MakeCSV()
    if (userInput == "j"):
        MakeJSON()
