export function notFound(_req, res, _next) {
res.status(404).json({ message: 'Route not found' });
}


export function onError(err, _req, res, _next) {
console.error('[API ERROR]', err);


// MySQL friendly messages
const sqlCode = err && (err.code || err.sqlState || err.errno);
const detail = err && (err.sqlMessage || err.message);


// Translate common FK/duplicate errors to 400
const badRequestCodes = new Set([
'ER_NO_REFERENCED_ROW_2', // FK parent missing
'ER_ROW_IS_REFERENCED_2', // FK child exists
'ER_DUP_ENTRY', // duplicate key
'ER_BAD_NULL_ERROR',
]);


const status = badRequestCodes.has(sqlCode) ? 400 : (err.status || 500);
res.status(status).json({ message: 'Error', code: sqlCode || null, detail });
}