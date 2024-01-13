import React,{useState,useEffect} from 'react';
import { View, Text, TextInput, Button,StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('food');
  const handleAddExpense = () => {
    if (expense && amount) {
      setExpenses([...expenses, { id: Date.now().toString(), expense, amount, category }]);
      setExpense('');
      setAmount('');
    }
  };

  const saveExpensesToStorage = async () => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const loadExpensesFromStorage = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses !== null) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  useEffect(()=>{
    loadExpensesFromStorage();
  },[]);

  useEffect(()=>{
    saveExpensesToStorage();
  });

  const clearExpenses = async () => {
    setExpenses([]);
    try{
      AsyncStorage.removeItem('expenses');
    }catch(err){
      console.error(err);
    }
  }
  let ex=0;
  const money = require('./assets/expense.jpeg');
  
  return (
    <View style={styles.container}>
    <View style={styles.logo}>
    <Image source={money} style={styles.image}></Image>
    <Text style={styles.title}>Expense Tracker</Text>
    </View>
    <Picker dropdownIconColor='#333' dropdownIconRippleColor={'beige'} style={styles.picker} selectedValue={category} 
    onValueChange={(item)=>setCategory(item)}>
      <Picker.Item label='Food' value='food' />
      <Picker.Item label='Travel' value='travel' />
      <Picker.Item label='Clothes' value='Clothes' />
      <Picker.Item label='Other' value='other' />
    </Picker>
    <TextInput
    placeholderTextColor='#333'
      style={styles.input}
      placeholder="Enter Expense"
      value={expense}
      onChangeText={text => {
        setExpense(text);
      }}
    />
    <TextInput
    placeholderTextColor='#333'
      style={styles.input}
      keyboardType='numeric'
      placeholder="Enter Amount"
      value={amount}
      onChangeText={text => {
        setAmount(text);
      }}
    />
    <Button color={'#333'} title="Add" onPress={handleAddExpense}  />
    <View style={{marginVertical: 5,}} />
    <Button color={'#ddd'} title='Clear Expenses' onPress={clearExpenses} />
    <View style={styles.expenseList}>
      <Text style={styles.expenseListTitle}>Expenses List</Text>
      {expenses.map(item =>{ 
        ex+=parseInt(item.amount)
        return (
        <View key={item.id} style={styles.expenseItem}>
          <Text style={styles.expenseText}>
            {item.expense}: ${item.amount} ({item.category})
          </Text>
        </View>
      );})}
      <Text style={{color: '#333', fontWeight: '600', padding: 10}}>Total Expense: ${ex}</Text>
    </View>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    alignContent: 'center',
    width: '90%',
    paddingTop: 60,
    backgroundColor: '#6699ff',
    borderRadius: 10,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#333',
    padding: 10
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333'
  },
  expenseList: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  expenseListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  expenseItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#c75afa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseText: {
    fontSize: 16,
    color: '#333',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  image:{
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 50,
  }
});

export default App;