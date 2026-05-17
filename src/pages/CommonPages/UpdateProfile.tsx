import { useState, useEffect } from "react";

import {
  MapPin,
  Phone,
  Save,
  User2,
  Mail,
  ShieldCheck,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";

import {
  useUserInfoQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/auth.api";

import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateProfile() {
  const { data, isLoading: userLoading } =
    useUserInfoQuery(undefined);

  const [updateUser, { isLoading }] =
    useUpdateUserMutation();

  const user = data?.data;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await updateUser({
        id: user?._id,
        ...form,
      }).unwrap();

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);

      alert("Failed to update profile");
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#020617] p-6">
        <div className="mx-auto max-w-6xl space-y-6 pt-20">
          <Skeleton className="h-162.5 rounded-[38px] bg-slate-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-4 text-white md:p-6">
      <div className="mx-auto flex max-w-7xl gap-10 pt-20">
        {/* LEFT PROFILE SIDEBAR */}
        <Card className="sticky top-24 h-fit w-90 overflow-hidden rounded-[38px] border border-indigo-500/20 bg-linear-to-br from-slate-950 via-slate-950 to-indigo-950 shadow-[0_0_80px_rgba(79,70,229,0.12)]">
          <CardContent className="relative p-8">
            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-cyan-500/5 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* IMAGE */}
              <div className="relative">
                <div className="size-40 overflow-hidden rounded-full border-[6px] border-indigo-500/20 shadow-[0_20px_60px_rgba(79,70,229,0.35)]">
                  <img
                    src={
                      user?.picture ||
                      "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                    }
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute bottom-3 right-2 rounded-full border-4 border-slate-950 bg-emerald-500 p-2 shadow-lg shadow-emerald-500/20">
                  <ShieldCheck className="size-5 text-white" />
                </div>
              </div>

              {/* INFO */}
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
                    {user?.isVerified
                      ? "Verified"
                      : "Not Verified"}
                  </Badge>
                </div>
              </div>

              {/* QUICK INFO */}
              <div className="mt-8 w-full space-y-4">
                <div className="rounded-[24px] border border-slate-700/70 bg-slate-900/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-500/10 p-3">
                      <Mail className="size-5 text-indigo-400" />
                    </div>

                    <div className="text-left">
                      <p className="text-xs text-slate-400">
                        Email
                      </p>

                      <h3 className="text-sm font-medium text-white">
                        {user?.email}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-700/70 bg-slate-900/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-500/10 p-3">
                      <Phone className="size-5 text-cyan-400" />
                    </div>

                    <div className="text-left">
                      <p className="text-xs text-slate-400">
                        Phone
                      </p>

                      <h3 className="text-sm font-medium text-white">
                        {user?.phone || "Not Added"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT UPDATE FORM */}
        <div className="flex-1">
          <Card className="overflow-hidden rounded-[38px] border border-slate-800 bg-slate-950/70 shadow-[0_0_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            {/* HEADER */}
            <div className="border-b border-slate-800 bg-linear-to-r from-slate-900 via-slate-900 to-indigo-950/40 px-8 py-7">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5">
                    <Pencil className="size-4 text-indigo-400" />

                    <span className="text-sm font-medium text-indigo-300">
                      Edit Profile
                    </span>
                  </div>

                  <h2 className="mt-5 text-4xl font-black tracking-tight text-white">
                    Update Your Profile
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Update your personal information and
                    account details
                  </p>
                </div>

                <div className="hidden rounded-3xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-3 md:block">
                  <p className="text-sm text-indigo-300">
                    Secure Update
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <CardContent className="p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* NAME */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-300">
                    Full Name
                  </label>

                  <div className="relative">
                    <User2 className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-indigo-400" />

                    <Input
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="h-14 rounded-2xl border-slate-800 bg-slate-900 pl-14 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-300">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-cyan-400" />

                    <Input
                      name="phone"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      className="h-14 rounded-2xl border-slate-800 bg-slate-900 pl-14 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-300">
                    Address
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-5 top-6 size-5 text-rose-400" />

                    <Input
                      name="address"
                      placeholder="Enter your address"
                      value={form.address}
                      onChange={handleChange}
                      className="h-14 rounded-2xl border-slate-800 bg-slate-900 pl-14 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-rose-500"
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 w-full rounded-2xl bg-indigo-600 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:bg-indigo-500"
                  >
                    {isLoading ? (
                      "Updating Profile..."
                    ) : (
                      <>
                        <Save className="mr-2 size-5" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}