/* @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

const App = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    // TODO cancel existing network call if a new one comes through
    // TODO throttle user input
    // TODO loading state (use network throttle for slow speed)

    if (!query) {
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
    <div
      className="App"
      css={{
        color: 'darkgray',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <input
        type="text"
        value={query}
        placeholder="Search NPM"
        onChange={handleQueryChange}
      />
      {results.map(result => (
        <span key={result.name}>{result.name}</span>
      ))}
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
