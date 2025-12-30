import { useState } from "react";
import { useTranslation } from "react-i18next";
import type {
  UseFormTrigger,
  UseFormGetValues,
  UseFormReset,
  UseFormClearErrors,
} from "react-hook-form";
import { submitApplication } from "../services/submissionService";
import { storage } from "../features/application/storage";
import { ApplicationStep } from "../features/application/constants/steps";
import { STEP_FIELDS } from "../features/application/constants/stepFields";
import { defaultValues } from "../features/application/constants/defaultValues";
import type { ApplicationFormData } from "../features/application/schema";

interface UseSubmissionParams {
  trigger: UseFormTrigger<ApplicationFormData>;
  getValues: UseFormGetValues<ApplicationFormData>;
  reset: UseFormReset<ApplicationFormData>;
  clearErrors: UseFormClearErrors<ApplicationFormData>;
  setActiveStep: (step: ApplicationStep) => void;
}

interface UseSubmissionReturn {
  isSubmitting: boolean;
  showSuccessDialog: boolean;
  submissionError: string | null;
  handleSubmit: () => Promise<void>;
  handleCloseSuccessDialog: () => void;
  handleStartNewApplication: () => void;
  clearSubmissionError: () => void;
}

/**
 * Custom hook for managing form submission logic
 */
export function useSubmission({
  trigger,
  getValues,
  reset,
  clearErrors,
  setActiveStep,
}: UseSubmissionParams): UseSubmissionReturn {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmissionError(null);

    const fieldsToValidate = STEP_FIELDS[ApplicationStep.SITUATION] || [];
    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      return;
    }

    const isFormValid = await trigger();
    if (!isFormValid) {
      setSubmissionError(t("validationRequired"));
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = getValues() as ApplicationFormData;
      const result = await submitApplication(formData);

      if (result.success) {
        storage.clear();
        reset(defaultValues);
        clearErrors();
        setActiveStep(ApplicationStep.PERSONAL_INFO);
        setShowSuccessDialog(true);
      } else {
        setSubmissionError(result.error || t("submissionErrorMessage"));
      }
    } catch (error) {
      setSubmissionError(t("submissionErrorMessage"));
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  const handleStartNewApplication = () => {
    setShowSuccessDialog(false);
    storage.clear();
    reset(defaultValues);
    clearErrors();
    setActiveStep(ApplicationStep.PERSONAL_INFO);
  };

  const clearSubmissionError = () => {
    setSubmissionError(null);
  };

  return {
    isSubmitting,
    showSuccessDialog,
    submissionError,
    handleSubmit,
    handleCloseSuccessDialog,
    handleStartNewApplication,
    clearSubmissionError,
  };
}
