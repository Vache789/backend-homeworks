const http = require("node:http");

let books = [
  { id: 1, title: "Clean Code", author: "Robert Martin", year: 2008 },
  { id: 2, title: "The Pragmatic Programmer", author: "Andy Hunt", year: 1999 },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/books") {
    res.writeHead(200);
    res.end(JSON.stringify(books));
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/books/")) {
    const id = parseInt(req.url.split("/")[2]);
    const book = books.find((b) => b.id === id);

    if (book) {
      res.writeHead(200);
      res.end(JSON.stringify(book));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Book not found" }));
    }
    return;
  }

  if (req.method === "POST" && req.url === "/books") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.title || !data.author) {
          res.writeHead(400);
          return res.end(
            JSON.stringify({ error: "Title and Author are required" }),
          );
        }
        const newBook = {
          id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
          title: data.title,
          author: data.author,
          year: data.year || "Unknown",
        };
        books.push(newBook);
        res.writeHead(201);
        res.end(JSON.stringify(newBook));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  if (req.method === 'PUT' && req.url.startsWith('/books/')) {
    const id = parseInt(req.url.split('/')[2]);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Book not found" }));
    }
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      books[index] = { id, ...data };
      res.writeHead(200);
      res.end(JSON.stringify(books[index]));
    });
    return;
  }

    if (req.method === 'PATCH' && req.url.startsWith('/books/')) {
    const id = parseInt(req.url.split('/')[2]);
    const book = books.find(b => b.id === id);
    if (!book) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Book not found" }));
    }
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      Object.assign(book, data);
      res.writeHead(200);
      res.end(JSON.stringify(book));
    });
    return;
  }

    if (req.method === 'DELETE' && req.url.startsWith('/books/')) {
    const id = parseInt(req.url.split('/')[2]);
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
      books.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Book not found" }));
    }
    return;
  }

  if (req.method === 'OPTIONS' && req.url === '/books') {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.writeHead(204);
    return res.end();
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});