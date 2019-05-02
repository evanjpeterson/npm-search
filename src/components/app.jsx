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
import { api } from '../api'

const App = () => {
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
        <SearchField
          query={query}
          onQueryChange={onQueryChange}
          searchPending={searchPending}
        />
        <div
          css={theme => ({
            overflow: 'auto',
            margin: `${theme.sizes.base(3)} 0`
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
