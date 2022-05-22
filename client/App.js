import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import AppProvider from './components/AuthProvider';

export default function App() {
  return (
    <AppProvider>
      <View style={styles.appContainer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Your Goal!' style={styles.textInput} />
          <Button title='Add!' color='green' />
        </View>
        <View>
          <Text>List of Goals:</Text>
        </View>
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: '70%',
    borderRadius: 5,
    marginRight: 8
  }
});
