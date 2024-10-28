'use client';

import Image from "next/image";
import { SelectForm } from "@/components/ui/GenderForm";
import { Toaster } from "@/components/ui/toaster";
import { getFemaleUser } from "@/lib/getUsers";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const [user, setUser] = useState<{
    gender: string;
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    location: {
      city: string;
      country: string;
    };
    dob: {
      age: number;
    };
  } | null>(null);

  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    const loadInitialUser = async () => {
      const initialUser = await getFemaleUser();
      setUser(initialUser);
    };
    loadInitialUser();
  }, []);

  const handleUserUpdate = async () => {
    const newUser = await getFemaleUser();
    setUser(newUser);
  };

  const handleSmash = () => {
    setShowLocation(true);
  };

  const handlePass = () => {
    handleUserUpdate();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            width={200}
            height={200}
            className="rounded-full"
          />
          <h2 className="text-xl font-semibold">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleSmash}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Smash
            </button>
            <button
              onClick={handlePass}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Pass
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Gender Selection Form</h2>
        <SelectForm />
      </main>
      <Dialog open={showLocation} onOpenChange={setShowLocation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Location Details</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{user.name.first} is from {user.location.city}, {user.location.country}</p>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
