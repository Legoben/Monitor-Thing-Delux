from tornado import web, ioloop, options
import json
import requests
import pymongo
import random

conf = json.loads(open("conf.json").read())


print("Connecting to DB")
uri = "mongodb://"+conf['db_user']+":"+conf['db_pass']+"@"+conf['db_host']
client = pymongo.MongoClient(uri)
db = client.get_default_database()
db.newatms.create_index([("latlon", pymongo.GEO2D)])
print("Connected")

reviews = [
    {"rating":5, "comment":"This ATM was great, the best haul I've gotten in months."},
    {"rating":5, "comment":"Ballar ATM, it let our every bill it had in it."},
    {"rating":5, "comment":"No security, no witnesses. 5/7 would rob again."},
    {"rating":3, "comment":"Pretty good. Robbed it pretty well. Was not a fan of its surroundings."},
    {"rating":3, "comment":"Yo, its alright. Can't comment on the quality of the cash I stole either way."},
    {"rating":1, "comment":"Terrible. I was caught in the act. Thankfully, I had already reserved a getaway Uber."},
    {"rating":1, "comment":"Awful. There was literally a police car next to it. How was I supposed to rob it?"},
    {"rating":1, "comment":"ATM was out of cash. Zero dollar profit."},
]

class MainHandler(web.RequestHandler):
    def getAirport(self, latlon):
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key="+conf['maps_api']+"&location="+latlon+\
              "&rankby=distance&keyword=airport?"
        print(url)

        resp = requests.get(url).json()['results'][0]['geometry']['location']
        print(resp)
        return resp

    def set_default_headers(self):
        self.add_header('Access-Control-Allow-Origin', self.request.headers.get('Origin', '*'))

        # You could also add 'GET' here, or any other HTTP methods
        self.add_header('Access-Control-Request-Method', 'POST')

        # This is needed because Sencha sends the 'X-Requested-With' by default
        self.add_header('Access-Control-Allow-Headers', 'X-Requested-With')

        self.set_header("Content-Type", "application/json")


    def post(self, *args, **kwargs):

        self.set_header("Access-Control-Allow-Origin", "*")

        j = json.loads(self.get_argument("data"))
        print(j)

        if j['event'] == "getatmdata":
            #sent: lat, lon

            api_key = conf['nessy_api']
            lat = j['lat']
            lng = j['lng']

            print(lat, lng)


            ap = self.getAirport(str(lat)+","+str(lng))

            intervals = [1, 2, 5, 10, 20, 50, 100]

            #url = "http://api.reimaginebanking.com/atms?lat={}&lng={}&rad=20&key={}".format(str(lat), str(lng), api_key)
            #resp = requests.get(url).json()
            #print(resp)
            #resp = resp['data']

            res = db.newatms.find({"latlon": {"$within": {"$center": [[lat, lng], 0.08]}}})

            obj = []
            for atm in res:
                atm.pop("_id", None)

                #reviews = db.testr2.find({"aid":atm["id"]})
                #for r in reviews:
                #    atm['reviews'].append({"rating":r['rating'], "comment":r["comment"]})
                #
                rint = random.randint(1,2)
                random.shuffle(reviews)
                atm['reviews'] = reviews[:rint]

                obj.append(atm)

            print(obj)
            random.shuffle(obj)
            self.write(json.dumps({"obj":obj[:6], "ap":ap}))
            #self.write(json.dumps({"obj":obj, "ap":ap}))

        elif j['event'] == "submitreview":
            #sent: comment, rating, atm_id
            print("submitting")

            db.testr2.insert({"aid":j['atm_id'], "rating":j['rating'], "comment":j['comment']})
            self.write("success")

            pass


class MapHandler(web.RequestHandler):
    def get(self, *args, **kwargs):
        self.render("maps-test/index.html")


class CoordHandler(web.RequestHandler):
    def get(self, *args, **kwargs):
        self.render("maps-test/getcoords.html")


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
    (r"/coordstest", CoordHandler),
], debug=True)

app.listen(6060)
ioloop.IOLoop.current().start()