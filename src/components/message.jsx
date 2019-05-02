/* @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

const Message = ({ message }) => (
  <div
    css={theme => ({
      color: theme.colors.ternary,
      fontSize: theme.sizes.primary,
      marginTop: theme.sizes.base(2),
      marginLeft: theme.sizes.base(2)
    })}
  >
    {message}
  </div>
)

export default Message
