import { useState } from 'react';
import './App.css';
import FlippableCard from './components/FlippableCard';
import songs from './songs';
import AnswerForm from './components/AnswerForm';

function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [count, setCount] = useState(songs.length);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  // const [previousCard, setPreviousCard] = useState(0);
  // const [nextCard, setNextCard] = useState(previousCard+1);
  const [currentCard, setCurrentCard] = useState(0);

  const generateRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * songs.length);
    setRandomNumber(newNumber);
    setCurrentCard(newNumber);
  };

  // Define a function to update the scores from AnswerForm
  const updateScores = (newCurrentScore, newHighScore) => {
    setCurrentScore(newCurrentScore);
    setHighScore(newHighScore);
  };
  const flipToPreviousCard = () => {
    if (currentCard > 0 && currentCard <= count) {
      setCurrentCard(currentCard - 1); // Update currentCard to the previous card
    }
  };

  const flipToNextCard = () => {
    if (currentCard >= 0 && currentCard < count - 1) {
      setCurrentCard(currentCard + 1); // Update currentCard to the next card
    }
  };
  return (
    <div>
      <div className='header-container'>
        <h1 className='header'>cc's guess that Rina Sawayama song quiz!</h1>
        <h3>listen to a 30-second audio recording of a Rina song and take your best guess!</h3>
        <h4>Number of current songs: {count}</h4>
        <h4>Current Score: {currentScore}, Highest Score: {highScore}</h4>
      </div>
      <FlippableCard index={currentCard} />
      <AnswerForm index={currentCard} updateScores={updateScores} currentScore={currentScore} highScore={highScore}/>
        <button className='prev-card-button' onClick={flipToPreviousCard}>Previous</button>
        <button className='next-card-button' onClick={flipToNextCard}>Next</button>
        <button className="shuffle-card-button" onClick={generateRandomNumber}>Shuffle Song</button>
    </div>
  );
}

export default App;
