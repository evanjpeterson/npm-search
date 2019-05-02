/* @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { language } from '../language'

const Result = ({ result }) => (
  <div
    key={result.name}
    css={theme => ({
      fontFamily: theme.fonts.serif,
      background: theme.colors.searchResult.background,
      borderRadius: theme.borderRadius,
      padding: theme.sizes.base(2),
      margin: `${theme.sizes.base()}`
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
        {language.lastPublished}
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
)

export default Result
