import { logout } from "@/app/login/actions";

export default function LogoutButton() {
  return (
    <form>
      <button
        type="submit"
        formAction={logout}
        className="text-red-600 hover:text-red-500 cursor-pointer"
      >
        Déconnexion
      </button>
    </form>
  );
}
