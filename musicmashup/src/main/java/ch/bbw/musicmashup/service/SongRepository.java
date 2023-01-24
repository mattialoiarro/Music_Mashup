package ch.bbw.musicmashup.service;

import ch.bbw.musicmashup.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
@EnableJpaRepositories
@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
}
