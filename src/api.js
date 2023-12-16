import axios from 'axios';

class ChronoApi{
    static token = "";
    static username = "";

    //static BASE_URL = "http://localhost:3001"
    static BASE_URL = "https://chronoplastrecords-d8c7d4480b1a.herokuapp.com";

    static setToken(token){
        ChronoApi.token = token;
    }
    static setUser(user){
        ChronoApi.user = user;
    }

    static async request(path, data={}, method="get", picture=false, query={}){
        const url = `${ChronoApi.BASE_URL}/${path}`;
        console.log(ChronoApi.token);
        let headers = {Authorization: `${ChronoApi.token}`};
        headers = picture?{...headers, 'Content-Type': 'multipart/form-data'}:headers;
        console.log("headers", headers);
        const params = (method === "get")? data:{};
        try {
            console.log(url, method, data, params, headers);
            const result = await axios({url, method, data, params, headers, query});
            console.log(result);
            return result.data;
        }catch(err){
            alert(err.response.data.error.message);
        }
    }

    static async register(data){
        try{
            const result = await ChronoApi.request('auth/register', data, "post");
            ChronoApi.token = result.token;
            return result;
        }catch(err){
            return err;
        }
    }

    static async login(user){
        try{
            const result = await ChronoApi.request('auth/login', user, "post");
            ChronoApi.token = result.token;
            return result;
        }catch(err){
            return err;
        }
    }

    static async getRecords(){
        try{
            const result = await ChronoApi.request('records')
            return result;
        }catch(err){
            return err;
        }
    }

    static async makeRecord(record){
        try{
            const newRecord = await ChronoApi.request('records', record, "post", true);
            return newRecord;
        }catch(err){
            return err;
        }
    }

    static async placeOrder(record_id){
        try{
            console.log(ChronoApi.token);
            const newOrder = await ChronoApi.request(`records/order/${record_id}`,{},"post");
            console.log(newOrder);
            return newOrder;
        }catch(err){
            alert(err);
            return err;
        }
    }

    static async getUserInfo(username){
        try{
            const userInfo = await ChronoApi.request(`users/${username}`);
            return userInfo;
        }catch(err){
            return err;
        }
    }

    static async test(data){
        try{
            const result = await ChronoApi.request('records/testroute', data,"post",true);
            return result;
        }catch(err){
            return err;
        }
    }

    static async getBands(query){
        try{
            const result = await ChronoApi.request('bands',{},"get",false, query);
            return result;
        }catch(err){
            return err;
        }
    }

    static async getBandByID(id){
        try{
            const result = await ChronoApi.request(`bands/${id}`);
            return result;
        }catch(err){
            return err;
        }
    }

    static async getRecordByID(id){
        try{
            const result = await ChronoApi.request(`records/${id}`);
            return result;
        }catch(err){
            return err;
        }
    }

    static async getGenres(search, onlyNames){
        try{
            const result = await ChronoApi.request('genres', {search, onlyNames});
            return result;
        }catch(err){
            return err;
        }
    }

    static async getGenreRelation(id){
        try{
            const result = await ChronoApi.request(`genres/${id}`);
            return result
        }catch(err){
            return err;
        }
    }

    static async makeBand(data){
        try{
            const result = await ChronoApi.request('bands/', data, "post", true);
            return result;
        }catch(err){
            return err;
        }
    }

    static async updateBand(id, data){
        try{
            const result = await ChronoApi.request(`bands/${id}`, data, "patch", true);
            return result;
        }catch(err){
            return err;
        }
    }

    static async updateRecord(id, data){
        try{
            const result = await ChronoApi.request(`records/${id}`, data, "patch",true);
            return result;
        }catch(err){
            return err;
        }
    }

    static async getReviews(id){
        try{
            const result = await ChronoApi.request(`records/${id}/reviews`);
            return result;
        }catch(err){
            return err;
        }
    }
    static async postReview(id, username, data){
        try{
            const result = await ChronoApi.request(`records/${id}/${username}`, data, "post");
            return result;
        }catch(err){
            return err;
        }
    }
    static async editReview(id, username, data){
        try{
            const result = await ChronoApi.request(`records/${id}/${username}`, data, "patch");
            return result;
        }catch(err){
            return err;
        }
    }
    static async deleteReview(id, username){
        try{
            const result = await ChronoApi.request(`records/${id}/${username}`,{},"delete");
            return result;
        }catch(err){
            return err;
        }
    }
    static async search(term){
        try{
            const records = await ChronoApi.request('records/', {title: term});
            const bands = await ChronoApi.request('bands/', {name: term, bio: term});
            return {records,bands};
        }catch(err){
            return err;
        }
    }

    static async postListing(id, data){
        try{
            const result = await ChronoApi.request(`records/${id}/listings`, data, "post", true);
            return result;
        }catch(err){
            return err;
        }
    }

    static async addToCart(username, listing_id){
        try{
            const result = await ChronoApi.request(`users/${username}/cart/${listing_id}`, {}, "post");
            return result;
        }catch(err){
            return err;
        }
    }
    
    static async removeFromCart(username, listing_id){
        try{
            const result = await ChronoApi.request(`users/${username}/cart/${listing_id}`, {}, "delete");
            return result;
        }catch(err){
            return err;
        }
    }
    
    static async getCart(username){
        try{
            console.log(username);
            const result = await ChronoApi.request(`users/${username}/cart`);
            return result;
        }catch(err){
            return err;
        }
    }

    static async checkout(username){
        try{
            const result = await ChronoApi.request(`carts/${username}/checkout`, {}, "post");
            console.log(result);
            return result;
        }catch(err){
            return err;
        }
    }

    static async updateUser(username, data){
        try{
            const result = await ChronoApi.request(`users/${username}`, data, "patch");
            return result;
        }catch(err){
            return err;
        }
    }

    static async checkPassword(username, password){
        try{
            console.log(password);
            const result = await ChronoApi.request(`users/${username}/password`, {password: password}, "post");
            return result
        }catch(err){
            return err;
        }
    }

    static async topRecords(){
        try{
            const result = ChronoApi.request('records/top');
            return result;
        }catch(err){
            return err;
        }
    }
}

export default ChronoApi;