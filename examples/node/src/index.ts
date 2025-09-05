import { Client, NotificationEvents, MessageBuilder } from 'minecraft-smp';
const client = new Client('ws://localhost:25585', { autoReconnect: true });

client.on('connected', () => console.log('Connected to server'));
client.on('disconnected', (code, reason) => console.log('Disconnected:', code, reason));

client.onNotification(NotificationEvents.PlayerJoined, (player) => {
	console.log(`Player Joined: ${player.name} (${player.id}) joined the server`);
});

client.onNotification('notification:players/left', (player) => {
	console.log(`Player Left: ${player.name} (${player.id}) left the server`);
});

client.onNotification(NotificationEvents.GameruleUpdated, (gamerule) => {
	console.log(`Gamerule updated:`, gamerule);
});

async function main() {
	await client.connect();

	const serverStatus = await client.Server.status();
	console.log('Server Status:', serverStatus);

	const players = await client.Players.get();

	const message = new MessageBuilder()
		.setColor('Green')
		.setFormat('Bold')
		.setFormat('Italic')
		.addText('Hello ')
		.addText('World', { color: 'Aqua', formats: ['Bold', 'Underline'] });

	await client.Server.sendSystemMessage({
		receivingPlayers: players,
		message: message,
		overlay: true,
	});
}

main();
