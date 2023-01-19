import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import alias from "@rollup/plugin-alias";

import path, { resolve } from "path";
const rootDir = resolve(__dirname);
export default defineConfig({
	resolve: {
		alias: [
			{
				find: "@",
				replacement: path.resolve(__dirname, "src"),
			},
		],
	},
	plugins: [react()],

	server: {
		port: 3000,
	},
});
