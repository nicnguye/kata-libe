import { redirect } from "next/navigation";

import ProfileInfo from "@/app/components/profile/ProfileInfo";
import CurrentSubscription from "@/app/components/profile/CurrentSubscription";
import { getCurrentUser } from "@/lib/auth";
import { UserSubscription } from "@/types/UserSubscription";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/login");
  }

  const subscription = user.subscription.find(
    (s: UserSubscription) => s.status === "ACTIVE",
  );

  return (
    <div>
      <ProfileInfo user={user} />
      <CurrentSubscription offer={subscription?.offer} />
    </div>
  );
}
