import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgEntity } from './entity/file.entity';

@Module({
  imports: [FileUploadModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'11thApril2004#',
      database:'fileupload',
      entities:[ImgEntity],
      synchronize:true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
