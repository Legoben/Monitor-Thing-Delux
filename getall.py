import requests
import json
import sys
import pymongo
conf = json.loads(open("conf.json").read())


uri = "mongodb://"+conf['db_user']+":"+conf['db_pass']+"@"+conf['db_host']
client = pymongo.MongoClient(uri)
db = client.get_default_database()


page=1

total = []

while True:
    url = "http://api.reimaginebanking.com/atms?key={}&page={}".format(conf['nessy_api'], page)
    resp = requests.get(url).json()
    print("Page",page,"Len",len(resp['data']))

    if len(resp['data']) == 0:
        db.newatms.ensure_index([("latlon", pymongo.GEO2D)])
        open("all.json", "w+").write(json.dumps(total))
        for t in total:
            t["id"] = t["_id"]
            t['latlon'] = [t['geocode']['lat'], t['geocode']['lng']]
            t.pop("_id", None)


            print(t)
            db.newatms.insert(t)




    total.extend(resp['data'])
    page += 1

