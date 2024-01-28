import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PathFinding = () => {
  const [networkData, setNetworkData] = useState(null);
  const [sourceUser, setSourceUser] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [shortestPath, setShortestPath] = useState([]);

  useEffect(() => {
    // Fetch network data from the backend API
    const fetchNetworkData = async () => {
      try {
        const response = await axios.get('/api/network/graph');
        setNetworkData(response.data); // Assuming the API returns the network graph data
      } catch (error) {
        console.error('Error fetching network data:', error);
      }
    };

    fetchNetworkData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const calculateShortestPath = () => {
    // Perform path finding using Dijkstra's algorithm (backend logic)
    // Make a request to the backend API to calculate the shortest path
    axios.post('/api/pathfinding/shortest-path', {
      source: sourceUser,
      target: targetUser,
      graph: networkData,
    })
    .then(response => {
      setShortestPath(response.data.path); // Assuming the API returns the shortest path
    })
    .catch(error => {
      console.error('Error calculating shortest path:', error);
    });
  };

  const handlePathFinding = () => {
    if (sourceUser && targetUser && networkData) {
      calculateShortestPath();
    } else {
      // Display an error message if users or network data are not available
      console.error('Please provide valid source and target users.');
    }
  };

  return (
    <div className="path-finding">
      <h2>Path Finding</h2>
      <div>
        <input type="text" placeholder="Enter source user" onChange={(e) => setSourceUser(e.target.value)} />
        <input type="text" placeholder="Enter target user" onChange={(e) => setTargetUser(e.target.value)} />
        <button onClick={handlePathFinding}>Find Shortest Path</button>
      </div>
      <div>
        {shortestPath.length > 0 ? (
          <div>
            <h3>Shortest Path:</h3>
            <ul>
              {shortestPath.map((node, index) => (
                <li key={index}>{node}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No shortest path found.</p>
        )}
      </div>
    </div>
  );
};

export default PathFinding;

// The PathFinding component fetches the network graph data from the backend API and manages user inputs for source and target users.
// The calculateShortestPath function sends a POST request to the backend API with the source, target, and network graph data to calculate the shortest path.
// Upon receiving the response, it updates the shortestPath state to display the shortest path between the source and target users.
// Users input their desired source and target users, triggering the path-finding calculation upon clicking the "Find Shortest Path" button.
// Replace the placeholder logic within calculateShortestPath with actual API calls and backend logic for Dijkstra's algorithm implementation to calculate the shortest path between users based on the provided network data. Adjust the component according to your specific backend implementation and network graph data structure.