# from rag.ingest import vector_store

# retriever = vector_store.as_retriever(
#     search_kwargs={"k": 3}
# )

# docs = retriever.invoke(
#     "What is the leave policy?"
# )

# context = "\n\n".join(
#     doc.page_content
#     for doc in docs
# )

from dotenv import load_dotenv
import os

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma

load_dotenv()

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=os.getenv("GEMINI_API_KEY"),
)

vector_store = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings,
)

retriever = vector_store.as_retriever(
    search_kwargs={"k": 3}
)