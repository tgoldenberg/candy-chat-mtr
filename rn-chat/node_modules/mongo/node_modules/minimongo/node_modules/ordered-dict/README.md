
# ordered-dict v1.0.4 [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This package is stripped from [meteor/ordered-dict](https://atmospherejs.com/meteor/ordered-dict) and made compatible with [React Native](https://github.com/facebook/react-native).

**Note:** This package is only for client-side usage.

```js
var OrderedDict = require('ordered-dict');
```

-

An explanation stripped from the original source code:

> This file defines an ordered dictionary abstraction that is useful for maintaining a dataset backed by observeChanges.  It supports ordering items by specifying the item they now come before.
>
> The implementation is a dictionary that contains nodes of a doubly-linked list as its values.
