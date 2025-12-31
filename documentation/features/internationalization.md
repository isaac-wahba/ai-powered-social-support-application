# Internationalization (i18n) Feature

## Overview

The Internationalization feature provides full bilingual support for English and Arabic, enabling users to interact with the application in their preferred language. The implementation includes RTL (Right-to-Left) layout support, translated content, and language-aware AI text generation.

## Architecture

### Core Setup

- **`i18n/index.ts`**: Main i18n configuration using `i18next` and `react-i18next`
- **Translation Files**:
  - `src/i18n/en.json`: English translations
  - `src/i18n/ar.json`: Arabic translations

### Libraries Used

- **`i18next`**: Core internationalization framework
- **`react-i18next`**: React bindings for i18next
- **`i18next-browser-languagedetector`**: Automatic language detection

## Supported Languages

1. **English (en)**: Default language, LTR (Left-to-Right)
2. **Arabic (ar)**: Full RTL support, Fusha (Modern Standard Arabic)

## Language Detection

### Detection Order

The system detects user language in this order:

1. **localStorage**: Previously selected language preference
2. **navigator**: Browser language setting

### Language Persistence

- Selected language is saved to localStorage
- Persists across browser sessions
- User preference takes precedence over browser setting

## Configuration

### i18n Initialization

```typescript
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });
```

### Key Settings

- **Fallback Language**: English (`en`)
- **Supported Languages**: `['en', 'ar']`
- **Interpolation**: Disabled (React handles escaping)
- **Detection Cache**: localStorage

## Language Switcher Component

### Component Location

`src/components/LanguageSwitcher.tsx`

### Features

- Dropdown selector for language choice
- Visual language icon
- Styled for both light and dark themes
- Accessible keyboard navigation
- Material-UI Select component

### Usage

```tsx
<LanguageSwitcher />
```

The component:
- Displays current language
- Allows switching between English and Arabic
- Updates all translated content immediately
- Persists selection to localStorage

## Translation Keys

### Structure

Translation files use a flat key structure:

```json
{
  "welcome": "Welcome",
  "step1": "Personal Information",
  "step2": "Family & Financial Information",
  "step3": "Situation Description",
  ...
}
```

### Key Categories

1. **Navigation**: Step labels, buttons, links
2. **Form Fields**: Field labels, placeholders, help text
3. **Validation**: Error messages, required field indicators
4. **UI Elements**: Dialog titles, success messages, errors
5. **AI Features**: AI button labels, loading states, error messages

## Using Translations in Components

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('welcome')}</h1>;
}
```

### With Interpolation

```tsx
const { t } = useTranslation();
const message = t('greeting', { name: 'John' });
```

### Language Detection

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // 'en' or 'ar'
  const isRTL = i18n.language === 'ar';
}
```

## RTL (Right-to-Left) Support

### Layout Adjustments

Components automatically adjust for RTL:

- **Flexbox**: Uses `flexDirection: isRTL ? 'row-reverse' : 'row'`
- **Text Alignment**: CSS handles RTL text direction
- **Material-UI**: Automatically handles RTL with theme direction

### RTL Detection Pattern

Common pattern used throughout the codebase:

```tsx
const { i18n } = useTranslation();
const isRTL = i18n.language === 'ar';

<Box
  sx={{
    flexDirection: {
      xs: 'column',
      sm: isRTL ? 'row-reverse' : 'row',
    },
  }}
>
```

### Components with RTL Support

- **LanguageSwitcher**: Icon and select positioning
- **AIFieldWithButton**: Button and textarea layout
- **WizardNavigation**: Button order
- **Form Fields**: Label and input positioning

## AI Integration with i18n

The AI text generation feature is fully integrated with i18n:

### Language-Aware Prompts

- System messages are language-specific
- User prompts are translated
- Form context is translated to target language
- Generated text matches selected language

### Implementation

See [AI Integration Documentation](./ai-integration.md) for details on how i18n is integrated with AI generation.

## Form Value Translation

### Translation Utilities

`src/features/application/utils/formValueTranslator.ts`:

Translates form values (dropdown selections) to the target language:

- Gender options
- Marital status options
- Employment status options
- Housing status options

### Usage

```typescript
const translatedValue = translateFormValue(
  'gender',
  'male',
  'ar' // or 'en'
);
```

## Translation File Structure

### English (`en.json`)

```json
{
  "welcome": "Welcome",
  "step1": "Personal Information",
  "name": "Full Name",
  "email": "Email Address",
  "helpMeWrite": "Help me write",
  ...
}
```

### Arabic (`ar.json`)

```json
{
  "welcome": "مرحباً",
  "step1": "المعلومات الشخصية",
  "name": "الاسم الكامل",
  "email": "عنوان البريد الإلكتروني",
  "helpMeWrite": "ساعدني في الكتابة",
  ...
}
```

## Best Practices

### Translation Key Naming

- Use descriptive, hierarchical keys when possible
- Keep keys consistent across languages
- Use camelCase for multi-word keys
- Group related keys with prefixes

### Content Guidelines

- **English**: Clear, concise, professional
- **Arabic**: Formal Arabic (Fusha), respectful tone
- **Length**: Consider that Arabic text may be longer/shorter
- **Context**: Provide context in translation comments if needed

### Component Guidelines

1. **Always use `t()` function**: Never hardcode text
2. **Check RTL**: Use `isRTL` for layout adjustments
3. **Test both languages**: Verify translations and layout
4. **Handle text length**: Design for variable text lengths
5. **Accessibility**: Ensure translations maintain accessibility

## Adding New Translations

### Steps

1. Add key to both `en.json` and `ar.json`
2. Provide translation in both languages
3. Use the key in components with `t('key')`
4. Test in both languages
5. Verify RTL layout if applicable

### Example

```json
// en.json
{
  "newFeature": "New Feature"
}

// ar.json
{
  "newFeature": "ميزة جديدة"
}
```

```tsx
// Component
const { t } = useTranslation();
return <div>{t('newFeature')}</div>;
```

## Testing i18n

### Manual Testing

1. Switch languages using LanguageSwitcher
2. Verify all text is translated
3. Check RTL layout for Arabic
4. Test form validation messages
5. Test AI-generated text language
6. Verify localStorage persistence

### Automated Testing

Consider testing:
- Translation key coverage
- Missing translations
- RTL layout correctness
- Language persistence

## Common Issues & Solutions

### Issue: Text Overflow in RTL

**Solution**: Use flexible layouts, test with long Arabic text

### Issue: Missing Translation

**Solution**: i18next falls back to key name, ensure all keys are translated

### Issue: Layout Breaks in RTL

**Solution**: Use `isRTL` checks and Material-UI's RTL support

### Issue: AI Text in Wrong Language

**Solution**: Ensure language is passed correctly to AI service

## Future Improvements

Potential enhancements:

1. **Additional Languages**: Support more languages (French, Spanish, etc.)
2. **Language-Specific Formatting**: Date, number, currency formatting
3. **Pluralization**: Proper plural forms for both languages
4. **Translation Management**: External translation management system
5. **Lazy Loading**: Load translations on demand
6. **Translation Validation**: Automated checks for missing keys
7. **Context-Aware Translations**: Different translations based on context

## Related Documentation

- [Application Feature](./application-feature.md) - How i18n is used in the application
- [AI Integration](./ai-integration.md) - Language-aware AI generation
- [Architecture Documentation](../architecture.md) - System architecture

