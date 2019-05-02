/* @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import { useDebounce } from 'use-debounce'
import {
  faSearch,
  faCompactDisc
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defaultTheme } from './themes'
import { mockResponse } from './mockData'

const App = () => {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 400)
  const [searchPending, setSearchPending] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) {
      setResults([])
      setSearchPending(false)
      return
    }

    // TODO use real data again
    setResults(mockResponse.map(result => result.package))
    setSearchPending(false)
    return

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
        setSearchPending(false)
      })
      .catch(error => {
        // TODO something with the error, give a nice user-friendly message
        setSearchPending(false)
      })
  }, [debouncedQuery])

  const handleQueryChange = e => {
    setQuery(e.target.value)
    setSearchPending(true)
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
          fontFamily: 'Arial',
          backgroundColor: theme.colors.background,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          padding: theme.sizes.base(4)
        })}
      >
        <div css={{ position: 'relative' }}>
          <div
            css={theme => ({
              position: 'absolute',
              left: theme.sizes.base(2.5),
              top: '13px',
              color: theme.colors.ternary
            })}
          >
            {searchPending ? (
              <FontAwesomeIcon
                icon={faCompactDisc}
                size="lg"
                spin
              />
            ) : (
              <FontAwesomeIcon icon={faSearch} size="lg" />
            )}
          </div>
          <input
            type="text"
            value={query}
            placeholder="Search NPM"
            onChange={handleQueryChange}
            css={theme => ({
              color: theme.colors.primary,
              fontFamily: 'Arial',
              background:
                theme.colors.searchField.background,
              border: `1px solid ${
                theme.colors.searchField.border
              }`,
              minHeight: theme.sizes.base(6),
              borderRadius: theme.borderRadius,
              fontSize: theme.sizes.primary,
              paddingLeft: theme.sizes.base(6),
              paddingRight: theme.sizes.base(2),
              width: '100%'
            })}
          />
        </div>
        <div
          css={theme => ({
            overflow: 'auto',
            margin: `${theme.sizes.base(3)} 0`
          })}
        >
          {results.length ? (
            results.map(result => (
              <div
                key={result.name}
                css={theme => ({
                  fontFamily: 'monospace',
                  background:
                    theme.colors.searchResult.background,
                  borderRadius: theme.borderRadius,
                  padding: theme.sizes.base(2),
                  margin: `${theme.sizes.base()}`,
                  width: '100%'
                })}
              >
                <div>
                  <a
                    href={result.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
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
            ))
          ) : (
            <div
              css={theme => ({
                color: theme.colors.ternary,
                fontSize: theme.sizes.primary,
                marginTop: theme.sizes.base(2),
                marginLeft: theme.sizes.base(2)
              })}
            >
              {query
                ? 'Hmm, not finding any results for that'
                : 'Results appear as you type'}
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
