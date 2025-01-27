# Small E-commerce App with Products and Shopping Cart

This project is a simple e-commerce application featuring a list of books as products and a shopping cart system. It demonstrates the use of modern technologies such as microservices architecture, containerization, and orchestration using Terraform and Docker.

## Features
- **Microservices Architecture**: Two FastAPI services (Books Backend and Cart Backend) handling separate functionalities.
- **Frontend**: Built with React (Vite) and styled with Tailwind CSS for a modern and responsive UI.
- **Database**: MongoDB for persistent storage of books, cart data, and user-specific orders.
- **Infrastructure as Code (IaC)**: Managed using Terraform to spin up and orchestrate services seamlessly.
- **Dockerized Deployment**: All services are containerized and run on a Docker network.

---

## Technologies
- **Frontend**: React with Vite and Tailwind CSS.
- **Backend**: Two FastAPI microservices:
  - Books Backend: Manages product (books) inventory.
  - Cart Backend: Manages user cart and handles API calls to reserve/release products.
- **Database**: MongoDB for storing books, cart data, and user-specific information.
- **Containerization**: Docker containers for all services.
- **Orchestration**: Terraform for managing infrastructure and networking.

---

## Running the Development Environment

### Prerequisites
- **Docker** and **Terraform** must be installed on your system.

### Steps to Run
Clone the repository:
git clone <repository-url>
cd <repository-directory>
Navigate to the terraform directory:

cd ./terraform

Initialize Terraform:

terraform init

Plan the infrastructure:

terraform plan

Apply the infrastructure configuration:

  terraform apply

Terraform will:

  Spin up two FastAPI containers (Books Backend and Cart Backend).
  Start the MongoDB container with initialized scripts.
  Launch the React frontend (Vite) container.
  Connect all containers on a Docker network.

### Accessing the App

  Frontend (React): http://localhost:5555
  Books Backend (FastAPI Swagger): http://localhost:8007/docs
  Cart Backend (FastAPI Swagger): http://localhost:8009/docs
  MongoDB CLI:

  docker exec -it mongo_book_shop mongosh -u <user> -p <password> --authenticationDatabase admin

### Project Structure

 shopping-cart/
 
 │
 
 ├── backend/
 
 │   ├── app/
 
 │   │   ├── books/     # Books Backend Service
 
 │   │   ├── cart/      # Cart Backend Service

 │
 
 ├── frontend/          # React + Vite Frontend
 
 │   ├── src/           # Source code with React components
 
 │   ├── public/        # Static assets
 
 │   └── tailwind.config.js  # Tailwind configuration
 
 │ 
 
 ├── terraform/         # Terraform configuration files
 
 │   ├── main.tf        # Terraform configuration for Docker containers
 
 │   ├── variables.tf   # Input variables
 
 │   ├── outputs.tf     # Outputs (URLs, etc.)
 
 │
 └── db/
 
   └── init-scripts/  # MongoDB initialization scripts
   

### Highlights of the Architecture

  Microservices: The backend is split into two independent services (Books and Cart), communicating over APIs. This modular design ensures scalability and maintainability.
  Single Docker Network: All services are connected on a Docker network for seamless communication.
  Terraform: Infrastructure is defined as code, making it easier to manage, scale, and reproduce environments.
  MongoDB Integration: Each backend service interacts with MongoDB to handle data persistence.

### Future Enhancements

  Upgrade store with delivery service
  Add user authentication and multi-user support.
  Implement Kafka for event-driven communication between backend services.
  Migrate the frontend to Next.js for better SEO and performance.
  Add CI/CD pipelines for automated deployments.

### Feel free to contribute or suggest improvements! 🚀
