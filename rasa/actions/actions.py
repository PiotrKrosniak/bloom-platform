from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import UserUtteranceReverted
import requests
import os
from dotenv import load_dotenv

load_dotenv()

class ActionDefaultFallback(Action):
    def name(self) -> Text:
        return "action_default_fallback"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # Get user message from Rasa tracker
        user_message = tracker.latest_message.get('text')

        # Call the OpenAI API to get a response
        chatgpt_response = self.get_chatgpt_response(user_message)

        if chatgpt_response:
            dispatcher.utter_message(chatgpt_response)
        else:
            dispatcher.utter_message("Sorry, I couldn't generate a response at the moment. Please try again later.")

        # Revert user message which led to fallback
        return [UserUtteranceReverted()]

    def get_chatgpt_response(self, message: Text) -> Text:
        # Fetch the API key from environment variables
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OpenAI API key not found in environment variables")

        url = 'https://api.openai.com/v1/chat/completions'
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        data = {
            'model': "gpt-4",  # or "gpt-4-turbo" depending on the model you are using
            'messages': [
                {'role': 'system', 'content': 'You are an AI assistant for the user. You help to solve user query'},
                {'role': 'user', 'content': message}
            ],
            'max_tokens': 500  # Increase max tokens to get a longer response
        }

        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            chatgpt_response = response.json()
            return chatgpt_response['choices'][0]['message']['content'].strip()
        else:
            print(f"Error: {response.status_code}, {response.text}")
            return None
