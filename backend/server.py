#!/usr/bin/env python

from bottle import route, run, response
import simplejson as json
import btceapi

def get_history(pair):
	def format_trade(t):
		return {'date': str(t.date), 'price': t.price, 'type': t.trade_type}
	history = btceapi.getTradeHistory(pair)
	ask, bid = None, None
	for h in history:
		if not ask and h.trade_type == "ask":
			ask = h
		if not bid and h.trade_type == "bid":
			bid = h
		if bid and ask:
			break
	return map(format_trade, [ask, bid])

@route('/price/<pair>')
def index(pair='ltc_usd'):
	response.set_header('Access-Control-Allow-Origin', '*')
	response.content_type = "application/json; charset=UTF8"
	result = json.dumps(get_history(pair))
	return result

run(server='cherrypy', host='0.0.0.0', port=31337)
