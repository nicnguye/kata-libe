import { getCurrentUser } from "@/lib/auth";
import UserNavbar from "./UserNavbar";
import DefaultNavbar from "./DefaultNavbar";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="flex justify-end gap-4 p-4 bg-white border-b border-gray-300">
      {user ? (
        <UserNavbar user={user} />
      ) : (
        <DefaultNavbar />
      )}
    </nav>
  );
}
