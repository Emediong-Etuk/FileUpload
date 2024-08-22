import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImgEntity } from 'src/entity/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[MulterModule.register({
    dest: './upload',
  }), TypeOrmModule.forFeature([ImgEntity])],
  controllers: [FileUploadController],
  providers: [FileUploadService,]
})
export class FileUploadModule {}
