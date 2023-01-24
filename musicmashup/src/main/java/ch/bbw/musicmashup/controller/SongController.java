package ch.bbw.musicmashup.controller;

import ch.bbw.musicmashup.model.Song;
import ch.bbw.musicmashup.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
public class SongController {

    @Autowired
    private SongService songService;

    @GetMapping
    public List<Song> getAllSongs() {
        return songService.getAllSongs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable(value = "id") Long id) {
        Song song = songService.getSongById(id);
        if (song == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(song);
    }

    @PostMapping
    public Song addSong(@RequestBody Song song) {
        return songService.addSong(song);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Song> deleteSong(@PathVariable(value = "id") Long id) {
        Song song = songService.getSongById(id);
        if (song == null) {
            return ResponseEntity.notFound().build();
        }

        songService.deleteSong(id);
        return ResponseEntity.ok().build();
    }
}
