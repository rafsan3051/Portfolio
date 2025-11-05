# Admin Dashboard

Your portfolio now includes a powerful admin dashboard with real-time GitHub integration.

## Features

### 🔐 Authentication
- Secure admin login with bcrypt password hashing
- Session-based authentication using iron-session
- Protected API routes

### 👤 Profile Management
- Edit your name, role, and contact information
- Update avatar URL
- Change location and email
- Changes are saved directly to `src/resources/content.tsx`

### 📦 GitHub Integration
- View all your GitHub repositories in real-time
- Select which repositories to sync to your portfolio
- Automatic MDX file generation for each synced repository
- Repository details include:
  - Name and description
  - Programming language
  - Star and fork counts
  - Topics/tags
  - Live demo link (if available)

## Access

Visit `/dashboard` to access the admin panel.

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ Important:** Change these credentials immediately in production!

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update environment variables:
   ```bash
   # Required: Generate a secure session password (min 32 characters)
   SESSION_PASSWORD=your_super_secret_session_password_min_32_characters
   
   # Optional: Add GitHub token for higher API rate limits
   GITHUB_TOKEN=your_github_personal_access_token
   
   # Optional: Change admin credentials
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD_HASH=your_bcrypt_hash
   ```

3. Generate secure session password:
   ```bash
   # Using OpenSSL
   openssl rand -base64 32
   
   # Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

4. Generate password hash (if changing credentials):
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('your_new_password', 10))"
   ```

## Usage

### Profile Tab
1. Log in to `/dashboard`
2. Click "Profile" tab
3. Update your information
4. Click "Save Profile"
5. Rebuild your site to see changes

### Repositories Tab
1. Click "Repositories" tab
2. View all your GitHub repositories
3. Select repositories you want to showcase
4. Click "Sync X Selected"
5. MDX files are created in `src/app/work/projects/`

## API Endpoints

### Authentication
- `POST /api/admin/login` - Login with username/password
- `POST /api/admin/logout` - Logout and destroy session

### Data Management
- `GET /api/admin/github` - Fetch GitHub repos and user data (protected)
- `POST /api/admin/update-profile` - Update profile information (protected)
- `POST /api/admin/sync-repos` - Sync selected repositories (protected)

## Security

- All admin routes are protected with session authentication
- Passwords are hashed using bcrypt
- Session cookies are encrypted with iron-session
- HTTPS recommended for production
- Change default credentials immediately
- Keep `SESSION_PASSWORD` secret and secure

## Development

The dashboard uses:
- **@octokit/rest** - GitHub API v3 client
- **iron-session** - Secure session management
- **bcryptjs** - Password hashing
- **SWR** - Data fetching (future enhancement)

## Future Enhancements

- Real-time GitHub webhook integration
- Image upload for avatar/project images
- Bulk repository sync
- Analytics integration
- Content preview before publishing
- Multi-user support with roles

## Troubleshooting

### "Unauthorized" errors
- Ensure `SESSION_PASSWORD` is set in `.env`
- Check that credentials are correct
- Clear browser cookies and try again

### GitHub API rate limit
- Add `GITHUB_TOKEN` to `.env`
- GitHub allows 60 requests/hour without token
- With token: 5,000 requests/hour

### Profile changes not reflecting
- Rebuild your site after profile updates
- Check `src/resources/content.tsx` for changes
- Verify file permissions

## Notes

- Repository sync creates/overwrites MDX files
- Existing project files won't be deleted unless you remove them manually
- GitHub data is fetched on-demand, not cached
- Profile updates require site rebuild to take effect
