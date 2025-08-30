// JSON-RPC 2.0 types

/**
 *  A JSON-RPC payload, which are sent to a JSON-RPC server.
 */
export type JsonRpcRequest = {
	/**
	 *  The JSON-RPC request ID.
	 */
	id: number;

	/**
	 *  The JSON-RPC request method.
	 */
	method: string;

	/**
	 *  The JSON-RPC request parameters.
	 */
	params: Array<unknown> | Record<string, unknown>;

	/**
	 *  A required constant in the JSON-RPC specification.
	 */
	jsonrpc: '2.0';
};

export type JsonRpcResponse = {
	/**
	 *  A required constant in the JSON-RPC specification.
	 */
	jsonrpc: '2.0';
	/**
	 *  A JSON-RPC result, which are returned on success from a JSON-RPC server.
	 */
	result?: JsonRpcResult;
	/**
	 *  A JSON-RPC error, which are returned on failure from a JSON-RPC server.
	 */
	error?: JsonRpcError;
	/**
	 *  The JSON-RPC response ID.
	 */
	id: string | number | null;
};

/**
 *  A JSON-RPC result, which are returned on success from a JSON-RPC server.
 */
export type JsonRpcResult<T = unknown> = {
	/**
	 *  The response ID to match it to the relevant request.
	 */
	id: number;

	/**
	 *  The response result.
	 */
	result: T;
};

export type JsonRpcError<T = unknown> = {
	code: number;
	message?: string;
	data?: T;
};

export type JsonRpcNotification = Omit<JsonRpcRequest, 'id'>;
export type JsonRpcMessage = JsonRpcRequest | JsonRpcResponse | JsonRpcNotification;

// export type JsonRpcError = {
//   /**
//    *  The response ID to match it to the relevant request.
//    */
//   id: number;

//   /**
//    *  The response error.
//    */
//   error: {
//     code: number;
//     message?: string;
//     data?: unknown;
//   };
// };
