/* @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import { defaultTheme } from './themes'

const App = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    // Returns a max of 25 results by default, which should be fine.
    // See: api-docs.npms.io
    fetch(
      `https://api.npms.io/v2/search/suggestions?q=${query}`
    )
      .then(response => {
        if (!response.ok) {
          // TODO something with the error
          throw new Error(
            `Network error: ${response.status}`
          )
        }
        return response.json()
      })
      .then(json => {
        setResults(json.map(result => result.package))
      })
      .catch(error => {
        // TODO something with the error, give a nice user-friendly message
      })
  }, [query])

  const handleQueryChange = e => {
    setQuery(e.target.value)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
          }
        `}
      />
      <div
        className="App"
        css={theme => ({
          fontFamily: 'monospace',
          backgroundColor: theme.colors.background,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          padding: theme.sizes.base(4)
        })}
      >
        <input
          type="text"
          value={query}
          placeholder="Search NPM"
          onChange={handleQueryChange}
          css={theme => ({
            color: theme.colors.primary,
            background: theme.colors.searchField.background,
            border: `1px solid ${
              theme.colors.searchField.border
            }`,
            minHeight: theme.sizes.base(6),
            borderRadius: theme.borderRadius,
            fontSize: theme.sizes.primary,
            paddingLeft: theme.sizes.base(2)
          })}
        />
        <div
          css={theme => ({
            overflow: 'auto',
            margin: `${theme.sizes.base(3)} 0`
          })}
        >
          {results.map(result => (
            <div
              key={result.name}
              css={theme => ({
                background:
                  theme.colors.searchResult.background,
                borderRadius: theme.borderRadius,
                padding: theme.sizes.base(2),
                margin: `${theme.sizes.base()}`
              })}
            >
              <div>
                <a
                  href={result.links.npm}
                  target="_blank"
                  css={theme => ({
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                    fontSize: theme.sizes.primary
                  })}
                >
                  {result.name}
                </a>
                <span
                  css={theme => ({
                    color: theme.colors.secondary,
                    fontSize: theme.sizes.secondary,
                    marginLeft: theme.sizes.base(2)
                  })}
                >
                  @ {result.version}
                </span>
              </div>
              <div
                css={theme => ({
                  color: theme.colors.secondary,
                  fontSize: theme.sizes.secondary
                })}
              >
                {result.description}
              </div>
              <div>
                <span
                  css={theme => ({
                    color: theme.colors.ternary,
                    fontSize: theme.sizes.secondary
                  })}
                >
                  last published
                </span>
                <span
                  css={theme => ({
                    color: theme.colors.secondary,
                    fontSize: theme.sizes.secondary,
                    marginLeft: theme.sizes.base(2)
                  })}
                >
                  {new Date(result.date).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
