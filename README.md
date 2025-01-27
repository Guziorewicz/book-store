# # # Basic e-commerce app with list of products and shopping cart.
User data is simpled to one user(yet)

# Technologies:
- React (via Vite with Tailwind)
- FastAPI
- MongoDB
- Docker/Terraform

# Usage dev version:

# Dependencies: Docker, Terraform

In ./terraform RUN
terraform init

terraform plan

terraform apply 

Terraform should create and run two FastAPI containers, Vite container and MongoDB container, connected in Docker Network

# external links 

Front Page - http://localhost:5555 

Books Backend Swagger - http://localhost:8007/docs 

Cart Backend Swagger - http://localhost:8009/docs

MongoDB cli - docker exec -it mongo_book_shop mongosh -u <user> -p <password> --authenticahenticationDatabase admin
