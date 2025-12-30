# Social Support Portal

A modern, accessible, and user-friendly multi-step application form for social support services. Built with React, TypeScript, and Material UI, featuring AI-assisted text generation, internationalization (English/Arabic with RTL support), and automatic progress persistence.

## ✨ Features

### Core Functionality

- **Multi-step Form Wizard**: Three-step application process with validation
  - Step 1: Personal Information
  - Step 2: Family & Financial Information
  - Step 3: Situation Description
- **AI-Assisted Writing**: OpenAI integration to help users write their application descriptions
- **Progress Persistence**: Automatic saving to localStorage with step tracking
- **Form Validation**: Real-time validation using React Hook Form and Zod
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Accessibility**: WCAG-compliant with skip links, ARIA attributes, and keyboard navigation

### Internationalization

- **Bilingual Support**: English and Arabic
- **RTL Support**: Automatic right-to-left layout for Arabic
- **Dynamic Language Switching**: Change language at any time
- **Localized Content**: All UI text and form labels translated

### User Experience

- **Continue Application**: Smart detection of in-progress applications
- **Start Over**: Option to clear and restart the application
- **Success Dialog**: Clear feedback after submission with options to start new application or go home
- **Error Handling**: User-friendly error messages and validation feedback
- **Loading States**: Visual feedback during AI generation and form submission

### Performance

- **Code Splitting**: Lazy loading of routes and components
- **Optimized Re-renders**: React.memo and useMemo for performance
- **Debounced Auto-save**: Efficient localStorage writes

## 📚 Documentation

- **[Setup & Installation](documentation/setup.md)** - Get started with the project
- **[Architecture](documentation/architecture.md)** - Project structure and design decisions
- **[Security Guide](documentation/security.md)** - Security considerations and best practices
- **[Development Guide](documentation/development.md)** - How to contribute and extend the project
- **[Future Improvements](documentation/future-improvements.md)** - Roadmap and planned features
- **[Implementation Plan](documentation/implementation-plan.md)** - Step-by-step implementation details

## 🚀 Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd social-support-portal
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

For detailed setup instructions, see [Setup & Installation Guide](documentation/setup.md).

## 📄 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines here]

## 📧 Contact

[Add contact information here]

---

**Built with ❤️ using React, TypeScript, and Material UI**
