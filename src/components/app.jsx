/* @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { useDebounce } from 'use-debounce'
import { defaultTheme } from '../themes'
import SearchField from './searchField'
import Result from './result'
import Message from './message'
import { language } from '../language'
import { defaultApi } from '../api'

const App = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const [api, setApi] = useState(defaultApi)
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 400)
  const [searchPending, setSearchPending] = useState(false)
  const [results, setResults] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!query) {
      // User has cleared out the query, so clear out the results list
      setResults([])
      setSearchPending(false)
      return
    }

    async function getResults() {
      try {
        const results = await api.search(query)
        setResults(results)
      } catch {
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
        css={theme => ({
          fontFamily: theme.fonts.sansSerif,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh'
        })}
      >
        <div
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
              marginBottom: theme.sizes.base(2)
            })}
          >
            {language.title}
          </div>
          <SearchField
            query={query}
            onQueryChange={onQueryChange}
            searchPending={searchPending}
          />
        </div>
        <div
          css={theme => ({
            overflow: 'auto',
            margin: `${theme.sizes.base(
              3
            )} ${theme.sizes.base(4)}`
          })}
        >
          {hasError ? (
            <Message message={language.unexpectedError} />
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