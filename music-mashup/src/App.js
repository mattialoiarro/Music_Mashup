import logo from './logo.svg';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [playlistresult, setPlaylistresult] = useState([]);

  function getPlaylist() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer BQADCrDD62cBTa0FfjU-uDHvxOJtVBo-DcNjxszfmE3euf4Usc8HJX4tYFKHeGUdB4egr7oZ6DryNz0BaJoXKiL5G2Gyq5uM0Hx55OoIsgI9p4-1RDp6qE4wdhPTbzjGFEiJzO10ySrUCtDUEM3qLX7l4T9aYR4ap1q7qAmESJJ2DRhokPhxqd2KOSBauxAGG2ZpWBsf7S3eEtpq00iRQdlRYUM-bgOYBXDiaw");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks", requestOptions)
      .then(response => response.json())
      .then(result => setPlaylistresult(result.items))
      .catch(error => console.log('error', error));
  }

  const listItems = playlistresult.map((item) =>

    <Card class="songCard" style={{ width: '18rem', border: '3px solid #191414' }}>
      <Card.Img variant="top" src={item.track.album.images[0].url} height="40%" width="100%" />
      <Card.Body>
        <Card.Title>{item.track.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );


  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      <div class="navbar">
        <a href="#home"> Music Mashup</a>
        <link rel="stylesheet" href="css/font-awesome.css" />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />

      </div>

      <div class="main">
        <p>Search for your favorite playlist and find out more</p>
        <div class="box">
          <form name="search">
            <input onChange={(e) => setInputSearch(e.target.value)} type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();">

            </input>


          </form>
          <button onClick={getPlaylist}></button>
        </div>
        <div class="card mx-auto" style={{width: "18rem;"}}>
          {listItems}
        </div>
      </div>
    </div>
  );
}

export default App;
