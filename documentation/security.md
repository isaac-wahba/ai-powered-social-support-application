# Security Guide

This document outlines security considerations, best practices, and recommendations for the Social Support Portal.

## ⚠️ OpenAI API Key Security

### Current Implementation

The application uses a **serverless function proxy** to securely handle OpenAI API calls. The API key is stored server-side only and never exposed to the client.

**Architecture:**

```
Client → /api/generate-text (Vercel Serverless Function) → OpenAI API
```

**Security Features:**

- ✅ API key stored in Vercel environment variables (server-side only)
- ✅ Rate limiting: 10 requests per minute per IP
- ✅ Input validation and guardrails
- ✅ Server-controlled model (prevents expensive model requests)
- ✅ No CORS wildcard (same-origin only)
- ✅ Request timeout: 15 seconds

### Best Practices

#### 1. Never Commit API Keys

- ✅ The `.env.local` file is already in `.gitignore`
- ✅ Never share your API key publicly
- ✅ Use environment variables for all sensitive data
- ✅ Rotate keys if accidentally exposed

#### 2. Production Deployment

**Current Implementation: Vercel Serverless Function**

The application uses a Vercel serverless function (`/api/generate-text`) that:

- Stores API key in Vercel environment variables (server-side only)
- Implements rate limiting (10 requests/minute per IP)
- Validates and sanitizes all inputs
- Controls model selection server-side
- Handles errors securely without exposing internals

**Rate Limiting:**

- **Limit**: 10 requests per minute per IP address
- **Window**: 60 seconds (sliding window)
- **Storage**: In-memory (resets on cold starts)
- **Note**: For high-traffic production, consider Vercel KV or Redis for distributed rate limiting

**Input Validation:**

- Message count limited to 10
- Message length limited to 4000 characters
- Model hardcoded to `gpt-3.5-turbo` (server-controlled)
- `max_tokens` clamped between 50-500
- `temperature` clamped between 0-1
- Role validation (system/user/assistant only)

#### 4. API Key Management

- Use environment variables or secret management services
- Rotate keys regularly
- Use separate keys for development and production
- Monitor API usage and costs
- Set up usage alerts

## Data Privacy

### Current Data Storage

- **Form Data**: Stored locally in browser (localStorage)
- **No Backend**: Data is not sent to external servers (except OpenAI API)
- **Client-Side Only**: All data processing happens in the browser

### Privacy Considerations

1. **LocalStorage Limitations**:

   - Data is device/browser-specific
   - Can be cleared by user
   - Not accessible across devices
   - Limited storage capacity

2. **Data Sent to OpenAI**:

   - Form context is sent to OpenAI API for text generation
   - Review OpenAI's data usage policy
   - Consider data anonymization
   - For sensitive data, use backend proxy with data sanitization

3. **Compliance**:
   - **GDPR**: Ensure compliance if handling EU user data
   - **CCPA**: California privacy regulations
   - **HIPAA**: If handling health information
   - **Other Regulations**: Check local data protection laws

### Recommendations for Production

1. **Backend Storage**:

   - Store form data on secure backend
   - Encrypt sensitive data at rest
   - Implement proper access controls
   - Regular security audits

2. **Data Minimization**:

   - Only collect necessary data
   - Anonymize data when possible
   - Implement data retention policies
   - Allow users to delete their data

3. **Encryption**:

   - Use HTTPS for all communications
   - Encrypt sensitive data in transit
   - Encrypt sensitive data at rest
   - Use secure authentication

4. **Access Control**:
   - Implement user authentication
   - Role-based access control (RBAC)
   - Audit logs for data access
   - Regular security reviews

## Environment Variables

### Development

For local development with Vercel CLI, create a `.env.local` file:

```env
OPENAI_API_KEY=sk-your-key-here
```

**Note**: Use `.env.local` (not `.env`) for Vercel CLI compatibility.

### Production

**Vercel Environment Variables:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `OPENAI_API_KEY` with your API key value
3. Select all environments (Production, Preview, Development)
4. Never commit `.env.local` to version control

**Best Practices:**

- ✅ Use platform environment variables (Vercel, Netlify, etc.)
- ✅ Rotate keys regularly
- ✅ Use separate keys for development and production
- ✅ Monitor API usage and costs
- ❌ Never hardcode secrets in source code
- ❌ Never commit `.env` files
- ❌ Never share secrets in chat/email
- ❌ Never store secrets in client-side code

## Input Validation

### Client-Side Validation

- Zod schema validation for all form inputs
- Type checking with TypeScript
- Sanitize user inputs
- Validate data before sending to API

### Server-Side Validation (Current Implementation)

The serverless function validates all inputs:

- **Message validation**: Count (max 10), length (max 4000 chars), role (system/user/assistant only)
- **Type validation**: Ensures `content` is a string, `role` is valid enum
- **Parameter clamping**: `max_tokens` (50-500), `temperature` (0-1)
- **Model control**: Server hardcodes model to prevent expensive requests
- **Request structure**: Validates request body structure before processing

**Best Practices:**

- ✅ Validate all inputs on the server
- ✅ Never trust client-side validation alone
- ✅ Sanitize inputs to prevent injection attacks
- ✅ Use type-safe interfaces for request/response

## HTTPS and Secure Communication

### Development

- Local development uses HTTP (acceptable)
- Be cautious with sensitive data in development

### Production

- **Always use HTTPS** in production
- Valid SSL/TLS certificates
- HSTS headers
- Secure cookies (if using authentication)

## Dependencies Security

### Regular Updates

- Keep dependencies up to date
- Monitor for security vulnerabilities
- Use `npm audit` to check for known vulnerabilities
- Update dependencies regularly

### Dependency Scanning

```bash
# Check for vulnerabilities
npm audit

# Fix automatically (if possible)
npm audit fix

# Review security advisories
npm audit --audit-level=moderate
```

## Content Security Policy (CSP)

Consider implementing CSP headers in production:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

## Security Checklist

### Before Production Deployment

- [x] Move OpenAI API key to backend proxy (serverless function)
- [x] Implement rate limiting (10 req/min per IP)
- [x] Implement input validation (messages, parameters)
- [x] Server-controlled model selection
- [ ] Set up monitoring and alerts
- [x] Use HTTPS (Vercel provides by default)
- [ ] Review and update dependencies
- [ ] Set up error logging (without exposing sensitive data)
- [ ] Review data privacy compliance
- [ ] Implement authentication (if needed)
- [ ] Set up backup and recovery
- [ ] Document security procedures
- [ ] Conduct security review

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do NOT** create a public issue
2. Contact the maintainers privately
3. Provide detailed information about the vulnerability
4. Allow time for the issue to be addressed before disclosure

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OpenAI API Security Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [React Security Best Practices](https://reactjs.org/docs/security.html)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)

---

**Remember**: Security is an ongoing process, not a one-time setup. Regularly review and update your security practices.
