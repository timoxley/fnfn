"use strict"


var before = require('beforefn')
var after = require('afterfn')
var guard = require('guardfn')
var around = require('aroundfn')

module.exports = FnFn

function FnFn(obj) {
  obj = Object.create(obj)
  obj.before = function(fnName, fn) {
    obj[fnName] = before(obj[fnName], fn)
    return obj
  }

  obj.after = function(fnName, fn) {
    obj[fnName] = after(obj[fnName], fn)
    return obj
  }

  obj.guard = function(fnName, fn) {
    obj[fnName] = guard(obj[fnName], fn)
    return obj
  }

  obj.around = function(fnName, fn) {
    obj[fnName] = around(obj[fnName], fn)
    return obj
  }
  return obj
}

FnFn.before = before
FnFn.after = after
FnFn.guard = guard
FnFn.around = around
