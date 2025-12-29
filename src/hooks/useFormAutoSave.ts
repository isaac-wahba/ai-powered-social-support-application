import { useEffect, useRef } from "react";
import type { UseFormWatch } from "react-hook-form";
import { storage } from "../features/application/storage";
import type { ApplicationFormData } from "../features/application/schema";

const DEBOUNCE_DELAY = 500; // milliseconds

/**
 * Custom hook for auto-saving form data to localStorage with debouncing
 */
export function useFormAutoSave(watch: UseFormWatch<ApplicationFormData>) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const subscription = watch((data) => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout for debounced save
      timeoutRef.current = setTimeout(() => {
        storage.save(data);
      }, DEBOUNCE_DELAY);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watch]);
}

