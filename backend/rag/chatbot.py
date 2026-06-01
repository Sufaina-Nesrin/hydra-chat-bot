import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import (
    PromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
)
from langchain_core.messages import (
    HumanMessage,
    AIMessage
)
from langchain_core.output_parsers import StrOutputParser



review_template_str = """
You are a helpful Employee Handbook Assistant.

Answer employee questions using ONLY the provided context.

Rules:
- Keep responses concise.
- Usually answer in 1-3 sentences.
- Use bullet points only when listing steps, policies, or requirements.
- Be friendly and professional.
- Use the conversation history only to understand references such as "it", "that policy", or "those days".
- Use only the provided context as the source of truth.

Conversation History:
{chat_history}

Context:
{context}
"""
review_system_prompt = SystemMessagePromptTemplate(
    prompt=PromptTemplate(
        input_variables=["chat_history","context"],
        template=review_template_str,
    )
)

review_human_prompt = HumanMessagePromptTemplate(
    prompt=PromptTemplate(
        input_variables=["question"],
        template="{question}"
    )
)

message = [review_system_prompt, review_human_prompt]

review_prompt_template = ChatPromptTemplate(
    input_variables=["chat_history","context", "question"],
    messages=message
)

output_parser = StrOutputParser()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
)

review_chain = review_prompt_template | llm | output_parser