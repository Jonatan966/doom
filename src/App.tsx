import { ThemeProvider } from 'styled-components'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { SplashPage } from './pages/Splash'

import { GlobalStyle } from './styles/GlobalStyle'
import { AppTheme } from './styles/theme'
import { HomePage } from './pages/Home'
import { ConfigPage } from './pages/Config'
import { PlayerProvider } from './contexts/playerContext'
import { ScheduleProvider } from './contexts/scheduleContext'

export function App() {
  return (
    <PlayerProvider>
      <ThemeProvider theme={AppTheme}>
        <GlobalStyle />
        <Toaster />
        <HashRouter>
          <Switch>
            <Route exact path="/" component={SplashPage} />
            <ScheduleProvider>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/config" component={ConfigPage} />
            </ScheduleProvider>
          </Switch>
        </HashRouter>
      </ThemeProvider>
    </PlayerProvider>
  )
}
