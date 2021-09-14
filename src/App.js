import './App.css';
import {API} from 'aws-amplify';
import {useState, useEffect} from 'react';
import {format} from 'date-fns';

function App() {
    const [backendData, setBackendData] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        query(selectedDate);
    }, [selectedDate]);

    const query = async (date) => {
        const queryDate = format(date, 'yyyy-MM-dd');
        const formattedDate = await API.get('VdhrParserApi', `/${queryDate}`, {});
        setBackendData(formattedDate);
    };

    return (
        <div className="App">
            <header className="App-header">
                <input style={{fontSize: '200%'}} type="date" onChange={evt => setSelectedDate(evt.target.valueAsDate)}/>
                <p>Selected Date: <b>{selectedDate.toString()}</b></p>
                {backendData && <p>Processed by backend: {backendData}</p>}
            </header>
        </div>
    );
}

export default App;
