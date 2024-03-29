package ch.bbw.musicmashup.model;

import jakarta.persistence.*;

@Entity
@Table(name = "song")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "artist")
    private String artist;

    @Column(name = "spotify_trackid")
    private String spotifyTrackID;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getSpotifyTrackID() {
        return spotifyTrackID;
    }

    public void setSpotifyTrackID(String spotifyTrackID) {
        this.spotifyTrackID = spotifyTrackID;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

}
