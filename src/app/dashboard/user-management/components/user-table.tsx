"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { User } from "../type";
import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import UserForm from "./user-form";
import UserDeleteModal from "./user-delete-form";
import { createUser } from "@/lib/axios/user-service";
import type { UserSchema } from "./user-form";
import { User2 } from "lucide-react";
import { UserStatus } from "../type";

// const initUser: User[] = [
//   {
//     id: 1,
//     status: "active",
//     first_name: "John",
//     last_name: "Doe",
//     is_active: true,
//     username: "johndoe",
//     email: "test1@gmail.com",
//     phone: "123456789",
//     address: "123 Main St",
//     image: "https://unsplash.com/photos/LNRyGwIJr5c",
//     date_joined: "2021-09-01",
//     is_staff: false,
//   },
//   {
//     id: 2,
//     status: "inactive",
//     first_name: "John",
//     last_name: "Cena",
//     is_active: false,
//     username: "johncena123",
//     email: "test1@gmail.com",
//     phone: "123456789",
//     address: "123 Main St",
//     image: "https://unsplash.com/photos/LNRyGwIJr5c",
//     date_joined: "2021-09-01",
//     is_staff: false,
//   },
// ];

const columns: ColumnDef<User, keyof User>[] = [
  {
    id: "username",
    header: "Username",
    cell: ({ row }) => row.original.username,
  },
  {
    id: "first_name",
    header: "First Name",
    cell: ({ row }) => row.original.first_name,
  },
  {
    id: "last_name",
    header: "Last Name",
    cell: ({ row }) => row.original.last_name,
  },
  {
    id: "role",
    header: "Role",
    cell: ({ row }) =>
      row.original.is_staff ? (
        <span className="text-red-400">Staff</span>
      ) : (
        <span className="text-green-400">User</span>
      ),
  },
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    id: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone,
  },
  {
    id: "address",
    header: "Address",
    cell: ({ row }) => <span className="truncate">{row.original.address}</span>,
  },
  {
    id: "image",
    header: "Avatar",
    cell: () => <User2 />,
  },
  {
    id: "date_joined",
    header: "Date Joined",
    cell: ({ row }) => row.original.date_joined,
  },
  {
    id: "is_active",
    header: "Active",
    cell: ({ row }) => {
      return row.original.is_active == true ? (
        <h1 className="text-green-400">Active</h1>
      ) : (
        <h1 className="text-red-400">Inactive</h1>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          <UserForm initialData={user} onSubmit={() => console.log(user)} />
          <UserDeleteModal deleteID={user.id} />
        </div>
      );
    },
  },
];

export default function UserDashboard({ userList }: { userList: User[] }) {
  const [users, setUsers] = useState<User[]>(userList);
  const handleAddUser = async (newUser: UserSchema) => {
    try {
      const user = await createUser(newUser);
      const formattedUser: User = {
        id: user.id,
        status: user.status as UserStatus,
        first_name: user.first_name,
        last_name: user.last_name,
        is_active: true,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        image: user.image,
        date_joined: new Date().toISOString(),
        is_staff: false,
      };
      console.log(formattedUser);
      setUsers((prev) => [...prev, formattedUser]);
      localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (users.length) {
      localStorage.setItem("users", JSON.stringify(users));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!users.length) {
      const users = localStorage.getItem("users");
      if (users) {
        setUsers(JSON.parse(users));
      }
    }
  }, [users.length]);

  return (
    <div className="container mx-auto py-8 px-4 w-screen">
      <Card>
        <CardHeader className="space-y-6">
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
          <div className="flex flex-wrap gap-4">
            <UserForm onSubmit={async (data) => await handleAddUser(data)} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <DataTable columns={columns} data={users} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
