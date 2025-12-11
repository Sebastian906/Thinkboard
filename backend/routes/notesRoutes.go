package routes

import (
	"backend/controllers"
	"github.com/gin-gonic/gin"
)

// Exportar las rutas de las notas
func SetupNoutesRoutes(router *gin.RouterGroup) {

	// GET - Obtener todas las notas
	router.GET("/", controllers.GetAllNotes)

	// POST - Crear una nueva nota
	router.POST("/", controllers.CreateNote)

	// PUT - Actualizar una nota existente
	router.PUT("/:id", controllers.UpdateNote)

	// DELETE - Eliminar una nota existente
	router.DELETE("/:id", controllers.DeleteNote)
}