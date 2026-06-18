import Link from "next/link";

export default function UnsubscribeButton() {
  return (
    <Link href="/subscription/unsubscribe">
      <button
        type="button"
        className="text-sky-800 px-4 py-2.5 hover:text-sky-600 cursor-pointer"
      >
        Désabonnement
      </button>
    </Link>
  );
}
