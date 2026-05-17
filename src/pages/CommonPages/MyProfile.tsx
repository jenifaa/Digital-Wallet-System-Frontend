/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  BadgeCheck,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User2,
  Wallet,
  Pencil,
} from "lucide-react";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";

import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export default function MyProfile() {
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);

  const user = userInfo?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] p-6 text-white">
        <div className="mx-auto max-w-7xl space-y-6 pt-20">
          <Skeleton className="h-72 rounded-[36px] bg-slate-800" />

          <Skeleton className="h-[520px] rounded-[36px] bg-slate-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto flex max-w-7xl gap-10 pt-20">
        {/* LEFT PROFILE CARD */}
        <Card className="sticky top-24 h-fit w-[360px] overflow-hidden rounded-[38px] border border-indigo-500/20 bg-gradient-to-br from-slate-950 via-slate-950 to-indigo-950 shadow-[0_0_80px_rgba(79,70,229,0.12)]">
          <CardContent className="relative p-8">
            {/* Glow */}
            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-cyan-500/5 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* PROFILE IMAGE */}
              <div className="relative">
                <div className="size-40 overflow-hidden rounded-full border-[6px] border-indigo-500/20 shadow-[0_20px_60px_rgba(79,70,229,0.35)]">
                  <img
                    src={
                      user?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                    }
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute bottom-3 right-2 rounded-full border-4 border-slate-950 bg-emerald-500 p-2 shadow-lg shadow-emerald-500/20">
                  <BadgeCheck className="size-5 text-white" />
                </div>
              </div>

              {/* USER INFO */}
              <div className="mt-7">
                <h1 className="text-3xl font-black tracking-tight text-white">
                  {user?.name}
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                  @{user?.email?.split("@")[0]}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Badge className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-indigo-200 hover:bg-indigo-500/20">
                    {user?.role}
                  </Badge>

                  <Badge className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-emerald-200 hover:bg-emerald-500/20">
                    {user?.isVerified ? "Verified" : "Not Verified"}
                  </Badge>

                  <Badge className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-cyan-200 hover:bg-cyan-500/20">
                    {user?.isActive}
                  </Badge>
                </div>
              </div>

              {/* WALLET STATUS */}
              <div className="mt-8 w-full rounded-[28px] border border-slate-700/70 bg-slate-900/70 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-indigo-500/10 p-4">
                    <Wallet className="size-7 text-indigo-400" />
                  </div>

                  <div className="text-left">
                    <p className="text-sm text-slate-400">
                      Wallet Status
                    </p>

                    <h3 className="text-xl font-bold text-emerald-400">
                      Active
                    </h3>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <Button className="mt-7 h-12 w-full rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:bg-indigo-500">
                <Link
                  to={`/user/${user?._id}`}
                  className="flex items-center"
                >
                  <Pencil className="mr-2 size-4" />
                  Update Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT SIDE */}
        <div className="flex-1">
          {/* COMBINED INFO CARD */}
          <Card className="overflow-hidden rounded-[38px] border border-slate-800 bg-slate-950/70 shadow-[0_0_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            {/* HEADER */}
            <div className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 px-8 py-7">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white">
                    My Profile
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Manage your personal information and account security
                  </p>
                </div>

                <div className="hidden rounded-3xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-3 md:block">
                  <p className="text-sm text-indigo-300">
                    Secure Account
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="grid gap-8 xl:grid-cols-2">
                {/* PERSONAL INFO */}
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-2xl bg-indigo-500/10 p-4">
                      <User2 className="size-7 text-indigo-400" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Personal Information
                      </h2>

                      <p className="text-sm text-slate-400">
                        Your account details and contacts
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="group rounded-[28px] border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-indigo-500/20 hover:bg-slate-900">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-indigo-500/10 p-3">
                          <Mail className="size-5 text-indigo-400" />
                        </div>

                        <div>
                          <p className="text-sm text-slate-400">
                            Email Address
                          </p>

                          <p className="mt-1 text-base font-semibold text-white">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group rounded-[28px] border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-slate-900">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-emerald-500/10 p-3">
                          <Phone className="size-5 text-emerald-400" />
                        </div>

                        <div>
                          <p className="text-sm text-slate-400">
                            Phone Number
                          </p>

                          <p className="mt-1 text-base font-semibold text-white">
                            {user?.phone || "Not Added"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group rounded-[28px] border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-rose-500/20 hover:bg-slate-900">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-rose-500/10 p-3">
                          <MapPin className="size-5 text-rose-400" />
                        </div>

                        <div>
                          <p className="text-sm text-slate-400">
                            Address
                          </p>

                          <p className="mt-1 text-base font-semibold text-white">
                            {user?.address || "No address added"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECURITY */}
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-2xl bg-emerald-500/10 p-4">
                      <ShieldCheck className="size-7 text-emerald-400" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Security & Status
                      </h2>

                      <p className="text-sm text-slate-400">
                        Account protection and verification
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-400">
                            Email Verification
                          </p>

                          <h3 className="mt-1 text-lg font-semibold text-white">
                            Verification Status
                          </h3>
                        </div>

                        <Badge className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-emerald-300">
                          {user?.isVerified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-400">
                            Account Status
                          </p>

                          <h3 className="mt-1 text-lg font-semibold text-white">
                            Current Activity
                          </h3>
                        </div>

                        <Badge className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-cyan-300">
                          {user?.isActive}
                        </Badge>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-400">
                            Account Role
                          </p>

                          <h3 className="mt-1 text-lg font-semibold text-white">
                            Platform Permission
                          </h3>
                        </div>

                        <Badge className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-indigo-300">
                          {user?.role}
                        </Badge>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-amber-500/10 p-3">
                          <CalendarDays className="size-5 text-amber-400" />
                        </div>

                        <div>
                          <p className="text-sm text-slate-400">
                            Joined At
                          </p>

                          <p className="mt-1 text-base font-semibold text-white">
                            {new Date(
                              user?.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}