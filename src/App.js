
import * as React from 'react';
import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// bikin reducer
const ticTacToe = createSlice({
  name: 'ticTacToe',
  initialState: {
    squares: Array(9).fill(null),
    winner: null,
    nextValue: 'X',
    status: 'Next player: X',
  },
  reducers: {
    selectSquare(state, action){
      if(!state.winner && !state.squares[action.payload]){
        const newSquares = [...state.squares];
        newSquares[action.payload] = calculateNextValue(state.squares);
        const winner = calculateWinner(newSquares);
        const nextValue = calculateNextValue(newSquares);
        const status = calculateStatus(winner, newSquares, nextValue);
        return {
          squares: newSquares,
          winner,
          status
        }
       }
      },
          // Todo: bikin reducer restart
          restartGame(state, action) {
            return {
              squares: Array(9).fill(null),
              winner: null,
              nextValue: "X",
              status: "Next player: X",
            };
      }
    },
  }
)

// action
export const { selectSquare } = ticTacToe.actions;
export const { restartGame } = ticTacToe.actions;
// store
const store = configureStore({
  reducer: ticTacToe.reducer
})

function Board() {
  const { status, squares } = useSelector(state => state);
  const dispatch = useDispatch();
  function selectSquareHandler(squareIndex){
    dispatch(selectSquare(squareIndex))
  }

function restart(){
  dispatch(restartGame())
}

  function renderSquare(i) {
    return (
      <Button
        colorScheme='green'
        w="100px"
        h="100px"
        variant="solid"
        borderWidth="2px"
        borderColor="green"
        fontSize='5xl'
        color='tomato'
        onClick={() => selectSquareHandler(i)}
         >
        {squares[i]}
      </Button>
    );
  }

  return (
    <VStack>
      <Text fontSize='4xl' as='b'>{status}</Text>
      <Flex >
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Flex>
      <Flex >
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Flex>
      <Flex >
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Flex>
      <Button onClick={restart} variant='solid' colorScheme='green'>
        RESTART
      </Button>
    </VStack>
  ); 
}

function Game() {
  return (
    // Todo: styling board
    <div>
      <div >
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return(
      <Provider store={store}>
        <Game />
      </Provider>
  );
}

export default App;
