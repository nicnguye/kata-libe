import SubscriptionButton from "./SubscriptionButton";
import SubscriptionChangeButton from "./SubscriptionChangeButton";
import UnsubscribeButton from "./UnsubscribeButton";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";

type Subscription = {
  offerId: string;
  status: string;
}

type User = {
  firstName: string;
  lastName: string;
  email: string;
  subscription: Array<Subscription>;
};

export default function UserNavbar({ user }: { user: User }) {
  const { subscription } = user;
  const hasSubscription =
    !!subscription.length && subscription.some((s) => s.status === "ACTIVE");

  return (
    <div className="flex gap-10 items-center">
      <div className="flex">
        <SubscriptionButton hasSubscription={hasSubscription} />
        {!!hasSubscription && (
          <>
            <SubscriptionChangeButton />
            <UnsubscribeButton />
          </>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <LogoutButton />
        <ProfileButton />
      </div>
    </div>
  );
}
