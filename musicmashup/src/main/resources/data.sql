DROP TABLE if EXISTS song;

CREATE TABLE song
(
    id             int IDENTITY(1,1) PRIMARY KEY,
    spotify_trackid INT,
    title          VARCHAR(255),
    artist         VARCHAR(255)
);