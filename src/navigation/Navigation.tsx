import { Auth } from 'components';
import { Dashboard, Home, Login, Register } from 'pages';
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
					<Route
						path='dashboard'
						element={
							<Auth>
								<Dashboard />
							</Auth>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
