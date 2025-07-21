# Firebase Studio

This is a NextJS starter in Firebase Studio.

## Getting Started

To get started, take a look at src/app/page.tsx.

## Setting up your Gemini API Key

This project uses the Google Gemini API to power its AI features. To use them, you need to provide an API key.

1.  **Get an API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to create your free API key.

2.  **Set Environment Variable**: Once you have your key, open the `.env` file in the root of this project and replace `YOUR_API_KEY_HERE` with your actual key.

    ```.env
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

3.  **Restart the dev server**: If your development server is running, you'll need to restart it for the new environment variable to be loaded.

That's it! The app is now configured to use your Gemini API key.
