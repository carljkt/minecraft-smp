import { IPBan, Operator, Player, ServerState, TypedGameRule } from './Minecraft.js';

export interface NotificationEventParams {
	'notification:players/joined': [player: Player];
	'notification:players/left': [player: Player];

	// Server lifecycle events
	'notification:server/started': [];
	'notification:server/stopping': [];
	'notification:server/saving': [];
	'notification:server/saved': [];
	'notification:server/status': [status: ServerState];

	// Operator events
	'notification:operators/added': [player: Operator];
	'notification:operators/removed': [player: Operator];

	// Allowlist events
	'notification:allowlist/added': [player: Player];
	'notification:allowlist/removed': [player: Player];

	// IP Ban events
	'notification:ip_bans/added': [ban: IPBan];
	'notification:ip_bans/removed': [ip: string];

	// Ban events
	'notification:bans/added': [player: Operator];
	'notification:bans/removed': [player: Operator];

	// Gamerule events
	'notification:gamerules/updated': [gamerule: TypedGameRule];
}
