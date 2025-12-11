package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// DB es la instancia de la base de datos MongoDB
var DB *mongo.Database

// Establecer conexión a la base de datos
func ConnectDB() {
	// Obtener la URL de MongoDB desde las variables de entorno
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI no está configurada en las variables de entorno")
	}

	// Crear contexto con timeout para la conexión
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Configurar las opciones del cliente
	clientOptions := options.Client().ApplyURI(mongoURI)

	// Conectar a MongoDB
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatal("Error conectando a MongoDB:", err)
	}

	// Verificar la conexión
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Error al hacer ping a MongoDB:", err)
	}

	fmt.Println("MONGODB CONNECTED SUCCESSFULLY")

	// Asignar la base de datos a la variable global
	DB = client.Database("thinkboard")
}

// Devolver colección específica de la base de datos
func GetCollection(collectionName string) *mongo.Collection {
	return DB.Collection(collectionName)
}