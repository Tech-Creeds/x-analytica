import React, { useState, useEffect } from 'react';
import { Network } from 'react-vis-network';
import axios from 'axios';

const CommunityDetection = () => {
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

  const detectCommunities = () => {
    // Perform community detection (a simplistic approach for demonstration)
    // Here, you might use a proper community detection algorithm
    // This example assigns random community IDs to nodes for demonstration purposes
    const updatedNodes = nodes.map(node => ({
      ...node,
      group: Math.floor(Math.random() * 3), // Assign a random community ID (replace this with actual detection logic)
    }));

    setNodes(updatedNodes);
  };

  useEffect(() => {
    // Call community detection function once nodes and edges are fetched
    if (nodes.length > 0 && edges.length > 0) {
      detectCommunities();
    }
  }, [nodes, edges]); // Update communities when nodes or edges change

  const graphOptions = {
    nodes: {
      shape: 'circle',
      color: {
        background: 'lightblue',
        border: 'blue',
      },
    },
    edges: {
      color: 'gray',
    },
  };

  return (
    <div className="twitter-community-detection">
      <h2>Twitter Community Detection</h2>
      {nodes.length > 0 && edges.length > 0 ? (
        <Network
          options={graphOptions}
          style={{ width: '100%', height: '500px' }}
          nodes={nodes}
          edges={edges}
        />
      ) : (
        <p>Loading network data...</p>
      )}
    </div>
  );
};

export default CommunityDetection;

// The TwitterCommunityDetection component fetches user network data similarly to the previous example.
// A simplistic detectCommunities function assigns random community IDs to nodes for demonstration purposes.
// The component renders a graph using the Network component from react-vis-network, displaying nodes colored by their assigned community IDs.
// Replace the simplistic community detection logic (Math.floor(Math.random() * 3)) with an actual community detection algorithm suitable for your project needs. This example provides a basic demonstration and requires a more sophisticated approach for real community detection in a Twitter network. Adjust the implementation based on the chosen community detection algorithm and its integration with your backend data.
