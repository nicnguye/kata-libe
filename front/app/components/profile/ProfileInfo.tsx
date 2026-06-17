import { UserInfo } from "@/types/UserInfo";

export default function ProfileInfo({ user }: { user: UserInfo }) {
  return (
    <div className="p-8 flex flex-col justify-center items-center gap-8">
      <h1 className="mb-6 text-3xl font-bold text-sky-800">
        Informations personnelles
      </h1>
      <div className="flex flex-col gap-4 bg-white rounded-3xl shadow-sm w-sm text-sky-800 py-2">
        <div className="flex flex-col border-b-2 border-b-gray-200 px-6 py-2">
          <div className="font-bold text-base">Nom</div>
          <div className="font-normal text-sm">{user.lastName}</div>
        </div>
        <div className="flex flex-col border-b-2 border-b-gray-200 px-6 pb-2">
          <div className="font-bold text-base">Prénom</div>
          <div className="font-normal text-sm">{user.firstName}</div>
        </div>
        <div className="flex flex-col border-b-2 border-b-gray-200 px-6 pb-2">
          <div className="font-bold text-base">Genre</div>
          <div className="font-normal text-sm">{user.gender}</div>
        </div>
        <div className="flex flex-col border-b-2 border-b-gray-200 px-6 pb-2">
          <div className="font-bold text-base">Âge</div>
          <div className="font-normal text-sm">{user.age}</div>
        </div>
        <div className="flex flex-col px-6 pb-2">
          <div className="font-bold text-base">Email</div>
          <div className="font-normal text-sm">{user.email}</div>
        </div>
      </div>
    </div>
  );
}
