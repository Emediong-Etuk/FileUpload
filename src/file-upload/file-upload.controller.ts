import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils';
import * as fs from 'fs'

@Controller('file-upload')
export class FileUploadController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file.originalname);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('image',3,{
    storage:diskStorage({
      destination:'./src/nestjsFileUpload',
      filename:editFileName,
    }),
    fileFilter:imageFileFilter,
  }))
  async uploadMultipleFiles(@UploadedFiles() files){
    const response=[]
    files.forEach(file=>{
      const fileResponse={
        originalname:file.originalname,
        filename:file.filename,
      }
      response.push(fileResponse)
    })
    return response;
  }

  @Get(":imgpath")
  seeUploadedFile(@Param('imgpath') image, @Res() res){
    return res.sendFile(image,{root: './src/nestjsFileUpload'})
  }

  @Delete(":imgpath")
  deleteImg(@Param('imgpath') image, @Req() req, @Res() res):Promise<string>{
    fs.rm('./src/nestjsFileUpload' + image, (err)=>{
      if(err){
        throw err;
      }
      
    })
    return res.end(`Successfully deleted ${image}`)
  }
}
