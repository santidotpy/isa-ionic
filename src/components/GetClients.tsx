import React, { useState } from 'react';
import axios from 'axios';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

const GetClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchClients = async () => {
    try {
      const response = await axios.get<Client[]>('http://localhost:8080/api/clients?page=0&size=20', {
        headers: {
          'accept': '*/*',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTcxMTk5MzkyM30.KMRRm9qEfD6ho1auDCYHhqGSI2B-upyiwG5xG-3LtUtDGp219e-d18HBq6ZnX7P7eyeRtK1cScU5MUqaFnPuVA'
        }
      });
      setClients(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching clients:', error);
      setErrorMessage('Es posible que el servidor de no esté corriendo. Por favor, inicia el servidor y vuelve a intentarlo.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px',
        }}
        onClick={fetchClients}
      >
        Get Clients
      </button>
      {errorMessage && <p style={{ color: 'red', fontWeight: 'bold'}}>{errorMessage}</p>}
      {clients.length > 0 && (
        <IonCard>
          <IonCardHeader>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <IonCardTitle>Clients</IonCardTitle>
              <IonCardContent>
                <ul>
                  {clients.map(client => (
                    <li key={client.id}>{client.firstName} {client.lastName}</li>
                  ))}
                </ul>
              </IonCardContent>
            </div>
          </IonCardHeader>
        </IonCard>
      )}
    </div>
  );
};

export default GetClients;
