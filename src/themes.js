const newNpmRed = '#F84049'
const oldNpmRed = '#9B2C2E'

export const defaultTheme = {
  borderRadius: '4px',
  fonts: {
    serif: 'monospace, serif',
    sansSerif: 'Arial, sans-serif'
  },
  sizes: {
    base: (scale = 1) => `${scale * 8}px`,
    title: '28px',
    primary: '18px',
    secondary: '14px'
  },
  colors: {
    banner: `linear-gradient(to bottom right, ${newNpmRed}, ${oldNpmRed}) fixed`,
    background: '#EFEFEF',
    title: '#FFF',
    primary: '#333',
    secondary: '#555',
    ternary: '#777',
    shadow: '#BBB',
    searchResult: {
      background: '#FFF'
    },
    searchField: {
      background: '#FFF',
      border: '#CCC'
    }
  }
}

export const nightTheme = {
  ...defaultTheme
}
