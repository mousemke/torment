/*jshint esnext:true*/

var debug = require('debug')('torment:test');
var Torment = require('..');

describe('Google', function () {
  var torment

  before(function () {
    torment = new Torment(
      'https://google.com',
      'https://google.co.jp',
      {
        show: true
      }
    )
  })

  it('Homepage', function* () {
    yield torment.test('/')
  })

  it('Services', function* () {
    yield torment.test('/services')
  })

  after(function* () {
    yield torment.end()
  })
})
