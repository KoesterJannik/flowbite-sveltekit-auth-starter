# How to setup
1. Clone repository to server
2. change the .env credentials to yours
3. npm install
4. npm run build
5. npx prisma db push
6. pm2 start npm -- start


DATABASE_URL="mongodb+srv://bytecreations:ByteCreations2023!@helba.uxbhemd.mongodb.net/helbadash?retryWrites=true&w=majority"
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_SECRET=secret
ORIGIN=https://test.helba-ltd.eu 
PORT=3000
JWT_EXPIRES_IN=24h
MAIL_SENDER=dashboard@evercompany.eu
MAIL_PASSWORD=Dashboard2023!
MAIL_HOST=10.100.3.19 
MAIL_PORT=465
NINJA_TRADER_SECRET_KEY=secret
INVOICE_NINJA_URL=https://invoice.evercompany.eu
INVOICE_NINJA_API_TOKEN=6Ppwse3wtb35bFl5IXdEJhYfbQqTtDPxQP1JxRmqpEhFsRb1A8UnyvhhGu7s2Cmg 