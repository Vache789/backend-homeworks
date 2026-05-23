## Reflection Questions

### 1. Why is Base64 not considered a security measure?
Base64 is strictly an **encoding scheme**, not encryption. Its purpose is to translate binary data into a set of 64 safe ASCII characters so it can be transmitted over protocols that only handle text (like HTTP or email). 

* **No Secret Key:** Unlike encryption , Base64 does not require a secret key to decode.
* **Trivial to Reverse:** Anyone who intercepts a Base64 string can decode it 

---

### 2. What is the purpose of the WWW-Authenticate header?
The `WWW-Authenticate` header is a standard HTTP response header sent by a server when a client tries to access a protected resource without proper authorization (returning a **401 Unauthorized** status code).

---

### 3. In what real-world situations is Basic Auth still acceptable?
Basic Auth sends credentials as a simple Base64-encoded string in the header, making it inherently insecure on its own. However, it is still acceptable to use in specific, controlled real-world scenarios, **provided it is strictly paired with HTTPS** to encrypt:

* **Internal Microservices / Private Networks:** For service-to-service communication inside a private virtual network (VPC) where traffic never touches the public internet.
* **Local Development & Prototyping:** Quick setup for staging environments, internal tools, or routers where you just need a minimal barrier to keep out accidental public access.
* **Legacy System Integration:** Interfacing with older enterprise hardware or legacy systems that do not support modern token-based auth (like OAuth2).
* **Automated Scripts & Simple Cron Jobs:** Fetching a quick backup or triggering a webhook where setting up complex token rotation is overkill, as long as the endpoint is secure and hidden.