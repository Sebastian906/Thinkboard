package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// Obtener todas las notas
func GetAllNotes(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "You just fetched all the notes",
	})
}

// Crear una nueva nota
func CreateNote(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{
		"message": "Note created successfully",
	})
}

// Actualizar una nota existente
func UpdateNote(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"message": "Note updated successfully",
		"id":      id,
	})
}

// Eliminar una nota
func DeleteNote(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"message": "Note deleted successfully",
		"id":      id,
	})
}