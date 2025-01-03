import { useEffect, useState } from "react";
const KEY = "f5bf78f";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
        
        //Another way to set the movies
        // data.Response === "True" ? setMovies(data.Search) : setMovies([]);

        //Another way
        // data.Response === "True" && setMovies(data.Search);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    return () => controller.abort();
  }, [query]);
  
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  //another way for the input
  //<input type="text" placeholder="Search movies..." value = {query} 
  //onChange={(e) => setQuery(e.target.value)} />
  
  return (
    <div>
      <h1>Movies</h1>
      <input type="text" placeholder="Search movies..." onChange={handleInputChange} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;