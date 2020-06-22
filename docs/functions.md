---
id: global-functions
title: Global Functions
sidebar_label: Global Functions
---

See **[bind](/next-dapp/docs/bind)** doc for how to bind `Global Functions` to React Components.

## Arguments

`Global Functions` will alway get `val`, `props`, `set`, `conf` and `global`.

* `val` : arguments passed to the function execution.
* `props` : Global States bound to the function.
* `set` : a setter for Global States.
* `conf` : the configuration defined in `/nd/conf.js`.
* `global` : non-reactive globally shared object.

## Predefine functions

Globally shared functions can be predefined in `/nd/custom.js`. Export as many as you like.

```javascript
export const add = ({ val, props, set, conf, global }) =>
  set((props.count || 0) + val, "count")
add.props = ["count"]
```
