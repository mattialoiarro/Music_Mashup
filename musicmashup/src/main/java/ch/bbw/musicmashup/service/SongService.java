package ch.bbw.musicmashup.service;

import ch.bbw.musicmashup.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public Song getSongById(long id) {
        return songRepository.findById(id).orElse(null);
    }

    public Song addSong(Song song) {
        return songRepository.save(song);
    }

    public void deleteSong(long id) {
        songRepository.deleteById(id);
    }
}
