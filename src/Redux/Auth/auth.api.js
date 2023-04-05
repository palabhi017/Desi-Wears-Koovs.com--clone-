import axios from "axios";
export const getAuth= async(UserData)=>{

    try {
        let res = await axios.post(`https://eager-handkerchief-bass.cyclic.app/user/login`,UserData)
      
        return res.data;
        
    } catch (error) {
        return error;
    }
}