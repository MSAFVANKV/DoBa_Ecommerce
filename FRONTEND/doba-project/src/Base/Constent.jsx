// export const adminbaseURL= "http://localhost:4000/admin"
// export const mainURL= "http://localhost:4000"
// export const userURL= "http://localhost:4000/api"
// export const adminbaseURL= "https://doba-projuct.onrender.com/admin"
// export const mainURL= "https://doba-projuct.onrender.com"
// export const userURL= "https://doba-projuct.onrender.com/api"

const serverUrl=import.meta.env.RENDER_URI
export const adminbaseURL = `${serverUrl}/admin`; // "http://localhost:4000/admin"
export const mainURL = `${serverUrl}`; // "http://localhost:4000"
export const userURL = `${serverUrl}/api`; // "http://localhost:4000/api"
