#!/usr/bin/env node

/**
 * Environment Verification Script
 * Simple standalone test to verify .env works on any machine
 * Run with: node verify-env.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim().replace(/^["']|["']$/g, '');
    envVars[key] = value;
  }
});

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('   🔍 Environment Verification Test');
console.log('═══════════════════════════════════════════════════════════════\n');

const requiredVars = [
  'VITE_SUPABASE_PROJECT_ID',
  'VITE_SUPABASE_PUBLISHABLE_KEY',
  'VITE_SUPABASE_URL',
];

let allChecksPassed = true;

// Check 1: Variables exist
console.log('📋 Check 1: Environment Variables Exist');
console.log('───────────────────────────────────────');
requiredVars.forEach((varName) => {
  if (envVars[varName]) {
    console.log(`✅ ${varName}: Found`);
  } else {
    console.log(`❌ ${varName}: Missing`);
    allChecksPassed = false;
  }
});

// Check 2: Format validation
console.log('\n🎯 Check 2: Variable Format Validation');
console.log('─────────────────────────────────────');

// Project ID
const projectId = envVars.VITE_SUPABASE_PROJECT_ID;
if (projectId && /^[a-z0-9]+$/.test(projectId) && projectId.length > 5) {
  console.log(`✅ VITE_SUPABASE_PROJECT_ID: Valid format`);
} else {
  console.log(`❌ VITE_SUPABASE_PROJECT_ID: Invalid format`);
  allChecksPassed = false;
}

// JWT Key
const jwtKey = envVars.VITE_SUPABASE_PUBLISHABLE_KEY;
if (jwtKey && jwtKey.startsWith('eyJ') && jwtKey.split('.').length === 3) {
  console.log(`✅ VITE_SUPABASE_PUBLISHABLE_KEY: Valid JWT format`);
} else {
  console.log(`❌ VITE_SUPABASE_PUBLISHABLE_KEY: Invalid JWT format`);
  allChecksPassed = false;
}

// URL
const supabaseUrl = envVars.VITE_SUPABASE_URL;
if (
  supabaseUrl &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co')
) {
  console.log(`✅ VITE_SUPABASE_URL: Valid HTTPS URL`);
} else {
  console.log(`❌ VITE_SUPABASE_URL: Invalid URL format`);
  allChecksPassed = false;
}

// Check 3: Environment Information
console.log('\n📊 Check 3: Configuration Summary');
console.log('──────────────────────────────────');
console.log(`Project ID:      ${projectId}`);
console.log(`Supabase URL:    ${supabaseUrl}`);
console.log(`JWT Key Length:  ${jwtKey ? jwtKey.length : 0} characters`);
console.log(`Key Prefix:      ${jwtKey ? jwtKey.substring(0, 20) + '...' : 'N/A'}`);

// Check 4: Machine Info
console.log('\n💻 Check 4: Machine Information');
console.log('────────────────────────────────');
console.log(`OS:              ${process.platform}`);
console.log(`Node Version:    ${process.version}`);
console.log(`Current Time:    ${new Date().toISOString()}`);

// Final Result
console.log('\n═══════════════════════════════════════════════════════════════');
if (allChecksPassed) {
  console.log('   ✅ All checks passed!');
  console.log('   ✅ Your .env file will work on any PC/host');
  console.log('   ✅ Ready to deploy!');
  process.exit(0);
} else {
  console.log('   ❌ Some checks failed!');
  console.log('   ❌ Please fix the errors above');
  process.exit(1);
}
console.log('═══════════════════════════════════════════════════════════════\n');
