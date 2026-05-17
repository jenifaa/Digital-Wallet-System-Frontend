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

export default function MyProfile() {
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);

  const user = userInfo?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] p-6 text-white">
        <div className="mx-auto max-w-5xl space-y-6">
          <Skeleton className="h-64 rounded-3xl bg-slate-800" />

          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-40 rounded-3xl bg-slate-800" />
            <Skeleton className="h-40 rounded-3xl bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Hero Profile Card */}
        <Card className="overflow-hidden rounded-[32px] border border-indigo-500/20 bg-linear-to-br from-slate-950 via-slate-950 to-indigo-950 shadow-2xl shadow-indigo-950/20">
          <CardContent className="relative p-8">
            {/* Glow */}
            <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Left */}
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                {/* Avatar */}
                <div className="relative">
                  <div className="size-32 overflow-hidden rounded-[30px] border-4 border-indigo-500/20 shadow-xl shadow-indigo-950/30">
                    <img
                      src={user?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-2 -right-2 rounded-full border-4 border-slate-950 bg-emerald-500 p-2">
                    <BadgeCheck className="size-5 text-white" />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold tracking-tight text-white">
                    {user?.name}
                  </h1>

                  <p className="mt-2 text-base text-slate-300">
                    @{user?.email?.split("@")[0]}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                    <Badge className="rounded-full bg-indigo-500/15 px-4 py-1 text-indigo-200 hover:bg-indigo-500/20">
                      {user?.role}
                    </Badge>

                    <Badge className="rounded-full bg-emerald-500/15 px-4 py-1 text-emerald-200 hover:bg-emerald-500/20">
                      {user?.isVerified ? "Verified" : "Not Verified"}
                    </Badge>

                    <Badge className="rounded-full bg-cyan-500/15 px-4 py-1 text-cyan-200 hover:bg-cyan-500/20">
                      {user?.isActive}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                {/* Wallet Card */}
                <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-indigo-500/10 p-4">
                      <Wallet className="size-7 text-indigo-400" />
                    </div>

                    <div>
                      <p className="text-sm text-slate-300">
                        Wallet Status
                      </p>

                      <h3 className="text-xl font-semibold text-emerald-400">
                        Active
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Update Button */}
                <Link to={`/user/${user._id}`} className="h-14 rounded-2xl bg-indigo-600 px-6 text-white hover:bg-indigo-700">
                  <Pencil className="mr-2 size-4" />
                  Update Profile
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Info */}
          <Card className="rounded-3xl border border-slate-800 bg-slate-950/70 shadow-xl shadow-black/20">
            <CardContent className="p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-indigo-500/10 p-3">
                  <User2 className="size-6 text-indigo-400" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Personal Information
                  </h2>

                  <p className="text-sm text-slate-300">
                    Your account details
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <Mail className="size-5 text-indigo-400" />

                  <div>
                    <p className="text-sm text-slate-300">Email</p>

                    <p className="font-medium text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <Phone className="size-5 text-emerald-400" />

                  <div>
                    <p className="text-sm text-slate-300">Phone Number</p>

                    <p className="font-medium text-white">
                      {user?.phone || "Not Added"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <MapPin className="size-5 text-rose-400" />

                  <div>
                    <p className="text-sm text-slate-300">Address</p>

                    <p className="font-medium text-white">
                      {user?.address || "No address added"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card className="rounded-3xl border border-slate-800 bg-slate-950/70 shadow-xl shadow-black/20">
            <CardContent className="p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-500/10 p-3">
                  <ShieldCheck className="size-6 text-emerald-400" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Security & Status
                  </h2>

                  <p className="text-sm text-slate-300">
                    Account protection details
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <span className="text-white">Email Verification</span>

                  <Badge className="bg-emerald-500/10 text-emerald-300">
                    {user?.isVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <span className="text-white">Account Status</span>

                  <Badge className="bg-indigo-500/10 text-indigo-300">
                    {user?.isActive}
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <span className="text-white">Account Role</span>

                  <Badge className="bg-cyan-500/10 text-cyan-300">
                    {user?.role}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <CalendarDays className="size-5 text-amber-400" />

                  <div>
                    <p className="text-sm text-slate-300">Joined At</p>

                    <p className="font-medium text-white">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
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