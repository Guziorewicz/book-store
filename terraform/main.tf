terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.21.0"
    }
  }
  required_version = ">= 1.1.0"
}

provider "docker" {}

# Docker Network 
resource "docker_network" "app_network" {
  name = var.network_name
}

# Image MongoDB
resource "docker_image" "mongo_image" {
  name         = "mongo:6.0"
  keep_locally = false
}

# Container MongoDB
resource "docker_container" "mongo_container" {
  name  = "mongo"
  image = docker_image.mongo_image.name
  ports {
    internal = 27017
    external = var.mongo_port
  }
  volumes {
    host_path = "${path.module}/../db/init-scripts"
    container_path = "/docker-entrypoint-initdb.d"
  }
  env {
    "MONGO_INITDB_ROOT_USERNAME" = "root"
    "MONGO_INITDB_ROOT_PASSWORD" = "p@sswort"
  }
  networks_advanced {
    name = docker_network.app_network.name
  }
}

# Image FastAPI - Books
resource "docker_image" "fastapi_books_image" {
  name = "fastapi_app_books"
  build {
    path       = "${path.module}/../backend/app/books"
    dockerfile = "Dockerfile"
  }
}

# Container FastAPI - Books
resource "docker_container" "fastapi_books_container" {
  name  = "fastapi-books"
  image = docker_image.fastapi_image.name
  ports {
    internal = 8000
    external = var.app_books_port
  }
  env = [
    "MONGO_URI=mongodb://mongo:27017"
  ]
  networks_advanced {
    name = docker_network.app_network.name
  }
}

# Image FastAPI - Cart
resource "docker_image" "fastapi_cart_image" {
  name = "fastapi_app_cart"
  build {
    path       = "${path.module}/../backend/app/cart"
    dockerfile = "Dockerfile"
  }
}

# Container FastAPI - Cart
resource "docker_container" "fastapi_cart_container" {
  name  = "fastapi-cart"
  image = docker_image.fastapi_image.name
  ports {
    internal = 8000
    external = var.app_cart_port
  }
  env = [
    "MONGO_URI=mongodb://mongo:27017"
  ]
  networks_advanced {
    name = docker_network.app_network.name
  }
}
