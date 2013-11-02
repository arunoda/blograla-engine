blograla-engine
===============

### Engine For BlogRala

## Mobile API

This is the API used to get items from the engine

### GET /api/items

Get latest 20 items. Single item can be like below

~~~json
{
  "feed": {
    "name": "Test Feed",
    "url": "http://testurl"
  },
  "atom": {
    ...
  },
  "timestamp": 1383383072009,
  "_id": "5274c0204bcbfe2f07000001"
}
~~~

#### Options

We can provide options via query string. See below for options

* limit [type: int] - no of items to be included (default to 20)
* from [type: _id] - this will consider as the first item of retrieving data
* to [type: _id] - this will be the last item of the selection for the retreiving data (limit will apply after this)