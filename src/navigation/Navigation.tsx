import { Home, Login, Register } from 'pages';
import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function navigation() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'>
					<Route index element={<Home />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
