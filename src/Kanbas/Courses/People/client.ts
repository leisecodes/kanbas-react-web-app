import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
    const response = await
      axios.get(`${USERS_API}?role=${role}`);
    return response.data;
  };

  export const findUsersByPartialName = async (name: string) => {
    const response = await axios.get(`${USERS_API}?name=${name}`);
    return response.data;
  };
  
  export const findUserById = async (id: string) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
  };
  
  export const deleteUser = async (userId: string) => {
    const response = await axios.delete( `${USERS_API}/${userId}` );
    return response.data;
  };

  export const updateUser = async (user: any) => {
    const response = await axios.put(`${USERS_API}/${user._id}`, user);
    return response.data;
  };
  
  export const createUser = async (user: any) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
  };


export const getEnrolledCourses = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/enrolled-courses`);
  return response.data;
};


export const getCreatedCourses = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/created-courses`);
  return response.data;
};

export const enrollInCourse = async (userId, courseId) => {
  const response = await axios.put(`${USERS_API}/${userId}/enroll/${courseId}`);
  return response.data; 
};

export const unenrollFromCourse = async (userId, courseId) => {
  const response = await axios.put(`${USERS_API}/${userId}/unenroll/${courseId}`);
  return response.data;
};

export const addQuizAttempt = async (userId, attemptData) => {
  try {
    const response = await axios.post(`${USERS_API}/${userId}/quiz-attempts`);
    return response.data;
  } catch (error) {
    console.error('Error adding quiz attempt:', error);
    throw error;
  }
};

export const getQuizAttempts = async (userId) => {
  try {
    const response = await axios.get(`${USERS_API}/${userId}/quiz-attempts`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving quiz attempts', error);
    throw error;
  }
};