from tornado import web, ioloop, options
import json
import requests
import pymongo

conf = json.loads(open("conf.json").read())


print("Connecting to DB")
uri = "mongodb://"+conf['db_user']+":"+conf['db_pass']+"@"+conf['db_host']
client = pymongo.MongoClient(uri)
client.server_info()
db = client.main
print("Connected")



class MainHandler(web.RequestHandler):
    def post(self, *args, **kwargs):
        self.set_header("Content-Type", "application/json")

        j = json.loads(self.get_argument("data"))

        if j['event'] == "getatmdata":
            #sent: lat, lon

            api_key = conf['nessy_api']
            lat = "38.9283"
            lng = "-77.1753"

            url = "http://api.reimaginebanking.com/atms?lat={}&lng={}&rad=1&key={}".format(str(lat), str(lng), api_key)
            resp = requests.get(url).json()
            print(resp)
            resp = resp['data']

            obj = []
            for atm in resp:
                atm['reviews'] = []
                reviews = db.reviews.find({"id":atm["_id"]})
                for r in reviews:
                    atm['reviews'].append({"rating":r['rating'], "comment":r["comment"]})

                obj.append(atm)

            self.write(json.dumps(obj))


        elif j['event'] == "submitreview":
            pass


api_key = conf['nessy_api']
lat = "38.9283"
lng = "-77.1753"
url = "http://api.reimaginebanking.com/atms?lat={}&lng={}&rad=1&key={}".format(lat, lng, api_key)
resp = requests.get(url).json()
print(resp)





print("restarting")
app = web.Application([
    (r"/command", MainHandler),
], debug=True)

app.listen(6060)
ioloop.IOLoop.current().start()