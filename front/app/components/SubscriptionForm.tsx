"use client";

import Form from "next/form";
import { useActionState, useState } from "react";
import { subscribe } from "@/app/offers/[id]/subscribe/actions";
import { User } from "@/types/User";

export default function Page({
  offerId,
  user,
}: {
  offerId: string;
  user: User;
}) {
  const [state, action, pending] = useActionState(
    subscribe.bind(null, { offerId, user: user }),
    { errors: {} },
  );
  const [emailValue, setEmailValue] = useState(user.email);

  return (
    <>
      <div className="flex flex-col justify-center px-6 py-8 w-auto md:w-2xl">
        {state?.message && (
          <div className={`flex text-center ${state.success ? 'bg-green-500' : 'bg-red-500'} text-white sm:mx-auto sm:max-w-sm sm:w-full py-4 px-4 rounded-md gap-2`}>
            <p>{state.message}</p>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:max-w-sm sm:w-full">
          <Form action={action} className="space-y-6">
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
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
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
                htmlFor="address"
                className="flex gap-0.5 text-sm font-medium text-sky-800"
              >
                <p>Adresse</p>
                <p className="text-red-600">*</p>
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="2 rue de paris"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-sky-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-800 sm:text-sm/6"
                />
                {state.errors?.address && (
                  <p className="text-red-500 text-sm">
                    {state.errors.address[0]}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="flex gap-0.5 text-sm font-medium text-sky-800"
              >
                <p>Numéro de telephone</p>
                <p className="text-red-600">*</p>
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  placeholder="0612345678"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-sky-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-800 sm:text-sm/6"
                />
                {state.errors?.phone && (
                  <p className="text-red-500 text-sm">
                    {state.errors.phone[0]}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="creditCard"
                className="flex gap-0.5 text-sm font-medium text-sky-800"
              >
                <p>Carte de crédit</p>
                <p className="text-red-600">*</p>
              </label>
              <div className="mt-2">
                <input
                  id="creditCard"
                  name="creditCard"
                  type="text"
                  required
                  placeholder="4242 4242 4242 4242"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-sky-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-800 sm:text-sm/6"
                />
                {state.errors?.creditCard && (
                  <p className="text-red-500 text-sm">
                    {state.errors.creditCard[0]}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                disabled={pending}
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 cursor-pointer"
              >
                {pending ? "Abonnement en cours..." : "S'abonner"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
