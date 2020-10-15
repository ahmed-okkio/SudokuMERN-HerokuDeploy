import React, { Component } from 'react';
import {HashRouter,Route, Switch} from 'react-router-dom';
import GameContainer from './components/Game/GameContainer';
import Navbar from './components/Navbar/Navbar';
import LoginContainer from './components/Login/LoginContainer';
import Rankings from './components/Rankings/Rankings';
import Complete from './components/Complete/Complete';


class App extends Component {
  state = {
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" render={(props) =>  <Navbar {...props}/>}/>
        </Switch>
        <Route path="/Complete" component={Complete}/>
        <Route path="/Rankings" exact component={Rankings}/>
        <Route path="/Game" exact component={GameContainer}/>
        <Route path="/Login" exact component={LoginContainer}/>
      </HashRouter>
    )
  }
}

export default App;
