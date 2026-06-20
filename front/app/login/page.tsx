"use client";

import Link from "next/link";
import { useActionState } from "react";
import { userLogin } from "./actions";

export default function Page() {
  const [state, action, pending] = useActionState(userLogin, { errors: {} });

  return (
    <>
      <div className="flex flex-col justify-center px-6 py-12">
        <h2 className="mt-10 text-center text-2xl font-bold text-sky-800">
          Connectez-vous a votre compte
        </h2>

        <div className="mt-10 sm:mx-auto sm:max-w-sm sm:w-full">
          <form action={action} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="flex gap-0.5 text-sm font-medium text-sky-800"
              >
                <p>Adresse email</p>
                <p className="text-red-600">*</p>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="email@example.com"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-sky-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-800 sm:text-sm/6"
                />
                {state.errors?.email && (
                  <p className="text-red-500 text-sm">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex gap-0.5 text-sm font-medium text-sky-800"
              >
                <p>Mot de passe</p>
                <p className="text-red-600">*</p>
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-sky-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-800 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={pending}
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 cursor-pointer"
              >
                {pending ? "Connexion en cours..." : "Me connecter"}
              </button>
            </div>
          </form>
          {state?.message && (
            <p className={state.success ? "text-green-600" : "text-red-600"}>
              {state.message}
            </p>
          )}

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Pas encore membre?{" "}
            <Link
              href="/register"
              className="font-semibold text-sky-800 hover:text-sky-800"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
