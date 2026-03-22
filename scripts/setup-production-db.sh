#!/bin/bash

echo "🔧 Setting up production database..."

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push --accept-data-loss

echo "✅ Database setup complete!"


