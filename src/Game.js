import React, {Component} from 'react';

var startTime = 2;
var nbTurn=1;
var Activated=false;

class Game extends Component {

    constructor() {
	super()
	this.state = {
	    count: startTime,
	    turn: nbTurn,
	    buttonOn: false,
	    previous1: nbTurn,
	    previous2: 0,
	    random: 1
	}
    }

    tick () {
	if (this.state.count === 0) {
	    this.setBackToZero();
	    Activated = false;
	    this.setState({buttonOn: false});
	}
	else {
	    this.setState({count: (this.state.count - 1)})
	}
    }
    
    startTimer () {
	Activated = true;
	this.setState({buttonOn: true})
	clearInterval(this.timer)
    	this.timer = setInterval(this.tick.bind(this), 1000)
    }
    
    stopTimer () {
	clearInterval(this.timer)
    }
    
    resetTimer () {
	let a = this.state.previous1 + this.state.previous2;
	
	if (this.state.turn < 10) {
	    startTime++;
	}
	nbTurn++;
	this.setState({
	    count: startTime,
	    turn: nbTurn,
	    previous1: a,
	    previous2: this.state.previous1,
	    random: getRandom(1, this.state.previous1)
	});
    }

    activateButton() {
	this.setState({buttonOn: false});
	if (!Activated) {
	    this.startTimer();
	    this.setBackToZero();
	}
    }
    
    setBackToZero() {
	startTime = 2;
	nbTurn = 1;
	this.setState({
	    count: startTime,
	    turn: nbTurn,
	    previous1: nbTurn,
	    previous2: 0,
	    random: 1
	});
    }

    componentWillUnmount() {
	clearInterval(this.timer)
    }
    
    render() {
	let status;
	let nbTurn;
	let nbBowl;
	let balls=[];
	const timer = this.state.count;
	const turn = this.state.turn;

	let button=[];

	if (Activated) {
	    status = 'Temps : ' + timer;
	    nbTurn = 'Tour : ' + turn;
	    nbBowl = 'N°boules : ' + this.state.previous1;
	    
	}
	if (this.state.buttonOn) {
	    button=[];
	    for (let index = 1; index <= this.state.previous1; index++) {
		if (index === this.state.random) {
		    balls.push(<div onClick={() => this.resetTimer()}className='RedBall'/>);
		}
		else {
		    balls.push(<div className='BlackBall'/>);
		}
	    }
	}
	else {
	    button.push(<button className='StartBut' onClick={() => this.activateButton()}>C'est parti </button>);
	}
	return (
	    <div className='App-body'>
	      <p>{status}</p>
	      <p>{nbTurn}</p>
	      <p>{nbBowl}</p>
	      <br/>
	      <p>{balls}</p>
	      <div className='StartBut'>
		  {button}
		</div>
	    </div>
	);
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Game
