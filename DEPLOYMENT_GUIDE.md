# Ubuntu Server Deployment Guide for Plugin ValueFlight

This guide will help you deploy the application on Ubuntu server with Nginx and SSL using Certbot.

## Prerequisites

- Ubuntu 20.04 or later
- Domain name pointing to your server (plugin.valueflight.dev)
- Root or sudo access
- Git installed

## Step 1: Update System and Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

## Step 2: Setup MongoDB

```bash
# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod

# (Optional) Create MongoDB user for the application
mongosh
```

In MongoDB shell:
```javascript
use plugin-auth
db.createUser({
  user: "pluginapp",
  pwd: "your-secure-password",
  roles: [{ role: "readWrite", db: "plugin-auth" }]
})
exit
```

## Step 3: Clone and Setup Application

```bash
# Create application directory
sudo mkdir -p /var/www/plugin.valueflight.dev
sudo chown $USER:$USER /var/www/plugin.valueflight.dev

# Clone repository
cd /var/www/plugin.valueflight.dev
git clone https://github.com/your-username/your-repo.git .

# Install dependencies
npm install

# Build Next.js application
npm run build
```

## Step 4: Configure Environment Variables

```bash
# Create production environment file
cp .env.local.example .env.local
nano .env.local
```

Update the `.env.local` file with production values:
```env
# Frontend environment variables
NEXT_PUBLIC_API_URL=https://plugin.valueflight.dev/api

# Server Configuration
NODE_ENV=production
PORT=5000

# Frontend URL
FRONTEND_URL=https://plugin.valueflight.dev

# Database (if using authentication)
MONGODB_URI=mongodb://pluginapp:your-secure-password@localhost:27017/plugin-auth?authSource=plugin-auth
# Or without auth:
# MONGODB_URI=mongodb://localhost:27017/plugin-auth

# JWT Secret (Generate a strong secret!)
JWT_SECRET=your-super-secret-production-key-change-this-now
JWT_EXPIRE=7d

# Email Configuration (Gmail SMTP)
EMAIL_USER=mail
EMAIL_PASS=pass
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Step 5: Setup PM2 Process Manager

Create PM2 ecosystem file:
```bash
nano ecosystem.config.js
```

Add the following content:
```javascript
module.exports = {
  apps: [
    {
      name: 'plugin-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/plugin.valueflight.dev/plugin12345',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/pm2/plugin-frontend-error.log',
      out_file: '/var/log/pm2/plugin-frontend-out.log',
      time: true
    },
    {
      name: 'plugin-backend',
      script: './server/index.js',
      cwd: '/var/www/plugin.valueflight.dev/plugin12345',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: '/var/log/pm2/plugin-backend-error.log',
      out_file: '/var/log/pm2/plugin-backend-out.log',
      time: true
    }
  ]
};
```

Start applications with PM2:
```bash
# Create log directory
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

# Start applications
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd -u $USER --hp /home/$USER
# Follow the command output instructions
```

## Step 6: Configure Nginx

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/plugin.valueflight.dev
```

Add the following configuration:
```nginx
# Upstream definitions
upstream frontend {
    server localhost:3001;
    keepalive 64;
}

upstream backend {
    server localhost:5000;
    keepalive 64;
}

# Rate limiting zones
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=auth:10m rate=3r/s;

# HTTP redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name plugin.valueflight.dev www.plugin.valueflight.dev;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name plugin.valueflight.dev www.plugin.valueflight.dev;

    # SSL certificates (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/plugin.valueflight.dev/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/plugin.valueflight.dev/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logs
    access_log /var/log/nginx/plugin.valueflight.dev.access.log;
    error_log /var/log/nginx/plugin.valueflight.dev.error.log;

    # Max upload size
    client_max_body_size 10M;

    # API routes
    location /api {
        # Apply rate limiting to auth endpoints
        location ~* /api/auth/(login|register|forgot-password) {
            limit_req zone=auth burst=5 nodelay;

            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 90;
        }

        # General API rate limiting
        limit_req zone=general burst=20 nodelay;

        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90;
    }

    # Next.js app
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://frontend;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }

    # Favicon
    location = /favicon.ico {
        proxy_pass http://frontend;
        access_log off;
        log_not_found off;
    }

    # Robots.txt
    location = /robots.txt {
        proxy_pass http://frontend;
        access_log off;
        log_not_found off;
    }
}
```

