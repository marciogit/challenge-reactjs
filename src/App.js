import React, { useEffect, useState } from "react";
import api from 'services/api';
import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(resp => {
      setRepositories(resp.data);
    })
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "repo",
      url:"http://github.com/repo",
      techs: ['react','js']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(rep => rep.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo, i)=> (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
