import React, {Component} from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor(props){
    super(props);
this.state = {}

// const movies = [
//   { id: 0, poster_src: "https://external-preview.redd.it/8wkb_C6H94QGUGhDXAEdDdGlNvk6YMe13XYV5HXdAR4.png?auto=webp&s=ed6ebfa6513197fc6463fb568843a8bafc4f6c95", title: "Avengers", overview: "good film"},
//   { id: 1, poster_src: "https://external-preview.redd.it/8wkb_C6H94QGUGhDXAEdDdGlNvk6YMe13XYV5HXdAR4.png?auto=webp&s=ed6ebfa6513197fc6463fb568843a8bafc4f6c95", title: "Barbie", overview: "shit film"}
// ]

// var movieRows = []

//     movies.forEach((movie) => {
//       console.log(movie.title)
//       const movieRow = <MovieRow movie={movie}/>
//     movieRows.push(movieRow)
//     })

// this.state = {rows: movieRows}

this.performSearch("avengers")

}
//ajax use async method calls from the internet
performSearch(searchTerm){
  const urlString =
    "https://api.themoviedb.org/3/search/movie?api_key=b1f029ec0441ff3fd2d7e14fd0401bc9&query=" +searchTerm;
  $.ajax({
    url: urlString,
    success: (searchResults) => {
      const results = searchResults.results

      var movieRows = []

      results.forEach((movie)=>{
movie.poster_src = "https://image.tmdb.org/t/p/w185/" + movie.poster_path
        console.log(movie.poster_path)
        const movieRow = <MovieRow key={movie.id} movie={movie}/>
        movieRows.push(movieRow)
      })
this.setState({rows: movieRows})

    },
    error: (xhr, status, err) => {
      console.error("failed to fetch")
    } 
  })
}
searchChangeHandler(event){
  const searchTerm = event.target.value
  this.performSearch(searchTerm)
}

render() {
  return (
    <div >
      <table className="titleBar">
        <tbody>
          <tr>
            <td>
              <img alt="app icon" width="50" src="logo192.png"/>
            </td>
            <h1>
              Movies database search
            </h1>
          </tr>
        </tbody>
      </table>


<input style={{
  fontSize:24,
  display:'block',
  width:"99%",
  paddingTop:8,
  paddingBottom:8,
  paddingLeft:16
}} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"></input>

{this.state.rows}



    </div>
  );
}
}

export default App;
