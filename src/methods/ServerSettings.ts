import { Client } from '../client/index.js';

export class ServerSettingsMethods {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Get whether automatic world saving is enabled on the server
	 */
	async getAutosave(): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/autosave');
	}

	/**
	 * Enable or disable automatic world saving on the server
	 */
	async setAutosave(enable: boolean): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/autosave/set', [enable]);
	}

	/**
	 * Get the current difficulty level of the server
	 */
	async getDifficulty(): Promise<string> {
		return this.client.request<string>('minecraft:serversettings/difficulty');
	}

	/**
	 * Set the difficulty level of the server
	 */
	async setDifficulty(difficulty: string): Promise<string> {
		return this.client.request<string>('minecraft:serversettings/difficulty/set', [difficulty]);
	}

	/**
	 * Get whether allowlist enforcement is enabled
	 */
	async getEnforceAllowlist(): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/enforce_allowlist');
	}

	/**
	 * Enable or disable allowlist enforcement
	 */
	async setEnforceAllowlist(enforce: boolean): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/enforce_allowlist/set', [enforce]);
	}

	/**
	 * Get whether the allowlist is enabled on the server
	 */
	async getUseAllowlist(): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/use_allowlist');
	}

	/**
	 * Enable or disable the allowlist on the server
	 */
	async setUseAllowlist(use: boolean): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/use_allowlist/set', [use]);
	}

	/**
	 * Get the maximum number of players allowed to connect to the server
	 */
	async getMaxPlayers(): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/max_players');
	}

	/**
	 * Set the maximum number of players allowed to connect to the server
	 */
	async setMaxPlayers(max: number): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/max_players/set', [max]);
	}

	/**
	 * Get the number of seconds before the game pauses when empty
	 */
	async getPauseWhenEmptySeconds(): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/pause_when_empty_seconds');
	}

	/**
	 * Set the number of seconds before the game pauses when empty
	 */
	async setPauseWhenEmptySeconds(seconds: number): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/pause_when_empty_seconds/set', [seconds]);
	}

	/**
	 * Get the number of seconds before idle players are kicked
	 */
	async getPlayerIdleTimeout(): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/player_idle_timeout');
	}

	/**
	 * Set the number of seconds before idle players are kicked
	 */
	async setPlayerIdleTimeout(seconds: number): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/player_idle_timeout/set', [seconds]);
	}

	/**
	 * Get whether flight is allowed for players in Survival mode
	 */
	async getAllowFlight(): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/allow_flight');
	}

	/**
	 * Set whether flight is allowed for players in Survival mode
	 */
	async setAllowFlight(allowed: boolean): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/allow_flight/set', [allowed]);
	}

	/**
	 * Get the server's message of the day
	 */
	async getMotd(): Promise<string> {
		return this.client.request<string>('minecraft:serversettings/motd');
	}

	/**
	 * Set the server's message of the day
	 */
	async setMotd(message: string): Promise<string> {
		return this.client.request<string>('minecraft:serversettings/motd/set', [message]);
	}

	/**
	 * Get the spawn protection radius in blocks
	 */
	async getSpawnProtectionRadius(): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/spawn_protection_radius');
	}

	/**
	 * Set the spawn protection radius in blocks
	 */
	async setSpawnProtectionRadius(radius: number): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/spawn_protection_radius/set', [radius]);
	}

	/**
	 * Get whether players are forced to use the server's default game mode
	 */
	async getForceGameMode(): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/force_game_mode');
	}

	/**
	 * Set whether players are forced to use the server's default game mode
	 */
	async setForceGameMode(force: boolean): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/force_game_mode/set', [force]);
	}

	/**
	 * Get the server's default game mode
	 */
	async getGameMode(): Promise<string> {
		return this.client.request<string>('minecraft:serversettings/game_mode');
	}

	/**
	 * Set the server's default game mode
	 */
	async setGameMode(mode: string): Promise<string> {
		return this.client.request<string>('minecraft:serversettings/game_mode/set', {
			mode,
		});
	}

	/**
	 * Get the server's view distance in chunks
	 */
	async getViewDistance(): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/view_distance');
	}

	/**
	 * Set the server's view distance in chunks
	 */
	async setViewDistance(distance: number): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/view_distance/set', [distance]);
	}

	/**
	 * Get the server's simulation distance in chunks
	 */
	async getSimulationDistance(): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/simulation_distance');
	}

	/**
	 * Set the server's simulation distance in chunks
	 */
	async setSimulationDistance(distance: number): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/simulation_distance/set', [distance]);
	}

	/**
	 * Get whether the server accepts player transfers from other servers
	 */
	async getAcceptTransfers(): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/accept_transfers');
	}

	/**
	 * Set whether the server accepts player transfers from other servers
	 */
	async setAcceptTransfers(accept: boolean): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/accept_transfers/set', [accept]);
	}

	/**
	 * Get the interval in seconds between server status heartbeats
	 */
	async getStatusHeartbeatInterval(): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/status_heartbeat_interval');
	}

	/**
	 * Set the interval in seconds between server status heartbeats
	 */
	async setStatusHeartbeatInterval(seconds: number): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/status_heartbeat_interval/set', [seconds]);
	}

	/**
	 * Get the permission level required for operator commands
	 */
	async getOperatorUserPermissionLevel(): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/operator_user_permission_level');
	}

	/**
	 * Set the permission level required for operator commands
	 */
	async setOperatorUserPermissionLevel(level: number): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/operator_user_permission_level/set', [level]);
	}

	/**
	 * Get whether the server hides online player information from status queries
	 */
	async getHideOnlinePlayers(): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/hide_online_players');
	}

	/**
	 * Set whether the server hides online player information from status queries
	 */
	async setHideOnlinePlayers(hide: boolean): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/hide_online_players/set', [hide]);
	}

	/**
	 * Get whether the server responds to connection status requests
	 */
	async getStatusReplies(): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/status_replies');
	}

	/**
	 * Set whether the server responds to connection status requests
	 */
	async setStatusReplies(enable: boolean): Promise<boolean> {
		return this.client.request<boolean>('minecraft:serversettings/status_replies/set', [enable]);
	}

	/**
	 * Get the entity broadcast range as a percentage
	 */
	async getEntityBroadcastRange(): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/entity_broadcast_range');
	}

	/**
	 * Set the entity broadcast range as a percentage
	 */
	async setEntityBroadcastRange(percentage_points: number): Promise<number> {
		return this.client.request<number>('minecraft:serversettings/entity_broadcast_range/set', [percentage_points]);
	}
}
