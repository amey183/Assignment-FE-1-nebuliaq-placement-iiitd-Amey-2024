import './App.css';
import FatTable from './FatTable'
import { data as serviceData } from './data';


function App() {
  return (
    <>
    <div>
      <FatTable data = {serviceData}/>
    </div>
    </>
  );
}

export default App;