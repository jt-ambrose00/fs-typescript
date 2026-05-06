import { useState, useEffect } from 'react';
import type { NonSensitiveDiaryEntry, Weather, Visibility } from './types';
import diaryService from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather>();
  const [newVisibility, setNewVisibility] = useState<Visibility>();
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])

  const noteCreation = (event: React.SyntheticEvent) => {    
    event.preventDefault();
    diaryService.create({
      date: newDate,
      weather: newWeather as Weather,
      visibility: newVisibility as Visibility,
      comment: newComment
    })
      .then(returnedDiary => {
        setDiaries(diaries.concat(returnedDiary))
      })
    setNewDate('');
    setNewComment('');
  };

  return (
    <div>
      <h3>Add New Entry</h3>
      <form onSubmit={noteCreation}>
        date:
        <input
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
        />
        <br />
        weather:
        <input
          value={newWeather}
          onChange={(event) => setNewWeather(event.target.value as Weather)}
        />
        <br />
        visibility:
        <input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value as Visibility)}
        />
        <br />
        comment:
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <br />
        <button type='submit'>add</button>
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
