# Features Documentation

This directory contains detailed documentation for each major feature of the Social Support Portal application.

## Available Documentation

### [AI Integration](./ai-integration.md)

Comprehensive documentation of the AI text generation feature that helps users write application content. Covers:

- Architecture and components
- Prompt engineering
- Security and rate limiting
- Error handling
- Internationalization support

**Key Features:**
- OpenAI GPT-3.5-turbo integration
- Context-aware text generation
- Multi-language support (English/Arabic)
- Rate limiting and security measures

### [Application Feature](./application-feature.md)

Complete documentation of the multi-step application wizard. Covers:

- Form structure and validation
- Step navigation
- Form persistence (auto-save)
- Form submission
- AI integration usage
- Accessibility features

**Key Features:**
- Three-step wizard (Personal Info, Financial Info, Situation)
- Real-time validation with React Hook Form and Zod
- Automatic progress saving to localStorage
- AI-assisted text generation for Step 3
- Full keyboard navigation and accessibility support

### [Internationalization](./internationalization.md)

Documentation of the bilingual support system. Covers:

- Language detection and persistence
- Translation management
- RTL (Right-to-Left) layout support
- Integration with AI features
- Best practices

**Key Features:**
- English and Arabic support
- Automatic language detection
- RTL layout for Arabic
- Language-aware AI generation
- Persistent language preferences

## Feature Relationships

```
Application Feature
├── Uses AI Integration for Step 3 fields
├── Uses Internationalization for all UI text
└── Implements form persistence and validation

AI Integration
├── Respects Internationalization language settings
└── Generates context-aware text for Application Feature

Internationalization
├── Used by Application Feature for all translations
└── Used by AI Integration for language-aware prompts
```

## Quick Reference

### For Developers

- **Adding a new form field**: See [Application Feature - Form Structure](./application-feature.md#form-structure)
- **Adding AI assistance to a field**: See [AI Integration - Usage Example](./ai-integration.md#usage-example)
- **Adding a new translation**: See [Internationalization - Adding New Translations](./internationalization.md#adding-new-translations)

### For Understanding the System

- **How AI generation works**: Start with [AI Integration](./ai-integration.md)
- **How the form wizard works**: Start with [Application Feature](./application-feature.md)
- **How language switching works**: Start with [Internationalization](./internationalization.md)

## Related Documentation

- [Architecture Documentation](../architecture.md) - Overall system architecture
- [Security Documentation](../security.md) - Security considerations
- [Development Guide](../development.md) - Development setup and practices
- [Setup Guide](../setup.md) - Installation and configuration

