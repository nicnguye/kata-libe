import { redirect } from "next/navigation";

import ProfileInfo from "@/app/components/profile/ProfileInfo";
import CurrentSubscription from "@/app/components/profile/CurrentSubscription";
import { getCurrentUser } from "@/lib/auth";

type Subscription = {
  offerId: string;
  status: string;
  offer: {
    title: string;
    price: number;
    description: string;
    advantage: string;
  };
}

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/login");
  }

  const subscription = user.subscription.find((s: Subscription) => s.status === "ACTIVE");

  return (
    <div>
      <ProfileInfo user={user} />
      <CurrentSubscription offer={subscription.offer} />
    </div>
  );
}
