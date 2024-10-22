import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "./src/index.tsx", // root file
      "mdxeditor/mdxeditor": "./src/components/MdxEditor/index.tsx",
    },
    outDir: "dist", // Output directory for all files
    format: ["esm"], // Output format (ES6 Modules)
    target: "es6", // Target version
    dts: true, // Generate .d.ts files
    splitting: true, // creates chunks of the output file which is suitable for lazy loading
    clean: true,
  },
]);
