from tornado import web, ioloop, options
import json
import requests
import pymongo

conf = json.loads(open("conf.json").read())


print("Connecting to DB")
uri = "mongodb://"+conf['db_user']+":"+conf['db_pass']+"@"+conf['db_host']
client = pymongo.MongoClient(uri)
db = client.get_default_database()
db.newatms.create_index([("latlon", pymongo.GEO2D)])
print("Connected")



class MainHandler(web.RequestHandler):
    def post(self, *args, **kwargs):
        self.set_header("Content-Type", "application/json")

        j = json.loads(self.get_argument("data"))
        print(j)

        if j['event'] == "getatmdata":
            #sent: lat, lon

            api_key = conf['nessy_api']
            lat = j['lat']
            lng = j['lng']

            print(lat, lng)

            intervals = [1, 2, 5, 10, 20, 50, 100]

            #url = "http://api.reimaginebanking.com/atms?lat={}&lng={}&rad=20&key={}".format(str(lat), str(lng), api_key)
            #resp = requests.get(url).json()
            #print(resp)
            #resp = resp['data']

            res = db.newatms.find({"latlon": {"$within": {"$center": [[lat, lng], 0.065]}}})

            obj = []
            for atm in res:
                atm.pop("_id", None)
                atm['reviews'] = []
                reviews = db.reviews.find({"id":atm["id"]})
                for r in reviews:
                    atm['reviews'].append({"rating":r['rating'], "comment":r["comment"]})
                obj.append(atm)

            self.write(json.dumps(obj[:6]))

        elif j['event'] == "submitreview":
            #sent: comment, rating, atm_id

            db.reviews.insert({"id":j['atm_id'], "rating":j['rating'], "comment":j['comment']})
            self.write("success")

            pass


class MapHandler(web.RequestHandler):
    def get(self, *args, **kwargs):
        self.render("maps-test/index.html")


api_key = conf['nessy_api']
lat = "38.9283"
lng = "-77.1753"
url = "http://api.reimaginebanking.com/atms?lat={}&lng={}&rad=1&key={}".format(lat, lng, api_key)
resp = requests.get(url).json()
print(resp)





print("restarting")
app = web.Application([
    (r"/command", MainHandler),
    (r"/maptest", MapHandler),
], debug=True)

app.listen(6060)
ioloop.IOLoop.current().start()