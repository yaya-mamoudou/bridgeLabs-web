import { Navigation } from 'navigation';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from 'constants/config';

function App() {
	return (
		<GoogleOAuthProvider clientId={`${config.GOOGLE_CLIENT_ID}`}>
			<Provider store={store}>
				<div className='App'>
					<Navigation />
				</div>
			</Provider>
		</GoogleOAuthProvider>
	);
}

export default App;
