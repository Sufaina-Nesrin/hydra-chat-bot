from typing import List
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
app = FastAPI()
from rag.retriever import retriever
from rag.chatbot import review_chain
from lib.greetings import is_greeting
from lib.greetings import is_thanks
from langchain_core.messages import (
    HumanMessage,
    AIMessage
)

load_dotenv()
# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: List = []

@app.get("/")
def home():
    return {"message": "Hydra AI Backend Running"}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        user_question = request.message
        history_messages = []
        if(request.history and len(request.history) > 0 ):
            

            for msg in request.history:
                if msg["role"] == "user":
                    history_messages.append(HumanMessage(content=msg["text"]))
                else:
                    history_messages.append(AIMessage(content=msg["text"]))


        if is_greeting(user_question):
            return {
                "success": True,
                "reply": "Hello! 👋 How can I help you with the employee handbook today?"
            }
        if is_thanks(user_question):
            return {
                "success": True,
                "reply": "You're welcome! Let me know if you need anything else."
            }    

        docs = retriever.invoke(user_question)

        context = "\n\n".join(
            doc.page_content
            for doc in docs
        )
        print("context---",context)
        print("history", history_messages)
    
        response = review_chain.invoke({
            "chat_history": history_messages,
            "context": context,
            "question": user_question,

        })

        return {
            "success": True,
            "reply": response
        }

    except Exception as e:
        print("Error:", e)

        return {
            "success": False,
            "reply": "Something went wrong. Please try again later."
        }