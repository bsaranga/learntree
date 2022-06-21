import { AxiosInstance } from 'axios';
import { createContext } from 'react';

const HttpContext = createContext({} as AxiosInstance);
export default HttpContext;