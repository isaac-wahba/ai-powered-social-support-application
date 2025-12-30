# Architecture Documentation

## Project Structure

```
src/
├── app/                    # App-level configuration
│   ├── providers.tsx      # MUI theme and i18n providers
│   └── theme.ts           # Material UI theme configuration
├── components/            # Reusable UI components
│   ├── Layout.tsx         # Main layout wrapper
│   ├── LanguageSwitcher.tsx
│   ├── SkipLink.tsx       # Accessibility skip link
│   └── RHF*.tsx          # React Hook Form wrappers
├── features/
│   └── application/      # Application form feature
│       ├── ApplicationWizard.tsx
│       ├── components/    # Wizard-specific components
│       │   ├── StartOverButton.tsx
│       │   ├── StartOverDialog.tsx
│       │   ├── StepContent.tsx
│       │   ├── SubmissionSuccessDialog.tsx
│       │   ├── WizardNavigation.tsx
│       │   └── WizardStepper.tsx
│       ├── constants/     # Form constants and enums
│       │   ├── defaultValues.ts
│       │   ├── stepFields.ts
│       │   └── steps.ts
│       ├── steps/         # Step components
│       │   ├── Step1PersonalInfo.tsx
│       │   ├── Step2FinancialInfo.tsx
│       │   ├── Step3Situation.tsx
│       │   ├── StepLayout.tsx
│       │   └── components/
│       │       ├── AIFieldWithButton.tsx
│       │       └── HelpMeWriteButton.tsx
│       ├── utils/         # Utility functions
│       │   ├── formContext.ts
│       │   └── formValueTranslator.ts
│       ├── schema.ts      # Zod validation schema
│       └── storage.ts     # LocalStorage utilities
├── hooks/                # Custom React hooks
│   ├── useApplicationForm.ts
│   ├── useAIFieldHandler.ts
│   ├── useAITextGeneration.ts
│   ├── useFormAutoSave.ts
│   ├── usePageTitle.ts
│   ├── useStepNavigation.ts
│   └── useSubmission.ts
├── i18n/                 # Internationalization
│   ├── index.ts          # i18next configuration
│   ├── en.json           # English translations
│   └── ar.json           # Arabic translations
├── pages/                # Page components
│   ├── Home.tsx
│   └── Application.tsx
└── services/             # External service integrations
    ├── openaiClient.ts   # OpenAI API client
    ├── prompts/          # AI prompt builders
    │   ├── contextBuilder.ts
    │   ├── promptBuilder.ts
    │   ├── systemMessages.ts
    │   └── userPrompts.ts
    └── submissionService.ts
```

## Key Architectural Decisions

### 1. Single Form Instance

**Decision**: One React Hook Form instance spans all wizard steps.

**Rationale**:

- Ensures consistent validation and state management across steps
- Simplifies data persistence and restoration
- Single source of truth for form state
- Easier to implement cross-step validation

**Implementation**: The `useApplicationForm` hook creates a single form instance that is provided via `FormProvider` to all step components.

### 2. LocalStorage for Persistence

**Decision**: Use browser localStorage for form data persistence.

**Rationale**:

- No backend required for MVP
- Automatic restoration on page refresh
- Simple implementation
- Works offline

**Trade-offs**:

- Data is device/browser-specific
- Limited storage capacity (~5-10MB)
- Not suitable for production with sensitive data
- **Note**: For production, consider backend persistence

**Implementation**: The `storage.ts` utility handles saving/loading form data and active step.

### 3. Custom Hooks for Logic Separation

**Decision**: Extract business logic into custom hooks.

**Rationale**:

- Separation of concerns (UI vs. logic)
- Reusable logic across components
- Easier testing
- Better code organization

**Examples**:

- `useApplicationForm`: Form initialization and auto-save
- `useAIFieldHandler`: AI text generation logic
- `useStepNavigation`: Step navigation and validation
- `useSubmission`: Form submission logic

### 4. RTL Support at Theme Level

**Decision**: Handle RTL support through Material UI theme configuration.

**Rationale**:

- Material UI handles RTL automatically when theme direction is set
- No per-component RTL logic needed
- Consistent RTL behavior across all MUI components
- Dynamic direction switching based on language

**Implementation**: The theme is recreated when language changes, setting `direction: 'rtl'` or `direction: 'ltr'` accordingly.

### 5. AI Integration Strategy

**Decision**: AI suggestions are advisory only, user maintains full control.

**Rationale**:

- User autonomy and control
- AI can make mistakes
- User context is important
- Better user experience

**Implementation**:

- AI generates text based on form context
- User can accept, edit, or discard AI suggestions
- First-person perspective in AI responses
- Context-aware prompts using form data

### 6. Component Organization

**Decision**: Feature-based structure with shared components.

**Rationale**:

- Clear separation of feature-specific vs. shared code
- Easier to locate related code
- Scalable structure
- Better maintainability

**Structure**:

- `features/`: Feature-specific code (e.g., `application/`)
- `components/`: Shared, reusable UI components
- `hooks/`: Shared custom hooks
- `services/`: External service integrations

### 7. Code Splitting and Lazy Loading

**Decision**: Lazy load routes and heavy components.

**Rationale**:

- Smaller initial bundle size
- Faster initial page load
- Better performance
- Improved user experience

**Implementation**:

- Routes are lazy loaded using `React.lazy()`
- Suspense boundaries provide loading fallbacks
- Components are code-split at route level

## Technology Stack

- React 19 + TypeScript
- Vite 7
- Material UI v7 (with Emotion)
- React Hook Form v7 + Zod v4
- react-i18next
- React Router v7
- OpenAI GPT API

## Data Flow

### Form Data Flow

```
User Input → React Hook Form → Auto-save Hook → LocalStorage
                                      ↓
                              Form State Update
                                      ↓
                              Component Re-render
```

### AI Generation Flow

```
User Clicks "Help Me Write" →
  Collect Form Context →
  Build Prompt →
  Call OpenAI API →
  Update Textarea Field
```

### Navigation Flow

```
User Clicks Next/Back →
  Validate Current Step →
  Clear Errors →
  Update Active Step →
  Save Step to Storage →
  Render New Step
```

## State Management

The application uses React's built-in state management:

- **Form State**: Managed by React Hook Form
- **UI State**: React `useState` hooks
- **Persistence**: LocalStorage via `storage` utility
- **Navigation State**: Component-level state with localStorage sync

No external state management library (Redux, Zustand, etc.) is used, keeping the architecture simple and lightweight.

## Performance Optimizations

- Code splitting: Routes and heavy components are lazy loaded
- Memoization: `React.memo` and `useMemo` for expensive operations
- Debounced auto-save: Prevents excessive localStorage writes

## Future Architecture Considerations

See [Future Improvements](future-improvements.md) for planned architectural changes, including:

- Backend integration
- Server-side persistence
- API proxy for OpenAI
- Authentication and authorization
