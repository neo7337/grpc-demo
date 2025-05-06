package api

import (
	"encoding/json"
	"net/http"
)

// DataModel represents the structure of the data being handled.
type DataModel struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// GetData handles GET requests to retrieve data.
func GetData(w http.ResponseWriter, r *http.Request) {
	data := DataModel{ID: "1", Name: "Sample Data"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

// PostData handles POST requests to receive data.
func PostData(w http.ResponseWriter, r *http.Request) {
	var data DataModel
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(data)
}
