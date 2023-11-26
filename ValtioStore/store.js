import { proxy } from "valtio";

const state = proxy({
    toast:{
        open:false,
        error:false,
        message:""
    },
    loader:{
        open:false 
    }
})

export default state