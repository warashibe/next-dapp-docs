---
id: bind
title: bind
sidebar_label: bind
---

`bind` is the gist of Next Dapp core. You can bind [Global States](/next-dapp/docs/global-states), [Global Functions](/next-dapp/docs/global-functions) and [Computed Values](/next-dapp/docs/computed-values) to React Components using `bind`.

`bind( React_Component, Array_of_things_to_bind )`

`Array_of_things_to_bind` can be any number of [Global States](/next-dapp/docs/global-states), [Global Functions](/next-dapp/docs/global-functions) and [Computed Values](/next-dapp/docs/computed-values) in any aubitrary order. You can also omit this second argument if there is nothing to bind.


## bind `Global States`

```javascript
import { bind } from "nd"

export default bind(
  ({ state1, state2, state3 }) => (
    <div>{state1} : {state2} : {state3}</div>
  ),
  ["state1", "state2", "state3"]
)

```

Global States are ideally predefined in `/nd/init.js`. But you can also use undefined state names. Undefined states will be initially set `null`.

Next Dapp utilizes [Recoil Atoms](https://recoiljs.org/docs/basic-tutorial/atoms) under the hood to create globally reactive and persistant states. Unlike React's local component states, other components which are bound to these states will be rerendered when states are changed by [set](/next-dapp/docs/set).

```javascript
import { bind } from "nd"

const Component = bind(
  ({ state }) => {
    return <div>{state}</div> // "state" is globally consistent and reactive
  },
  ["state"]
)

export default bind(
  ({ set, state }) => ( // bound components will always get "set"
    <div
      onClick={() => {
        set((state || 0) + 1, "state") // increment "state"
      }}
    >
      <Component />
    </div>
  ),
  ["state"] // initially set to null if not predefined or not used elsewhere before
)
```

## bind `Global Functions`

If `Global Functions` are predefined in `/nd/custom.js`, you can simply bind them with their name. `Global Functions` need to be initialized inside the component to enable reactivity. Use `init` to initialize the bound functions.

```javascript
import { bind } from "nd"

export default bind(
  ({ init }) => { // bound comoponents always get "init"
    const fn = init() // initialize the bound functions
	return (
      <div>
        <div onClick={fn.func1}>execute func1</div>
        <div onClick={fn.func2}>execute func2</div>
      </div>
    )
  },
  ["func1", "func2"]
)
```

You can also pass undefined functions as a part of an object. There are 2 ways to bind `Global States` to `Global Functions` as shown below. `func2` binds `state` by adding `random_func.props` Array. `func3` binds `state` by giving Array value `[ function, props ]`. If you bind `Global States` in either way, you can access them via `props` inside the `Global Function`.

```javascript
import { bind } from "nd"

const random_func = ({props}) => { // Global Functions will get "props"
  console.log(props.state) // access Globlal State via props
}
random_func.props = ["state"] // bind Global State

export default bind(
  ({ init }) => {
    const fn = init() // initialize Global Functions
    return (
      <div>
        <div onClick={fn.func1}>execute func1</div>
        <div onClick={fn.func2}>execute func2</div>
        <div onClick={fn.func3}>execute func3</div>		
      </div>
    )
  },
  [
    "func1", // predefined function in "/nd/custom.js"
    {
      func2: random_func,
      func3: [
        ({ props }) => { // Global Functions will get "props"
          console.log(props.state) // access Globlal State via props
        },
        ["state"] // bind Global State
      ]
    }
  ]
)
```

## bind `Computed Values`

[Computed Values](/next-dapp/docs/computed-values/) are [Recoil Selectors](https://recoiljs.org/docs/basic-tutorial/selectors) which reactively compute a value with multiple `Global States`. You can bind `Computed Values` with a `get` function defined as shown below. The `Global States` used in the computation also need to be bound to the same component.

```javascript
import { bind } from "nd"
export default bind(
  ({ num1, num2, sum }) => {
    return <div>{num1} + {num2} = {sum}</div>
  },
  [
    "num1", // used in the computation in "sum"
    "num2", // used in the computation in "sum"
    {
      sum: atoms => ({ get }) => {
	    /* use "get" to access the reactive values via "atoms" */
        return get(atoms.num1) + get(atoms.num2)
      }
    }
  ]
)
```

## mix everything

As stated before, you can mix any number of [Global States](/next-dapp/docs/global-states), [Global Functions](/next-dapp/docs/global-functions) and [Computed Values](/next-dapp/docs/computed-values) in any aubitrary order.


```javascript
import { bind } from "nd"
export default bind(
  ({ num1, num2, num3, num4, sum, init }) => {
    const fn = init()
    return (
      <div onClick={fn.func}>
        {num1} + {num2} = {sum}
      </div>
    )
  },
  [
    "num1",
    "num2",
    {
      sum: atoms => ({ get }) => {
        return get(atoms.num1) + get(atoms.num2)
      },
      func: [
        ({ props }) => {
          console.log(props.sum)
        },
        ["sum"]
      ]
    },
    "num3",
    "num4"
  ]
)
```

The only thing to note here is `sum` needs to be passed before `func` if `func` uses `sum`.
