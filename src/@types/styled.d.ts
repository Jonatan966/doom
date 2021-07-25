import 'styled-components'

interface ThemeItem {
  primary: string
  secondary: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: ThemeItem
      box: ThemeItem
      background: string
    }
    effects: {
      shadow: ThemeItem
      borderRadius: string
    }
  }
}
