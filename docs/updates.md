---
id: updates
title: Updates
sidebar_label: Updates
---

## Always use the Latest Version

Next Dapp is still in alpha and changing rapidly. So the chances are your troubles have been resolved in the latest versions. To update Next Dapp CLI Tools,

```bash
yarn global upgrade nextdapp --latest
```

Plugins can be updated simply by re-adding.

```bash
nextdapp add fb
```
Update the core.

```bash
nextdapp add core
```

## Updates

### 2020.07.05 [Core]

* global functions are now chainable. 
* deprecate `props` (still works as a snapshot) and introduce `get` to access any global states.

See the [**Global Functions**](/next-dapp/docs/global-functions) page for details.
