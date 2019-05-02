/* @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import {
  faSearch,
  faCompactDisc
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { language } from '../language'

const SearchField = ({
  query,
  onQueryChange,
  searchPending
}) => (
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
      placeholder={language.placeholder}
      onChange={onQueryChange}
      autoFocus={true}
      css={theme => ({
        color: theme.colors.primary,
        fontFamily: 'Arial',
        background: theme.colors.searchField.background,
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
)

export default SearchField
