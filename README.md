# miniapi
[![Build Status](https://travis-ci.org/pxai/miniapi.svg?branch=master)](https://travis-ci.org/pxai/miniapi)
[![CircleCI](https://circleci.com/gh/pxai/miniapi.svg?style=svg)](https://circleci.com/gh/pxai/miniapi)

Minimalistic API server

## Instalation
Using npm
```
npm install miniapi
```

## Setting up

Just do:
```node
const miniapi = require('miniapi');
miniapi.start();
```

This will create a very simple web server returning this json document:
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
