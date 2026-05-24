---

## Reflection Questions

### 1. What are the three parts of a JWT and what does each one contain?

A JWT has three parts separated by dots (`.`):

- **Header:** Contains the token type (`JWT`) and the security algorithm (like `HS256`).
- **Payload:** Contains the actual data, like the user's `email`, plus creation (`iat`) and expiration (`exp`) times.
- **Signature:** Created by the server using the header, payload, and `JWT_SECRET` to make sure the token is not changed or faked.

### 2. Why is it important to set an expiration time on a JWT?

JWTs are **stateless** and not saved in the database, so the server cannot easily cancel them. If a token is stolen, a hacker can use it forever. Setting an expiration time (like `1h`) improves security because the token automatically stops working after that time.

### 3. What are the trade-offs of storing the token in sessionStorage versus an httpOnly cookie?

- **sessionStorage:** Easy to use in JavaScript and deletes automatically when the tab closes, but less secure because bad scripts can read it (XSS attack).
- **httpOnly cookie:** More secure for production because JavaScript **cannot** access it at all (safe from XSS), but it can be weak against CSRF attacks.

### 4. How would you handle logout if JWTs cannot be revoked once issued?

Since the server cannot cancel a live token, we handle logout like this:

- **Frontend:** Simply delete the token from `sessionStorage` so the client can't send it anymore.
- **Backend:** Use short expiration times so tokens die fast, or use a fast database (like **Redis**) as a temporary "blacklist" to block logged-out tokens.
