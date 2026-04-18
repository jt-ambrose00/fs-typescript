import { useState, useEffect } from 'react';
import type { NonSensitiveDiaryEntry } from './types';
import diaryService from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  // const [newDiary, setNewDiary] = useState('');

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])

  // const noteCreation = (event: React.SyntheticEvent) => {    
  //   event.preventDefault()
  //   diaryService.create({ content: newDiary })
  //     .then(returnedDiary => {
  //       setDiaries(diaries.concat(returnedDiary))
  //     })
  //   setNewDiary('')
  // };

  return (
    <div>
      {/* <form onSubmit={noteCreation}>
        <input value={newDiary} onChange={(event) => setNewDiary(event.target.value)} />
        <button type='submit'>add</button>
      </form> */}
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
