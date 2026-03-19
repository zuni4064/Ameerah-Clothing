import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(fullPath));
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) { 
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk('./src');
let changed = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Replace hardcoded dark-theme broken colors
    content = content.replace(/text-charcoal/g, 'text-foreground');
    content = content.replace(/bg-cream/g, 'bg-white/5');
    content = content.replace(/text-emerald/g, 'text-gold');
    content = content.replace(/bg-emerald/g, 'bg-white/5');

    if (content !== original) {
        fs.writeFileSync(file, content);
        changed++;
    }
});

console.log(`Updated ${changed} files.`);
