from rag.retriever import retriever

docs = retriever.invoke(
    "What is the leave policy?"
)

for doc in docs:
    print(doc.page_content)
    print("=" * 50)