Enable the site:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/plugin.valueflight.dev /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Step 7: Setup SSL with Certbot

```bash
# Obtain SSL certificate
sudo certbot --nginx -d plugin.valueflight.dev -d www.plugin.valueflight.dev

# Follow the prompts:
# - Enter email address
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: yes)

# Test auto-renewal
sudo certbot renew --dry-run
```

## Step 8: Setup Firewall

```bash
# Install UFW if not already installed
sudo apt install -y ufw

# Allow SSH (important - do this first!)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw --force enable

# Check status
sudo ufw status
```

## Step 9: Monitoring and Maintenance

### View PM2 logs
```bash
# View all logs
pm2 logs

# View specific app logs
pm2 logs plugin-frontend
pm2 logs plugin-backend

# Monitor resources
pm2 monit
```

### View Nginx logs
```bash
# Access logs
sudo tail -f /var/log/nginx/plugin.valueflight.dev.access.log

# Error logs
sudo tail -f /var/log/nginx/plugin.valueflight.dev.error.log
```

### Restart services
```bash
# Restart PM2 apps
pm2 restart all
pm2 restart plugin-frontend
pm2 restart plugin-backend

# Restart Nginx
sudo systemctl restart nginx

# Restart MongoDB
sudo systemctl restart mongod
```

## Step 10: Update Application

When you need to update the application:

```bash
cd /var/www/plugin.valueflight.dev

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build Next.js
npm run build

# Restart PM2 apps
pm2 restart all

# Check status
pm2 status
```

## Security Recommendations

1. **Use strong passwords** for MongoDB and JWT secret
2. **Enable MongoDB authentication** in production
3. **Setup fail2ban** to prevent brute force attacks:
   ```bash
   sudo apt install fail2ban
   ```

4. **Regular updates**:
   ```bash
   # Setup automatic security updates
   sudo apt install unattended-upgrades
   sudo dpkg-reconfigure unattended-upgrades
   ```

5. **Backup MongoDB regularly**:
   ```bash
   # Create backup script
   mongodump --out /backup/mongodb/$(date +%Y%m%d)
   ```

6. **Monitor server resources**:
   ```bash
   # Install monitoring tools
   sudo apt install htop nethogs iotop
   ```

## Troubleshooting

### Application not starting
```bash
# Check PM2 logs
pm2 logs --lines 100

# Check if ports are in use
sudo netstat -tlnp | grep :3001
sudo netstat -tlnp | grep :5000
```

### MongoDB issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# View MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Nginx errors
```bash
# Check Nginx syntax
sudo nginx -t

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### SSL certificate issues
```bash
# Renew certificate manually
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

## Production Checklist

- [ ] Server updated (`sudo apt update && sudo apt upgrade`)
- [ ] Node.js 20.x installed
- [ ] MongoDB installed and running
- [ ] PM2 installed globally
- [ ] Application cloned and dependencies installed
- [ ] Environment variables configured
- [ ] Next.js built (`npm run build`)
- [ ] PM2 processes running
- [ ] Nginx configured and running
- [ ] SSL certificate obtained
- [ ] Firewall configured
- [ ] MongoDB authentication enabled
- [ ] Strong JWT secret generated
- [ ] Email configuration tested
- [ ] Automatic SSL renewal tested
- [ ] Backup strategy in place
- [ ] Monitoring tools installed

## Support

For any issues, check:
1. PM2 logs: `pm2 logs`
2. Nginx logs: `/var/log/nginx/`
3. MongoDB logs: `/var/log/mongodb/`
4. Application logs in PM2

Remember to keep your server updated and monitor resource usage regularly!