"use client";

import Form from "next/form";
import { useActionState } from "react";
import { register } from "./actions";

export default function Page() {
  const [state, action, pending] = useActionState(register, { errors: {} });

  return (
    <>
      <div className="flex flex-col justify-center px-6 py-8">
        {state.success && (
          <div className="flex text-center bg-green-500 text-white sm:mx-auto sm:max-w-sm sm:w-full py-4 px-4 rounded-md gap-2">
            <p>Compte créé avec succès</p>
          </div>
        )}
        <h2 className="mt-6 text-center text-2xl font-bold text-sky-800">
          Création de votre compte
        </h2>

        <div className="mt-10 sm:mx-auto sm:max-w-sm sm:w-full">
          <Form action={action} className="space-y-6">
            <div>
              <label
                htmlFor="lastName"
                className="flex gap-0.5 text-sm font-medium text-sky-800"
              >
                <p>Nom</p>
                <p className="text-red-600">*</p>
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Reno"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-sky-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-800 sm:text-sm/6"
                />
                {state.errors?.lastName && (
                  <p className="text-red-500 text-sm">
                    {state.errors.lastName[0]}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="flex gap-0.5 text-sm font-medium text-sky-800"
              >
                <p>Prénom</p>
                <p className="text-red-600">*</p>
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Jean"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-sky-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-800 sm:text-sm/6"
                />
                {state.errors?.firstName && (
                  <p className="text-red-500 text-sm">
                    {state.errors.firstName[0]}
                  </p>
                )}
              </div>
            </div>
            <div>
              <fieldset className="text-sky-800 sm:mx-auto sm:max-w-sm sm:w-full">
                <legend className="text-sky-800 flex gap-0.5 text-sm font-medium">
                  <p>Genre</p>
                  <p className="text-red-600">*</p>
                </legend>
                <div className="flex gap-4 flex-wrap mt-1">
                  <div className="flex gap-2">
                    <input type="radio" name="gender" value="male" />
                    <label>Homme</label>
                  </div>
                  <div className="flex gap-2">
                    <input type="radio" name="gender" value="female" />
                    <label>Femme</label>
                  </div>
                  <div className="flex gap-2">
                    <input type="radio" name="gender" value="other" />
                    <label>Autre</label>
                  </div>
                </div>
                {state.errors?.gender && (
                  <p className="text-red-500 text-sm">
                    {state.errors.gender[0]}
                  </p>
                )}
              </fieldset>
            </div>
            <div>
              <label
                htmlFor="age"
                className="flex gap-0.5 text-sm font-medium text-sky-800"
              >
                <p>Age</p>
                <p className="text-red-600">*</p>
              </label>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="99"
                  placeholder="20"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-sky-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-800 sm:text-sm/6"
                />
                {state.errors?.age && (
                  <p className="text-red-500 text-sm">{state.errors.age[0]}</p>
                )}
              </div>
            </div>
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
                {state.errors?.password && (
                  <p className="text-red-500 text-sm">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={pending}
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
              >
                {pending ? "Inscription en cours..." : "M'inscrire"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
