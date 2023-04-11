import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [movie, setMovie] = useState('')
  const [submit, setSubmit] = useState(false)
  const [apiData, setApiData] = useState(null)
  const [err, setErr] = useState(false)

  const url = `https://www.omdbapi.com/?t=${movie}&apikey=7fc9db25`

  useEffect(() => {
    fetchApi()
  }, [submit])

  const fetchApi = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setApiData(data)
    console.log(data)
    if (apiData && apiData.Response === 'False') setErr(true)
    else setErr(false)
    setSubmit(false)
  }

  const handleInput = (e) => {
    setMovie(e.target.value)
  }

  const handleSubmit = () => {
    setSubmit(true)
  }

  return (
      <div className="container">
        <div className="movie-container">
          <input className="movie-input" type="text" value={movie} onChange={(e) => { handleInput(e) }} />
          <button className="movie-button" onClick={handleSubmit}>Submit</button>
  
          <div className="movie-data">
            {
              apiData && !err ? (
                <div>
                  <h1 className="movie-title">{apiData.Title}</h1>
                  <p className="movie-rating">IMDB: {apiData.imdbRating}</p>
                  <h3 className="movie-premise">Premise: </h3>
                  <p className="movie-plot">{apiData.Plot}</p>
                  <img className="movie-poster" src={apiData.Poster} alt={apiData.Title} />
                </div>
              ) : (<div className='error'>Movie Not Found!</div>)
            }
          </div>
        </div>
      </div>
    )
}

export default App
