package main

import (
	"backend/config"
	"backend/middleware"
	"backend/routes"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Cargar variables de entorno desde .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error cargando el archivo .env")
	}

	// Obtener el puerto desde variables de entorno o usar 5001 por defecto
	port := os.Getenv("PORT")
	if port == "" {
		port = "5001"
	}

	// Crear una instancia de Gin
	app := gin.Default()

	// Middleware de CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"}, // Especifica los orígenes
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length", "X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"},
		AllowCredentials: true,
		MaxAge:           12 * 3600,
	}))

	// Middleware de rate limiting
	app.Use(middleware.RateLimitMiddleware())

	// Middleware personalizado (comentado como en tu server.js)
	// app.Use(func(c *gin.Context) {
	// 	fmt.Printf("Req method is %s & Req URL is %s\n", c.Request.Method, c.Request.URL.Path)
	// 	c.Next()
	// })

	// Configurar el grupo de rutas para /api/notes
	notesGroup := app.Group("/api/notes")
	routes.SetupNoutesRoutes(notesGroup)

	// Conectar a MongoDB y luego iniciar el servidor
	config.ConnectDB()
	config.SetupRedis()

	// Iniciar el servidor
	fmt.Printf("Server started on PORT: %s\n", port)
	app.Run(":" + port)
}
