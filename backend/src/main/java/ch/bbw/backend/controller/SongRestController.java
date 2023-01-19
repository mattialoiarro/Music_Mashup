package ch.bbw.backend.controller;

import ch.bbw.backend.model.Song;
import ch.bbw.backend.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("api")
public class SongRestController {

    private SongService service;

    @Autowired
    public SongRestController(SongService songService) {
        this.service = songService;
    }


    @GetMapping("songs")
    public List<Song> getSongs() {
        return service.getSongs();

    }

    @PostMapping("/songs")
    public void addSongs(@RequestBody List<Song> songs) {
        service.addSongs(songs);
    }

}