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

## API
* `/api/v1/titles` a list of all titles `[{id, title, artistCreditsString}]
* `/api/v1/titles/:id` metadata for a title id, including `url` to stream
it to client


**Note:** `.env` file is not committed as it contains AWS access keys

## Install
```$xslt
yarn
```

## Run
```$xslt
yarn start
```

## Flow Check
```$xslt
yarn flow:check
```
