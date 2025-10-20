export function errorHandler(err, req, res, next) {
  // Log error details
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  const status = err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Don't leak error details in production
  const message = isDevelopment 
    ? err.message || 'Server Error' 
    : status === 500 ? 'Internal Server Error' : err.message || 'Server Error';

  res.status(status).json({ 
    success: false, 
    message,
    ...(isDevelopment && { stack: err.stack })
  });
}