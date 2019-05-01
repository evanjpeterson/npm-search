# Gremlin Technical Take Home

> Build NPM package search tool

- [What we are looking for](#what-we-are-looking-for)
- [Styling](#styling)
- [Example API request](#example-api-request)
- [Extra Credit](#extra-credit)

The task is to build a search form for npm registry packages and display a list from the returned payload.

The presented UI should function in a similar way to [npmjs.com search results](https://www.npmjs.com/search?q=%40emotion%2Fcore).

The GET request should be made to the following endpoint: `https://api.npms.io/v2/search/suggestions?q=${queryString}`

You may use any pattern or library that you find suitable to accomplish this task.

## What we are looking for

- Does it work?
- Does the implementation handle loading and error states?
- Mobile-first styling and UX.
- Proper-use of life-cycle events and handlers.
- Clean, well-commented code.

## Styling

For styling you may use css placed in './styles.css' or any css framework you would like.

If you would like to use the css prop from emotion, ensure the
following is at the top of every component file as seen in `./index.js`

```js
/* @jsx jsx */
import { jsx } from '@emotion/core'
```

See [emotion.sh](https://emotion.sh) for examples and further information if needed.

## Extra Credit

- Implement functionality to fail the API requests on purpose to test error states
  - Could be a fixed position checkbox or overlay with options
- Utilization of latest React APIs
- Dynamic theming

## Example API request

The request

```
https://api.npms.io/v2/search/suggestions?q=@emotion/core
```

Returns

```json
[
  {
    "package": {
      "name": "@emotion/core",
      "scope": "emotion",
      "version": "10.0.7",
      "description": "> Simple styling in React.",
      "date": "2019-02-04T07:04:58.854Z",
      "links": {
        "npm": "https://www.npmjs.com/package/%40emotion%2Fcore",
        "homepage": "https://github.com/emotion-js/emotion#readme",
        "repository": "https://github.com/emotion-js/emotion",
        "bugs": "https://github.com/emotion-js/emotion/issues"
      },
      "author": {
        "name": "mitchellhamilton",
        "email": "mitchell@mitchellhamilton.me",
        "username": "mitchellhamilton"
      },
      "publisher": {
        "username": "mitchellhamilton",
        "email": "mitchell@mitchellhamilton.me"
      },
      "maintainers": [
        {
          "username": "mitchellhamilton",
          "email": "mitchell@mitchellhamilton.me"
        },
        {
          "username": "tkh44",
          "email": "kye.hohenberger@gmail.com"
        }
      ]
    },
    "score": {
      "final": 0.8383753278717672,
      "detail": {
        "quality": 0.9416837960080147,
        "popularity": 0.5885021817528989,
        "maintenance": 0.9996983584452805
      }
    },
    "searchScore": 1035.4279,
    "highlight": "@<em>emotion</em>/<em>core</em>"
  },
  {
    "package": {
      "name": "@emotion/primitives-core",
      "scope": "emotion",
      "version": "10.0.1",
      "description": "Shared utilities for emotion primitives and native",
      "keywords": ["styles", "emotion", "react", "css", "css-in-js", "primitives", "native"],
      "date": "2018-12-01T20:39:35.935Z",
      "links": {
        "npm": "https://www.npmjs.com/package/%40emotion%2Fprimitives-core",
        "homepage": "https://emotion.sh",
        "repository": "https://github.com/emotion-js/emotion",
        "bugs": "https://github.com/emotion-js/emotion/issues"
      },
      "publisher": {
        "username": "mitchellhamilton",
        "email": "mitchell@mitchellhamilton.me"
      },
      "maintainers": [
        {
          "username": "mitchellhamilton",
          "email": "mitchell@mitchellhamilton.me"
        },
        {
          "username": "tkh44",
          "email": "kye.hohenberger@gmail.com"
        }
      ]
    },
    "score": {
      "final": 0.7368907709140747,
      "detail": {
        "quality": 0.9564452674731685,
        "popularity": 0.2858485781685711,
        "maintenance": 0.9997433951803553
      }
    },
    "searchScore": 3.5981452,
    "highlight": "@<em>emotion</em>/primitives-<em>core</em>"
  },
  {
    "package": {
      "name": "@emotion/preact-core",
      "scope": "emotion",
      "version": "0.13.1",
      "date": "2018-09-20T20:58:20.763Z",
      "links": {
        "npm": "https://www.npmjs.com/package/%40emotion%2Fpreact-core",
        "homepage": "https://github.com/emotion-js/emotion#readme",
        "repository": "https://github.com/emotion-js/emotion",
        "bugs": "https://github.com/emotion-js/emotion/issues"
      },
      "author": {
        "name": "mitchellhamilton",
        "email": "mitchell@mitchellhamilton.me",
        "username": "mitchellhamilton"
      },
      "publisher": {
        "username": "mitchellhamilton",
        "email": "mitchell@mitchellhamilton.me"
      },
      "maintainers": [
        {
          "username": "mitchellhamilton",
          "email": "mitchell@mitchellhamilton.me"
        },
        {
          "username": "tkh44",
          "email": "kye.hohenberger@gmail.com"
        }
      ]
    },
    "flags": { "unstable": true },
    "score": {
      "final": 0.6105385206089347,
      "detail": {
        "quality": 0.6239275189243247,
        "popularity": 0.20995164926877904,
        "maintenance": 0.9996491076787559
      }
    },
    "searchScore": 3.1210308,
    "highlight": "@<em>emotion</em>/preact-<em>core</em>"
  },
  {
    "package": {
      "name": "@emotion/babel-plugin-core",
      "scope": "emotion",
      "version": "0.6.9",
      "description": "A babel plugin for emotion",
      "date": "2018-09-20T20:58:19.811Z",
      "links": {
        "npm": "https://www.npmjs.com/package/%40emotion%2Fbabel-plugin-core",
        "homepage": "https://github.com/emotion-js/emotion#readme",
        "repository": "https://github.com/emotion-js/emotion",
        "bugs": "https://github.com/emotion-js/emotion/issues"
      },
      "publisher": {
        "username": "mitchellhamilton",
        "email": "mitchell@mitchellhamilton.me"
      },
      "maintainers": [
        {
          "username": "mitchellhamilton",
          "email": "mitchell@mitchellhamilton.me"
        },
        {
          "username": "tkh44",
          "email": "kye.hohenberger@gmail.com"
        }
      ]
    },
    "flags": { "unstable": true },
    "score": {
      "final": 0.682080305887619,
      "detail": {
        "quality": 0.8324029698831596,
        "popularity": 0.2360626861935446,
        "maintenance": 0.9992499278712303
      }
    },
    "searchScore": 2.5246432,
    "highlight": "@<em>emotion</em>/babel-plugin-<em>core</em>"
  }
]
```
