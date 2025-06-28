const fs = require('fs');
const path = require('path');

console.log('🔧 Applying API generation fixes...');

// Fix duplicate imports
function fixDuplicateImports() {
  const files = ['src/app/api/api.module.ts', 'src/app/api/services.ts'];
  
  files.forEach(file => {
    if (!fs.existsSync(file)) {
      console.log(`⚠️  File not found: ${file}`);
      return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Remove duplicate Service imports
    content = content.replace(
      /import { Service } from '\.\/services\/service';\s*import { Service } from '\.\/services\/service';/g,
      "import { Service } from './services/service';"
    );
    
    // Remove duplicate Service exports
    content = content.replace(
      /export { Service } from '\.\/services\/service';\s*export { Service } from '\.\/services\/service';/g,
      "export { Service } from './services/service';"
    );
    
    // Remove duplicate Service providers
    content = content.replace(
      /Service,\s*Service,/g,
      'Service,'
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed duplicate imports in: ${file}`);
    }
  });
}

// Fix import paths in root-level fn files
function fixImportPaths() {
  const fnDir = 'src/app/api/fn';
  
  if (!fs.existsSync(fnDir)) {
    console.log(`⚠️  Directory not found: ${fnDir}`);
    return;
  }
  
  const rootFiles = fs.readdirSync(fnDir)
    .filter(file => file.endsWith('.ts') && fs.statSync(path.join(fnDir, file)).isFile());
    
  rootFiles.forEach(file => {
    const filePath = path.join(fnDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix paths for root-level files only (change ../../ to ../)
    content = content.replace(/from '\.\.\/\.\.\//g, "from '../");
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed import paths in: ${file}`);
    }
  });
  
  console.log(`📁 Checked ${rootFiles.length} root-level fn files`);
}

// Fix server.ts environment variable access
function fixServerEnvAccess() {
  const serverFile = 'src/server.ts';
  
  if (!fs.existsSync(serverFile)) {
    console.log(`⚠️  File not found: ${serverFile}`);
    return;
  }
  
  let content = fs.readFileSync(serverFile, 'utf8');
  const originalContent = content;
  
  // Ensure environment import exists
  if (!content.includes("import { environment } from './environments/environment';")) {
    content = content.replace(
      /import { join } from 'node:path';/,
      "import { join } from 'node:path';\nimport { environment } from './environments/environment';"
    );
  }
  
  // Fix environment variable access for strict TypeScript with fallback to environment
  content = content.replace(
    /const port = Number\(process\.env\['PORT'\]\) \|\| \d+;/g,
    "const port = Number(process.env['PORT']) || environment.port;"
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(serverFile, content);
    console.log(`✅ Fixed environment variable access in: ${serverFile}`);
  }
}

// Run all fixes
try {
  fixDuplicateImports();
  fixImportPaths();
  fixServerEnvAccess();
  console.log('✅ All API generation fixes applied successfully!');
} catch (error) {
  console.error('❌ Error applying fixes:', error.message);
  process.exit(1);
}