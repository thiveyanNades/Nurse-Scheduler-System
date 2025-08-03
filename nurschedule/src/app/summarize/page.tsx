'use client';

import { useState } from 'react';

export default function NurseSummaryForm() {
  const [userId, setUserId] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSummary(null);
    setError(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.summary) {
        setSummary(data.summary);
      } else {
        setError(data.error || 'Failed to generate summary.');
      }
    } catch (err) {
      setError('Network error or server unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Nurse Shift Summary</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="userId" className="block font-medium">
          Enter your Nurse User ID:
        </label>
        <input
          id="userId"
          type="text"
          placeholder="e.g. nurse_101"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Summarizing...' : 'Get Summary'}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 font-medium" role="alert">
          {error}
        </p>
      )}

      {summary && (
        <section className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Summary for {userId}:</h2>
          <p>{summary}</p>
        </section>
      )}
    </main>
  );
}
