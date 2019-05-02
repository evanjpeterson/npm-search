/* @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { useDebounce } from 'use-debounce'
import { defaultTheme, darkTheme } from '../themes'
import SearchField from './searchField'
import Result from './result'
import Message from './message'
import { language } from '../language'
import { defaultApi, brokenApi } from '../api'
import DevTools from './devTools'

const App = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const [api, setApi] = useState(defaultApi)
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 400)
  const [searchPending, setSearchPending] = useState(false)
  const [results, setResults] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!debouncedQuery) {
      // User has cleared out the query, so clear out the results list
      setResults([])
      setSearchPending(false)
      return
    }

    async function getResults() {
      try {
        const results = await api.search(debouncedQuery)
        setResults(results)
      } catch {
        setResults([])
        setHasError(true)
      }
      setSearchPending(false)
    }

    getResults()
  }, [debouncedQuery])

  const onQueryChange = e => {
    setQuery(e.target.value)
    setSearchPending(true)
    setHasError(false)
  }

  const onDarkModeToggle = e => {
    setTheme(e.target.checked ? darkTheme : defaultTheme)
  }

  const onApiModeToggle = e => {
    setApi(e.target.checked ? brokenApi : defaultApi)
  }

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            background: ${theme.colors.background};
          }
        `}
      />
      <div
        // App container -- holds the top banner and the results area
        css={theme => ({
          fontFamily: theme.fonts.sansSerif,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh'
        })}
      >
        <div
          // Banner around the search field
          css={theme => ({
            background: theme.colors.banner,
            padding: theme.sizes.base(2),
            paddingBottom: theme.sizes.base(4),
            boxShadow: `0 5px 5px 1px ${
              theme.colors.shadow
            }`,
            borderRadius: `0 0 ${theme.borderRadius} ${
              theme.borderRadius
            }`
          })}
        >
          <div
            css={theme => ({
              fontFamily: theme.fonts.serif,
              color: theme.colors.title,
              fontSize: theme.sizes.title,
              marginBottom: theme.sizes.base(2),
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            })}
          >
            {language.title}
            <DevTools
              onApiModeToggle={onApiModeToggle}
              onDarkModeToggle={onDarkModeToggle}
            />
          </div>
          <SearchField
            query={query}
            onQueryChange={onQueryChange}
            searchPending={searchPending}
          />
        </div>
        <div
          // Results/Messages area
          css={theme => ({
            overflow: 'auto',
            margin: `${theme.sizes.base(
              3
            )} ${theme.sizes.base(4)}`,
            [theme.breakpoints.small]: {
              margin: `${theme.sizes.base(
                2
              )} ${theme.sizes.base()}`
            }
          })}
        >
          {hasError ? (
            api === brokenApi ? (
              <Message message={language.expectedError} />
            ) : (
              <Message message={language.unexpectedError} />
            )
          ) : results.length ? (
            results.map(result => (
              <Result result={result} />
            ))
          ) : !query ? (
            <Message message={language.initialMessage} />
          ) : searchPending ? (
            ''
          ) : (
            <Message message={language.noResults} />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
