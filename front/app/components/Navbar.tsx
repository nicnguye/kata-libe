import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-end gap-4">
      <Link href="/login">Se Connecter</Link>
    </nav>
  );
}
