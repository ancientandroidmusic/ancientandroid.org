import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Header from './Components/Header';
import Concept from './Components/Concept';
import Everydays from './Components/Everydays';
import Artplayer from './Components/Artplayer';

class App extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
          <BrowserRouter>
              <Header />
              <Switch>
                  <Route path="/static/media/*">
                      <Redirect to="/page-not-found" />
                  </Route>
                  <Route exact path="/">
                      <Redirect to="/everydays" />
                  </Route>
                  <Route exact path="/everydays/:date" component={Artplayer} />
                  <Route path="/everydays">
                      <Everydays />
                  </Route>
                  <Route path="/concept">
                      <Concept />
                  </Route>
              </Switch>
          </BrowserRouter>
        )
    }
}

export default App;
