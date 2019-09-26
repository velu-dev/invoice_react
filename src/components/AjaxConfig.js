import axios from 'axios';
import { toast } from 'react-toastify';

export const post = (url, data) => {	
	return axios({  
            method: 'post',
            url: url,         
            data: data
        });
};

export const get = (url) => {	
	return axios({  
            method: 'get',
            url: url
        });
};

export const put = (url, data) => {
	return axios({  
            method: 'put',
            url: url,         
            data: data
        });
};

export const del = (url, data) => {
	return axios({  
            method: 'delete',
            url: url,         
            data: data
        });
};

export const toaster = (data) => {
     // toast.dismiss()
    if(data.status){
        toast.success(data.message); 
    }else{
        toast.error(data.message);   
    }	
};
 