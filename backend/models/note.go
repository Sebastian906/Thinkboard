package models

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// Esquema de la nota de MongoDB
type Note struct {
	ID        bson.ObjectID `json:"id" bson:"_id,omitempty"`
	Title     string        `json:"title" bson:"title" binding:"required"`
	Content   string        `json:"content" bson:"content" binding:"required"`
	Tags      []string      `json:"tags" bson:"tags"`
	Completed bool          `json:"completed" bson:"completed"`
	CreatedAt time.Time     `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time     `json:"updatedAt" bson:"updatedAt"`
}

// Validar datos ingresados del usuario
type CreateNoteInput struct {
	Title   string   `json:"title" binding:"required"`
	Content string   `json:"content" binding:"required"`
	Tags    []string `json:"tags"`
}

// Actualizar datos de la nota
type UpdateNoteInput struct {
	Title     *string  `json:"title"`
	Content   *string  `json:"content"`
	Tags      []string `json:"tags"`
	Completed *bool    `json:"completed"`
}
