package ch.bbw.musicmashup.controller;

import ch.bbw.musicmashup.model.Song;
import ch.bbw.musicmashup.service.SongRepository;
import ch.bbw.musicmashup.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:3000/")
@Controller
public class SongDbController {

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private SongService songService;
    @CrossOrigin("http://localhost:3000/")
    @PostMapping("/songs/title")
    public void updateTitle(@RequestBody String title) {
        List<Song> songs = songRepository.findAll();
        songs.forEach(song -> {
            song.setTitle(title);
            songRepository.save(song);
        });
    }
    @CrossOrigin("http://localhost:3000/")
    @PostMapping("/songs/artist")
    public void updateArtist(@RequestBody String artist) {
        List<Song> songs = songRepository.findAll();
        songs.forEach(song -> {
            song.setArtist(artist);
            songRepository.save(song);
        });
    }
    @CrossOrigin("http://localhost:3000/")

    @PostMapping("/songs/spotifyTrackID")
    public void updateSpotifyTrackID(@RequestBody String spotifyTrackID) {
        List<Song> songs = songRepository.findAll();
        songs.forEach(song -> {
            song.setSpotifyTrackID(spotifyTrackID);
            songRepository.save(song);
        });
    }
    @CrossOrigin("http://localhost:3000/")
    @GetMapping("/songs")
    public ResponseEntity<List<Song>> getSongs() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(songService.getAllSongs());
    }
    
}
