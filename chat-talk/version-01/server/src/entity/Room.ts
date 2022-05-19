import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Member } from "./Member";
import { Message } from "./Message";

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomName: string;

  @Column()
  lastMessage: string;

  @OneToMany((type) => Member, (member) => member.room, { cascade: ["remove"] })
  member: Member[];

  @OneToMany((type) => Message, (message) => message.room, {
    cascade: ["remove"],
  })
  message: Message[];
}
