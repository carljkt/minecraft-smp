# minecraft-smp

A lightweight, fully-featured TypeScript client for the **Minecraft Server Management Protocol (MSMP)** introduced in **25w35a**.

## Features

- **Compatibility**

  Compatible with both **Node.js** and **web browsers**.

- **Automatic Reconnection**

  Handles broken connections gracefully by automatically attempting to reconnect with configurable backoff.

- **Request / Response Handling**

  Supports sending requests (e.g., `rpc.discover`, `minecraft:players`, `minecraft:allowlist/add`) with response handling built-in.

- **Full Protocol Coverage**
  - Supports all namespaced methods:
    `rpc.discover`, `minecraft:players`, `minecraft:allowlist`, `minecraft:operators`, `minecraft:server`, `minecraft:serversettings`, `minecraft:gamerules`, etc.
  - Supports all notification events such as `notification:players`, `notification:gamerules`.

## Getting Started

### Installation

```bash
npm install minecraft-smp
# or
pnpm add minecraft-smp
# or
yarn add minecraft-smp
```

### Initialization Example

```ts
import Client from 'minecraft-smp';

const client = new Client('ws://localhost:25585', {
	autoReconnect: true,
	reconnectInterval: 3_000,
});

await client.connect();

const schema = await client.request('rpc.discover');

console.log('API Schema:', schema);
```

## Usage Examples

### Discovering API Schema

```ts
const schema = await client.request('rpc.discover');

console.log('API Schema:', schema);
```

### Adding a Player to Allowlist

```ts
const players = [{ id: '853c80ef-3c37-49fd-aa49-938b674adae6' }, { name: 'Steve' }];

const result: Player[] = await client.Allowlist.add(players);

console.log('Allowlist updated:', result);
```

### Send System Message to All Players

```ts
// Get All Players on the Server
const players = await client.Players.get();

const message: Message = {
	literal: 'Hello World',
	translatable: '%1$s World',
	translatableParams: ['Hi'],
};

// using MessageBuilder
const message = new MessageBuilder()
	.setColor('Green')
	.setFormat('Bold')
	.setFormat('Italic')
	.addText('Hello ')
	.addText('World', { color: 'Aqua', formats: ['Bold', 'Underline'] });

// Send System Message
await client.Server.sendSystemMessage({
	receivingPlayers: players,
	message: message,
	overlay: true,
});
```

### Handling Notifications

```ts
// Player Joined the Server
client.onNotification('notification:players/joined', (player) => {
	const { id, name } = player;

	console.log(`Player joined: ${name} (${id}) joined the server`);
});

// Player Left the Server
client.onNotification(NotificationEvents.PlayerLeft, (player) => {
	const { id, name } = player;

	console.log(`Player left: ${name} (${id}) left the server`);
});
```

## Configuration Options

- `autoReconnect` _(boolean)_: Enable/disable automatic reconnection. **Default: `false`**
- `reconnectInterval` _(number)_: Delay between reconnect attempts (ms). **Default: `5000`**
- `maxReconnectAttempts` _(number)_: Number of max reconnection attempts. **Default: `10`**
- `requestTimeout` _(number)_: Maximum time in milliseconds to wait for a response to a request before rejecting. **Default: `30000`**

Example:

```ts
const client = new Client('ws://...', {
	autoReconnect: true,
	reconnectInterval: 5_000,
	maxReconnectAttempts: 10,
	requestTimeout: 30_000,
});
```

## TODO

- [ ] Tests
