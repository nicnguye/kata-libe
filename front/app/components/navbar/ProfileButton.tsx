import Link from "next/link";

export default function ProfileButton() {
  return (
    <Link href="/profile">
      <button
        type="button"
        className="text-white bg-sky-800 border border-transparent rounded-3xl px-4 py-2.5 hover:bg-sky-900 cursor-pointer"
      >
        Mon profil
      </button>
    </Link>
  );
}
