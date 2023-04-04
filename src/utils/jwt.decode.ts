import jwt_decode from "jwt-decode";

const jwt={
    decode(token:string){
        const decoded = jwt_decode(token);
        return decoded
    }
}

export default jwt