# Application Feature

## Overview

The Application Feature is a multi-step wizard that guides users through completing a social support application form. It provides a structured, user-friendly interface with form validation, auto-save functionality, step navigation, and AI-powered text generation assistance.

## Architecture

### Core Components

- **`ApplicationWizard`** (`src/features/application/ApplicationWizard.tsx`): Main wizard container component
- **`WizardStepper`** (`src/features/application/components/WizardStepper.tsx`): Visual step indicator
- **`WizardNavigation`** (`src/features/application/components/WizardNavigation.tsx`): Navigation buttons (Next/Back/Submit)
- **`StepContent`** (`src/features/application/components/StepContent.tsx`): Renders content for each step
- **`StartOverButton`** (`src/features/application/components/StartOverButton.tsx`): Allows users to reset the form

### Step Components

- **`Step1PersonalInfo`** (`src/features/application/steps/Step1PersonalInfo.tsx`): Personal information form
- **`Step2FinancialInfo`** (`src/features/application/steps/Step2FinancialInfo.tsx`): Family and financial information
- **`Step3Situation`** (`src/features/application/steps/Step3Situation.tsx`): Situation description with AI assistance

### Custom Hooks

- **`useApplicationForm`** (`src/hooks/useApplicationForm.ts`): Manages form state and validation
- **`useStepNavigation`** (`src/hooks/useStepNavigation.ts`): Handles step transitions
- **`useSubmission`** (`src/hooks/useSubmission.ts`): Manages form submission
- **`useFormAutoSave`** (`src/hooks/useFormAutoSave.ts`): Auto-saves form data to localStorage

### Storage

- **`storage.ts`** (`src/features/application/storage.ts`): LocalStorage utilities for form persistence

## Form Structure

The application form consists of three steps:

### Step 1: Personal Information

- Name
- National ID
- Date of Birth
- Gender
- Address
- City
- State
- Country
- Phone
- Email

### Step 2: Family & Financial Information

- Marital Status
- Number of Dependents
- Employment Status
- Monthly Income
- Housing Status

### Step 3: Situation Description

- Current Financial Situation (with AI assistance)
- Employment Circumstances (with AI assistance)
- Reason for Applying (with AI assistance)

See [AI Integration Documentation](./ai-integration.md) for details on AI assistance.

## Form Validation

### Schema

The form uses Zod for schema validation (`src/features/application/schema.ts`):

- All fields are required
- Email must be valid format
- Numeric fields (dependents, monthly income) must be >= 0
- String fields must have minimum length of 1

### Validation Strategy

- **Step-level validation**: Each step validates its own fields before allowing progression
- **Form-level validation**: Final submission validates all fields
- **Real-time validation**: Fields are validated on blur/change
- **Error display**: Validation errors shown inline with fields

### Step Fields Configuration

Fields are organized by step in `src/features/application/constants/stepFields.ts`:

```typescript
STEP_FIELDS = {
  [ApplicationStep.PERSONAL_INFO]: ["name", "nationalId", ...],
  [ApplicationStep.FINANCIAL_INFO]: ["maritalStatus", "dependents", ...],
  [ApplicationStep.SITUATION]: ["currentFinancialSituation", ...],
}
```

## Step Navigation

### Navigation Logic

- **Forward navigation**: Validates current step before allowing next step
- **Backward navigation**: Always allowed (no validation required)
- **Step persistence**: Current step saved to localStorage
- **Step restoration**: On page load, user returns to last step

### Navigation Hooks

`useStepNavigation` provides:
- `handleNext()`: Validates and moves to next step
- `handleBack()`: Moves to previous step
- `canGoNext`: Boolean indicating if next is allowed
- `canGoBack`: Boolean indicating if back is allowed

## Form Persistence (Auto-Save)

### Auto-Save Mechanism

The form automatically saves user input to localStorage:

- **Debounce delay**: 500ms (prevents excessive writes)
- **Storage key**: `social-support-form-progress`
- **Step storage key**: `social-support-active-step`
- **Automatic**: Saves on any form field change
- **Restoration**: Loads saved data on component mount

### Storage API

The `storage` utility provides:

- `save(data)`: Saves form data
- `load()`: Loads saved form data
- `clear()`: Clears all saved data
- `saveStep(step)`: Saves current step
- `loadStep()`: Loads saved step
- `hasInProgressApplication()`: Checks if user has unsaved progress

### Use Cases

