DROP TABLE if EXISTS song;

CREATE TABLE song
(
    id             int IDENTITY(1,1) PRIMARY KEY,
    spotify_trackid VARCHAR(255),
    title          VARCHAR(255),
    artist         VARCHAR(255)
);