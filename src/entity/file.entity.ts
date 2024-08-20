import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ImgEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    url:string;
}