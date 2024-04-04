import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:3000";

enum WeatherType {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

enum VisibilityType {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

interface DiaryEntry {
  date: string;
  weather: WeatherType;
  visibility: VisibilityType;
}

interface ServerDiaryEntry extends DiaryEntry {
  id: number;
}

function App() {
  const [entries, setEntries] = useState<ServerDiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<ServerDiaryEntry[]>(`${URL}/api/diaries`)
      .then((response) => setEntries(response.data));
  });

  return (
    <>
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <div>visibility: {entry.visibility}</div>
          <div>weather: {entry.weather}</div>
        </div>
      ))}
    </>
  );
}

export default App;
