import React, { useState, useEffect } from 'react';
import { Network } from 'react-vis-network';
import axios from 'axios';

const InfluenceAnalysis = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    // Fetch network data from the backend API
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

  const calculateDegreeCentrality = () => {
    // Calculate degree centrality (a simplistic approach for demonstration)
    // Here, you might use a proper influence analysis algorithm (e.g., PageRank)
    // This example calculates degree centrality and marks nodes with high degree as influential
    const nodeDegrees = {}; // Map to store degrees of nodes

    // Calculate node degrees by counting edges
    edges.forEach(edge => {
      nodeDegrees[edge.from] = (nodeDegrees[edge.from] || 0) + 1;
      nodeDegrees[edge.to] = (nodeDegrees[edge.to] || 0) + 1;
    });

    // Identify influential nodes (nodes with high degree)
    const updatedNodes = nodes.map(node => ({
      ...node,
      color: nodeDegrees[node.id] > 5 ? 'red' : 'blue', // Mark nodes with degree > 5 as influential (replace this with actual influence analysis)
    }));

    setNodes(updatedNodes);
  };

  useEffect(() => {
    // Call influence analysis function once nodes and edges are fetched
    if (nodes.length > 0 && edges.length > 0) {
      calculateDegreeCentrality();
    }
  }, [nodes, edges]); // Update nodes when nodes or edges change

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
    <div className="influence-analysis">
      <h2>Influence Analysis</h2>
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

export default InfluenceAnalysis;

// The InfluenceAnalysis component fetches user network data similarly to previous examples.
// The calculateDegreeCentrality function calculates degree centrality (a simplistic approach) by counting the number of edges connected to each node.
// Nodes with a high degree (more than 5 edges connected) are marked as influential (colored red in this example) for demonstration purposes.
// The component renders a graph using the Network component from react-vis-network, highlighting potentially influential nodes based on the degree centrality metric.
// Replace the simplistic degree centrality logic with an actual influence analysis algorithm such as PageRank or other centrality measures for more accurate influence identification within the network. Adjust the implementation based on your chosen algorithm and backend data.