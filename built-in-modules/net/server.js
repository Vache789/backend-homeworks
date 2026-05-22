const net = require("node:net");

const map = new Map();

const server = net.createServer((socket) => {
  console.log("Server initialized");

  socket.write("Please enter your username");

  let clientName = null;

  socket.on("data", (data) => {
    const input = data.toString().trim();

    if (clientName === null) {
      if (map.has(input)) {
        socket.write("Username already taken please try another one:");
      } else if (!input) {
        socket.write("Username cannot be empty");
      } else {
        clientName = input;
        map.set(clientName, socket);
        socket.write(`Welcome ${clientName}, you have joined the chat!`);
      }
      return;
    }

    if (input.startsWith("/dm ")) {
      const parts = input.split(" ");
      if (map.has(parts[1])) {
        let targetUser = map.get(parts[1]);
        targetUser.write(parts.slice(2).join(" "));
      } else {
        socket.write("User not found");
      }
      return;
    }

    for (const user of map.values()) {
      if (user !== socket) {
        user.write(`${clientName} says: ${input}`);
      }
    }
  });

  socket.on("close", () => {
    if (clientName) {
      map.delete(clientName);
      console.log(`${clientName} has disconnected`);
    }
  });
});

server.listen(3001, "localhost");
