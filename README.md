# NEETVIDYA
Coaching and Examination Management Platform for a newly established tutoring institute.

Public marketing website plus three portals (Student, Teacher, Admin) on one
Express REST API backed by MongoDB.
**Stack:** React 18 + Vite 5 · Tailwind · Express 4 · MongoDB/Mongoose 8 · JWT · Cloudinary

## Run
```bash
npm run install-all          # install root + server + client
npm run dev                  # backend :5000 + frontend :5173
cd server && npm run seed    # creates ONLY the admin (build the rest from /admin)
```

## Docs
- [`docs/HOWTORUN.md`](docs/HOWTORUN.md) — install, seed, run, deploy
- [`docs/TECHNICAL.md`](docs/TECHNICAL.md) — architecture, data model, API, flows

## Temporary deployment setting: email is disabled

Email delivery is intentionally turned off for the current deployment. The email
templates and Resend integration remain in the code, but the application does
not send verification, verification-resend, password-reset, or welcome emails.

### Helping a user who forgot their password

The admin panel does not currently have a password-reset action. An administrator
with authorized access to the MongoDB database can issue a temporary password:

1. Generate a strong, unique temporary password using a password manager and
   share it with the user through a private channel.
2. In MongoDB Atlas Data Explorer, open the app database's `users` collection
   and find the account by its lowercase `email`.
3. Set that document's `password` field to a bcrypt hash of the temporary
   password (bcryptjs, 10 rounds). From the `server` directory, run this and
   enter the temporary password at the prompt:

   ```bash
   node -e "const r=require('readline').createInterface({input:process.stdin,output:process.stdout});r.question('Temporary password: ',p=>require('bcryptjs').hash(p,10).then(h=>{console.log(h);r.close()}))"
   ```

4. Set `mustChangePassword` to `true` and unset `refreshToken`,
   `passwordResetToken`, and `passwordResetExpires`. This invalidates the
   stored refresh token and requires the user to change the temporary password
   after logging in. Already-issued access tokens may remain valid until they
   expire.
5. Have the user sign in with the temporary password and choose a new private
   password when prompted. Do not reuse the temporary password.

The `password` value must be the generated bcrypt hash, never the plain-text
password. Restrict database access to trusted administrators and do not paste
passwords or hashes into tickets, chat, or source control.

### Changes to revisit when enabling email

This is a temporary code change, not a permanent removal of email support:

- `server/src/services/auth.service.js`: new registrations are marked
  `emailVerified: true`; registration no longer sends verification mail; the
  login verification check is commented out (so existing unverified accounts
  can log in); retrying registration activates an existing unverified account;
  resend-verification and forgot-password email flows return an unavailable
  message. Their earlier send logic is retained in comments.
- `client/src/pages/public/RegisterPage.jsx`: signup confirmation says the
  account is active and ready to sign in.
- `client/src/pages/public/ForgotPasswordPage.jsx`: password recovery explains
  that email is unavailable and directs users to an administrator.
- `server/src/services/email.service.js`: email templates and Resend delivery
  implementation remain available; welcome email has no active caller.
- `docs/HOWTORUN.md` and `docs/TECHNICAL.md`: deployment behavior is documented.

To re-enable email later, restore the verification and reset email calls in
`auth.service.js`, restore the login verification rule if verification should
be required again, update the registration and forgot-password messages, and
configure `RESEND_API_KEY`, `EMAIL_FROM`, and the deployed `CLIENT_URL` on the
backend host. Review these files together before reverting so unrelated changes
in the worktree are preserved.

Services:

1. render
2. vercel
3. mongodb
4. clodinary
5. gmail
6. github

---

**Designed & developed by [Sabir Ali Mondal](https://github.com/Sabir-Ali-Mondal)**
