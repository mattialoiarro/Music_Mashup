package ch.bbw.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import ch.bbw.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseService {

    private UserRepository userRepository;

    @Autowired
    public DatabaseService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public User getUserByID(long id) {
        // den Joke mit der entsprechenden Id laden und zurückgeben
        return userRepository.findById(id).get();
    }

    public boolean deleteUser(Long id) {
        // check if the user with the specified ID exists
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            // delete the user
            userRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}