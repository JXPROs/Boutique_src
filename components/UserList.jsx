import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Loading');
    const fetchUsers = async () => {
      try {
        const apiUrl = import.meta.env.PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/users`);
        const data = await response.json();
        // Convertir en tableau si c'est un objet unique
        const usersArray = Array.isArray(data.users) ? data.users : [data.users];
        setUsers(usersArray);
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h2>UserList :</h2>
      {users.map((user, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
              {user.nom?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{user.nom}</h3>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Informations :</span>
              <span className="text-gray-700">Utilisateur {user.username}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <button 
              onClick={() => console.log('Voir profil de:', user.username)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Voir le profil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;