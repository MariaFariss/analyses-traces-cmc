# Requirements :
#u should type this command down : pip install -r requirements.txt
# pip install sqlalchemy
# pip install pymysql
#pip install pandas

# for the api
# pip install fastapi
# pip install uvicorn
#.\mon_env_analyse_des_donnes\Scripts\activate
# python3 -m uvicorn main:app --reload or uvicorn main:app --reload
# pip install fastapi uvicorn

from sqlalchemy import create_engine
import pandas as pd
import numpy as np
import json

# Créer le moteur de base de données
# Remplacez 'username', 'password' et 'database_name' par vos informations d'identification de base de données
engine = create_engine('mysql+pymysql://root:@localhost:3306/datamadeth')

def convertir_heure_en_secondes(heure):
    h, m, s = map(int, heure.split(':'))
    return h * 3600 + m * 60 + s

def sqlToDataModel() :
    # Définir votre requête SQL
    queryTransition = "SELECT Utilisateur, Titre, Date, Heure FROM transition"
    queryFile = "SELECT User,Filenameo, Dateupload, Timeupload FROM userfiles"
    # Exécuter la requête SQL et charger le résultat dans un DataFrame pandas
    transitionData = pd.read_sql(queryTransition, engine)
    fileData = pd.read_sql(queryFile, engine)
    fileData["Filenameo"] = fileData["Filenameo"].apply(lambda filename : "fileUpload: " + filename)
    # print(transitionData, fileData)

    #rename the fileData by the transitionData colums
    fileData.columns = transitionData.columns

    # Concatenate the dataframes
    datas = pd.concat([transitionData, fileData])
    datas["Heure"] = datas["Heure"].apply(lambda x: str(x))
    datas.to_json('datas.json', orient='records')

# sqlToDataModel()

#Moteur

############First criterea : actif student in the paltform by calculating the average spent time per personn every day in the app in seonds ############
def filterData(type, df):
    dataSet = df[type].unique()
    data_dict = {data: df[df[type] == data] for data in dataSet}
    return data_dict

def timeStampMinutsPerUserPerDay(list_timestamps):
    for i in range(len(list_timestamps)):
        list_timestamps[i] = convertir_heure_en_secondes(list_timestamps[i].split()[2])
    list_timestamps.sort()

    counter = 0
    seuil = 20*60
    for i in range(len(list_timestamps)-1):
        activePeriod = list_timestamps[i+1] - list_timestamps[i]
        if(activePeriod< seuil) :
            counter+=activePeriod
    return counter


def averageSpentTimePerDayPerUser():
    df = pd.read_json('datas.json')
    #filter par utilisateurs et les mettre dans un dictionnaire comme key user et comme value son dataframe
    filterDateTable = filterData("Utilisateur",df)
    #appliquer sur la dataframe de chaque user un filter pour avoir la dataframe de chque jour de chaque utilisateur
    averageTimes = {}
    for key, value in filterDateTable.items():
        activePeriods = []
        nbJour = 0
        days = filterData("Date", value)
        for key2, value2 in days.items():
            activePeriods.append(timeStampMinutsPerUserPerDay(value2["Heure"].tolist()))
            nbJour+=1
        averageTimes[key] = np.array(activePeriods).mean()/nbJour
    return averageTimes

# sqlToDataModel()
average_Spent_TimePerDayPerUser = averageSpentTimePerDayPerUser()



###### Second critirea : regular student in terms of login by calculating for every personn the number of consecutif days they have logged in #####

# Vérifier si les dates sont consécutives
def consecutiveDays(timestamp1, timestamp2):
    return (timestamp2 - timestamp1).days == 1

def getMaxCounter(list):
    return max(list)+1 if len(list) !=0  else 1

def maxDayofSigningPerPersonn():

    df = pd.read_json('datas.json')
    d ={}
    filterPerPerson = filterData("Utilisateur",df)
    for key, value in filterPerPerson.items():
        listDatePerPerson = []
        counterPerPerson = 0
        filterPerPersonnPerDate = filterData("Date", value)
        for dataFrame in filterPerPersonnPerDate.values():
            listDatePerPerson.append(dataFrame["Date"].tolist()[0])

        listDatePerPerson.sort()
        listOptimalCounteur = []
        for i in range(len(listDatePerPerson)-1) :
            if(consecutiveDays(listDatePerPerson[i], listDatePerPerson[i+1])):
                counterPerPerson+=1
                listOptimalCounteur.append(counterPerPerson)
            else :
                counterPerPerson=0
        d[key] = getMaxCounter(listOptimalCounteur)
    # print(d)
    return d



#########Third criteria : student who responded the most about the messages #########
def countRepliedMsgPerPersonn():
    df = pd.read_json('datas.json')
    keyMessage = "Répondre à un message"
    count = 0
    results = {}
    filterPerPerson = filterData("Utilisateur",df)
    for user, dataFrame in filterPerPerson.items():
        count =0
        for titre in dataFrame["Titre"].tolist():
            if(titre == keyMessage):
                count+=1
        results[user] = count
    return results
replied_msg_results = countRepliedMsgPerPersonn()

#######Fourth criteria : the average number sent per personn and per day ########

def countFilePerPersonn():
    df = pd.read_json('datas.json')
    count = 0
    results = {}
    keyword = "fileUpload"
    filterPerPerson = filterData("Utilisateur",df) 
    for user, dataFrame in filterPerPerson.items():
        count =0
        for titre in dataFrame["Titre"].tolist():
            if(keyword in titre) :
                count+=1
        results[user] = count
    return results
# To count files per person
files_results = countFilePerPersonn()

# Save the results to a JSON file
# all_results = {
#     "replied_msg_results": replied_msg_results,
#     "files_results": files_results,
#     "maxDayofSigningPerPersonn":max_Day_of_SigningPerPersonn,
#     "average_Spent_TimePerDayPerUser" : average_Spent_TimePerDayPerUser
# }
# with open('all_results.json', 'w') as json_file:
#     json.dump(all_results, json_file)


#########score calculations #####
def scorePerPerson(typeDict, reversed):
    list =[]
    dictResult = {}
    for user, value in typeDict.items():
        list.append(value)
    list.sort(reverse = reversed)
    
    for user, value in typeDict.items():
        dictResult[user] = {"classement" : list.index(value) +1,  "score" : value}  
    return dictResult

# print(scorePerPerson(maxDayofSigningPerPersonn(), True))

def finalRanking():
    maxSignin = scorePerPerson(maxDayofSigningPerPersonn(), True)
    averageSpent = scorePerPerson(averageSpentTimePerDayPerUser(), True)
    countMessagesReplied = scorePerPerson(countRepliedMsgPerPersonn(), True)
    countFile = scorePerPerson(countFilePerPersonn(), True)
    scores = {}
    for user in maxSignin.keys():
        scores[user] = 0
        scores[user] += maxSignin[user]["classement"]
        scores[user] += averageSpent[user]["classement"]
        scores[user] += countMessagesReplied[user]["classement"]
        scores[user] += countFile[user]["classement"]
    print(scorePerPerson(scores, False))
    return scorePerPerson(scores, False)
finalRanking()