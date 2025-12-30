# Security Guide

This document outlines security considerations, best practices, and recommendations for the Social Support Portal.

## ⚠️ OpenAI API Key Security

### Current Implementation

The application currently uses the OpenAI API key directly in the client-side code via the `VITE_OPENAI_API_KEY` environment variable.

**This is acceptable for:**
- Development and local testing
- Demos and prototypes
- Internal tools

**This is NOT acceptable for:**
- Production applications with public access
- Applications handling sensitive data
- Applications with multiple users

### Security Risks

1. **API Key Exposure**: The API key is visible in the client-side bundle
2. **Unauthorized Usage**: Anyone can extract and misuse your API key
3. **Cost Control**: No way to limit or monitor API usage per user
4. **Rate Limiting**: Client-side rate limiting can be bypassed

### Best Practices

#### 1. Never Commit API Keys

- ✅ The `.env` file is already in `.gitignore`
- ✅ Never share your API key publicly
- ✅ Use environment variables for all sensitive data
- ✅ Rotate keys if accidentally exposed

#### 2. Production Deployment

**For production, implement a backend proxy:**

```
Client → Backend API → OpenAI API
```

**Benefits:**
- API key stays on the server
- Rate limiting and usage monitoring
- Cost control and quotas
- Request logging and analytics

**Implementation Options:**
- **Serverless Functions**: Vercel, Netlify, AWS Lambda
- **API Routes**: Next.js API routes, Express.js
- **Backend Service**: Node.js, Python, etc.

**Example Backend Proxy Structure:**
```typescript
// Backend API endpoint
POST /api/generate-text
Body: { fieldName, context, language }
Response: { text: string }

// Backend handles:
// - API key management
// - Rate limiting
// - Error handling
// - Logging
```

#### 3. Rate Limiting

Implement rate limiting on the backend:
- Limit requests per user/IP
- Set daily/monthly quotas
- Monitor usage patterns
- Alert on suspicious activity

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

Create a `.env` file in the root directory:

```env
VITE_OPENAI_API_KEY=sk-your-key-here
```

### Production

Use secure environment variable management:

**Options:**
- Platform environment variables (Vercel, Netlify, etc.)
- Secret management services (AWS Secrets Manager, HashiCorp Vault)
- CI/CD pipeline secrets
- Kubernetes secrets

**Never:**
- Hardcode secrets in source code
- Commit `.env` files
- Share secrets in chat/email
- Store secrets in client-side code

## Input Validation

### Client-Side Validation

- Zod schema validation for all form inputs
- Type checking with TypeScript
- Sanitize user inputs
- Validate data before sending to API

### Server-Side Validation (Future)

When implementing backend:
- Validate all inputs on the server
- Never trust client-side validation alone
- Sanitize inputs to prevent injection attacks
- Use parameterized queries for databases

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

- [ ] Move OpenAI API key to backend proxy
- [ ] Implement rate limiting
- [ ] Set up monitoring and alerts
- [ ] Use HTTPS
- [ ] Review and update dependencies
- [ ] Implement input validation
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

