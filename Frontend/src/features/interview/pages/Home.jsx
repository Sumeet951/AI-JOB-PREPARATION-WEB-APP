import { useState, useRef } from "react";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const maxChars = 5000;

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-12 font-sans">
      {/* Header */}
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-5xl font-extrabold leading-tight mb-4">
          Create Your{" "}
          <span className="text-pink-500">Custom</span>
          <br />
          <span className="text-pink-500">Interview Plan</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Let our AI analyze the job requirements and your unique profile to build a
          winning strategy.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Job Description */}
          <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-pink-500 text-xl">📋</span>
                <h2 className="text-xl font-bold">Target Job Description</h2>
              </div>
              <span className="text-xs font-semibold text-pink-400 border border-pink-500 rounded px-2 py-0.5 uppercase tracking-wider">
                Required
              </span>
            </div>

            <textarea
              className="w-full h-80 bg-gray-800 text-gray-300 placeholder-gray-600 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm leading-relaxed"
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
              value={jobDescription}
              maxLength={maxChars}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <div className="text-right text-xs text-gray-500 mt-2">
              {jobDescription.length} / {maxChars} chars
            </div>
          </div>

          {/* Right Panel - Your Profile */}
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-pink-500 text-xl">👤</span>
              <h2 className="text-xl font-bold">Your Profile</h2>
            </div>

            {/* Upload Resume */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-gray-200">Upload Resume</span>
                <span className="text-xs font-semibold text-green-400 border border-green-500 rounded px-2 py-0.5 uppercase tracking-wider">
                  Best Results
                </span>
              </div>

              <div
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  dragging
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-gray-700 hover:border-pink-500 hover:bg-gray-800"
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="bg-pink-500/20 rounded-full p-3 mb-3">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                {fileName ? (
                  <p className="text-pink-400 text-sm font-medium">{fileName}</p>
                ) : (
                  <>
                    <p className="text-white font-semibold text-sm">Click to upload or drag & drop</p>
                    <p className="text-gray-500 text-xs mt-1">PDF or DOCX (Max 5MB)</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-700" />
              <span className="text-gray-500 text-xs uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-gray-700" />
            </div>

            {/* Quick Self-Description */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-200 mb-2">Quick Self-Description</p>
              <textarea
                className="w-full h-28 bg-gray-800 text-gray-300 placeholder-gray-600 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
              />
            </div>

            {/* Info Note */}
            <div className="flex items-start gap-3 bg-blue-900/30 border border-blue-800/50 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 001-1v-4a1 1 0 00-2 0v4a1 1 0 001 1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-gray-400">
                Either a <span className="text-white font-semibold">Resume</span> or a{" "}
                <span className="text-white font-semibold">Self Description</span> is required to generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">AI-Powered Strategy Generation • Approx 30s</span>
          </div>

          <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 active:bg-pink-700 transition-colors text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-pink-900/30 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
            </svg>
            Generate My Interview Strategy
          </button>
        </div>
      </div>
    </div>
  );
}