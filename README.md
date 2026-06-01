# Employee Handbook AI Assistant

## Overview

Employee Handbook AI Assistant is a RAG (Retrieval-Augmented Generation) chatbot that helps employees quickly find answers to company policies and guidelines using natural language.

Built with Next.js, FastAPI, LangChain, Gemini, and ChromaDB.

## Features

* Conversational AI interface
* RAG-based question answering
* Employee handbook search and retrieval
* Context-aware responses using Gemini
* Responsive UI

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* FastAPI
* LangChain
* Gemini API

### Vector Database

* ChromaDB

## Architecture

```text
Employee Handbook PDF
        ↓
   Document Loader
        ↓
    Text Splitter
        ↓
     Embeddings
        ↓
      ChromaDB

User Question
      +
 Chat History
        ↓
     Retriever
        ↓
 Relevant Context
        ↓

  System Prompt
      +
 Chat History
      +
 Retrieved Context
      +
 User Question

        ↓
      Gemini
        ↓
    AI Response
```

## Installation

### Backend

```bash
cd backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

### Setup Handbook PDF

Place your employee handbook PDF inside the backend data directory:

```text
backend/
└── data/
    └── Employee-Handbook.pdf
```

After adding or updating the handbook, regenerate the vector database:

```bash
python rag/create_db.py
```

This will:

1. Load the PDF.
2. Split the content into chunks.
3. Generate embeddings.
4. Store the embeddings in ChromaDB for retrieval.

## Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

## Example Questions

* What is the leave policy?
* What are the recruitment steps?
* How many PTO days do employees receive?
* What is the parental leave policy?

## License

This project is intended for educational and demonstration purposes.
