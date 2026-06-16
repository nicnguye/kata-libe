import Link from "next/link";

export default function SubscriptionChangeButton() {
  return (
    <Link href="/offers/change">
      <button
        type="button"
        className="text-sky-800 px-4 py-2.5 hover:text-sky-600 cursor-pointer"
      >
        Changer mon offre
      </button>
    </Link>
  );
}
