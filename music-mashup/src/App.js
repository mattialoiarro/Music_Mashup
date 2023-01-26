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
  const [split, setSplit] = useState();
  const [savedSongs, setSavedSongs] = useState([]);

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
    setToken(token); getSavedSongs();

  }, []);

  useEffect(() => {
    formatLyrics()
  }, [lyrics]);


  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  function postSongs(title, artist, spotifyTrackID) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "title": title,
      "artist": artist,
      "spotifyTrackID": spotifyTrackID
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/songs", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  function getSavedSongs() {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:8080/songs", requestOptions)
      .then(response => response.json())
      .then(result => setSavedSongs(result))
      .catch(error => console.log('error', error));
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

  function formatLyrics() {
    let arr = [];
    arr = lyrics.split("\n");
    setSplit(arr);
  }

  const listItems = playlistresult.map((item) => (
    <Card
      class="songCard"
      style={{
        width: "18rem", border: "3px solid #191414", padding: ".5rem", backgroundColor: "#191414", filter: "drop-shadow(-5px 3.8px 3.8px #000)"
      }}
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
        <Button class="mt-auto btn btn-lg btn-block btn-outline-primary" style={{
          border: " 2px solid #1DB954",
          backgroundColor: "white",
          borderRadius: "20px",
          paddingLeft: "2em",
          paddingRight: "2em",
          paddingTop: "0.3em",
          paddingBottom: "0.3em",
          fontSize: "1em",
          position: "absolute",
          left: "25%",
          right: "25%",
          bottom: "0",
          color: "#1DB954",
          filter: "drop-shadow(-1px 1.7px 1.7px white)",
          marginBottom: "3%"
        }} onClick={() => {
          const url =
            "https://spotify-scraper.p.rapidapi.com/v1/track/lyrics?trackId=" + item.track.id;

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
        <div onClick={() => {
          postSongs(item.track.name, item.track.artists[0].name, item.track.id)
          console.log(savedSongs.find(o => o.spotifyTrackID === "4EpZ4eYuZOwPSSwyqpdHnJ"))
          getSavedSongs()
        }}>
          {savedSongs.find(o => o.spotifyTrackID !== item.track.id)
            ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
            </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" stroke="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
            </svg>
          }

          click me
        </div>

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

      <body className="body">
        <h1 class="Title">Spotify React</h1>
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
              {Array.isArray(split)
                ? split.map((item) => {
                  return (
                    <p>
                      <div>{item}</div>
                    </p>
                  );
                })
                : null}

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
                              getSavedSongs()
                            }}
                          >
                            {item.name}
                          </p>
                        );
                      })
                      : null}
                  </Else>
                </form>
                <div class="cards">
                  {listItems}</div>
              </div>
              <div class="card mx-auto" style={{ width: "18rem;" }}>

              </div>
            </div>{" "}
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </body>
    </div>
  );
}

export default App;
