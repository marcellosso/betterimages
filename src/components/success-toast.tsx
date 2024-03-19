"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SuccessToast() {
  const searchParams = useSearchParams();

  const success = searchParams.get("success") as Boolean | null;

  useEffect(() => {
    if (success) {
      toast.success("Successfully updated subscription.");
    }
  }, [success]);

  return null;
}
