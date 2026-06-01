# from langchain_community.document_loaders import PyPDFLoader
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from langchain_community.vectorstores import Chroma
# from dotenv import load_dotenv
# import os

# load_dotenv()
# loader = PyPDFLoader("data/Employee-Handbook.pdf")

# documents = loader.load()

# splitter = RecursiveCharacterTextSplitter(
#     chunk_size=1000,
#     chunk_overlap=200,
# )

# chunks = splitter.split_documents(
#     documents
# )

# embeddings = GoogleGenerativeAIEmbeddings(
#      model="models/gemini-embedding-001",
#      google_api_key=os.getenv("GEMINI_API_KEY"),
# )

# vector_store = Chroma.from_documents(
#     documents=chunks,
#     embedding=embeddings,
#     persist_directory="./chroma_db",
# )
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv
import os

load_dotenv()


def create_vector_store():
    loader = PyPDFLoader("data/Employee-Handbook.pdf")

    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
    )

    chunks = splitter.split_documents(documents)

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=os.getenv("GEMINI_API_KEY"),
    )

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="./chroma_db",
    )

    return vector_store
