---
id: nextdapp-cli
title: Next Dapp CLI Tools
sidebar_label: nextdapp
---

## Installation

```
yarn global add nextdapp
```

To use plugins, you also need the `bit-bin` node package to be installed globally.

```
yarn global add bit-bin
```

---

## Create a Project

```
nextdapp create myapp
cd myapp
yarn
```
---

## Add Plugins

Plugins will be installed under `/nd/[plugin_name]`.

```
nextdapp add util
```

Plugins can be namespaced. `nextdapp add [plugin_name] [namespace]`

```
nextdapp add util my_util
```

In this case, the `util` plugin will be installed at `/nd/my_util` and all the `states` and `functions` will be suffixed by `$my_util`. For instance, `url` becomes `url$my_util` throughout your app. A good reason for doing this is if two plugins have a name conflict.

---

## Update Plugins

```
nextdapp add util
```

If you namespaced the plugin, you need to do the same when updating. Otherwise the plugin will be moved to a different location.

```
nextdapp add util my_util
```

You can simply change the location of the plugin by using a different namespace.

```
nextdapp add util your_util
```

---

## Remove Plugins

When removing you don't have to worry about namespaces, Next Dapp knows where the `util` plugin is located.

```
nextdapp remove util
```
