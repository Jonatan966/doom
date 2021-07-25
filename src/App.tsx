import { ThemeProvider } from 'styled-components'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { SplashPage } from './pages/Splash'

import { GlobalStyle } from './styles/GlobalStyle'
import { AppTheme } from './styles/theme'
import { HomePage } from './pages/Home'

export function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <GlobalStyle />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={SplashPage} />
          <Route exact path="/home" component={HomePage} />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  )
}
