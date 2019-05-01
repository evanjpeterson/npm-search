/* @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

export default class App extends React.Component {
  render() {
    return (
      <div className="App" css={{ color: 'darkgray' }}>
        <input type="text" placeholder="Search NPM" />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
