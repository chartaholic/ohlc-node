// Generated by CoffeeScript 2.3.1
(function() {
  var _, arrayData, moment, objData, ohlc, test;

  require('source-map-support').install();

  _ = require('lodash');

  moment = require('moment');

  ({test} = require('ava'));

  ohlc = require('../');

  // ohlc = require '../dist/ohlc.js'
  objData = require('../sample/objData.json');

  arrayData = require('../sample/arrayData.json');

  test('sma(range) not round()', function(t) {
    var prices, samples;
    prices = ohlc(arrayData).sma(5, 25, 75).toDaily();
    samples = prices.filter(function(item) {
      return item.Date.includes('2017-02-');
    });
    t.is(samples[0].sma5, 347);
    t.is(samples[1].sma5, 347);
    t.is(samples[2].sma5, 346);
    return t.deepEqual(prices[100], {
      Date: '2017-05-31',
      Open: 372,
      High: 372,
      Low: 362,
      Close: 364,
      Volume: 46500,
      sma5: 373,
      sma25: 373,
      sma75: 360,
      smad5: -2.41,
      smad25: -2.49,
      smad75: 1.11
    });
  });

  test('vwma(range)', function(t) {
    var prices, samples;
    prices = ohlc(arrayData).vwma(5, 25, 75).toDaily();
    samples = prices.filter(function(item) {
      return item.Date.includes('2017-02-');
    });
    t.is(samples[0].vwma5, 347);
    t.is(samples[1].vwma5, 347);
    t.is(samples[2].vwma5, 347);
    return t.deepEqual(prices[100], {
      Date: '2017-05-31',
      Open: 372,
      High: 372,
      Low: 362,
      Close: 364,
      Volume: 46500,
      vwma5: 374,
      vwma25: 374,
      vwma75: 361,
      vwmad25: -2.69,
      vwmad5: -2.75,
      vwmad75: 0.71
    });
  });

  test('round().sma(range)', function(t) {
    var prices;
    // round(undefined)
    prices = ohlc(arrayData).round().sma(75).toDaily();
    t.is(prices[100].sma75, 360);
    // round(number)
    prices = ohlc(arrayData).round(2).sma(75).toDaily();
    return t.is(prices[100].sma75, 360.01);
  });

  test('toChartData()', function(t) {
    var chartData, dailyData, ref;
    chartData = ohlc(arrayData).sma(5, 10).vwma(12, 26).toChartData();
    t.deepEqual(Object.keys(chartData), ['candle', 'volume', 'sma5', 'smad5', 'sma10', 'smad10', 'vwma12', 'vwmad12', 'vwma26', 'vwmad26']);
    dailyData = ohlc(arrayData).sma(5, 10).vwma(12, 26).toDaily();
    t.deepEqual(chartData.sma5[10], [1484784000000, 341]);
    return (function() {
      var results = [];
      for (var j = 0, ref = dailyData.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this).forEach(function(i) {
      t.is(chartData.sma5[i][1], dailyData[i].sma5);
      return t.is(chartData.vwma12[i][1], dailyData[i].vwma12);
    });
  });

  test('toChartData() by readme', function(t) {
    var chartData;
    chartData = ohlc(arrayData).sma(5, 25).toChartData();
    t.deepEqual(Object.keys(chartData), ['candle', 'volume', 'sma5', 'smad5', 'sma25', 'smad25']);
    t.deepEqual(chartData.candle[90], [1494979200000, 370, 372, 365, 369]);
    t.deepEqual(chartData.volume[90], [1494979200000, 32300]);
    t.deepEqual(chartData.sma5[90], [1494979200000, 372]);
    t.deepEqual(chartData.smad5[90], [1494979200000, -0.86]);
    t.deepEqual(chartData.sma25[90], [1494979200000, 359]);
    t.deepEqual(chartData.smad25[90], [1494979200000, 2.76]);
    return t.is(moment(chartData.candle[90][0]).format('YYYY-MM-DD'), '2017-05-17');
  });

  test('toChartData()', function(t) {
    var chartData;
    chartData = ohlc(arrayData).toChartData();
    t.deepEqual(Object.keys(chartData), ['candle', 'volume']);
    t.deepEqual(chartData.candle[0], [1483488000000, 348, 350, 346, 350]);
    return t.deepEqual(chartData.volume[0], [1483488000000, 68700]);
  });

}).call(this);
