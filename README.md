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

- **[Setup & Installation](documentation/setup.md)** - Complete setup guide including local development with API server
- **[Architecture](documentation/architecture.md)** - Project structure and design decisions
- **[Development Guide](documentation/development.md)** - How to contribute and extend the project
- **[Security Guide](documentation/security.md)** - Security considerations and best practices
- **[Vercel Setup Guide](documentation/vercel-setup.md)** - Deploy and configure on Vercel
- **[Future Improvements](documentation/future-improvements.md)** - Roadmap and planned features
- **[Features Documentation](documentation/features/README.md)** - Detailed documentation for each feature

## 🚀 Quick Start

1. Clone the repository:

```bash
git clone https://github.com/isaac-wahba/ai-powered-social-support-application.git
cd social-support-portal
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Important:**

- Use `.env.local` (not `.env`)
- No `VITE_` prefix (this is server-side only)
- No quotes around the value
- No spaces around the `=`

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

4. Start the development servers:

```bash
npm run dev
```

This starts both the API server (port 8000) and the Vite dev server (port 5173).

For detailed setup instructions, see:

- [Setup & Installation Guide](documentation/setup.md) - Complete setup including local development

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

GitHub: [@isaac-wahba](https://github.com/isaac-wahba)

---

**Built with ❤️ using React, TypeScript, and Material UI**
