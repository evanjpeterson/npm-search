/* @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { language } from '../language'

const Result = ({ result }) => {
  const createOnClick = (url, name) => () => {
    window.open(url, `_search_${name}`)
  }

  return (
    <div
      // The entire tile is clickable for the mobile folks.
      onClick={createOnClick(result.links.npm, result.name)}
      css={theme => ({
        fontFamily: theme.fonts.serif,
        background: theme.colors.searchResult.background,
        borderRadius: theme.borderRadius,
        padding: theme.sizes.base(2),
        margin: `${theme.sizes.base()}`,
        wordWrap: 'break-word',
        ':hover': {
          cursor: 'pointer'
        }
      })}
    >
      <div
        css={theme => ({
          [theme.breakpoints.small]: {
            display: 'flex',
            flexDirection: 'column'
          }
        })}
      >
        <span
          css={theme => ({
            fontWeight: 'bold',
            color: theme.colors.primary,
            fontSize: theme.sizes.primary
          })}
        >
          {result.name}
        </span>
        <span
          css={theme => ({
            color: theme.colors.secondary,
            fontSize: theme.sizes.secondary,
            marginLeft: theme.sizes.base(2),
            [theme.breakpoints.small]: {
              marginLeft: 0
            }
          })}
        >
          @ {result.version}
        </span>
      </div>
      <div
        css={theme => ({
          color: theme.colors.secondary,
          fontSize: theme.sizes.secondary,
          [theme.breakpoints.small]: {
            marginTop: theme.sizes.base(0.5)
          }
        })}
      >
        {result.description}
      </div>
      <div
        css={theme => ({
          [theme.breakpoints.small]: {
            display: 'flex',
            flexDirection: 'column'
          }
        })}
      >
        <span
          css={theme => ({
            color: theme.colors.ternary,
            fontSize: theme.sizes.secondary,
            [theme.breakpoints.small]: {
              marginTop: theme.sizes.base(0.5)
            }
          })}
        >
          {language.lastPublished}
        </span>
        <span
          css={theme => ({
            color: theme.colors.secondary,
            fontSize: theme.sizes.secondary,
            marginLeft: theme.sizes.base(2),
            [theme.breakpoints.small]: {
              marginLeft: 0
            }
          })}
        >
          {new Date(result.date).toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default Result
