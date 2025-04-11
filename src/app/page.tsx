export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-200 dark:bg-green-600">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Post Viewer</h1>
      <a href="/items" className="text-blue-500 underline hover:text-blue-700">
        Go to Posts
      </a>
    </main>
  );
}
