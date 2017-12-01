/*jshint esnext:true*/

var debug = require('debug')('torment:test');
var Torment = require('..');

describe('Google', function () {
    new Torment(
    'https://google.com',
    'https://google.co.jp',
    {
      show: true,
      targets: {
        small: [100,200],
        big: [1000,2000]
      }
    }, ( torment, size ) => {

    const { label, width, height } = size;

    describe(`${label} : ${width} x ${height}`, () => {

      before(function* () {;
        yield torment.wait(100);
      });

      it('Homepage', function* () {
        yield torment.test('/');
      })

      it('Services', function* () {
        yield torment.test('/services');
      })

      after(function* () {
        yield torment.end();
      })
    });
  });
});
