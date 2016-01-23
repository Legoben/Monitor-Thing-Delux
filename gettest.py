import pymongo
import json


conf = json.loads(open("conf.json").read())


uri = "mongodb://"+conf['db_user']+":"+conf['db_pass']+"@"+conf['db_host']
client = pymongo.MongoClient(uri)
db = client.get_default_database()



res = db.newatms.find({"latlon": {"$within": {"$center": [[38.9283, -77.1753], 0.07]}}})
for r in res:
    print(r)