import pymongo
import json
import uuid
import random

conf = json.loads(open("conf.json").read())


uri = "mongodb://"+conf['db_user']+":"+conf['db_pass']+"@"+conf['db_host']
client = pymongo.MongoClient(uri)
db = client.get_default_database()

j = {
    "geocode": {
        "lat": 39.95224136745237,
        "lng": -75.19157230854034
    },
    "id": str(uuid.uuid1()),
    "amount_left": random.randint(50000, 500000),
    "name": "Penn Engineering ATM"
}

j['latlon'] = [j['geocode']['lat'], j['geocode']['lng']]\

print(j)

db.newatms.insert(j)