# **Node Assignment**

## **Description**
This is a Node.js server that provides APIs for performing CRUD operations (GET, PUT, POST, DELETE) on user data. It uses HTTP methods and the filesystem to handle data in JSON format.

---

## **Installation**

### **Pre-requisites**
Ensure the following are installed and understood:
- **Node.js**: JavaScript runtime environment.
- **HTTP Methods**: GET, POST, PUT, DELETE.
- **JSON**: Data format for request and response bodies.
- **Filesystem**: For data persistence.

---

## **Steps to Run the Server**
1. Clone the repository:
   ```bash
   git clone https://github.com/devendrasingh-wmp/WMP_TR_06_NodeJS_Assignment-Devendra-.git
   cd WMP_TR_06_NodeJS_Assignment_Devendra
   ```

2. Install dependencies (if any):
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. The server will run on `http://localhost:4000`.

---

## **API Endpoints**

### **1. GET All Users**
- **Endpoint:** `http://localhost:4000/user/comments`
- **Description:** Fetches all user data.

---

### **2. GET User by ID**
- **Endpoint:** `http://localhost:4000/user/comments/:id`
- **Description:** Fetches a user by their unique ID.
- **Parameters:**
  - `id` (path parameter): The ID of the user.

---

### **3. PUT Update User**
- **Endpoint:** `http://localhost:4000/user/comments/edit/:id`
- **Description:** Updates user information.
- **Parameters:**
  - `id` (path parameter): The ID of the user.
- **Request Body:**
  ```json
  {
    "email": "email to update",
    "name": "updated_name",
    "comment": "updated_comment"
  }
  ```

---

### **4. POST Add User**
- **Endpoint:** `http://localhost:4000/user/comments/add`
- **Description:** Adds a new user.
- **Request Body:**
  ```json
  {
    "email": "<email_user",
    "name": "name",
    "comment": "<user comment>"
  }
  ```

---

### **5. DELETE User**
- **Endpoint:** `http://localhost:4000/api/delete/:id`
- **Description:** Deletes a user by their unique ID.
- **Parameters:**
  - `id` (path parameter): The ID of the user.

---

## **Request Body Examples**

### **POST Request Body**
```json
{
    "email":"rohit@gmail.com",
    "name":"Rohit",
    "comment":"hello from Rohit"
}
```

### **PUT Request Body**
```json
{
    "email":"ankit@gmail.com",
    "name":"Ankit",
    "comment":"hello from Ankit"
}
```

---

## **Database Schema**

The database schema for storing user data is as follows:

```json
{
    "id": "f579b0ec-4506-41a7-9ca6-806f0b2f51dd",
    "name": "ankit",
    "email": "ankit@gmail.com",
    "comment": "Hi this is a ankit"
}
```

---

## **More Information**
This server provides a simple implementation of CRUD operations using Node.js and demonstrates how to handle HTTP requests and JSON data. It uses the filesystem to store and retrieve user information.

Feel free to modify and extend the server as needed.
