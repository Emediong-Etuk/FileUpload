import { FileTypeValidator, HttpException, MaxFileSizeValidator,ParseFilePipe } from "@nestjs/common";
import { extname } from "path";

export const imageFileFilter=(req,file,callback)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return callback(new HttpException("sorry this file extension doesn't match the required file ",400),false)
    }
    callback(null,true)
}

export const editFileName=(req,file,callback)=>{
    const name=file.originalname.split('.')[0]
    const fileExtensionName=extname(file.originalname)
    const randomString=Array(5).fill(null).map(()=>{Math.round(Math.random()*16).toString(16)}).join('');
    callback(null, `${name}-${randomString}${fileExtensionName}`)
}