import React, {useState, useEffect } from 'react';
import { DiaryEntry, Weather, Visibility } from "./types";
import diariesService from "./services/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const fetchDiaries = async () => {
      const fetched = await diariesService.getAll();
      fetched ? setDiaries(fetched) : setDiaries([]);
    };
    void fetchDiaries();
  }, []);

  const Notification = ({ notification }: {notification : string}) => {
    return (
      <div style={{ color: 'red' }}>
        <b>{notification}</b>
      </div>
    )
  }

  const AddDiary = () : JSX.Element => {
    return (
      <>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            try {
              const target = e.target as typeof e.target & {
                date: { value: string };
                visibility: { value: Visibility };
                weather: { value: Weather };
                comment: { value: string };
              };
              const date =  target.date.value
              const visibility =  target.visibility.value
              const weather =  target.weather.value
              const comment =  target.comment.value
              diariesService.create({ date, visibility, weather, comment }).then((response) => { 
                if (response === undefined) {
                  setNotification('Problem with creating a diary entry')
                  setTimeout(() => setNotification(''), 3000)
                }
              })
            } catch  (error: unknown) {
                let errorMessage = 'Something went wrong.';
                if (error instanceof Error) {
                  errorMessage += ' Frontend Error: ' + error.message;
                }
                console.log(errorMessage)
            }
          }}
        >
          <div>
            <label>
              Date:
              <input type="date" name="date" />
            </label>
          </div>
          <div>
            <span>Visibility:</span>
            <input type="radio" id="great" name="visibility" value="great" />
            <label htmlFor="great">great</label>
            <input type="radio" id="good" name="visibility" value="good" />
            <label htmlFor="good">good</label>
            <input type="radio" id="ok" name="visibility" value="ok" />
            <label htmlFor="ok">ok</label>
            <input type="radio" id="poor" name="visibility" value="poor" />
            <label htmlFor="poor">poor</label>
          </div>
          <div>
            <span>Weather:</span>
            <input type="radio" id="sunny" name="weather" value="sunny" />
            <label htmlFor="sunny">sunny</label>
            <input type="radio" id="rainy" name="weather" value="rainy" />
            <label htmlFor="rainy">rainy</label>
            <input type="radio" id="cloudy" name="weather" value="cloudy" />
            <label htmlFor="cloudy">cloudy</label>
            <input type="radio" id="stormy" name="weather" value="stormy" />
            <label htmlFor="stormy">stormy</label>
            <input type="radio" id="windy" name="weather" value="windy" />
            <label htmlFor="windy">windy</label>
          </div>
          <div>
            <label>
              Comment:
              <input type="comment" name="comment" />
            </label>
          </div>
          <div>
            <input type="submit" value="add" />
          </div>
        </form>
      </>
    )
  }

  const DiariesList = ({ diaries }: { diaries: Array<DiaryEntry>}) : JSX.Element => {
    return (
      <>
        <h2>Diary entries</h2>
        {diaries?.map((diary: DiaryEntry, i: number) => {
            return (
              <div key={i}>
                <b>{diary.date}</b>
                <br/>
                <span>visibility: {diary.visibility}</span>
                <br/>
                <span>weather: {diary.weather}</span>
                <br/><br/>
              </div>
            )
          })
        }
      </>
    )
  }

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <AddDiary />
      <DiariesList diaries={diaries} />
    </div>
  );
}

export default App;