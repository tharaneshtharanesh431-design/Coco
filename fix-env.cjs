const fs = require('fs');
const url = require('url');

function fixUrl() {
  const content = fs.readFileSync('.env.local', 'utf8');
  const lines = content.split('\n');
  let newLines = [];
  let dbUrl = "";
  
  for (let line of lines) {
    if (line.startsWith('DATABASE_URL=')) {
      let rawUrl = line.substring('DATABASE_URL='.length).replace(/"/g, '').trim();
      
      // If there are multiple @ symbols, it's malformed for Prisma unless encoded.
      // Let's assume the user put postgresql://postgres:PASSWORD@localhost...
      // If the password contains @, we need to url-encode it.
      
      const protocolMatch = rawUrl.match(/^(postgresql:\/\/)/);
      if (!protocolMatch) {
         newLines.push(line);
         continue;
      }
      
      const rest = rawUrl.substring(protocolMatch[0].length);
      const lastAt = rest.lastIndexOf('@');
      
      if (lastAt !== -1) {
        const credentials = rest.substring(0, lastAt);
        const hostPath = rest.substring(lastAt + 1);
        
        const colonIndex = credentials.indexOf(':');
        let username = "postgres";
        let password = "";
        
        if (colonIndex !== -1) {
          username = credentials.substring(0, colonIndex);
          password = credentials.substring(colonIndex + 1);
        } else {
          // No colon, so it's just user without password? Or they forgot "postgres:"
          password = credentials;
        }
        
        // URL encode the password to safely handle special characters like @, #, ?, etc.
        const encodedPassword = encodeURIComponent(password);
        
        dbUrl = `postgresql://${username}:${encodedPassword}@${hostPath}`;
        newLines.push(`DATABASE_URL="${dbUrl}"`);
      } else {
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }
  
  fs.writeFileSync('.env.local', newLines.join('\n'), 'utf8');
  fs.writeFileSync('.env', newLines.join('\n'), 'utf8');
  console.log("Fixed URL to:", dbUrl.replace(/:[^:]+@/, ':***@'));
}

fixUrl();
