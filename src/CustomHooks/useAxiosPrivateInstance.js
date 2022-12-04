import { useEffect } from "react";
import { axiosPrivateInstance } from "../API/axiosInstance";

const useAxiosPrivateInstance = () => {
  const MAX_REQUEST_COUNT = 3;
    useEffect(() => {
        
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        console.log("config", config);
        // config.headers["signal"] = `Bearer useAxiosPrivateInstance123`;
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer useAxiosPrivateInstance123`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
          const prevRequest = error?.config;
          
        if (error?.response?.status === 404) {
            let reqCount = localStorage.getItem('reqCount') 
            localStorage.setItem("reqCount", +reqCount + 1) 
            reqCount = localStorage.getItem('reqCount')
            if (reqCount <= MAX_REQUEST_COUNT) {
                // const newAccessToken = await refresh();
                prevRequest.headers[
                    "Authorization"
                ] = `Bearer NEWuseAxiosPrivateInstance${reqCount}`;
                  return axiosPrivateInstance(prevRequest);  
            } else { 
                localStorage.setItem("reqCount",1)
            }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosPrivateInstance;
};

export default useAxiosPrivateInstance;
