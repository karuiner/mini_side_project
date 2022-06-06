import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Friend } from "./Friend";
import { Member } from "./Member";
import { Message } from "./Message";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  statusMessage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Member, (member) => member.user, { cascade: ["remove"] })
  member: Member[];

  @OneToMany((type) => Message, (message) => message.user, {
    cascade: ["remove"],
  })
  message: Message[];

  @OneToMany((type) => Friend, (host) => host.puser, { cascade: ["remove"] })
  host: Friend[];

  @OneToMany((type) => Friend, (friend) => friend.user, {
    cascade: ["remove"],
  })
  friend: Friend[];
}
