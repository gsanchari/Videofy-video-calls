import { axiousInstance } from "./axious";

export const signup = async (signupData) => {
    const response = await axiousInstance.post("/auth/signup", signupData);
    return response.data;
};

export const login = async (loginData) => {
    const response = await axiousInstance.post("/auth/login", loginData);
    return response.data;
};

export const logout = async () => {
    // console.log("Calling backend logout API");  
    const response = await axiousInstance.post("/auth/logout");
    return response.data;
};


export const getAuthUser = async () =>{
    try {
        const res = await axiousInstance.get("/auth/me");
        return res.data;
    } catch (error) {
        return null;
    }
}


export const completeOnboarding = async (userData) => {
    const response = await axiousInstance.post("/auth/onboarding", userData);
    return response.data;
};

export async function getUserFriends() {
  const response = await axiousInstance.get("/user/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiousInstance.get("/user");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiousInstance.get("/user/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiousInstance.post(`/user/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiousInstance.get("/user/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiousInstance.put(`/user/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiousInstance.get("/chat/token");
  return response.data;
}