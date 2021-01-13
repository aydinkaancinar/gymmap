const profile = [
    { 
        _id: "0", 
        username: 'user',
        password: 'user',
        role: 'user', 
        activities: [
          { value: 'Cycling', label: 'Cycling' },
          { value: 'Running', label: 'Running' },
          { value: 'Weight Lifting', label: 'Weight Lifting' }
        ], 
        weight: 75,
        age: 21,
        height: 179,
        profilePicture: "../images/profilepicture.png",
        eventsJoined: []
    },
    { 
      _id: "0", 
      username: 'admin',
      password: 'admin',
      role: 'admin', 
      activities: [
        { value: 'Running', label: 'Running' },
        { value: 'Weight Lifting', label: 'Weight Lifting' }
      ], 
      weight: 70,
      age: 20,
      height: 175,
      profilePicture: "../images/profilepicture.png"
  },
]

export default profile;