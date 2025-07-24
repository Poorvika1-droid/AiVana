# AiVana: Idea Alchemist 🚀

[![Live Demo](https://img.shields.io/badge/View%20Live-Demo%20on%20Render-46a2f1?style=for-the-badge)](https://ai-vana.onrender.com)

AiVana is an AI-powered project idea generator that helps you discover your next big project. Built with Next.js and powered by Google's Gemini AI, it generates personalized project ideas based on your interests, skill level, and available time.

## ✨ Features

- 🧠 AI-powered project idea generation
- 🎨 Beautiful, responsive UI with Tailwind CSS
- 🔒 Secure authentication system
- 💬 Interactive chat interface
- 🖼️ AI-generated images for each project idea
- ⚡ Fast and performant with Next.js

## 🚀 Live Demo

Check out the live demo at: [https://ai-vana.onrender.com](https://ai-vana.onrender.com)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.3, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **AI**: Google Genkit AI, Gemini 2.0 Flash
- **Authentication**: NextAuth.js
- **Deployment**: Render

## 🏃‍♂️ Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Setting up your Gemini API Key

This project uses the Google Gemini API to power its AI features. To use them, you need to provide an API key.

1.  **Get an API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to create your free API key.

2.  **Set Environment Variable**: Once you have your key, open the `.env` file in the root of this project and replace `YOUR_API_KEY_HERE` with your actual key.

    ```.env
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

3.  **Restart the dev server**: If your development server is running, you'll need to restart it for the new environment variable to be loaded.

That's it! The app is now configured to use your Gemini API key.
