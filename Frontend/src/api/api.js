import axios from 'axios'

const API = axios.create({
    baseURL:'http://localhost:3000/api'
})

// tokens to requests

API.interceptors.request.use((req)=>{
    const token = localStorage.getItem('token')
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);


// Auth

export const registerUser = (data)=> API.post('/auth/register',data)
export const loginUser = (data)=> API.post('/auth/login',data)

// Hotels
export const fetchHotels = (params)=> API.get('/hotels', { params })
export const fetchHotelById = (id) => API.get(`/hotels/${id}`);

// Cart
export const addToCart = (data)=> API.post('/cart',data)
export const getCart =()=>API.get('/cart')
export const removeFromCart = (id)=>API.delete(`/cart/${id}`)

// Bookings
export const checkoutBooking = (data) => API.post("/bookings/create", data);
