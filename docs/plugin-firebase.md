---
id: plugin-firebase
title: firebase Plugin
sidebar_label: firebase
---

`firebase` comes with simplified [**Firestore**](https://firebase.google.com/docs/firestore) APIs powerd by [**Firestore Sweet**](https://warashibe.github.io/firestore-sweet/) and direct access to [**Firebase Realtime Database**](https://firebase.google.com/docs/database), [**Clud Storage**](https://cloud.google.com/storage) and the original [**Firestore**](https://firebase.google.com/docs/firestore) APIs.

## Installation

```javascript
nextdapp add firebase
```


`firebase` plugin requires `firebase` node package to be installed to the main app.

```
yarn add firebase
```
## conf.js / conf.local.js

The configurations to pass to `firebase.initializeApp()` are required. You can get these values from [**Firebase Console**](https://console.firebase.google.com) once you set up a Firebase project.

```javascript
  ...
  firebase: {
    name: "[project-name]",
    id: "[project-id]",
    key: "[firebase-api-key]",
    sender: "[sender-id],
    region: "[pregion]"
  },
  ...

```

## Global States

### `isFB`

This will be set once `Firebase` is initialized.

## Global Functions

### `initFB()`

A `Promise` / `async` function to initialize `Firebase` instance. You need to execute `initFB` once, before you can use `Firebase` related APIs. `initFB` returns an instance which contains:

* `db` : [**Firestore Sweet**](https://warashibe.github.io/firestore-sweet/docs/api-get) APIs
* `firebase` : Firebase Realtime Database
* `firestore` : The original Firesotore APIs
* `FieldValue` : used with Firestore for tasks such as delete and increment
* `storage` : Cluud Storage

```javascript
import { useEffect } from "react"
import { bind } from "nd"

export default bind(
  ({ init }) => {
    const { initFB } = init()
    useEffect(() => {
      initFB().then(async ({ db, firebase, firestore, FieldValue, storage }) => {
        console.log(await db.get("users"))
      })
    }, [])
    return <div>initFB</div>
  },
  ["initFB"]
)

```

Once initialized, the [global](/next-dapp/docs/global) object gets `fb` (the whole instance above) and `db` (only Firestore Sweet), so you can use them within global functions.

```javascript
import { useEffect } from "react"
import { bind } from "nd"

export default bind(
  ({ init }) => {
    const { initFB, func } = init()
    useEffect(() => {
      initFB().then(() => {
        func()
      })
    }, [])
    return <div>initFB, then use a global function</div>
  },
  [
    "initFB",
    {
      func: async ({ global: { fb, db } }) => { // global gets fb and db
        await db.update({ name : "Bob" }, "users", "id-3")
      }
    }
  ]
)
```

## Reqular Functions

### `initFB({ conf })`

You can use `initFB` as a reqular function as well, but you need to pass `conf`. and in this way, `global` object won't get `fb` and `db`, so to access those you need to use `fb()` and `db()`.

```
import { initFB, fb, db } from "nd/firebase"

const func = () => {
  initFB().then((fb)=>{
    console.log(fb.db.get("user"))
  })
}
```
### `fb()`

gets the same FB instance as `initFB`.

### `db()`

gets `Firestore Sweet` APIs.

## Examples

### with Tracker

To use `Firebase` APIs with [Tracker](/next-dapp/docs/tracker), you need to watch `isFB` since `Tracker` could execute before the `initFB` returns. This could be a bit simplified in the future.

```javascript
import { useEffect } from "react"
import { bind } from "nd"

export default bind(
  ({ init, router, what }) => {
    const { initFB } = init()
    useEffect(() => {
      initFB()
    }, [])
    return (
      <Fragment>
        <Tracker
          name="fb"
          watch={["isFB", "user"]} // watch isFb and something else		  
          func={async ({ props: { isFB, user }, global: { db, fb } }) => {
            if (isFB && user !== null){ // check if isFB is true
              await db.set({ count: db.inc(1) }, "users", user.uid)
			}
          }}
        />
      </Fragment>
    )
  },
  ["initFB"]
)
```

