# aula-test
A Test for AULA

## TL;DR
This project uses the following features:
* `node-babel` which enabled ES6 code without `@babel/register`
* `flow` which adds flow types
* `dotenv` which allow putting initialization params in `.env`
* `Koa` and `koa-router` the next-generation of `Express.js`

It uses `musicbrainz` to fetch artists and recordings based on filenames

## How This Can be Improved
* **Cache / DB**: Caching `musicbrainz` calls with a DB (e.g. `Redis`) to avoid long
initializing time, and getting metadata for the entire library
* **Audio Fingerprint**: Using `acousticid` (npm module) when filename does not contain information that
leads to a successful metadata fetch
* **Tests**: Source code was written with automatic test in mind, but such tests are
beyond the scope of this task. Unit tests can expect a given file list
from an S3 bucket maintained for testing, and broken down to extracting
`artistCreditsString` and `title` from a list of hard-coded filenames.
`extractMetadataFromMusicBrainz` can be tested with various known
titles and authors and expects given payloads.
* **More Scripts** `clean`, `serve` and `build:production`
* **Hashing**: Using `ETag` from `S3` as the key to cache metadata
* Adding more fields to `package.json` like `version` and `engine`,
that nobody will ever read...

## API
* `/api/v1/titles` a list of all titles `[{id, title, artistCreditsString}]
* `/api/v1/titles/:id` metadata for a title id, including `url` to stream
it to client


**Note:** `.env` file is not committed as it contains AWS access keys

## Prerequisites
Node >= 9.x

This project was never tested on a Windows machine. If you find any issues,
please send a detailed report to `/dev/null` or to `nobody@here.com`,
and I will do my worst to assist you. For more info, please see
my `no-support-whatsoever` SLA.

## Install
```$xslt
yarn
```
...if you're using `npm` please type... -- nah! it's your problem... 8-)
## Run
```$xslt
yarn start
```

## Flow Check
```$xslt
yarn flow:check
```
