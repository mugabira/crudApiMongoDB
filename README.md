# Technical Screening Project

# Dog API 🐶

A complete CRUD API for managing dog records with MongoDB, Zod validation, and Hapi.js.

Implemented by
Name: Anthony Mugabira
Email: mullegow@gmail.com

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Installation, build and test](#installation)
- [File Structure](#file-structure)
- [Development Notes](#development-notes)

---

## API Endpoints

### **Create Dog**

`POST /dogs`

```json
{
  "name": "string (required, min 1)",
  "breed": "string (required, min 1)",
  "color": "string (required, min 1)",
  "weight": "number (required, positive)"
}
```

### **Get Dog**

`GET /dogs/{id}`

### **Update Dog**

`PATCH /dogs/{id}`

```json
{
  "name": "string (optional)",
  "breed": "string (optional)",
  "color": "string (optional)",
  "weight": "number (optional, positive)"
}
```

### **Delete Dog**

`DELETE /dogs/{id}`

## Installation, build and test

To install the project, run `npm install` in your terminal.
To build the project, run `npm run build` in your terminal.
To run all tests in the project, run `npm run test` in your terminal.

## File structure

src/
├── dog/
│ ├── create-dog.ts
│ ├── delete-dog.ts
│ ├── dog.test.ts
│ ├── get-dog.ts
│ ├── index.ts
│ └── schema.ts
├── routes/
│ └── dogs/
│ ├── create-dog.test.ts
│ ├── create-dog.ts
│ ├── delete-dog.test.ts
│ ├── delete-dog.ts
│ ├── get-dog.test.ts
│ ├── get-dog.ts
│ ├── index.ts
│ ├── update-dog.test.ts
│ └── update-dog.ts
├── index.ts
├── util/
│ ├── mongo.ts
│ └── apl.ts
├── .eslintr.js
├── .gitignore
└── babel.config.js

## Development notes.

### Refactoring of the project structre.

I followed the file structure of thing but we could refactor to group related files together. Example of a proposed structure is:

src/dog/
├── schema.ts # Mongoose schema & interface
├── routes/
│ ├── create-dog.ts # POST handler
│ ├── get-dog.ts # GET handler
│ ├── update-dog.ts # PATCH handler
│ └── delete-dog.ts # DELETE handler
├── tests/
│ ├── create-dog.test.ts
│ ├── get-dog.test.ts
│ ├── update-dog.test.ts
│ └── delete-dog.test.ts
└── routes.ts # Route registration

### deprecated version of vite

The project is using the deprecated CommonJS (CJS) version of Vite's Node API. It would be nice if it was required to update the configurations vite

### Consolidated Unit Tests.

The unit tests for the db operations have been consolidated in one file for the following reasons:

1. Shared test data and setup
2. Clean database between tests with afterEach
