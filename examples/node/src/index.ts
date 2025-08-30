import { Client, NotificationEvents, Message } from 'minecraft-smp';
const client = new Client('ws://localhost:25585', { autoReconnect: true });

client.on('connected', () => console.log('Connected to server'));
client.on('disconnected', (code, reason) => console.log('Disconnected:', code, reason));

client.onNotification(NotificationEvents.PlayerJoined, (player) => {
	console.log(`Player Joined: ${player.name} joined the server`);
});

client.onNotification('notification:players/left', (player) => {
	console.log(`Player Left: ${player.name} left the server`);
});

client.onNotification(NotificationEvents.GameruleUpdated, (gamerule) => {
	console.log(`Gamerule updated: ${gamerule} `);
});

async function main() {
	await client.connect();

	const serverStatus = await client.Server.status();
	console.log('Server Status:', serverStatus);

	const players = await client.Players.get();

	const message: Message = {
		literal: 'Hello World',
		translatable: '%1$s %2$s',
		translatableParams: ['Hi', 'World'],
	};

	await client.Server.sendSystemMessage({
		receivingPlayers: players,
		message: message,
		overlay: true,
	});
}

main();
