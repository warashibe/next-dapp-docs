---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
---

Next Dapp is just a [Next.js](https://nextjs.org) app, but on steroids with [recoil](https://recoiljs.org/) state management library.

Reactive global state management is out of the box, which usually requires  heavry setups with external libraries such as `redux`, `rxjs`, `mobX` and related libraries.

Next Dapp also is a plugin based system, which gives you a jump-start with your dapp development with one command integration with firestore dabase, user management, web3 / blockchain wallets, CMS / blog system and so many more.

We will call Next Dapp powered apps **nDapps** throughout the docs.

## Setup

### Installation

Use `npm` or `yarn` to globally install Next Dapp CLI Tools.

```bash
yarn global add nextdapp
```

### Create a Project

```bash
nextdapp create myapp
cd myapp
yarn
```

### Run Locally

```bash
yarn dev
```
Now your local app is running at [http://localhost:3000](http://localhost:3000)


---

## nDapp Tree

Next Dapp is built on top of [Next.js](https://nextjs.org) which is based upon [React](https://reactjs.org). You can develop nDapps in the same way you develop Next.js apps.

```text
.
├── pages/
│   └── index.js
├── public/
│   └── static/
│       ├── images/
│       ├── favicon.ico
│       └── manifest.json
├── nd/
│   ├── core/
│   ├── conf.js
│   ├── conf.local.js
│   ├── .nextdapp.js
│   ├── .nextdapp-props.js
│   └── .plugins.json
├── node_modules/
├── .gitignore
├── .nowignore
├── .bitmap
├── nd.js
├── package.json
├── next.config.js
├── now.json
└── jscofig.json

```

---

## App Development

### Hello, World!

Edit `/pages/index.js` for this tutorial.

```javascript
export default () => <div>Hello, World!</div>
```

### bind / set global states

`bind` binds a component to global states. `count` is not a local state. It consists globally.

`set` can change global states and other components get the state changes.

Global states are basically [recoil atoms](https://recoiljs.org/docs/basic-tutorial/atoms).


```javascript
import { bind } from "nd"

export default bind(
  ({ set, count }) => (
    <div
      onClick={() => set((count || 0) + 1, "count")}
    >
      add count: {count || 0}
    </div>
  ),
  ["count"]
)
```

This is not easy to do with a bare React App.

```javascript
import { bind } from "nd"

const Counter = bind(({ count }) => <span>{count || 0}</span>, ["count"])

export default bind(
  ({ set, count }) => (
    <div
      onClick={() => set((count || 0) + 1, "count")}
    >
      click to add count: <Counter />
    </div>
  ),
  ["count"]
)
```

### Predefine global states

Global states can be predefined and initialized in `/nd/init.js`.

```javascript
export default {
  count1 : 1,
  count2 : 2
}
```

### bind functions

You can also bind functions.

To access global states  via `props` inside the function, you need to pass the names of the states as the second argument.  

The functions need to be initialized inside the component with `init()`.

```javascript
import { bind } from "nd"

const Counter = bind(({ count }) => <span>{count || 0}</span>, ["count"])

export default bind(
  ({ init, set, count }) => {
    const fn = init()
    return (
      <div onClick={() => fn.add(1)}>
        click to add count: <Counter />
      </div>
    )
  },
  [
    "count",
    {
      add: [
        ({ val, props, set }) => set((props.count || 0) + val, "count"),
        ["count"]
      ]
    }
  ]
)
```

### Predefine functions

Globally shared functions can be predefined in `/nd/custom.js`. Export as many as you like.

```javascript
export const add = ({ val, props, set }) =>
  set((props.count || 0) + val, "count")
add.props = ["count"]
```

Pass the predefined function name as a String value. `bind` is smart enough to know which are `states` and which are `functions`.

```javascript
import { bind } from "nd"
const Counter = bind(({ count }) => <span>{count || 0}</span>, ["count"])

export default bind(
  ({ init, set, count }) => {
    const fn = init()
    return (
      <div onClick={() => fn.add(1)}>
        click to add count: <Counter />
      </div>
    )
  },
  [ "count", "add" ]
)
```

### Computed states

You can also bind computed states which are basically [recoil selectors](https://recoiljs.org/docs/basic-tutorial/selectors) and based upon multiple global states.

Pass a `key : value` object with a `get` function inside the `value` as shown below.

`bind` will figure out it's a computed state.

Thes states used to compute the value has to be passed to the component as well. In the example below, `sum` uses `count1` and `count2` so both values are bound to the component. `get(count1)` returns the current value of `count1` inside the compute function. See the [recoil docs](https://recoiljs.org/docs/basic-tutorial/selectors) for details.

In the example, `sum` reactively cumputes the sum of `count1` and `count2` as soon as any of them changes.

If you install `react@expoerimental` and `react-dom@experimental`, you can even use `async` function to compute the value with [React Concurrent Mode](https://reactjs.org/docs/concurrent-mode-intro.html) (Suspense), which is not officially out to the stable version yet.


```javascript
import { bind } from "nd"

const Counter = bind(({ count1 }) => <span>{count1 || 0}</span>, ["count1"])
const Counter2 = bind(({ count2 }) => <span>{count2 || 0}</span>, ["count2"])

export default bind(
  ({ set, sum, init }) => {
    const fn = init()
    return (
      <div>
        <div onClick={() => fn.add({ num: 1, target: "count1" })}>
          click to add count1: <Counter />
        </div>
        <div onClick={() => fn.add({ num: 1, target: "count2" })}>
          click to add count2: <Counter2 />
        </div>
        <div>sum: {sum}</div>
      </div>
    )
  },
  [
    "count1",
    "count2",
    {
      add: [
        ({ val: { num, target }, props, set }) =>
          set((props[target] || 0) + num, target),
        ["count1", "count2"]
      ],
      sum: {
        get: atoms => ({ get }) => {
          return (get(atoms.count1) || 0) + (get(atoms.count2) || 0)
        }
      }
    }
  ]
)
```

You can mix as many `states`, `functions`, `predefined state names`, `predefined function names` and "selectors (computed states)" as you like in any caotic order as the second argument.

`bind( Component, [ states, functions, selectors ] )`

### Tracker

By inserting `Tracker` anywhere in your component, you can watch global states (Recoil atoms/selectors) and reactively execute a function when watching states change. This isn't easy to do without external state management libraries and complex setups, but Next Dapp makes it a breeze out of the box.

You can insert `Tracker` anywhere in your page components. `Tracker` doesn't render anything to the UI.

```javascript
<Tracker
  name="count_tracker"
  type="any"
  watch={["count1", "count2"]}
  props={["count1", "count2"]}
  func={({ set, props: { count1, count2 } }) => {
    set(count1 * count2, "product")
  }}
  />
```

A tracker `name`, `func` and `watch` are required.

You can `watch` state changes in two ways.

type `all`: the function executes after **all** the specified states changed.

type `any`: the function executes when **any** one of the specified states changed.

The function defined as `func` is the same as custome functions explained above. You can change any global states using `set`. The function can be `async` and you can change any global states even if they are not bound to the component.

Only the states specified in the `props` array will be passed to the functions as `props`. You may need different states than `watch` in the function `props`.

```javascript
import { bind, Tracker } from "nd"

const Counter = bind(({ count1 }) => <span>{count1 || 0}</span>, ["count1"])
const Counter2 = bind(({ count2 }) => <span>{count2 || 0}</span>, ["count2"])

export default bind(
  ({ set, init, sum, product }) => {
    const fn = init()
    return (
      <div>
        <div onClick={() => fn.add({ num: 1, target: "count1" })}>
          click to add count1: <Counter />
        </div>
        <div onClick={() => fn.add({ num: 1, target: "count2" })}>
          click to add count2: <Counter2 />
        </div>
        <div>sum: {sum}</div>
        <div>product: {product}</div>
        <Tracker
          name="count_tracker"
          type="any"
          watch={["count1", "count2"]}
          props={["count1", "count2"]}
          func={({ set, props: { count1, count2 } }) => {
            set(count1 * count2, "product")
          }}
        />
      </div>
    )
  },
  [
    "count1",
    "count2",
    "product",
    {
      add: [
        ({ val: { num, target }, props, set }) =>
          set((props[target] || 0) + num, target),
        ["count1", "count2"]
      ],
      sum: {
        get: atoms => ({ get }) => {
          return (get(atoms.count1) || 0) + (get(atoms.count2) || 0)
        }
      }
    }
  ]
)
```

### global object

There is a handy `global` object shared with every `bind` Component and function. The `global` object is not reactive but can be used to pass Class instances and large objects with circular structures. Changing `global` values won't trigger rendering of any components. `React` doesn't have a handy `global` object like this, but you don't want to expose anything to `window` object as it is accessible from the developer console. `global` is an internal object only shared with `Components` and `functions`.

```javascript
import { useEffect } from "react"
import { bind } from "nd"

const Count = bind(({ updated, set, init, global, conf }) => (
  <div>{global.count}</div>
))

export default bind(
  ({ set, init, global, conf }) => {
    useEffect(() => {
      global.count = 10
    }, [])
    return <Count />
  },
  [
    {
      log: ({ global, set, props, conf }) => {
        console.log(global.count)
      }
    }
  ]
)
```

### conf.js / conf.local.js
Just like `global`, configurations defined in `/nd/conf.js` or `/nd/conf.local.js` will be passed internally. See how they are passed everywhere in the example above.

```javascript
import { mergeAll } from "ramda"
let local = {}

try {
  local = require("nd/conf.local")
} catch (e) {}

const prod = {
  id: "next-dapp",
  html: {
    title: "Next Dapp | The Bridge between Web 2.0 and 3.0",
    description:
      "Next Dapp is a web framework to progressively connect web 2.0 with 3.0.",
    image: "https://picsum.photos/1000/500",
    "theme-color": "#03414D"
  }
}
module.exports = mergeAll([prod, local])
```

### .env

Use `/.env` to define credentials which shouldn't be exposed in the client app. Don't write these credentials in `/nd/conf.js` or `/nd/conf.local.js`. The data in these files will be inlined and exposed in the production app. In `Next.js` apps, there are places only executed on the server side, where you can use credentials without exposing them such as `/pages/api/*`, `getStaticProps`, `getStaticPaths` and `getServerSideProps`.

```text
SECRET=xxx
SECRET2=xxx
```

You can access these values as `procces.env.SECRET` and `process.env.SECRET2`.

### With TypeScript
There is currently no type definition file (.d.ts) for the next-dapps specific API, but If you want to develop with TypeScript, add the following to tsconfig.js:
```
{
  ...,
  "compilerOptions":{
    ...
    "baseUrl":"./"
    ...
  },
  ...
}
```

## Plugins

nDapps get better with a wide range of plugins such as Firestore database, user management, web3 / blockchain integration, CMS with a developer friendly editor and so forth.

Plugin tutorials are coming soon.

---

## Deploy

The best place to deploy your app is [Vercel Now](https://vercel.com).

```bash
now
```
