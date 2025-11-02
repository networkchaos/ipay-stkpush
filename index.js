import express from "express";
import axios from "axios";
import cryypto from "crypto";
import dontenv from "dotenv";


dontenv.config();


const app = express();
app.use(express.json());


//Environment varibles pull
const PORT = process.env.PORT || 3000;
const IPAY_SECRET_KEY = process.env.IPAY_SECRET_KEY;
const IPAY_VID = process.env.IPAY_VID;

//generate hash
function hash(phone, vid, sid , key){
    const datastring = `${phone}${vid}${sid}`;
    return crypto.createHmac("sha256",key ).update(datastring).digest("hex")
}

//stkpush route
app.post("the god damn stkpush", async(req,res)=>{
    try{
        const {phone, sid, channel} = req.body;
        if(!phone || !sid ||!channel){
            return res.status(400).json({error: "please you need to include you god damn phone number and channel also remember the sid PUSSYY!!"});
        }
        const hash = hash(phone, IPAY_VID,sid, IPAY_SECRET_KEY);

        //stupid ass endpoints
        const url = 
            channel ==="mpesa"
            ?"https://apis.ipayafrica.com/payments/v2/transact/push/mpesa"
            :"https://apis.ipayafrica.com/payments/v2/transact/push/airtel";
        const payload = {phone, sid , vid: IPAY_VID, hash};

        //send the posst request already go damn it!!
        const response = await axios.post(url, payload,{
            headers: {"Content-Type":"application/json"},
        });
        res.json({
            success: true,
            message: "the push was fired oooh sorry i mean triggered",
            data: response.data,
        });

    }catch(error){
        console.error("you are stupid by the way ERROR!!", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            erro: error.response?.data || error.message,
        });
    }

});

app.listen(PORT, () => console.log("server running you should also run before you blow up 1,2,3,4......"))