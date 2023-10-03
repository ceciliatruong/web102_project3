import './AnswerForm.css';
import React, { useState, useEffect } from 'react';
import songs from '../../songs';

function AnswerForm(props) {
  const i = props.index;
  const [userSongAnswer, setUserSongAnswer] = useState('');
  const [userAlbumAnswer, setUserAlbumAnswer] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [songCorrect, setSongCorrect] = useState(false);
  const [albumCorrect, setAlbumCorrect] = useState(false);

  useEffect(() => {
    setCurrentScore(props.currentScore);
    setHighScore(props.highScore);
  }, [props.currentScore, props.highScore]);

  const standardizeString = (s) => {
    return s.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
  };

  const correctSong = songs[i].alt === '' ? standardizeString(songs[i].title) : standardizeString(songs[i].alt);
  const correctAlbum = standardizeString(songs[i].album);

  const checkAnswer = () => {
    const standardizedSongAnswer = standardizeString(userSongAnswer);
    const standardizedAlbumAnswer = standardizeString(userAlbumAnswer);

    const isSongCorrect = standardizedSongAnswer.includes(correctSong);
    const isAlbumCorrect = standardizedAlbumAnswer.includes(correctAlbum);

    let scoreTracker = currentScore;

    if (isSongCorrect && isAlbumCorrect) {
      scoreTracker += 2; // Both are correct
      setSongCorrect(true);
      setAlbumCorrect(true);
    } else if (isSongCorrect || isAlbumCorrect) {
      scoreTracker += 1; // Either one is correct
      setSongCorrect(isSongCorrect);
      setAlbumCorrect(isAlbumCorrect);
    } else {
      scoreTracker = 0; // Both are incorrect
      setSongCorrect(false);
      setAlbumCorrect(false);
    }

    compareCurrentScoreToHighScore(scoreTracker);
    setCurrentScore(scoreTracker);

    setUserAlbumAnswer('');
    setUserSongAnswer('');
  };

  const compareCurrentScoreToHighScore = (curr) => {
    if (curr > highScore) {
      setHighScore(curr);
    }
  };

  const onClickCheckAnswer = (e) => {
    e.preventDefault();
    checkAnswer();
  };

  useEffect(() => {
    props.updateScores(currentScore, highScore);
  }, [currentScore, highScore, props]);

  return (
    <div className='answer-form-container'>
      <form onSubmit={onClickCheckAnswer}>
        <label>Song: </label>
        <input
          className={`song-input ${songCorrect ? 'correct' : 'wrong'}`}
          value={userSongAnswer}
          onChange={(e) => setUserSongAnswer(e.target.value)}
        />
        <label> Album: </label>
        <input
          className={`album-input ${albumCorrect ? 'correct' : 'wrong'}`}
          value={userAlbumAnswer}
          onChange={(e) => setUserAlbumAnswer(e.target.value)}
        />
        <button type="submit" className='button submit'>Submit</button>
      </form>
    </div>
  );
}

export default AnswerForm;
