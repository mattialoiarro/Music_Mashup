package ch.bbw.backend.service;

import ch.bbw.backend.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SongService {
    private SongRepository songRepository;

    @Autowired
    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    public List<Song> getSongs() {
        return StreamSupport.stream(songRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Song getSongByID(long id) {
        // den Joke mit der entsprechenden Id laden und zurückgeben
        return songRepository.findById(id).get();
    }

    public boolean deleteSong(Long id) {
        // check if the user with the specified ID exists
        Optional<Song> optionalSong = songRepository.findById(id);
        if (optionalSong.isPresent()) {
            // delete the user
            songRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public void addSongs(List<Song> songs) {
        songRepository.saveAll(songs);
    }
}
