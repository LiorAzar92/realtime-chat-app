import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import './App.css';
import AppProvider from './components/AppProvider';

function App() {
  return (
    <AppProvider>
      <h1>Hi!</h1>
    </AppProvider>
  );
}

export default App;
