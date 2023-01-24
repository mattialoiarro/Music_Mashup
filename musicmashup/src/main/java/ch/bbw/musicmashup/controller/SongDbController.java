package ch.bbw.musicmashup.controller;

import ch.bbw.musicmashup.model.Song;
import ch.bbw.musicmashup.service.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class SongDbController {

    @Autowired
    private SongRepository songRepository;

    @PostMapping("/songs/title")
    public void updateTitle(@RequestBody String title) {
        List<Song> songs = songRepository.findAll();
        songs.forEach(song -> {
            song.setTitle(title);
            songRepository.save(song);
        });
    }

    @PostMapping("/songs/artist")
    public void updateArtist(@RequestBody String artist) {
        List<Song> songs = songRepository.findAll();
        songs.forEach(song -> {
            song.setArtist(artist);
            songRepository.save(song);
        });
    }

    @PostMapping("/songs/album")
    public void updateAlbum(@RequestBody String album) {
        List<Song> songs = songRepository.findAll();
        songs.forEach(song -> {
            song.setAlbum(album);
            songRepository.save(song);
        });
    }

    @PostMapping("/songs/spotifyTrackID")
    public void updateSpotifyTrackID(@RequestBody Long spotifyTrackID) {
        List<Song> songs = songRepository.findAll();
        songs.forEach(song -> {
            song.setSpotifyTrackID(spotifyTrackID);
            songRepository.save(song);
        });
    }

}
