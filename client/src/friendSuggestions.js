import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendSuggestions = () => {
  const [users, setUsers] = useState([]);
  const [friendSuggestions, setFriendSuggestions] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend API
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data); // Assuming the API returns user profiles
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const calculateJaccardSimilarity = (user1, user2) => {
    // Calculate Jaccard similarity (a simplistic approach for demonstration)
    // Here, you might use more complex similarity measures for friend suggestions
    const user1Set = new Set(user1.connections); // Assuming user connections are stored in an array
    const user2Set = new Set(user2.connections);

    const intersection = new Set([...user1Set].filter(x => user2Set.has(x)));
    const union = new Set([...user1Set, ...user2Set]);

    const similarity = intersection.size / union.size;
    return similarity;
  };

  const generateFriendSuggestions = () => {
    // Generate friend suggestions based on Jaccard similarity
    const suggestions = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const similarity = calculateJaccardSimilarity(users[i], users[j]);
        if (similarity > 0.5) {
          // Threshold for suggesting connections (adjust as needed)
          suggestions.push({ user1: users[i], user2: users[j], similarity });
        }
      }
    }

    setFriendSuggestions(suggestions);
  };

  useEffect(() => {
    // Call friend suggestion function once users are fetched
    if (users.length > 0) {
      generateFriendSuggestions();
    }
  }, [users]); // Update friend suggestions when users change

  return (
    <div className="friend-suggestions">
      <h2>Friend Suggestions</h2>
      <ul>
        {friendSuggestions.map((suggestion, index) => (
          <li key={index}>
            <p>
              Users: {suggestion.user1.name} and {suggestion.user2.name}
            </p>
            <p>Similarity: {suggestion.similarity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSuggestions;

// The FriendSuggestions component fetches user data (profiles) from the backend API.
// The calculateJaccardSimilarity function calculates Jaccard similarity between user connections (a simplistic approach for demonstration purposes).
// The generateFriendSuggestions function generates friend suggestions by comparing users' connections and identifying similarities based on the Jaccard similarity metric (adjust the threshold as needed).
// The component renders a list of friend suggestions (pairs of users and their similarity scores) based on the calculated similarity.
// Replace the simplistic Jaccard similarity logic with a more sophisticated similarity measure or algorithm for better friend suggestions. Ensure that the backend API returns user profiles and their connections in a suitable format for performing similarity calculations. Adjust the implementation according to your specific project requirements and data structure.