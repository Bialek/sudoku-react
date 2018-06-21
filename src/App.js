import React, { Component } from 'react';
import Board from './Board'; 
import sudoku from 'sudoku-umd';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import styles from './css/App.css'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			difficulty: 'easy',
			initBoard: '',
			board: '',
		};
	}

	newGame() {
		const newBoard = sudoku.generate(this.state.difficulty);
		this.setState({
			initBoard: newBoard,
			board: newBoard
		});	
	}

	reset() {
		this.setState({
			board: this.state.initBoard
		});	
	}

	check() {
		sudoku.solve(this.state.initBoard) === this.state.board ? alert('YOU WIN') : alert('Try again');
	}

	solve() {
		this.setState({
			board: sudoku.solve(this.state.initBoard)
		});
	}

	save() {
  		alert("game state copy save in clipboard. Save him!");
	}

	load() {
		const save= prompt('put your saved game state');
		this.setState({
			initBoard: save,
			board: save
		});
	}

	// board string change to board Array, next replace old elemenet a newNumber by splice and change array to string by join('' - witout commas)
	hadleTileChange(id, newNumber) {
		let boardArray = (this.state.board).split('');
		boardArray.splice(id, 1, newNumber);
		boardArray = boardArray.join('');			
		this.setState({
			board: boardArray
		});
    }

	render() {
		return (
			<div className="App">
				<h1>Sudoku</h1>
				<Board 
					initBoard = {this.state.initBoard}
					Board = {this.state.board}
					onTileChange = {(id, newNumber) =>
						this.hadleTileChange(id, newNumber)}	
				/>
				<div className="buttons">
					<select onClick={e => this.setState({difficulty: e.target.value})} >
						<option value='easy'>Easy</option>
						<option value='medium'>Medium</option>
						<option value='hard'>Hard</option>
						<option value='very-hard'>Very Hard</option>
						<option value='insane'>Insane</option>
						<option value='inhuman'>Inhuman</option>
					</select>
					<button onClick={this.newGame.bind(this)}>New Game</button>
					<button onClick={this.load.bind(this)}>Load</button>
					<CopyToClipboard text={this.state.board}>
          				<button onClick={this.save.bind(this)}>Save</button>
       				</CopyToClipboard>
					<button onClick={this.solve.bind(this)}>Solve</button>
					<button onClick={this.check.bind(this)}>Check</button>
					<button onClick={this.reset.bind(this)}>Restart</button>
				</div>
			</div>
		);
	}
}

export default App;
