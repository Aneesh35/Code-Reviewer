import { useState, useEffect } from "react";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { CodeReview } from "./CodeReview";
import { EditorIcon } from "./EditorIcon";
import { ReviewIcon } from "./ReviewIcon";
import axios from "axios";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";

export const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [review, setReview] = useState("");
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);

  async function reviewCode() {
    console.log("hi");
    const response = await axios.post(
      `http://localhost:3000/aiService/get-review`,
      { code }
    );
    setReview(response.data);
  }
  useEffect(() => {
    prism.highlightAll();

    const handleResize = () => {
      setIsVerticalLayout(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div
        className={`flex ${
          isVerticalLayout ? "flex-col" : "flex-row"
        } gap-4 h-full`}
      >
        <div
          className={`${
            isVerticalLayout ? "w-full h-[50vh]" : "w-1/2 h-[90vh]"
          } 
          flex flex-col rounded-3xl bg-gray-900 overflow-hidden shadow-xl transition-all duration-300`}
        >
          <div className="p-4 border-b border-gray-700 bg-gray-800">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <EditorIcon />
              Code Editor
            </h2>
          </div>

          <div className="flex-1 overflow-auto">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={16}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: "14px",
                minHeight: "100%",
                backgroundColor: "transparent",
                color:"white",
              }}
              className="w-full h-full"
              textareaClassName="focus:outline-none"
            />
          </div>

          <div
            className="p-4 border-t border-gray-700 bg-gray-800"
            onClick={reviewCode}
          >
            <button
              onClick={() => setReview("Code review pending...")}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 
                rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 
                font-medium shadow-lg hover:shadow-blue-500/20"
            >
              <ReviewIcon />
              Review Code
            </button>
          </div>
        </div>

        <div
          className={`${
            isVerticalLayout ? "w-full h-[50vh]" : "w-1/2 h-[90vh]"
          } 
          flex flex-col rounded-3xl bg-gray-800 overflow-hidden shadow-xl transition-all duration-300`}
        >
          <div className="p-4 border-b border-gray-700 bg-gray-700">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <CodeReview />
              Code Review
            </h2>
          </div>

          <div className="flex-1 p-6 overflow-auto bg-gray-800/50">
            <div
              className="text-gray-200 font-mono whitespace-pre-wrap rounded-lg 
              bg-gray-900/50 p-4 min-h-full shadow-inner"
            >
              
                {<Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown> || (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                    <svg
                      className="w-12 h-12 mb-4 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>
                      No review yet. Click the Review Code button to start.
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};