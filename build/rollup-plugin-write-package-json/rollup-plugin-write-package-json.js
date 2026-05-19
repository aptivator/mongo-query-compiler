import fs from 'fs';

export function writePackageJsonPlugin(packageJson, path) {
  return {
    name: 'write-package-json',
    writeBundle: {
      sequential: true,
      order: 'post',
      handler() {
        fs.writeFileSync(path, JSON.stringify(packageJson, null, '  '));
      }
    }
  };
}
