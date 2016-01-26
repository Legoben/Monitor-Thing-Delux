import requests, random, json, pymongo

conf = json.loads(open("conf.json").read())


uri = "mongodb://"+conf['db_user']+":"+conf['db_pass']+"@"+conf['db_host']
client = pymongo.MongoClient(uri)
db = client.get_default_database()

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




page = 1
total = []

while True:
    url = "http://api.reimaginebanking.com/atms?key={}&page={}".format(conf['nessy_api'], page)
    resp = requests.get(url).json()
    print("Page",page,"Len",len(resp['data']))

    if len(resp['data']) == 0:
        for atm in total:
            r = []
            url = "https://pennapps.ngrok.io/command"
            for i in range(4):
                t = random.choice(reviews)
                if(t['comment'] in r):
                    continue

                t['atm_num'] = atm['_id']

                t.pop("_id", None)
                print(t)

                try:
                    db.testr2.insert(t)
                except Exception as e:
                    print(e)

                r.append(t['comment'])
            print("")

    total.extend(resp['data'])
    page += 1