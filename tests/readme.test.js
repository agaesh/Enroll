import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('README.md content', () => {
  it('should contain the newly added line', () => {
    // Read README.md file
    const readmePath = path.resolve(__dirname, '../README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');

    // The exact line you added in README
    const expectedLine = 'im just updating the read iin'; // replace with actual text

    expect(readmeContent).toContain(expectedLine);
  });
});