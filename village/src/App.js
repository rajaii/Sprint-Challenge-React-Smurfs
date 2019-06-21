import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
    .then(res => this.setState({
      smurfs: res.data
    }))
    .catch(err => console.log(err))
  }

  postSmurf = (smurfData) => {
    axios.post('http://localhost:3333/smurfs', smurfData)
    .then(res => this.setState({
      smurfs: res.data
    }))
    .catch(err => console.log(err))
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <nav className='nav'>
          <NavLink className='NVLink' to='/'>Our Village!</NavLink>
          <NavLink className='NVLink num2' to='smurf-form'>Add More Smurfs to the Village</NavLink>
        </nav>
        <Route path='/smurf-form' render={(props) => <SmurfForm {...props}  postSmurf={this.postSmurf} />} />
        <Route path='/' render={(props) => <Smurfs {...props} smurfs={this.state.smurfs} />} />
      </div>
    );
  }
}

export default App;

/*<SmurfForm postSmurf={this.postSmurf} />
<Smurfs smurfs={this.state.smurfs} />*/