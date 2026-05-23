## Reflection Questions

### 1. How is API key authentication different from Basic Auth?
While both methods pass a secret token in the request headers, they serve fundamentally different purposes and have structural differences:

* **Identity Focus:** Basic Auth identifies a specific **user** by passing a username and password combination. API Key auth identifies a specific **application, project, or client** making the request, regardless of who the individual user is.
* **Credential Type:** Basic Auth uses standard user credentials that change whenever a user updates their password. API keys are long-lived, randomly generated strings (high entropy tokens) created specifically for machine-to-machine interactions.
* **State & Session:** Basic Auth often requires checking user tables or running expensive password hashing functions (like bcrypt) if not cached. API keys can be quickly looked up in a database or cache, or even self-validated if formatted as a signed token.

---

### 2. Why is API key authentication usually a poor choice for user-facing applications?
Using standard API keys in client-side, user-facing apps (like a frontend React SPA, iOS, or Android app) introduces major security flaws:

* **Exposure in Source Code:** Since frontend code runs directly on the user's browser or device, anyone can open the developer tools (Network tab) or decompile the app bundle to extract the API key.
* **Lack of Granular User Permissions:** API keys usually grant broad access to the backend resources. If an API key is embedded in a mobile app, every single user shares that same key, making it impossible to restrict or track data access on a per-user basis.
* **No Expiration Mechanism:** API keys are typically long-lived and do not automatically expire like short-lived session tokens or JWTs, keeping the window of vulnerability open indefinitely if leaked.

---

### 3. What strategies can be used to keep API keys safe and to revoke them when leaked?
To secure API keys and handle compromises effectively, developers use several layers of defense:

#### Keeping Keys Safe
* **Backend Proxying (The Best Practice):** Never expose API keys to the frontend. Instead, route frontend requests to your own backend server, which appends the API key securely and forwards the request to the third-party service.
* **Environment Variables:** Store keys in secure environment files (`.env`) on the server and ensure these files are added to `.gitignore` so they are never pushed to public repositories.
* **IP and Domain Restrictions:** Restrict the API key at the provider level so it only accepts requests coming from specific server IP addresses or trusted web domains.

#### Handling Leaks & Revocation
* **Secret Scanning Tools:** Use tools like GitHub Secret Scanning or GitGuardian to automatically detect if a key was accidentally committed to a repository and block the push or alert you immediately.
* **Instant Revocation & Rotation:** Design system architecture to support seamless key rotation. When a leak is detected, generate a new key, update the environment variables, and programmatically deactivate (revoke) the compromised key with zero downtime.
* **Split/Dual-Key Support:** Many modern APIs provide two active keys simultaneously (Primary and Secondary). This allows you to transition your application to the secondary key before revoking the leaked primary key.