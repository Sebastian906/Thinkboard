package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func main() {
	// Crear una instancia de Gin
	router := gin.Default()

	// GET - Obtener todas las notas
	router.GET("/api/notes", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "You got 5 notes",
		})
	})

	// POST - Crear una nueva nota
	router.POST("/api/notes", func(c *gin.Context) {
		c.JSON(http.StatusCreated, gin.H{
			"message": "Note created successfully",
		})
	})

	// PUT - Actualizar una nota existente
	router.PUT("/api/notes/:id", func(c *gin.Context) {
		// Obtener el ID de la URL
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{
			"message": "Note updated successfully",
			"id":      id,
		})
	})

	// DELETE - Eliminar una nota existente
	router.DELETE("/api/notes/:id", func(c *gin.Context) {
		// Obtener el ID de la URL
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{
			"message": "note deleted successfully",
			"id":      id,
		})
	})

	// Iniciar el servidor en el puerto 5001
	router.Run(":5001")
}