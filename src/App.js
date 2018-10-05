import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import Logo from './logo.svg'
import './App.css';

class App extends Component {
    
    render() {
	return (
	    <div className='App-header'>
	      <img src={Logo} className='App-logo' alt='logo'/>
	      <h1> MobaTapTaupe </h1>
	      <h3> Le but est de cliquer sur le bouton ROUGE </h3>
	      <div>
		<Game/>
	      </div>
	    </div>
	);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

export default App;
