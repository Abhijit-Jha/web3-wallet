"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <Ghost className="w-20 h-20 text-zinc-400 dark:text-zinc-600 mb-6" />
            <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
                Page Not Found
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md">
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button onClick={() => router.push("/")}>
                Go Back Home
            </Button>
        </div>
    );
};

export default NotFound;
