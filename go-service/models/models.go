package models

type DataModel struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Value string `json:"value"`
}

func NewDataModel(id, name, value string) *DataModel {
	return &DataModel{
		ID:    id,
		Name:  name,
		Value: value,
	}
}
