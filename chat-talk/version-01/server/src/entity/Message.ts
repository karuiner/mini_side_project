import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
// import { Record } from "./Record";
// import { Save } from "./Save";
// import { Mapdata } from "./Map";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  //   @OneToMany((type) => Record, (record) => record.user, { cascade: ["remove"] })
  //   record: Record[];

  //   @OneToMany((type) => Mapdata, (mapdata) => mapdata.user, {
  //     cascade: ["remove"],
  //   })
  //   mapdata: Mapdata[];
}
