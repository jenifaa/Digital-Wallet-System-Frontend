/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";

import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Crown,
  Mail,
  Search,
  ShieldCheck,
  // ShieldX,
  Trash2,

  UserPlus,
  Users,
} from "lucide-react";

import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AllUsers() {
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  const [searchTerm, setSearchTerm] = useState("");


  const meta = data?.meta;

  const filteredUsers = useMemo(() => {
    
  const users = data?.data || [];
    return users.filter(
      (user: any) =>
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data?.data, searchTerm]);

  const admins = filteredUsers.filter(
    (user: any) =>
      user?.role === "SUPER_ADMIN" || user?.role === "ADMIN"
  );

  const agents = filteredUsers.filter(
    (user: any) => user?.role === "AGENT"
  );

  const normalUsers = filteredUsers.filter(
    (user: any) => user?.role === "USER" || !user?.role
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  const renderTable = (
    title: string,
    description: string,
    usersData: any[],
    theme:
      | "violet"
      | "cyan"
      | "rose"
  ) => {
    const themes = {
      violet: {
        badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
        icon: "text-violet-400",
        glow: "bg-violet-500/10",
      },
      cyan: {
        badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
        icon: "text-cyan-400",
        glow: "bg-cyan-500/10",
      },
      rose: {
        badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
        icon: "text-rose-400",
        glow: "bg-rose-500/10",
      },
    };

    return (
      <Card className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950/70 shadow-2xl backdrop-blur-xl">
        <CardHeader className="border-b border-slate-800 bg-slate-900/40">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-2xl font-black text-white">
                {title}
              </CardTitle>

              <p className="mt-1 text-sm text-slate-400">
                {description}
              </p>
            </div>

            <div
              className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${themes[theme].badge}`}
            >
              {usersData.length} Records
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 bg-slate-900/60 hover:bg-slate-900/60">
                  <TableHead className="h-14 pl-6 text-slate-300">
                    User
                  </TableHead>

                  <TableHead className="text-slate-300">
                    Email
                  </TableHead>

                  <TableHead className="text-slate-300">
                    Role
                  </TableHead>

                  <TableHead className="text-slate-300">
                    Status
                  </TableHead>

                  <TableHead className="text-right pr-6 text-slate-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {usersData.length > 0 ? (
                  usersData.map((user: any) => (
                    <TableRow
                      key={user?._id}
                      className="border-slate-800 bg-slate-950/40 transition-all duration-300 hover:bg-slate-900/70"
                    >
                      <TableCell className="pl-6 py-5">
                        <div className="flex items-center gap-4">
                          <Avatar className="size-12 border border-slate-700">
                            <AvatarFallback
                              className={`${themes[theme].glow} font-bold ${themes[theme].icon}`}
                            >
                              {user?.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <h3 className="font-semibold text-white">
                              {user?.name}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              ID: {user?._id?.slice(0, 10)}...
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Mail className="size-4 text-slate-500" />

                          <span className="truncate">
                            {user?.email}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`rounded-full border px-4 py-1 text-xs font-semibold ${
                            user?.role === "SUPER_ADMIN"
                              ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                              : user?.role === "AGENT"
                              ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
                              : "border-violet-500/20 bg-violet-500/10 text-violet-300"
                          }`}
                        >
                          {user?.role || "USER"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                          <div className="size-2 rounded-full bg-emerald-400" />

                          <span className="text-xs font-medium text-emerald-400">
                            ACTIVE
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="pr-6">
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          {user?.role === "USER" && (
                            <>
                              <Button
                                size="sm"
                                className="h-9 rounded-xl bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
                              >
                                <UserPlus className="mr-2 size-4" />
                                Make Agent
                              </Button>

                              <Button
                                size="sm"
                                className="h-9 rounded-xl bg-violet-500/10 text-violet-300 hover:bg-violet-500/20"
                              >
                                <Crown className="mr-2 size-4" />
                                Make Admin
                              </Button>
                            </>
                          )}

                          {user?.role === "AGENT" &&
                            !user?.isAgentApproved && (
                              <Button
                                size="sm"
                                className="h-9 rounded-xl bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                              >
                                <BadgeCheck className="mr-2 size-4" />
                                Approve
                              </Button>
                            )}

                          {user?.role !== "SUPER_ADMIN" && (
                            <>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-9 w-9 rounded-xl border-amber-500/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200"
                              >
                                {/* <ShieldX className="size-4" /> */}
                                <p>Block</p>
              
                              </Button>

                              <Button
                                size="icon"
                                variant="outline"
                                className="h-9 w-9 rounded-xl border-rose-500/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-rose-200"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-slate-800">
                    <TableCell
                      colSpan={5}
                      className="h-40 text-center"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Users className="size-12 text-slate-700" />

                        <h3 className="mt-4 text-lg font-bold text-white">
                          No Users Found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          No matching users available right now.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-white md:p-8">
      <div className="mx-auto max-w-450 space-y-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
              <ShieldCheck className="size-4 text-violet-400" />

              <span className="text-sm font-medium text-violet-300">
                User Control Center
              </span>
            </div>

            <h1 className="mt-5 text-5xl font-black tracking-tight text-white">
              Manage Platform Users
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
              Manage admins, agents and users separately with complete
              control over approvals, permissions and moderation actions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="rounded-3xl border border-violet-500/10 bg-violet-500/5">
              <CardContent className="p-5">
                <p className="text-sm text-slate-400">
                  Total Users
                </p>

                <h2 className="mt-2 text-4xl font-black text-white">
                  {meta?.total || 0}
                </h2>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-cyan-500/10 bg-cyan-500/5">
              <CardContent className="p-5">
                <p className="text-sm text-slate-400">
                  Agents
                </p>

                <h2 className="mt-2 text-4xl font-black text-white">
                  {agents.length}
                </h2>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-rose-500/10 bg-rose-500/5">
              <CardContent className="p-5">
                <p className="text-sm text-slate-400">
                  Admins
                </p>

                <h2 className="mt-2 text-4xl font-black text-white">
                  {admins.length}
                </h2>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="rounded-[32px] border border-slate-800 bg-slate-950/70 shadow-2xl">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-14 rounded-2xl border-slate-800 bg-slate-900 pl-12 text-white placeholder:text-slate-500 focus-visible:ring-violet-500"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {renderTable(
            "Admins",
            "Platform administrators with high-level permissions",
            admins,
            "rose"
          )}

          {renderTable(
            "Agents",
            "Approved and pending platform agents",
            agents,
            "cyan"
          )}

          {renderTable(
            "Users",
            "Regular platform users and customers",
            normalUsers,
            "violet"
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/60 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-white">
              {meta?.total}
            </span>{" "}
            users
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-2xl border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
            >
              <ChevronLeft className="size-5" />
            </Button>

            <div className="flex h-11 items-center rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 text-sm font-semibold text-violet-300">
              Page {meta?.page} of {meta?.totalPage}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-2xl border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}