import SubscriptionButton from "./SubscriptionButton";
import LoginButton from "./LoginButton";

export default function DefaultNavbar() {
  return (
    <div className="flex gap-10 items-center">
      <div>
        <SubscriptionButton />
      </div>
      <div className="flex gap-4 items-center">
        <LoginButton />
      </div>
    </div>
  );
}
