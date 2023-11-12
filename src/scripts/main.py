from typing import Union
from fastapi import FastAPI
from script import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/spentTimePerDay")
def read_spent_time():
    return scorePerPerson(averageSpentTimePerDayPerUser(), True)

@app.get("/filePerPersonn")
def file_sharing():
    return scorePerPerson(countFilePerPersonn(), True)

@app.get("/maxSigninDays")
def max_signin():
    return scorePerPerson(maxDayofSigningPerPersonn(), True)

@app.get("/repliedMessages")
def replied_mesg():
    return scorePerPerson(countRepliedMsgPerPersonn(), True)

@app.get("/ranking")
def file_sharing():
    return finalRanking()