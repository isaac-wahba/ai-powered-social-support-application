import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationFormSchema,
  type ApplicationFormData,
} from "../features/application/schema";
import { storage } from "../features/application/storage";
import { defaultValues } from "../features/application/constants/defaultValues";
import { useFormAutoSave } from "./useFormAutoSave";

/**
 * Custom hook for managing the application form state and persistence
 */
export function useApplicationForm() {
  // Load saved data on mount
  const savedData = storage.load();
  const initialValues = savedData
    ? { ...defaultValues, ...savedData }
    : defaultValues;

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const { watch, reset } = methods;

  // Auto-save with debounce
  useFormAutoSave(watch);

  // Restore saved data on mount
  useEffect(() => {
    if (savedData) {
      reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return methods;
}
