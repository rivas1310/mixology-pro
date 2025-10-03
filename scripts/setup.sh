#!/bin/bash

# Mixology Pro - Setup Script
echo "🍹 Setting up Mixology Pro..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env.local ]; then
    echo "⚙️  Creating environment file..."
    cp env.example .env.local
    echo "✅ Environment file created. Please edit .env.local with your database credentials."
else
    echo "✅ Environment file already exists."
fi

# Generate Prisma client
echo "🗄️  Setting up database..."
npx prisma generate

# Check if DATABASE_URL is set
if grep -q "postgresql://username:password@localhost" .env.local; then
    echo "⚠️  Please update DATABASE_URL in .env.local with your database credentials."
    echo "   Example: DATABASE_URL=\"postgresql://user:password@localhost:5432/mixology_pro\""
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your database credentials"
echo "2. Run: npm run db:push (to sync database schema)"
echo "3. Run: npm run dev (to start development server)"
echo ""
echo "Happy mixing! 🍸"

