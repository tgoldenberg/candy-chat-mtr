
# check v1.0.6 [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This package is stripped from [meteor/check](https://atmospherejs.com/meteor/check) and made compatible with [React Native](https://github.com/facebook/react-native).

**Note:** This package is only for client-side usage.

&nbsp;

## usage

```js
var check = require('check');

// Throw if 'someVar' isnt a Number type
check(someVar, Number);
```

More functionality is exposed with the `Match` singleton.

```js
var Match = require('check/match');

// Throw if 'someVar' isnt a String type (or undefined)
check(someVar, Match.Optional(String));
```

Learn more [here](https://atmospherejs.com/meteor/check).

&nbsp;

## notes

- Heterogenous arrays are not supported.
