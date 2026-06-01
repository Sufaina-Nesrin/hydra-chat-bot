def is_greeting(text):
    greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
    ]

    text = text.lower().strip()

    return text in greetings

def is_thanks(text):
    phrases = [
        "thanks",
        "thank you",
        "thanks a lot",
        "thank you so much",
    ]

    text = text.lower().strip()

    return text in phrases
