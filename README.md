# miniapi
![miniapi](miniapi.png)

[![Build Status](https://travis-ci.org/pxai/miniapi.svg?branch=master)](https://travis-ci.org/pxai/miniapi)
[![CircleCI](https://circleci.com/gh/pxai/miniapi.svg?style=svg)](https://circleci.com/gh/pxai/miniapi)
[![Coverage Status](https://coveralls.io/repos/github/pxai/miniapi/badge.svg)](https://coveralls.io/github/pxai/miniapi)
[![npm version](https://badge.fury.io/js/miniapi.svg)](https://badge.fury.io/js/miniapi)

Minimalistic API server

By default it opens a HTTP server on [port 3000](http://localhost:3000)
and serves some json.

## Instalation
Using npm
```
npm install miniapi
```

## Setting up
Just do:
```javascript
const miniapi = require('miniapi');
miniapi.start();
```

This will create a very simple web server serving this json document:
```javascript
[
  { id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'}
]
```

## Options
You can change some default settings with clauses:
```javascript
const miniapi = require('miniapi');
miniapi
  .withPort(3200)
  .start();
```

You can also change the data:
```javascript
miniapi
  .withPort(3200)
  .withData([{id: 3, name: 'Thor'},{ id: 666, name: 'Loki'}])
  .start();
```
By default, the name of the API is *user*. You can change it using *withName* clause:
```javascript
miniapi
  .withName('myapi')
  .start();
```
Then, all requests should go to */myapi*

If you change the *id* with *setId*, you must provide coherent data:
```javascript
miniapi
  .withPort(3200)
  .withId('_id')
  .withData([{_id: 3, name: 'Thor'},{ _id: 666, name: 'Loki'}])
  .start();
```

You can also get initial data from a JSON file using *withDataFrom* clause:

```javascript
miniapi
  .withPort(3200)
  .withId('_id')
  .withDataFrom('./sample.json')
  .start();
```

And you can also apply *withPersist* to save API data to the same file:

```javascript
miniapi
  .withPort(3200)
  .withId('_id')
  .withDataFrom('./sample.json')
  .withPersist()
  .start();
```
Obviously, *withPersist* clause needs to set *withDataFrom* clause.

## The API

### GET /
Any of these will return all data with 200 code.
- GET /
- GET /user  or GET /{name}
- GET /user/ or GET /{name}

### GET /{name}/{id}
This will return just one record with 200 code.
- GET /user/1  or GET /{name}/{id}

Or it will return {} with 404 if there is no match.

### POST /{name}
Expects a JSON body, for example:

```javascript
{ name: 'Miniapi rulez'}
```
This will return the newly created record with 200 code.
- POST /user  or POST /{name}

Or it will return {} with 404 if url is incorrect.

### PUT /{name}/{id}
Expects a JSON body, for example:

```javascript
  { name: 'Miniapi rulez'}
```
This will return the updated record with 200 code:
```javascript
  { id: 1, name: 'Miniapi rulez'}
```

- PUT /user/1  or PUT /{name}/{id}

Or it will return {} with 404 if url is incorrect.

### PATCH /{name}/{id}
For the moment, it's just like PUT.
Expects a JSON body, for example:

```javascript
    { name: 'Miniapi rulez'}
```

This will return the updated record with 200 code:
```javascript
    { id: 1, name: 'Miniapi rulez'}
```

- PATCH /user/1  or PATCH /{name}/{id}

Or it will return {} with 404 if url is incorrect.

### DELETE /{name}/{id}
  This will return the deleted record with 200 code.
  - DELETE /user/1  or DELETE /{name}/{id}

  Or it will return {} with 404 if there is no match.

## Greets
⚔️
