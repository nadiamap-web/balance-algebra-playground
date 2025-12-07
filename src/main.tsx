import React from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "@/AppRoutes";
import "./index.css";

const rootEl = document.getElementById("root");
if (rootEl) {
	createRoot(rootEl).render(
		<React.StrictMode>
			<AppRoutes />
		</React.StrictMode>
	);
}
