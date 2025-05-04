import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';

export default function Home() {
  return (
    <div>
      <h2>Keuangan Harian</h2>
      <AddTransaction />
      <TransactionList />
    </div>
  );
}
