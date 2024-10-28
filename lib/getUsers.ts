interface RandomUserResponse {
  results: {
    gender: string;
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    location: {
      city: string;
      country: string;
    };
    dob: {
      age: number;
    };
  }[];
}

export async function getFemaleUser() {
  try {
    const response = await fetch('https://randomuser.me/api/?gender=female');
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data: RandomUserResponse = await response.json();
    return data.results[0];
  } catch (error) {
    console.error('Error fetching female user:', error);
    throw error;
  }
}
