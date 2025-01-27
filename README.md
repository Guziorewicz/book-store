Basic e-commerce app with list of products and shopping cart.
User data is simpled to one user.
Technologies:

- React (via Vite with Tailwind)
- FastAPI
- MongoDB
- Docker/Terraform

Usage dev version:

Dependencies: Docker, Terraform

./terraform terraform init terraform plan terraform apply Terraform should create and run two FastAPI containers, Vite container and MongoDB container, connected in Docker Network
Dev usage

external links Front Page - http://localhost:5555 Books Backend Swagger - http://localhost:8007/docs Cart Backend Swagger - http://localhost:8009/docs

MongoDB cli - docker exec -it mongo_book_shop mongosh -u root -p paSUTwort --authenticahenticationDatabase admin
