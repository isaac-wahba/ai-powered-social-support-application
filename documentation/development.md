# Development Guide

## Code Style

### Component Definitions

- Use **function declarations** for components
- For memoized components, use inline memoization:
  ```typescript
  export const MyComponent = memo(({ prop }) => {
    // ...
  });
  ```

### Naming Conventions

- **Constants**: UPPER_SNAKE_CASE for enums (e.g., `PERSONAL_INFO`)
- **Files**: Match component/hook name

## Adding a New Translation

### Steps

1. Add the translation key to both language files:

**`src/i18n/en.json`**:

```json
{
  "myNewKey": "English translation"
}
```

**`src/i18n/ar.json`**:

```json
{
  "myNewKey": "الترجمة العربية"
}
```

2. Use the translation in components:

```typescript
import { useTranslation } from "react-i18next";

export function MyComponent() {
  const { t } = useTranslation();
  return <div>{t("myNewKey")}</div>;
}
```

### Best Practices

- Use descriptive, hierarchical keys (e.g., `fieldName`, `buttonSubmit`)
- Consider RTL layout when adding Arabic translations

## Adding a New Form Field

### Steps

1. **Add to Zod Schema** (`src/features/application/schema.ts`):

```typescript
export const applicationFormSchema = z.object({
  // ... existing fields
  newField: z.string().min(1, "New field is required"),
});
```

2. **Add Default Value** (`src/features/application/constants/defaultValues.ts`):

```typescript
export const defaultValues: Partial<ApplicationFormData> = {
  // ... existing fields
  newField: "",
};
```

3. **Add to Step Component**:

```typescript
import { RHFTextField } from "../../../components/RHFTextField";

export function Step1PersonalInfo() {
  const { t } = useTranslation();
  return (
    <StepLayout stepKey="step1">
      <RHFTextField name="newField" label={t("fieldNewField")} required />
    </StepLayout>
  );
}
```

4. **Update Step Fields** (if needed for validation):

```typescript
// src/features/application/constants/stepFields.ts
export const STEP_FIELDS = {
  [ApplicationStep.PERSONAL_INFO]: [
    // ... existing fields
    "newField",
  ],
};
```

## Adding a New Step

### Steps

1. **Add Step Enum** (`src/features/application/constants/steps.ts`):

```typescript
export enum ApplicationStep {
  PERSONAL_INFO = 0,
  FINANCIAL_INFO = 1,
  SITUATION = 2,
  NEW_STEP = 3, // Add new step
}
```

2. **Create Step Component** (`src/features/application/steps/Step4NewStep.tsx`):

```typescript
import { StepLayout } from "./StepLayout";

export function Step4NewStep() {
  return <StepLayout stepKey="step4">{/* Step content */}</StepLayout>;
}
```

3. **Add to StepContent** (`src/features/application/components/StepContent.tsx`):

```typescript
import { Step4NewStep } from "../steps/Step4NewStep";

export function StepContent({ step }: StepContentProps) {
  switch (step) {
    // ... existing cases
    case ApplicationStep.NEW_STEP:
      return <Step4NewStep />;
    default:
      return null;
  }
}
```

4. **Update WizardStepper** (`src/features/application/components/WizardStepper.tsx`):

```typescript
const STEP_LABELS = ["step1", "step2", "step3", "step4"]; // Add step4
```

5. **Add Step Fields** (`src/features/application/constants/stepFields.ts`):

```typescript
export const STEP_FIELDS = {
  // ... existing steps
  [ApplicationStep.NEW_STEP]: ["field1", "field2"],
};
```

6. **Add Translations**:

```json
// en.json
{
  "step4": "New Step"
}

// ar.json
{
  "step4": "الخطوة الجديدة"
}
```

## Creating Custom Hooks

- Return objects for multiple values (not arrays)
- Keep hooks focused on a single responsibility
- See existing hooks in `src/hooks/` for patterns

## Creating Reusable Components

- Use `React.memo` for components that don't need frequent re-renders
- Support RTL layout when applicable
- Add accessibility attributes (ARIA labels, roles)

## Common Issues

1. **Form not saving**: Check localStorage in DevTools
2. **Validation errors**: Check Zod schema and error messages
3. **RTL layout issues**: Check theme direction and MUI RTL support
4. **AI not working**:
   - Check that both API server and Vite are running (`npm run dev`)
   - Verify `.env.local` exists with `OPENAI_API_KEY`
   - Check browser console and network tab for errors
   - See [Setup Guide](setup.md) for troubleshooting

## Questions?

- Check existing code for patterns
- Review [Architecture Documentation](architecture.md)
- See [Setup Guide](setup.md) for setup and troubleshooting
