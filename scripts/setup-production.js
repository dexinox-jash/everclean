#!/usr/bin/env node

/**
 * PRODUCTION SETUP SCRIPT
 * 
 * Run this script to prepare your app for Vercel deployment
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Everclean Production Setup\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local not found!');
  console.log('📝 Creating from .env.example...\n');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env.local');
    console.log('⚠️  Please edit .env.local with your actual values before deploying!\n');
  }
}

// Generate random secrets
function generateSecret() {
  return crypto.randomBytes(32).toString('hex');
}

console.log('🔑 Generated Secrets (add these to your .env.local):');
console.log('NEXTAUTH_SECRET=' + generateSecret());
console.log('');

console.log('📋 Pre-Deploy Checklist:');
console.log('');
console.log('1. Database Setup:');
console.log('   ☐ Create PostgreSQL database (Vercel Postgres / Neon / Supabase)');
console.log('   ☐ Add DATABASE_URL to .env.local');
console.log('');
console.log('2. Stripe Setup:');
console.log('   ☐ Create Stripe account');
console.log('   ☐ Get API keys from https://dashboard.stripe.com/apikeys');
console.log('   ☐ Add STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY');
console.log('   ☐ Configure webhook endpoint after deploy');
console.log('');
console.log('3. Email Setup:');
console.log('   ☐ Create Resend account at https://resend.com');
console.log('   ☐ Verify your domain');
console.log('   ☐ Get API key and add to RESEND_API_KEY');
console.log('');
console.log('4. Deploy Commands:');
console.log('   git add .');
console.log('   git commit -m "Ready for production"');
console.log('   git push origin main');
console.log('   # Then go to vercel.com and deploy');
console.log('');
console.log('5. After Deploy:');
console.log('   npx prisma migrate deploy');
console.log('   npx prisma db seed');
console.log('');
console.log('💡 Note: This is a full-stack app requiring Node.js.');
console.log('   Use Vercel for full functionality.\n');
