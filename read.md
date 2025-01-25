# Basic e-commerce app with list of products and shopping cart. 

# User data is simpled to one user.


# Technologies:
    - React, React-Modal React-Router-Dom, Axios, Mui
    - FastAPI, Uvicorn, Fastapi-cors
    - Docker/Kuberenetes


# Usage dev version:

Backend - run in two separated terminals 
1) open venv `source venv/bin/activate`
2) run fastapi 
2a) books `cd app` -> `uvicorn books.main:app --reload --port 8000`
2b) cart `cd app` -> `uvicorn cart.main:app --reload --port 8001`

Frontend - `npm start`

# New feature - Terraform + Mongodb
