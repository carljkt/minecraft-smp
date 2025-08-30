export const NotificationEvents = {
	// Players events
	/**
	 * Player joined
	 */
	PlayerJoined: 'notification:players/joined',

	/**
	 * Player left
	 */
	PlayerLeft: 'notification:players/left',

	// Server lifecycle events
	/**
	 * Server Started
	 */
	ServerStarted: 'notification:server/started',

	/**
	 * Server shutting down
	 */
	ServerStopping: 'notification:server/stopping',

	/**
	 * Server save started
	 */
	ServerSaving: 'notification:server/saving',

	/**
	 * Server save completed
	 */
	ServerSaved: 'notification:server/saved',

	/**
	 * Server status heartbeat
	 */
	ServerStatus: 'notification:server/status',

	// Operator events
	/**
	 * Player was oped
	 */
	OperatorAdded: 'notification:operators/added',

	/**
	 * Player was deoped
	 */
	OperatorRemoved: 'notification:operators/removed',

	// Allowlist events
	/**
	 * Player was added to the allowlist
	 */
	AllowlistAdded: 'notification:allowlist/added',

	/**
	 * Player was removed from allowlist
	 */
	AllowlistRemoved: 'notification:allowlist/removed',

	// IP Ban events
	/**
	 * IP was added to ip ban list
	 */
	IPBanAdded: 'notification:ip_bans/added',

	/**
	 * IP was removed from ip ban list
	 */
	IPBanRemoved: 'notification:ip_bans/removed',

	// Ban events
	/**
	 * Player was added to the ban list
	 */
	BanAdded: 'notification:bans/added',

	/**
	 * Player was removed from the ban list
	 */
	BanRemoved: 'notification:bans/removed',

	// Gamerule events
	/**
	 * Gamerule was changed
	 */
	GameruleUpdated: 'notification:gamerules/updated',
} as const;
