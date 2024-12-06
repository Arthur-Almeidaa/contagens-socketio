import { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

// Conectar ao servidor Socket.IO
const socket = io('https://contagens-socketio.onrender.com/'); // Substitua pelo URL do seu servidor

function App() {
  const [counters, setCounters] = useState({
    carros: [
      { id: 'porsche', name: 'Porsche', count: 0 },
      { id: 'ferrari', name: 'Ferrari', count: 0 },
      { id: 'mercedes', name: 'Mercedes', count: 0 },
    ],
    videos: [
      { id: 'video1', name: 'Video 1', count: 0 },
      { id: 'video2', name: 'Video 2', count: 0 },
      { id: 'video3', name: 'Video 3', count: 0 },
    ],
    carrosProfissionais: [
      { id: 'porsche', name: 'Porsche', count: 0},
      { id: 'mclaren', name: 'McLaren', count: 0},
      { id: 'aviao', name: 'Avião', count: 0}
    ]
  });

  // Ouve os eventos de atualização de contadores do servidor
  useEffect(() => {
    socket.on('counterUpdate', (updatedCounters) => {
      setCounters(updatedCounters);
    });

    return () => {
      socket.off('counterUpdate');
    };
  }, []);

  // Função para incrementar a contagem
  const increment = (category, id) => {
    const updatedCounters = { ...counters };
    updatedCounters[category] = updatedCounters[category].map(item =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setCounters(updatedCounters);
    // Envia a atualização de contagem para o servidor
    socket.emit('updateCounters', updatedCounters);
  };
  
  const decrement = (category, id) => {
    const updatedCounters = { ...counters };
    updatedCounters[category] = updatedCounters[category].map(item =>
      item.id === id ? { ...item, count: item.count - 1 } : item
    );
    setCounters(updatedCounters);
    // Envia a atualização de contagem para o servidor
    socket.emit('updateCounters', updatedCounters);
  };
  

  return (
    <div className="App">
      <h1>Térreo</h1>
      
      {/* Simuladores de Carro */}
      <div style={{ marginLeft: '20px' }}>
        <h2>Simulador de Carro</h2>
        <div style={{ marginLeft: '20px' }}>
          {counters.carros.map(car => (
            <div key={car.id} style={{ marginBottom: '10px' }}>
              <h3>{car.name}: {car.count}</h3>
              <button onClick={() => increment('carros', car.id)}>+</button>
              <button onClick={() => decrement('carros', car.id)}>-</button>
            </div>
          ))}
        </div>
      </div>

      {/* Imersivas */}
      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <h2>Imersivas</h2>
        <div style={{ marginLeft: '20px' }}>
          {counters.videos.map(video => (
            <div key={video.id} style={{ marginBottom: '10px' }}>
              <h3>{video.name}: {video.count}</h3>
              <button onClick={() => increment('videos', video.id)}>+</button>
              <button onClick={() => decrement('videos', video.id)}>-</button>
            </div>
          ))}
        </div>
      </div>

      {/* Simuladores de Carros Profissionais */}
      <div style={{ marginLeft: '20px' }}>
        <h2>Simuladores de Carros Profissionais</h2>
        <div style={{ marginLeft: '20px' }}>
          {counters.carrosProfissionais.map(carProfissional => (
            <div key={carProfissional.id} style={{ marginBottom: '10px' }}>
              <h3>{carProfissional.name}: {carProfissional.count}</h3>
              <button onClick={() => increment('carrosProfissionais', carProfissional.id)}>+</button>
              <button onClick={() => decrement('carrosProfissionais', carProfissional.id)}>-</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
