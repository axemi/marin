package main

import (
	"database/sql"
	"log"

	_ "modernc.org/sqlite"
)

func OpenDB() (*sql.DB, error) {
	log.Print("attempting to open database file")
	db, err := sql.Open("sqlite", "./local.db")
	if err != nil {
		return nil, err
	}

	return db, nil
}

func createTestTable(db *sql.DB) error {
	log.Print("attempting to create test table in local database file")
	_, err := db.Exec(`
	CREATE TABLE IF NOT EXISTS test_table (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT,
	count INTEGER
	);
	`)
	if err != nil {
		return err
	}

	return nil
}

type TrackedAnimeTableRow struct {
	Anilist_id int
}

func createTrackedAnimeTable(db *sql.DB) error {
	log.Print("creating tracked_anime table in local database")
	_, err := db.Exec(`
	CREATE TABLE IF NOT EXISTS tracked_anime (
	anilist_id INTEGER
	);
	`)
	return err
}

func insertTrackedAnime(db *sql.DB, anilist_id int) error {
	log.Printf("inserting %v into tracked_anime table", anilist_id)
	query := "INSERT INTO tracked_anime (anilist_id) VALUES (?);"

	_, err := db.Exec(query, anilist_id)
	return err
}

func getTrackedAnimeAll(db *sql.DB) ([]TrackedAnimeTableRow, error) {
	query := "SELECT anilist_id FROM tracked_anime"
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var trackedAnimeList []TrackedAnimeTableRow
	for rows.Next() {
		var t TrackedAnimeTableRow
		if err := rows.Scan(&t.Anilist_id); err != nil {
			return nil, err
		}
		trackedAnimeList = append(trackedAnimeList, t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return trackedAnimeList, nil
}
