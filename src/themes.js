export const defaultTheme = {
  borderRadius: '4px',
  sizes: {
    base: (scale = 1) => `${scale * 8}px`,
    primary: '18px',
    secondary: '14px'
  },
  colors: {
    background: '#DDC',
    primary: '#333',
    secondary: '#555',
    ternary: '#777',
    searchResult: {
      background: '#CCB'
    },
    searchField: {
      background: '#EEE',
      border: '#CCC',
      borderFocused: '#AAA'
    }
  }
}

export const nightTheme = {
  ...defaultTheme
}
