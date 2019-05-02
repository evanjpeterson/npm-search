/* @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { language } from '../language'

const DevTools = ({
  onDarkModeToggle,
  onApiModeToggle
}) => (
  <div
    css={theme => ({
      fontFamily: theme.fonts.serif,
      color: theme.colors.title,
      fontSize: theme.sizes.secondary,
      marginBottom: theme.sizes.base(2),
      display: 'flex',
      flexDirection: 'column'
    })}
  >
    <div>
      <input type="checkbox" onClick={onDarkModeToggle} />
      {language.darkMode}
    </div>
    <div>
      <input type="checkbox" onClick={onApiModeToggle} />
      {language.breakApi}
    </div>
  </div>
)

export default DevTools
