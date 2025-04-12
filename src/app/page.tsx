import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen  bg-gray-200 dark:bg-green-600">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to <span className="text-[#003b6c]">User Auth Portal </span>
      </h1>
      <div className="w-max flex pt-2">
        <div className="flex justify-between w-max">
          <Link href="/sign-up">
            <Button className="mx-3">Sign Up</Button>
          </Link>
          <Link href="/login">
            <Button className="mx-3">Login</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
