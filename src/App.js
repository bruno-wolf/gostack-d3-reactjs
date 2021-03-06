import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  },[]); 

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "gostack2020-d3-reactjs",
      url: "https://github.com/bruno-wolf/gostack2020-d3-reactjs",
      techs: [ "ReactJS", "Axios", ],
      likes: 0
    })
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    // console.log(response);
    if(response.status === 204){
      const tempRepositories = repositories.filter( repository => repository.id !== id );
      // console.log(tempRepositories);
      setRepositories(tempRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return(
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
