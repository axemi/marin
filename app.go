package main

import (
	"context"
	"database/sql"
	"log"
)

// App struct
type App struct {
	ctx context.Context
	db  *sql.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	db, err := OpenDB()
	if err != nil {
		log.Panic(err)
	}
	a.db = db
	err = createTestTable(db)
	if err != nil {
		log.Panic(err)
	}

	err = createTrackedAnimeTable(db)
	if err != nil {
		log.Panic(err)
	}
}

func (a *App) InsertTrackedAnime(anilist_id int) error {
	err := insertTrackedAnime(a.db, anilist_id)
	return err
}

func (a *App) GetTrackedAnimeAll() ([]TrackedAnimeTableRow, error) {
	log.Print("retrieving tracked anime list from local database")
	rows, err := getTrackedAnimeAll(a.db)
	if err != nil {
		log.Fatalf("There was an issue getting tracked anime, %v", err)
		return nil, err
	}
	return rows, err
}