- User closes browser and returns later
- User navigates away and comes back
- User refreshes page
- User starts new application (clears old data)

## Form Submission

### Submission Flow

1. User clicks "Submit" on final step
2. Current step fields validated
3. All form fields validated
4. Form data collected
5. Submission service called
6. Success dialog shown
7. Form reset and cleared
8. User redirected or can start new application

### Submission Service

`submitApplication()` (`src/services/submissionService.ts`):

- Currently a mock service (simulates 2-second delay)
- In production, would make actual API call
- Returns success/error result
- Handles errors gracefully

### Success Handling

After successful submission:

- Form data cleared from localStorage
- Form reset to default values
- Step reset to first step
- Success dialog displayed
- User can:
  - Start new application
  - Return to home page

## AI Integration

The application feature integrates with the AI text generation system for Step 3 fields. See [AI Integration Documentation](./ai-integration.md) for complete details.

### AI-Assisted Fields

Three fields in Step 3 have AI assistance:

1. **Current Financial Situation**
2. **Employment Circumstances**
3. **Reason for Applying**

### How It Works

- Each field has a "Help me write" button
- Button triggers AI generation using current form data as context
- Generated text is automatically inserted into the field
- User can edit generated text
- AI respects the user's selected language (English/Arabic)

## Accessibility Features

### Skip Links

- Skip to main content link for keyboard navigation
- Implemented via `SkipLink` component

### ARIA Labels

- Form has `aria-label` for screen readers
- Main content has `role="main"`
- Error alerts have `role="alert"` and `aria-live="assertive"`

### Keyboard Navigation

- Full keyboard support for form navigation
- Tab order follows logical flow
- Focus management on step changes

## Internationalization

The application feature fully supports English and Arabic:

- All labels and messages translated
- Form validation messages translated
- RTL (Right-to-Left) layout for Arabic
- AI-generated text matches selected language

See [Internationalization Documentation](./internationalization.md) for details.

## User Experience Features

### Start Over Functionality

- "Start Over" button available on all steps
- Confirmation dialog prevents accidental resets
- Clears all form data and returns to first step

### Loading States

- Submission shows loading state
- AI generation shows loading state per field
- Disabled states prevent multiple submissions

### Error Handling

- Validation errors shown inline
- Submission errors shown in alert
- Network errors handled gracefully
- User-friendly error messages

## Component Structure

```
ApplicationWizard
├── SkipLink
├── Container/Paper
│   ├── Header (Title + StartOverButton)
│   ├── WizardStepper
│   ├── StepContent
│   │   ├── Step1PersonalInfo
│   │   ├── Step2FinancialInfo
│   │   └── Step3Situation (with AI fields)
│   └── WizardNavigation
└── SubmissionSuccessDialog
```

## State Management

### Form State

Managed by React Hook Form:
- Form values
- Validation state
- Error state
- Dirty/touched state

### Application State

Managed by React state:
- Current step
- Submission state
- Success dialog visibility
- Error messages

### Persistent State

Stored in localStorage:
- Form data
- Current step

## Configuration

### Default Values

Default form values defined in `src/features/application/constants/defaultValues.ts`:
- Empty strings for text fields
- 0 for numeric fields
- Empty selections for dropdowns

### Step Constants

Step definitions in `src/features/application/constants/steps.ts`:
- Step numbers
- Step labels
- Step order

## Testing Considerations

When testing the application feature:

1. **Form Validation**: Test all required fields
2. **Step Navigation**: Test forward/backward navigation
3. **Auto-Save**: Test persistence across page refreshes
4. **Submission**: Test successful and failed submissions
5. **AI Integration**: Test AI generation for all three fields
6. **Accessibility**: Test keyboard navigation and screen readers
7. **Internationalization**: Test both English and Arabic

## Future Improvements

Potential enhancements:

1. **Progress Indicator**: Show completion percentage
2. **Draft Management**: Allow multiple saved drafts
3. **Field-Level Help**: Contextual help for each field
4. **Form Analytics**: Track completion rates and drop-off points
5. **Offline Support**: Service worker for offline form completion
6. **File Uploads**: Support for document attachments
7. **Multi-Step Preview**: Preview all data before submission
8. **Save & Resume**: Email link to resume application

## Related Documentation

- [AI Integration](./ai-integration.md) - AI text generation feature
- [Internationalization](./internationalization.md) - Multi-language support
- [Architecture Documentation](../architecture.md) - System architecture
- [Security Documentation](../security.md) - Security considerations

