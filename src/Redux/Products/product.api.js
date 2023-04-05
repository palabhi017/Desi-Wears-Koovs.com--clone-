import axios from "axios";
export const getProdata = async (getProductsParam) => {
 
    try {
        let res = await axios.get(`https://eager-handkerchief-bass.cyclic.app/product`, getProductsParam)
        
        return res.data;
    } catch (error) {
        return error;
    }
}
