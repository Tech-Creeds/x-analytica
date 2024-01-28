import React, { useState, useEffect } from 'react';
import { Network } from 'react-vis-network';
import axios from 'axios';

const NetworkGraph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    // Fetch user network data from the backend API
    const fetchNetworkData = async () => {
      try {
        const response = await axios.get('/api/network/graph');
        const { nodes: fetchedNodes, edges: fetchedEdges } = response.data;

        setNodes(fetchedNodes);
        setEdges(fetchedEdges);
      } catch (error) {
        console.error('Error fetching network data:', error);
      }
    };

    fetchNetworkData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const graphOptions = {
    nodes: {
      shape: 'circle',
    },
  };

  return (
    <div className="twitter-network-graph">
      <h2>Twitter Network Graph</h2>
      {nodes.length > 0 && edges.length > 0 ? (
        <Network
          options={graphOptions}
          style={{ width: '100%', height: '500px' }}
          nodes={nodes}
          edges={edges}
        />
      ) : (
        <p>Loading network graph...</p>
      )}
    </div>
  );
};

/*ralgorithm for djikstra's shortest path */

export default NetworkGraph;

// The TwitterNetworkGraph component fetches user network data (nodes and edges representing users and connections) from the backend API using Axios.
// Upon successful retrieval, it updates the nodes and edges state with the fetched data.
// The component renders a graph using the Network component from react-vis-network, displaying the network connections between users.
// The graphOptions object can be customized with various options for node and edge styles (refer to the library documentation for more customization).
// Ensure that the API endpoint (/api/network/graph in this example) returns the network data in a format compatible with the library (an array of nodes and an array of edges).