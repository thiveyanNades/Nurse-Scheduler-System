import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-4">
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        className="border border-gray-300 rounded-md px-2 py-1"
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="border border-gray-300 rounded-md px-2 py-1"
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="border border-gray-300 rounded-md px-2 py-1"
      />
      <button
        formAction={login}
        className="bg-blue-500 text-white rounded-md px-4 py-2"
      >
        Log in
      </button>
      <button
        formAction={signup}
        className="bg-green-500 text-white rounded-md px-4 py-2"
      >
        Sign up
      </button>
    </form>
  );
}
