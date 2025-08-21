CREATE SCHEMA IF NOT EXISTS radio;

CREATE TABLE IF NOT EXISTS radio.favorites (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES radio.users(id) ON DELETE CASCADE,
    station_id VARCHAR(256) NOT NULL,
    station JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, station_id)
);


