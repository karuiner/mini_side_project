import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.member, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Room, (room) => room.member, {
    onDelete: "CASCADE",
  })
  room: Room;
}
