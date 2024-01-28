import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch user profile data from the backend API
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setProfileData(response.data); // Assuming the API returns user profile data
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {profileData ? (
        <div>
          <img src={profileData.profilePicture} alt="Profile" />
          <p>Name: {profileData.name}</p>
          <p>Username: {profileData.username}</p>
          <p>Bio: {profileData.bio}</p>
          <p>Followers: {profileData.followersCount}</p>
          <p>Following: {profileData.followingCount}</p>
          {/* Add more profile information as needed */}
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default UserProfile;

// The UserProfile component uses React hooks (useState and useEffect) to manage state and perform side effects.
// It initializes profileData state to null and fetches the user's profile data from the backend API using Axios in the useEffect hook.
// Upon successful retrieval of data, it updates the profileData state with the fetched user profile information.
// The component renders the user's profile details when profileData is available. Otherwise, it displays a loading message.
// Ensure you've set up Axios or any other HTTP library for making API requests in your React application. Adjust the API endpoint and data structure according to your backend response format.