# Torment
<strong>Perceptual diffing suite</strong>
<br>
built on <a href="https://github.com/segmentio/nightmare">Nightmare</a> by <a href="https://segment.com">Segment</a>
</p>

## Getting Started
You can look at [`test/index.js`](https://github.com/mousemke/torment/blob/master/test/index.js) as an example for how to use Torment. To run the example test just run `make test` after cloning this repo.

## Reference
Torment is built on [Nightmare](https://github.com/segmentio/nightmare) and used in combination with [Mocha](https://mochajs.org/) (though other test frameworks can be used). You'll also need to read and use both of those library's APIs to use Torment effectively.

###### This project was forked from [Niffy](https://github.com/segmentio/niffy)

### Torment(basehost, testhost[, options])
To create a new Torment differ:

```js
let torment = new Torment(basehost, testhost, options, testsFunction);
```

* `basehost` is the url that is assumed "good"
* `testhost` is the url that you are comparing to the base
* `options` aside from the few specific Torment options, all nightmare options can be used. They can be seen [here in the Nightmare docs](https://github.com/segmentio/nightmare#nightmareoptions)
  * `pngPath` is the folder the screenshots will be saved.
  * `threshold` is the maximum percentage difference for a passing test
  * `targets` a list of resolutions to test
* `testsFunction`

Torment supplies these defaults:

```js
{
  pngPath : './.torment`,
  threshold : 0.2,
  targets : {
    default : [ 1400, 1000 ]
  }
}
```

## Usage

Whatever tests you want to run at each resolution must be wrapped in a function  and passed as the `testsFunction` parameter of the Torment constructor.

### Mocha example:

```js
new Torment(
  'https://google.com',
  'https://google.co.jp',
  {
    targets: {
      small: [100,200],
      big: [1000,2000]
    }
  }, ( torment, size ) => {

  const { label, width, height } = size;

  describe(`${label} : ${width} x ${height}`, () => {
    it('Homepage', function* () {
      yield torment.test('/');
    })

    after(function* () {
      yield torment.end();
    });
  }
);
```

(see [`test/index.js`](https://github.com/mousemke/torment/blob/master/test/index.js) for a full example)

### .test(url[, fn])
This method instructs torment to go to a `url` (and optionally take additional actions like clicking, typing or checkboxing via the `fn` argument), and test `basehost` vs. `testhost` screenshots for pixel differences, and output the diff-highlight image. Typically you'll use `.test(url, fn)` in the body of a mocha test, like this:

```js
it('/news', function* () {
  yield torment.test('/news');
});
```

### .goto(url[, fn])
This method instructs torment to go to a `url` and optionally take additional actions like clicking, typing or checkboxing via the `fn` argument. Typically you'll use `.goto(url, fn)` in the `before` method of a mocha test suite, like this:

```js
before(function* () {
  yield torment.goto('/logout', function* (nightmare) {
    yield nightmare
      .type('input[name="email"]', 'fake@faketestfaketest.com')
      .type('input[name="password"]', 'fakepassword')
      .click('button[type="submit"]');
  });
});
```

### .end()
This method closes the underlying Nightmare instance (e.g. freeing up memory). Typically you'll use `.end()` in the `after` method of a mocha test suite, like this:

```js
after(function* () {
  yield torment.end();
});
```

Contributing
============

Development of Torment requires node `7` or higher.

Torment's **branch structure** goes as follows:

+ `master` - latest stable git repo.

+ `dev` - current development branch.  This is where feature branches should branch from.

+ issue branches - these branches come from `dev` and are branched for a specific feature or bug, then get merged back into `dev`.  The branch names should follow the structure `GH-(issue number)-(name)`

-----

We gladly accept and review any pull-requests into the current `dev` branch. Feel free! :heart:

Otherwise, if you just want to talk, we are very easy to get a hold of!

+ Email:          [mouse@knoblau.ch](mailto:mouse@knoblau.ch)
+ Git:            <a href="https://github.com/mousemke/torment/" target="_blank">https://github.com/mousemke/torment/</a>


This project adheres to the [Contributor Covenant](http://contributor-covenant.org/). By participating, you are expected to honor this code.

[Torment - Code of Conduct](https://github.com/mousemke/torment/blob/master/CODE_OF_CONDUCT.md)


## [License (MIT)](https://github.com/mousemke/torment/blob/master/LICENSE.md)
