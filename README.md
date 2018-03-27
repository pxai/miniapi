# miniapi
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

## The API

### GET /
Any of these will return all data:
- GET /
- GET /user  or GET /{name}
- GET /user/ or GET /{name}

### GET /{name}/{id}
This will return just one record:
- GET /user/1  or GET /{name}/{id}

Or it will return {} if there is no match.
