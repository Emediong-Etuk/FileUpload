import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MulterModule.register({
    dest: './upload',
  })],
  controllers: [FileUploadController],
  providers: [FileUploadService]
})
export class FileUploadModule {}
