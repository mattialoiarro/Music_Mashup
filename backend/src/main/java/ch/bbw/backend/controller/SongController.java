package ch.bbw.backend.controller;

import ch.bbw.backend.model.Song;
import ch.bbw.backend.model.User;
import ch.bbw.backend.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class SongController {
    private final SongService songService;

    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("/")
    public String homepage(Model model, HttpServletRequest request) {
        model.addAttribute("userlist", songService.getSongs());
        return "index";
    }

    @GetMapping("/users")
    public ResponseEntity<List<Song>> getSongs() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(songService.getSongs());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Song> getSong(@PathVariable int id) {
        return ResponseEntity
                .status(HttpStatus.OK) // HTTP 200
                .contentType(MediaType.APPLICATION_JSON)
                .body(songService.getSongByID(id));

    }

    @PostMapping("/createUsers")
    public ResponseEntity<User> addSongs(@RequestBody User user) {
        return ResponseEntity
                .status(HttpStatus.CREATED) // HTTP 201
                .contentType(MediaType.APPLICATION_JSON)
                .body(user);
    }

    @PostMapping("/createUsers/{id}")
    public ResponseEntity<User> addSong(@RequestBody User user) {
        return ResponseEntity
                .status(HttpStatus.CREATED) // HTTP 201
                .contentType(MediaType.APPLICATION_JSON)
                .body(user);
    }

    @PutMapping("/updateUsers")
    public ResponseEntity<User> updateSong(@RequestBody User user) {
        return ResponseEntity
                .status(HttpStatus.OK) // HTTP 200
                .contentType(MediaType.APPLICATION_JSON)
                .body(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        // delete the user with the specified ID
        boolean deleted = songService.deleteSong(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // HTTP 204
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404
        }
    }


}
