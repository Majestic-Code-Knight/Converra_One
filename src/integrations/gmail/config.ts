/**
 * Gmail Integration Configuration & Developer Setup Blueprint
 * 
 * Environment Variables required:
 * - GMAIL_CLIENT_ID
 * - GMAIL_CLIENT_SECRET
 * - GMAIL_REFRESH_TOKEN
 * - GMAIL_USER_EMAIL
 */

export const GMAIL_CONFIG = {
  scopes: [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.labels'
  ],
  baseUrl: 'https://gmail.googleapis.com/gmail/v1/users/me',
  maxResults: 20
};
