import React, { Component } from 'react';
import {HashRouter,Route, Switch} from 'react-router-dom';
import GameContainer from './components/Game/GameContainer';
import Navbar from './components/Navbar/Navbar';
import LoginContainer from './components/Login/LoginContainer';
import Rankings from './components/Rankings/Rankings';
import Complete from './components/Complete/Complete';
import Home from './components/Home/Home';
import Background from './components/Home/Background';
import classes from './CSS/Main.module.css'


class App extends Component {
  state = {
    opacity: 0,
     trans: 0.5 
  }
  componentWillMount ()
  {
    setTimeout(()=>{
       this.setState({opacity:1})
    },500)
    setTimeout(()=>{
      this.setState({trans:"none"})
    },1000)
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" render={(props) =>  <Navbar {...props}/>}/>
        </Switch>
            <Route path="/" component={Background} />
            <div className={classes.App} style={{opacity:`${this.state.opacity}`,transition:this.state.trans}}>
              <Route path="/" exact component={Home}/>
              <Route path="/Complete" component={Complete}/>
              <Route path="/Rankings" exact component={Rankings}/>
              <Route path="/Game" exact component={GameContainer}/>
              <Route path="/Login" exact component={LoginContainer}/>
          </div>
      </HashRouter>
      
    )
  }
}

export default App;
