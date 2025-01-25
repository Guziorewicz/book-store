output "books_backend_url" {
  description = "URL for Books backend"  
  value = "http://localhost:${var.app_books_port}"
}

output "cart_backend_url" {
  description = "URL for Cart backend"  
  value = "http://localhost:${var.app_cart_port}"
}