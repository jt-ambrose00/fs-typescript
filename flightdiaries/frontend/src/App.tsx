import axios from 'axios';
import { useState, useEffect } from 'react';
import type { NonSensitiveDiaryEntry, Weather, Visibility } from './types';
import diaryService from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather>('sunny');
  const [newVisibility, setNewVisibility] = useState<Visibility>('great');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])

  const noteCreation = (event: React.SyntheticEvent) => {    
    event.preventDefault();
    setErrorMessage('');
    diaryService.create({
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    })
      .then(returnedDiary => {
        setDiaries(diaries.concat(returnedDiary))
        setNewDate('');
        setNewWeather('sunny');
        setNewVisibility('great');
        setNewComment('');
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
          setErrorMessage(`Error: ${error.response?.data.error[0].message}`);
        } else {
          console.log(error);
          setErrorMessage('Other error');
        }
      })
  };

  return (
    <div>
      <h3>Add New Entry</h3>
      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
      <form onSubmit={noteCreation}>
        Date
        <input
          type='date'
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
        />
        <br />
        <fieldset>
          <legend>Weather</legend>
          <div>
            <input
              type="radio"
              id="sunny"
              name="weather"
              value="sunny"
              checked={newWeather === 'sunny'}
              onChange={() => setNewWeather('sunny')}
            />
            <label htmlFor="sunny">sunny</label>
          </div>
          <div>
            <input
              type="radio"
              id="rainy"
              name="weather"
              value="rainy"
              checked={newWeather === 'rainy'}
              onChange={() => setNewWeather('rainy')}
            />
            <label htmlFor="rainy">rainy</label>
          </div>
          <div>
            <input
              type="radio"
              id="cloudy"
              name="weather"
              value="cloudy"
              checked={newWeather === 'cloudy'}
              onChange={() => setNewWeather('cloudy')}
            />
            <label htmlFor="cloudy">cloudy</label>
          </div>
          <div>
            <input
              type="radio"
              id="windy"
              name="weather"
              value="windy"
              checked={newWeather === 'windy'}
              onChange={() => setNewWeather('windy')}
            />
            <label htmlFor="windy">windy</label>
          </div>
          <div>
            <input
              type="radio"
              id="stormy"
              name="weather"
              value="stormy"
              checked={newWeather === 'stormy'}
              onChange={() => setNewWeather('stormy')}
            />
            <label htmlFor="stormy">stormy</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Visibility</legend>
          <div>
            <input
              type="radio"
              id="great"
              name="visibility"
              value="great"
              checked={newVisibility === 'great'}
              onChange={() => setNewVisibility('great')}
            />
            <label htmlFor="great">great</label>
          </div>
          <div>
            <input
              type="radio"
              id="good"
              name="visibility"
              value="good"
              checked={newVisibility === 'good'}
              onChange={() => setNewVisibility('good')}
            />
            <label htmlFor="good">good</label>
          </div>
          <div>
            <input
              type="radio"
              id="ok"
              name="visibility"
              value="ok"
              checked={newVisibility === 'ok'}
              onChange={() => setNewVisibility('ok')}
            />
            <label htmlFor="ok">ok</label>
          </div>
          <div>
            <input
              type="radio"
              id="poor"
              name="visibility"
              value="poor"
              checked={newVisibility === 'poor'}
              onChange={() => setNewVisibility('poor')}
            />
            <label htmlFor="poor">poor</label>
          </div>
        </fieldset>
        Comment
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <br />
        <button type='submit'>Add</button>
      </form>
      <h3>Diary Entries</h3>
      <div>
        {diaries.map(diary =>
          <div key={diary.id}>
            <div style={{ fontWeight: 'bold' }}>{diary.date}</div>
            <div>weather: {diary.weather}</div>
            <div>visibility: {diary.visibility}</div>
            <br />
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
