import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://burger-builder-cb4b3-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default axiosInstance;