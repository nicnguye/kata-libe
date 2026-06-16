import { getCurrentUser } from "@/lib/auth";
import LoginButton from "./LoginButton";
import UserNavbar from "./UserNavbar";

export default async function Navbar() {
  const user = await getCurrentUser();
    console.log('userrr ', user);
  return (
    <nav className="flex justify-end gap-4 p-4 bg-white border-b border-gray-300">
      {user ? (
        <UserNavbar user={user} />
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}
