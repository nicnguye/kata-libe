import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-end gap-4 p-4 bg-white border-b border-gray-300">
      <Link href="/login">
        <button
          type="button"
          className="text-white bg-sky-800 border border-transparent rounded-3xl px-4 py-2.5 hover:bg-sky-900"
        >
          Se connecter
        </button>
      </Link>
    </nav>
  );
}
