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
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomName: string;

  @Column()
  lastMessage: string;

  //   @OneToMany((type) => Record, (record) => record.user, { cascade: ["remove"] })
  //   record: Record[];

  //   @OneToMany((type) => Mapdata, (mapdata) => mapdata.user, {
  //     cascade: ["remove"],
  //   })
  //   mapdata: Mapdata[];
}
