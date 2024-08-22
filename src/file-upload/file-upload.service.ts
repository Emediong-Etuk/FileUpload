import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImgEntity } from 'src/entity/file.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs'

@Injectable()
export class FileUploadService {
    constructor(@InjectRepository(ImgEntity) private imageRepo:Repository<ImgEntity>){}

    async uploadFile(file:Express.Multer.File){
        if(!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)){
            return new HttpException('sorry this file extension does not match the required file we want',404)
            
        }
        const image = new ImgEntity();
        image.name=file.originalname;
        image.url=`http://localhost:3000/${image.name}`
        try{
            const folderPath='./src/uploadedFiles'
            fs.mkdir(folderPath,(err)=>{return "Invalid folder path"})
            const filePath=`./src/uploadedFiles/${file.originalname}`
            await fs.promises.writeFile(filePath,file.buffer)
        }catch(error){
            console.log('Error saving file',error)
            throw new InternalServerErrorException('Failed to upload file')
        }
        const savedImage= await this.imageRepo.save(image)
        return{
            message:"File uploaded successfully",
            imageName:savedImage
        }
    }
    async getImageNameById(id:number){
        const image= await this.imageRepo.findOne({where:{id}})
        if(!image){
            throw new NotFoundException('no image found')
        }
        return {
            image:image.name,
            imageDirectory:`./src/uploadedFiles/${image.name}`
        }
    }
}
