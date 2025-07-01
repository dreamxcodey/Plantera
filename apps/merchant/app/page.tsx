"use client";
import Navbar from "@repo/ui/navbar";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="bg-[#F9FBF7] min-h-screen flex flex-col">
      <Navbar />
      {/* Add top margin or padding to push content below navbar */}
      <div className="mt-16 px-4 flex items-center justify-center">
        <button
          onClick={() => {
            router.push("/product/add");
          }}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add Plant
        </button>
      </div>
    </div>
  );
}
