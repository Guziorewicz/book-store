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
}

# Container MongoDB
resource "docker_container" "mongo_container" {
  name  = "mongo_book_shop"
  image = docker_image.mongo_image.name
  ports {
    internal = 27017
    external = var.mongo_port
  }
  volumes {
    host_path = abspath("${path.module}/../db/init-scripts")
    container_path = "/docker-entrypoint-initdb.d"
  }
  env = [
    "MONGO_INITDB_ROOT_USERNAME=root",
    "MONGO_INITDB_ROOT_PASSWORD=paSUTwort"
  ]
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
  image = docker_image.fastapi_books_image.name
  ports {
    internal = 8000
    external = var.app_books_port
  }
  volumes {
    host_path      = abspath("${path.module}/../backend/app/books")
    container_path = "/app"
  }
  env = [
    "MONGO_URI=mongodb://root:paSUTwort@mongo_book_shop:27017/admin"
  ]
  networks_advanced {
    name = docker_network.app_network.name
  }

  healthcheck {
    test     = ["CMD", "curl", "-f", "http://localhost:8007"]
    interval = "30s"
    timeout  = "10s"
    retries  = 3
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
  image = docker_image.fastapi_cart_image.name
  ports {
    internal = 8000
    external = var.app_cart_port
  }
  volumes {
    host_path      = abspath("${path.module}/../backend/app/cart")
    container_path = "/app"
  }
  env = [
    "MONGO_URI=mongodb://root:paSUTwort@mongo_book_shop:27017/admin"
  ]
  networks_advanced {
    name = docker_network.app_network.name
  }

  healthcheck {
    test     = ["CMD", "curl", "-f", "http://localhost:8009"]
    interval = "30s"
    timeout  = "10s"
    retries  = 3
  }
}

# Image Front Vite
resource "docker_image" "vite_image" {
  name = "vite_react_app"
  build {
        path       = "${path.module}/../frontend"
        dockerfile = "Dockerfile"
  }
}

# Container Vite
resource "docker_container" "vite_container" {
  name = "front-store"
  image = docker_image.vite_image.name
  ports {
    internal = 5173
    external = var.app_front
  }
  networks_advanced {
    name = docker_network.app_network.name
  }
  volumes {
    host_path      = abspath("${path.module}/../frontend")
    container_path = "/app"
  }
}