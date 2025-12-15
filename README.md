# 🖋️ Poem Weaver: AI-Powered Generator

A minimalist and beautifully designed web application for generating custom poems instantly using the Google Gemini API. This project showcases practical integration of advanced generative AI models into a modern frontend framework, emphasizing user experience and efficient asynchronous data fetching.

## ✨ Features

* **Custom Themed Poems:** Users can input any theme (e.g., "cosmic solitude," "cyberpunk rain") to generate a unique, relevant poem.
* **Gemini API Integration:** Utilizes the `@google/genai` SDK to connect directly to the powerful **`gemini-2.5-flash`** model for fast, high-quality text generation.
* **Elegant UI/UX:** Features a polished, dark-themed interface built with Tailwind CSS, including custom button states, smooth transitions, and a clean output container.
* **Asynchronous Loading:** Provides clear visual feedback (loading spinner, animated placeholders) while waiting for the poem generation to complete.
* **Robust Error Handling:** Includes `try...catch` block for gracefully managing API connection or generation failures.

## 🚀 Technologies Used

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React, TypeScript | Component-based UI and type safety. |
| **Styling** | Tailwind CSS | Utility-first framework for rapid, beautiful dark-mode design. |
| **AI Backend** | Google Gemini API (`@google/genai`) | High-performance text generation via the `gemini-2.5-flash` model. |

## ⚙️ Setup and Installation

Follow these steps to get your project running locally.

### Prerequisites

* Node.js (LTS recommended)
* pnpm
* A **Gemini API Key** from Google AI Studio.

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/oopall1/poem-weaver
    cd poem-weaver
    ```

2.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

3.  **Configure API Key:**
    You must securely provide your Gemini API Key. The best practice is using environment variables.

    * Create a file named `.env.local` in the client folder.
    * Add your key:
        ```
        VITE_API_KEY="YOUR_API_KEY_HERE"
        ```

4.  **Run the Development Server:**
    ```bash
    cd client
    pnpm run dev
    ```
    The application will open in your browser (`http://localhost:5173`).

## 💻 Component Overview

The application is primarily composed of one main component:

### `App.tsx`

This component handles the entire user interface and AI interaction:

1.  **State Management:** Tracks the input `theme`, the resulting `poem`, and the `isLoading` state.
2.  **User Input:** Renders the themed input field.
3.  **`fetchPoem` Function:**
    * Initiates the API call to the Gemini model.
    * Constructs the prompt based on the user's input theme.
    * Updates the `poem` state with the generated text.
4.  **Conditional Rendering:** Uses the `isLoading` state to disable the button and display a loading animation or placeholder content while waiting for the AI response, enhancing perceived performance.
