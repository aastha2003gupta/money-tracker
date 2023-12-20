import './App.css';
import {useEffect, useState} from "react";
function App() {
  const[name,setName]=useState('');
  const[datetime,setDatetime]=useState('');
  const[description,setDescription]=useState('');
  const [transactions, setTransactions] = useState([]);


  useEffect(()=>{
    getTransactions().then(setTransactions);

  },[]);

  async function getTransactions(){
    const url=process.env.REACT_APP_API_URL+'/transactions'
    const response=await fetch(url);
    return await response.json();
  }
  async function addNewTransaction(e) {
    e.preventDefault();
  
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          price,
          name: name.substring(price.length + 1),
          description,
          datetime,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Update state by fetching transactions again
      const updatedTransactions = await getTransactions();
      setTransactions(updatedTransactions);
  
      // Clear form fields
      setName('');
      setDatetime('');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    }
  }
  
  let balance = 0;

  for (const transaction of transactions) {
  balance += transaction.price;
  }

  const formattedBalance = balance.toFixed(2);
  const [integerPart, fractionPart] = formattedBalance.split('.');

  
  return (
    <main>
      <h1>₹{integerPart}<span>{fractionPart}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div>
        <input type="text" 
        value={name} 
        onChange={e=>setName(e.target.value)}
        placeholder={'+/-amount transaction'}/>
        <input type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}/>
        </div>
        <div>
          <input type="text"
           value={description}
           onChange={e=>setDescription(e.target.value)}
           placeholder={'description'}/>
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length>0 && transactions.map(transaction =>(
          <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={`price ${transaction.price < 0 ? 'red' : 'green'}`}>{transaction.price}</div>
            <div className="datetime">{transaction.datetime}</div>
          </div>
        </div>

        ))}
        
      </div>
    </main>
  );
}

export default App;
