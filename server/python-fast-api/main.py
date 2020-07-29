# noqa pylint: disable=E1120
# noqa pylint: disable=no-value-for-parameter
import databases, sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import datetime
import calendar
import time

origins=[
  "http://localhost:3000"
]

DATABASE_URL = "postgresql://postgres:admin@localhost:5432/testdb"
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
users = sqlalchemy.Table(
  "node",
  metadata,
  sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
  sqlalchemy.Column("name", sqlalchemy.CHAR),
  sqlalchemy.Column("description", sqlalchemy.TEXT),
  sqlalchemy.Column("count", sqlalchemy.Integer),
)

engine = sqlalchemy.create_engine(DATABASE_URL)

metadata.create_all(engine)

# Models
class UserList(BaseModel):
  id: int
  name: str
  description: str
  count: int

app = FastAPI()

@app.on_event("startup")
async def startup():
  await database.connect()

@app.on_event("shutdown")
async def shutdown():
  await database.disconnect()

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/users", response_model=List[UserList])
async def get_the_length():
  query = users.select()
  return await database.fetch_all(query)

@app.get("/insert_and_delete/count/{id}")
async def insert_and_delete(id: int):
  delete = users.delete()
  await database.execute(delete)
  start_time = datetime.datetime.timestamp(datetime.datetime.now())
  computation_start_ts = datetime.datetime.now()
  for i in range(1, id+1):
    query = users.insert().values(
      name = "test_{}".format(i),
      description = "test_description_{}".format(i),
      count = i
    )
    await database.execute(query)
  end_time = datetime.datetime.timestamp(datetime.datetime.now())
  total_time = datetime.datetime.now() - computation_start_ts
  select = users.select()
  data = await database.fetch_all(select)
  return {
    "length": len(data),
    "timeTaken": int(total_time.total_seconds() * 1000),
    "startTime": start_time,
    "endTime": end_time
  }
