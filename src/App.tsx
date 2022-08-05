import { Navigation } from 'navigation';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import './App.css';

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<Navigation />
			</div>
		</Provider>
	);
}

export default App;
