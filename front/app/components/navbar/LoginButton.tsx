import Link from "next/link";

export default function LoginButton() {
    return (
        <Link href="/login">
          <button
            type="button"
            className="text-white bg-sky-800 border border-transparent rounded-3xl px-4 py-2.5 hover:bg-sky-900"
          >
            Se connecter
          </button>
        </Link>
    );
}