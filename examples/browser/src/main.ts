import { Client, NotificationEvents, Message, Player } from 'minecraft-smp';

let client: Client | null = null;

// DOM elements
const statusEl = document.getElementById('status') as HTMLDivElement;
const logEl = document.getElementById('log') as HTMLDivElement;
const serverUrlInput = document.getElementById('serverUrl') as HTMLInputElement;
const statusBtn = document.getElementById('statusBtn') as HTMLButtonElement;
const playersBtn = document.getElementById('playersBtn') as HTMLButtonElement;
const messageBtn = document.getElementById('messageBtn') as HTMLButtonElement;
const fallDamageBtn = document.getElementById('fallDamageBtn') as HTMLButtonElement;
const schemaBtn = document.getElementById('schemaBtn') as HTMLButtonElement;

// Store current players
let currentPlayers: Player[] = [];

// Logging function
function log(message: string): void {
	const timestamp = new Date().toLocaleTimeString();
	logEl.textContent += `[${timestamp}] ${message}\n`;
	logEl.scrollTop = logEl.scrollHeight;
	console.log(message);
}

// Update UI state
function updateUI(connected: boolean): void {
	if (connected) {
		statusEl.textContent = 'Status: Connected';
		statusEl.className = 'status connected';
		schemaBtn.disabled = false;
		statusBtn.disabled = false;
		playersBtn.disabled = false;
		messageBtn.disabled = false;
		fallDamageBtn.disabled = false;
	} else {
		statusEl.textContent = 'Status: Disconnected';
		statusEl.className = 'status disconnected';
		schemaBtn.disabled = true;
		statusBtn.disabled = true;
		playersBtn.disabled = true;
		messageBtn.disabled = true;
		fallDamageBtn.disabled = true;
	}
}

// Connect function
async function connect(): Promise<void> {
	try {
		if (client) {
			client.disconnect();
		}

		const url = serverUrlInput.value || 'ws://localhost:25585';
		statusEl.textContent = 'Status: Connecting...';
		statusEl.className = 'status connecting';

		log(`Attempting to connect to ${url}...`);

		client = new Client(url, { autoReconnect: true });

		// Event listeners
		client.on('connected', () => {
			log('Connected to server');
			updateUI(true);
		});

		client.on('disconnected', (code: number, reason: string) => {
			log(`Disconnected: ${code} - ${reason}`);
			updateUI(false);
		});

		client.on('error', (error: Error) => {
			log(`Error: ${error.message || JSON.stringify(error, null, 2)}`);
			updateUI(false);
		});

		client.onNotification(NotificationEvents.PlayerJoined, (player: Player) => {
			log(`Player Joined: ${player.name} joined the server`);
		});

		client.onNotification('notification:players/left', (player: Player) => {
			log(`Player Left: ${player.name} left the server`);
		});

		client.onNotification(NotificationEvents.GameruleUpdated, (gamerule) => {
			log(`Gamerule updated: ${JSON.stringify(gamerule, null, 2)} `);
		});

		await client.connect();
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		log(`Connection failed: ${errorMessage}`);
		updateUI(false);
	}
}

// Disconnect function
async function disconnect(): Promise<void> {
	if (client) {
		try {
			client.disconnect();
			log('Manually disconnected');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			log(`Disconnect error: ${errorMessage}`);
		}
		client = null;
	}
	updateUI(false);
}

// Get server status
async function getServerStatus(): Promise<void> {
	if (!client) {
		log('Not connected to server');
		return;
	}

	try {
		log('Fetching server status...');
		const serverStatus = await client.Server.status();
		log(`Server Status: ${JSON.stringify(serverStatus, null, 2)}`);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		log(`Failed to get server status: ${errorMessage}`);
	}
}

async function getSchema(): Promise<void> {
	if (!client) {
		log('Not connected to server');
		return;
	}

	try {
		const apiSchema = await client.request('rpc.discover');
		log(`Schema: ${JSON.stringify(apiSchema, null, 2)}`);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		log(`Failed to get api schema: ${errorMessage}`);
	}
}

// Get players
async function getPlayers(): Promise<void> {
	if (!client) {
		log('Not connected to server');
		return;
	}

	try {
		log('Fetching players...');
		const players = await client.Players.get();
		log(`Players: ${JSON.stringify(players, null, 2)}`);

		// Store players for message sending
		currentPlayers = players;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		log(`Failed to get players: ${errorMessage}`);
	}
}

// Toogle Fall Damage rule
async function toggleFallDamage(): Promise<void> {
	if (!client) {
		log('Not connected to server');
		return;
	}

	try {
		const gameRules = await client.GameRules.get();

		// https://minecraft.wiki/w/Game_rule
		const fallDamageRule = gameRules.find((rule) => rule.key === 'fallDamage');

		const toggleValue = !JSON.parse(fallDamageRule.value);
		client.GameRules.update({ fallDamage: toggleValue });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		log(`Failed to toggle fall damage: ${errorMessage}`);
	}
}

// Send system message
async function sendMessage(): Promise<void> {
	if (!client) {
		log('Not connected to server');
		return;
	}

	try {
		// Get current players first if not available
		let players = currentPlayers;
		if (!players || players.length === 0) {
			log('Getting players first...');
			players = await client.Players.get();
			currentPlayers = players;
		}

		const message: Message = {
			literal: 'Hello World from Browser!',
			translatable: '%1$s %2$s',
			translatableParams: ['Hi', 'World'],
		};

		log('Sending system message...');
		await client.Server.sendSystemMessage({
			receivingPlayers: players,
			message: message,
			overlay: true,
		});

		log('System message sent successfully');
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		log(`Failed to send message: ${errorMessage}`);
	}
}

// Clear log
function clearLog(): void {
	logEl.textContent = '';
}

// Make functions available globally for HTML onclick handlers
declare global {
	interface Window {
		connect: () => Promise<void>;
		disconnect: () => Promise<void>;
		getServerStatus: () => Promise<void>;
		getPlayers: () => Promise<void>;
		sendMessage: () => Promise<void>;
		toggleFallDamage: () => Promise<void>;
		clearLog: () => void;
		getSchema: () => Promise<unknown>;
	}
}

window.connect = connect;
window.disconnect = disconnect;
window.getServerStatus = getServerStatus;
window.getPlayers = getPlayers;
window.sendMessage = sendMessage;
window.toggleFallDamage = toggleFallDamage;
window.clearLog = clearLog;
window.getSchema = getSchema;

// Initialize
log('Minecraft SMP Browser Example initialized');
log('Click Connect to start');

// Handle page unload
window.addEventListener('beforeunload', async () => {
	if (client) {
		try {
			client.disconnect();
		} catch (error) {
			console.error(error);
		}
	}
});
