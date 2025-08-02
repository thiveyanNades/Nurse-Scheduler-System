import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-4 p-4">
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        className="border border-blue-300 rounded-md px-3 py-2 font-sans"
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="border border-blue-300 rounded-md px-3 py-2 font-sans"
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="border border-blue-300 rounded-md px-3 py-2 font-sans"
      />
      <button
        formAction={login}
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 font-sans"
      >
        Log in
      </button>
      <button
        formAction={signup}
        className="bg-blue-400 text-white rounded-md px-4 py-2 hover:bg-blue-500 font-sans"
      >
        Sign up
      </button>
    </form>
  );
}
