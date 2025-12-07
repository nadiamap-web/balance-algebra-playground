import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Case1 from "@/pages/Case1";
import Case2 from "@/pages/Case2";
import Case3 from "@/pages/Case3";

export default function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/case1" element={<Case1 />} />
				<Route path="/case2" element={<Case2 />} />
				<Route path="/case3" element={<Case3 />} />
				{/* fallback to home for unknown routes */}
				<Route path="*" element={<Index />} />
			</Routes>
		</Router>
	);
}