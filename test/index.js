"use strict"

var test = require('tape')
var Aspectify = require('../')

test('guard can control calling', function(t) {
  t.plan(4)
  var obj = {
    doubleNumber: function(x) {
      return x * 2
    }
  }
  obj = Aspectify(obj)
  .guard('doubleNumber', function(x) {
    return x > 0
  })

  t.equal(obj.doubleNumber(1), 2)
  t.equal(obj.doubleNumber(10), 20)
  t.equal(obj.doubleNumber(-100), undefined)
  t.equal(obj.doubleNumber(), undefined)
})

test('around can control calling', function(t) {
  t.plan(4)
  var obj = {
    doubleNumber: function(x) {
      return x * 2
    }
  }
  obj = Aspectify(obj)
  .guard('doubleNumber', function A(x) {
    return x > 0
  })
  .around('doubleNumber', function B(fn) {
    return fn.apply(this, fn.args.map(function(x) {
      return x * 10
    }))
  })
  .guard('doubleNumber', function C(x) {
    return x < 100
  })

  t.equal(obj.doubleNumber(1), 20)
  t.equal(obj.doubleNumber(10), 200)
  t.equal(obj.doubleNumber(-100), undefined)
  t.equal(obj.doubleNumber(), undefined)
})

test.only('items are processed in reverse order', function(t) {
  t.plan(4)
  var obj = {
    doubleNumber: function(x) {
      return x * 2
    }
  }
  obj = Aspectify(obj)
  .guard('doubleNumber', function fn(x) {
    return x > 0
  })
  .before('doubleNumber', function fn(num) {
    fn.args[0] = Math.abs(num)
  })
  t.equal(obj.doubleNumber(1), 2)
  t.equal(obj.doubleNumber(10), 20)
  t.equal(obj.doubleNumber(-100), 200)
  t.equal(obj.doubleNumber(), undefined)
})
