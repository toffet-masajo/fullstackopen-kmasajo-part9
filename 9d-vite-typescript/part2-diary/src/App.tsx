import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:3000/api/diaries";

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
  id: number;
  date: string;
  weather: WeatherType;
  visibility: VisibilityType;
}

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    axios.get<DiaryEntry[]>(URL).then((response) => setEntries(response.data));
  }, []);

  const onAddNewDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryEntryToAdd = {
      date,
      visibility,
      weather,
      comment,
    };
    try {
      const response = await axios.post(URL, diaryEntryToAdd);
      setEntries(entries.concat(response.data));
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (typeof error.response?.data === "string")
          setError(error.response?.data);
      } else {
        setError(error as string);
      }
    } finally {
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error !== "" && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={onAddNewDiaryEntry}>
        <div>
          date:{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility:{" "}
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather:{" "}
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment:{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button>add</button>
      </form>
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
};

export default App;
