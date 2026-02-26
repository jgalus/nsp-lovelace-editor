import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts",
  output: {
    file: "../custom_components/nspanel_lovelace_editor/frontend/entrypoint.js",
    format: "es",
  },
  plugins: [
    resolve(),
    typescript(),
  ],
};
