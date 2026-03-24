// Mock Data
const student = { name: "Alex" };

export default function WelcomeHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Welcome back,{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {student.name}
        </span>
        !
      </h1>
      <p className="mt-1 text-md text-gray-500 dark:text-gray-400">
        Let&apos;s continue your learning journey and conquer new concepts today.
      </p>
    </div>
  );
}
