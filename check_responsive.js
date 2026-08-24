const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = execSync('find . -name "*.module.css" | grep -v "node_modules" | grep -v ".next"').toString().split('\n').filter(Boolean);

console.log("Checking for grid-template-columns without media queries...");

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find instances of grid-template-columns
  const gridMatches = content.match(/grid-template-columns:.*?;/g);
  if (gridMatches) {
    const mediaMatches = content.match(/@media\s*\([^)]+\)/g);
    
    // If it has grids but no media queries, it's highly likely to break on mobile
    if (!mediaMatches) {
      console.log(`[WARNING] ${file} has grids but NO media queries!`);
    } else {
      // It has media queries, but does it redefine grid-template-columns?
      const mediaGridMatches = content.match(/@media[\s\S]*?grid-template-columns/g);
      if (!mediaGridMatches) {
        console.log(`[WARNING] ${file} has grids and media queries, but doesn't adjust grid columns!`);
      }
    }
  }
}
