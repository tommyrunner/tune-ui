import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const requiredFiles = ["dist/lib/index.js", "dist/lib/index.d.ts", "dist/es/index.js", "dist/es/index.d.ts"];

console.log("检查构建输出...");

let missingFiles = [];

for (const file of requiredFiles) {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  console.error("❌ 构建检查失败: 以下文件不存在:");
  missingFiles.forEach(file => console.error(` - ${file}`));
  process.exit(1);
} else {
  console.log("✅ 构建检查通过: 所有必需文件都存在");

  // 打印文件大小信息
  console.log("\n📊 文件大小信息:");
  for (const file of requiredFiles) {
    const filePath = path.join(rootDir, file);
    const stats = fs.statSync(filePath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(` - ${file}: ${fileSizeInKB} KB`);
  }
}

console.log("\n🎉 准备发布!");
