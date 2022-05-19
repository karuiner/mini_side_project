import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.member, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Room, (room) => room.member, {
    onDelete: "CASCADE",
  })
  room: Room;
}
