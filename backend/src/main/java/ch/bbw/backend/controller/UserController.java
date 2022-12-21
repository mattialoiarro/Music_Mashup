package ch.bbw.backend.controller;

import ch.bbw.backend.model.User;
import ch.bbw.backend.service.DatabaseService;
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
public class UserController {

    private DatabaseService databaseService;

    @Autowired
    public UserController(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @GetMapping("/")
    public String homepage(Model model, HttpServletRequest request) {
        model.addAttribute("userlist", databaseService.getUsers());
        return "index";
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(databaseService.getUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getJoke(@PathVariable int id) {
        return ResponseEntity
                .status(HttpStatus.OK) // HTTP 200
                .contentType(MediaType.APPLICATION_JSON)
                .body(databaseService.getUserByID(id));

    }

    @PostMapping("/createUsers")
    public ResponseEntity<User> addJokes(@RequestBody User user) {
        return ResponseEntity
                .status(HttpStatus.CREATED) // HTTP 201
                .contentType(MediaType.APPLICATION_JSON)
                .body(user);
    }

    @PostMapping("/createUsers/{id}")
    public ResponseEntity<User> addJoke(@RequestBody User user) {
        return ResponseEntity
                .status(HttpStatus.CREATED) // HTTP 201
                .contentType(MediaType.APPLICATION_JSON)
                .body(user);
    }

    @PutMapping("/updateUsers")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity
                .status(HttpStatus.OK) // HTTP 200
                .contentType(MediaType.APPLICATION_JSON)
                .body(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        // delete the user with the specified ID
        boolean deleted = databaseService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // HTTP 204
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404
        }
    }


}
