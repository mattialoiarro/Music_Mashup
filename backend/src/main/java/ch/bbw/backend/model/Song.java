package ch.bbw.backend.model;

import jakarta.persistence.*;


@Entity
@Table(name = "song")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long spotifyTrackID;
    private String title;
    private String artist;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSpotifyTrackID() {
        return spotifyTrackID;
    }

    public void setSpotifyTrackID(Long spotifyTrackID) {
        this.spotifyTrackID = spotifyTrackID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }
}
