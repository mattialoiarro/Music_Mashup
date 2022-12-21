import logo from "./logo.svg";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { If, Then, Else, When, Unless, Switch, Case, Default } from "react-if";

function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [playlistresult, setPlaylistresult] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistURL, setPlaylistURL] = useState("");
  const [lyrics, setLyrics] = useState("");

  const [token, setToken] = useState("");

  const CLIENT_ID = "452798eb3b5a4449845f7bc544647e10";
  const REDIRECT_URI = "http://localhost:3000/callback";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  function getLyrics() {
   
  }

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  function getPlaylist(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://api.spotify.com/v1/playlists/" + id + "/tracks",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setPlaylistresult(result.items))
      .catch((error) => console.log("error", error));
  }

  function searchPlaylist() {}

  const listItems = playlistresult.map((item) => (
    <Card
      class="songCard"
      style={{ width: "18rem", border: "3px solid #191414" }}
    >
      <Card.Img
        variant="top"
        src={item.track.album.images[0].url}
        height="40%"
        width="100%"
      />
      <Card.Body>
        <Card.Title>{item.track.name}</Card.Title>
        <Card.Text>
          <h4>Artists:</h4>
          {item.track.artists.map((artist) => (
            <div>
              <p> {artist.name} </p>
            </div>
          ))}
        </Card.Text>
        <Button variant="primary" onClick={()=>{
           const url =
           "https://spotify-scraper.p.rapidapi.com/v1/track/lyrics?trackId="+item.track.id;
     
         const options = {
           method: "GET",
           headers: {
             "X-RapidAPI-Key": "e451035421msh38c089d44761c42p1b4070jsn3ebb2f8a409c",
             "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
           },
         };
     
         fetch(url, options)
           .then((res) => res.text())
           .then((res) => setLyrics(res))
           .catch((err) => console.error("error:" + err));
        }}>Get Lyrics</Button>
      </Card.Body>
    </Card>
  ));

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <div class="navbar">
        <a href="#home"> Music Mashup</a>
        <link rel="stylesheet" href="css/font-awesome.css" />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </div>
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <div>
            {" "}
            <div class="main">
              <p>Search for your favorite playlist and find out more</p>
              <p style={{float:"right"}}>{lyrics}</p>

              <div class="box">
                <form name="search">
                  <input
                    onChange={(e) => {
                      //TODO: make search not be alwys one behind
                      setInputSearch(e.target.value);
                      //-------------------------------------------
                      var myHeaders = new Headers();
                      myHeaders.append("Authorization", "Bearer " + token);
                      var requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow",
                      };
                      if (inputSearch == "") {
                      } else {
                        fetch(
                          "https://api.spotify.com/v1/search?query=" +
                            inputSearch +
                            "&type=playlist&limit=3&offset=0",
                          requestOptions
                        )
                          .then((response) => response.json())
                          .then((result) =>
                            setSearchResults(result.playlists.items)
                          )
                          .catch((error) => console.log("error", error));
                      }
                    }}
                    type="text"
                    class="input"
                    name="txt"
                    onmouseout="this.value = ''; this.blur();"
                  ></input>
                </form>
                {listItems}
                <button onClick={getPlaylist}></button>
              </div>
              <div class="card mx-auto" style={{ width: "18rem;" }}>
                <If condition={searchResults === []}>
                  <Then></Then>
                </If>
                <Else>
                  {Array.isArray(searchResults)
                    ? searchResults.map((item) => {
                        return (
                          <p
                            onClick={(event) => {
                              setPlaylistURL(item.id);
                              getPlaylist(item.id);
                            }}
                          >
                            {item.name}
                          </p>
                        );
                      })
                    : null}
                </Else>
              </div>
            </div>{" "}
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
