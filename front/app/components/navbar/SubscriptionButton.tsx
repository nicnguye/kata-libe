import Link from "next/link";

export default function SubscriptionButton({
  hasSubscription,
}: {
  hasSubscription: boolean;
}) {
  return (
    <Link href="/">
      <button
        type="button"
        className="text-sky-800 px-4 py-2.5 hover:text-sky-600 cursor-pointer"
      >
        {hasSubscription ? "Liste des offres mobiles" : "Prendre un abonnement"}
      </button>
    </Link>
  );
}
