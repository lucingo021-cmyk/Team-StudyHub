# Team StudyHub - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- Git

### Local Development

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd Team\ StudyHub
   npm run setup
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

### Production Deployment

#### Option 1: Docker Compose (Recommended)

1. **Deploy with Docker Compose:**
   ```bash
   ./deploy.sh
   ```

2. **Manual deployment:**
   ```bash
   # Build and start
   docker-compose up -d --build
   
   # Check logs
   docker-compose logs -f
   
   # Stop
   docker-compose down
   ```

#### Option 2: Manual Deployment

1. **Build the application:**
   ```bash
   npm run build:all
   ```

2. **Start production server:**
   ```bash
   npm run start:prod
   ```

#### Option 3: Docker Only

1. **Build Docker image:**
   ```bash
   docker build -t team-studyhub .
   ```

2. **Run container:**
   ```bash
   docker run -p 5000:5000 \
     -e NODE_ENV=production \
     -e JWT_SECRET=your-secret-key \
     -e DATABASE_URL="file:./dev.db" \
     team-studyhub
   ```

## 🔧 Configuration

### Environment Variables

Create `.env` files based on the examples:

- `.env.example` - Template for all variables
- `.env.local` - Frontend development
- `.env.production` - Production settings

### Required Environment Variables

```bash
# Backend
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-domain.com
DATABASE_URL="file:./dev.db"
JWT_SECRET=your-super-secret-jwt-key

# Frontend
VITE_API_URL=https://your-api-domain.com/api
```

### Database Setup

The application uses SQLite with Prisma:

```bash
# Generate Prisma client
cd backend && npm run prisma:generate

# Push schema to database
cd backend && npm run prisma:push

# Seed database (optional)
cd backend && npm run seed
```

## 🐳 Docker Configuration

### Dockerfile Features
- Multi-stage build for optimized image size
- Non-root user for security
- Health checks
- Production optimizations

### Docker Compose Services
- `app`: Main application
- `nginx`: Reverse proxy (optional, for production)

## 🔒 Security Considerations

1. **Change default secrets** in production
2. **Use HTTPS** in production
3. **Configure CORS** properly for your domain
4. **Set up proper logging** and monitoring
5. **Regular security updates**

## 📊 Monitoring

### Health Checks
- API Health: `GET /api/health`
- Docker Health: Built-in health checks

### Logs
```bash
# Docker Compose logs
docker-compose logs -f

# Application logs
docker-compose logs -f app
```

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts:**
   - Change ports in docker-compose.yml
   - Check if ports 3000/5000 are in use

2. **Database issues:**
   - Ensure database file permissions
   - Run Prisma migrations

3. **CORS errors:**
   - Update CLIENT_URL environment variable
   - Check CORS configuration in server.js

4. **Build failures:**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

### Debug Commands

```bash
# Check container status
docker-compose ps

# View detailed logs
docker-compose logs --tail=100 app

# Access container shell
docker-compose exec app sh

# Rebuild without cache
docker-compose build --no-cache
```

## 📈 Performance Optimization

1. **Enable gzip compression** in nginx
2. **Use CDN** for static assets
3. **Implement caching** strategies
4. **Monitor resource usage**

## 🔄 Updates and Maintenance

1. **Update dependencies:**
   ```bash
   npm update
   cd backend && npm update
   ```

2. **Database migrations:**
   ```bash
   cd backend && npm run prisma:migrate
   ```

3. **Redeploy:**
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

## 📞 Support

For deployment issues, check:
1. Application logs
2. Docker logs
3. Environment configuration
4. Network connectivity
5. Resource availability