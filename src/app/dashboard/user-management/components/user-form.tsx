"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Pencil, Plus } from "lucide-react";
import { faker } from "@faker-js/faker";

// Zod schema for user validation
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().nonempty("Username is required"),
  last_name: z.string().nonempty("Last name is required"),
  first_name: z.string().nonempty("First name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().nonempty("Phone number is required"),
  address: z.string().nonempty("Address is required"),
  image: z.string().default("https://unsplash.com"),
});

export type UserSchema = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData?: Partial<UserSchema>;
  onSubmit: (data: UserSchema) => void;
}

const UserForm = ({ initialData, onSubmit }: UserFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      email: faker.internet.email(),
      username: faker.internet.username(),
      last_name: faker.person.lastName(),
      first_name: faker.person.firstName(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      image: faker.image.avatar(),
    },
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.reset(); // Reset the form when closing the modal
  };

  const handleFormSubmit = (data: UserSchema) => {
    onSubmit(data);
    handleModalClose(); // Close modal after submission
  };

  return (
    <>
      {initialData ? (
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          className="bg-black hover:bg-black hover:bg-opacity-80"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="Email Address"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.email?.message}
              </p>
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                {...form.register("username")}
                placeholder="Username"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.username?.message}
              </p>
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <Input
                id="last_name"
                {...form.register("last_name")}
                placeholder="Last Name"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.last_name?.message}
              </p>
            </div>
            <div>
              <label htmlFor="first_name">First Name</label>
              <Input
                id="first_name"
                {...form.register("first_name")}
                placeholder="First Name"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.first_name?.message}
              </p>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                placeholder="Password"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.password?.message}
              </p>
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <Input
                id="phone"
                {...form.register("phone")}
                placeholder="Phone Number"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.phone?.message}
              </p>
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <Textarea
                id="address"
                {...form.register("address")}
                placeholder="User Address"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.address?.message}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button type="submit">
                {initialData ? "Update User" : "Add User"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserForm;
