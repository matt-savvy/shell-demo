# shell-demo

Demo project to show how to customize node REPL.

## Setup

1. Make sure to have mongodb running at `localhost:27017`
2. `npm ci` to install dependencies.

## Useage

Run `npm run shell` to open custom REPL.

```
$ npm run shell

> shell-demo@1.0.0 shell
> node customRepl.js

connecting to database...
connected

>
```

You can evaluate javascript as normal.

```javascript
> 1 + 1
2
> m = 5
5
> m + 1
6
> [2, 4, 6, 8].map(i => i + m)
[ 7, 9, 11, 13 ]
```

In customRepl.js, any values in `context` will be in global scope as soon as you start the custom REPL.

```javascript
// customRepl.js
const context = {
  User,
  UserFactory,
};
```

```javascript
> User
Model { User }
> UserFactory
{
  build: [Function: build],
  create: [AsyncFunction: create],
  createMany: [AsyncFunction: createMany],
  data: [Function: data]
}
> data = UserFactory.data()
{
  username: 'Alfonso.Marvin31',
  email: 'Archibald_Kulas@gmail.com',
  password: 'HOJwbTm_k77znna'
}
```

You can use `require` to import files and libraries as normal.
Anything exported by that file will be loaded into the global context.

```javascript
> const { add, divide } = require('./math')
undefined
> add(5, 10)
15
> divide(5, 10)
0.5
> const faker = require('@faker-js/faker')
undefined
> faker.address.zipCode()
'12754'
```

The database is connected as soon as the REPL is started.
You can save documents and query the DB as normal with no other setup.
`await` is available at the top level here.

```javascript
> data = UserFactory.data()
{
  username: 'Bradley.Kihn',
  email: 'Daphne_Balistreri56@gmail.com',
  password: 'IGKRtlhCIpgQFx0'
}
> user = await User.create(data)
{
  username: 'Bradley.Kihn',
  email: 'Daphne_Balistreri56@gmail.com',
  password: '$2b$08$.pqg1dplXnge/cpUHNPiNeZrpycCyjLxkzklU2hLCEDpZkoRzKg8.',
  roles: [ 'User' ],
  _id: new ObjectId("6390d59ac5daa7a07979b3c8"),
  __v: 0
}
> await User.count()
1
```

## Commands and special keys

Basic shell shortcuts and special keys are available:

- You can use `ctrl` + `p` / `ctrl` + `n` or the up and down arrows to cycle through previous lines you've entered.
- `ctrl` + `r` will let you search through your session history.
- `ctrl` + `l` will clear the screen.
- `ctrl` + `c` to abort current expression.

Normal node REPL commands are also available. Enter `.help` to see commands.

For example, use `.editor` to enter an easy multiline mode.

```javascript
> .editor
// Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)
function double(x) {
 return x * 2;
}

undefined
> double(5)
10
```

You can use `.load` to load a file into the current session.

```javascript
> .load ./permissions.js
function isAdmin(user) {
  return user.roles.includes("Admin");
  }

  function canUserChangeEmail(user) {
    return isAdmin(user);
    }

undefined
```

`isAdmin` and `canUserChangeEmail` are both now in global scope.

```javascript
> user = UserFactory.build({ roles: ['Admin'] });
{
  username: 'Mackenzie_Turner44',
  email: 'Nolan_Hauck35@yahoo.com',
  password: 'IdsQxpPueUkhVoj',
  roles: [ 'Admin' ],
  _id: new ObjectId("6390bee08782c0cfff6138dd")
}
> canUserChangeEmail(user)
true
```

See [https://nodejs.org/docs/latest-v16.x/api/repl.html#commands-and-special-keys](https://nodejs.org/docs/latest-v16.x/api/repl.html#commands-and-special-keys) for the full docs.

## Other features & customization

There is much more that can be done.
For more info on what's possible, see [https://nodejs.org/docs/latest-v16.x/api/repl.html](https://nodejs.org/docs/latest-v16.x/api/repl.html)
