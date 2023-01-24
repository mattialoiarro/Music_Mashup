DROP TABLE IF EXISTS Song;
CREATE TABLE Song (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      title VARCHAR(255) NOT NULL,
                      artist VARCHAR(255) NOT NULL,
                      album VARCHAR(255) NOT NULL,
                      spotifyTrackID BIGINT NOT NULL
);