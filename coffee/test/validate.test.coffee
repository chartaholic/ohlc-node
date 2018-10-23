require('source-map-support').install()
_ = require('lodash')
moment = require 'moment'
{test} = require 'ava'
ohlc = require '../'
data = require '../sample/quandlSample.json'

test 'validate', (t) ->
  inValid = ohlc(data).validate()
  t.is inValid.length, 2
  t.pass()
