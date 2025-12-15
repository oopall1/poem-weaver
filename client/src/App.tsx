import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { toast } from "react-toastify";

import "./App.css";

function App() {
  const [theme, setTheme] = useState<string | null>(null);
  const [poem, setPoem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchPoem = async () => {
    try {
      setIsLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = theme
        ? `Generate a 1-2 sentences poem about ${theme}`
        : "Genarate a random 1-2 sentences poem";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setPoem(text);
      setIsLoading(false);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    // Full Page Container: Dark background, centered content
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 flex flex-col items-center w-screen">
      {/* Main Card/Container: Elegant look with rounded corners and shadows */}
      <div className="w-full max-w-2xl bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-700/50 my-12">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-violet-400 mb-6 text-center tracking-tight">
          Poem Weaver 🖋️
        </h1>

        {/* Input and Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Enter a theme (e.g., 'cosmic solitude')"
            value={theme ?? ""}
            onChange={(e) => setTheme(e.target.value)}
            className="grow p-3 bg-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent border border-gray-600 transition duration-200"
            disabled={isLoading}
          />

          {/* Button */}
          <button
            onClick={fetchPoem}
            className={`
                            px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 transform shadow-md
                            ${
                              isLoading
                                ? "bg-violet-600 opacity-70 cursor-not-allowed"
                                : "bg-violet-600 hover:bg-violet-700 active:scale-95 hover:shadow-lg hover:shadow-violet-500/50"
                            }
                        `}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Poem"
            )}
          </button>
        </div>

        {/* Poem Output Section */}
        {poem && (
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h2 className="text-2xl font-bold text-violet-300 mb-4">
              Generated Poem:
            </h2>

            {/* Poem Content Box: Subtle contrast with beautiful whitespace */}
            <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg border border-gray-600/50 whitespace-pre-wrap shadow-inner">
              <p className="text-gray-300 italic leading-relaxed font-serif">
                {poem}
              </p>
            </div>
          </div>
        )}

        {/* Placeholder for Loading State when Poem is generated but still loading */}
        {isLoading && !poem && (
          <div className="mt-8 text-center text-gray-400">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-11/12"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        )}
      </div>
      <p className="text-gray-500 mt-4 text-sm">Powered by Google Gemini API</p>
    </div>
  );
}

export default App;
