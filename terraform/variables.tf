variable "mongo_port" {
  description = "External port for MongoDB"
  default = 27021
}

variable "app_books_port" {
  description = "External port for Books backend"
  default = 8007
}

variable "app_cart_port" {
  description = "External port for Cart backend"
  default = 8009
}

variable "network_name" {
  description = "Docker network name"
  default = "book_store_network"
}
