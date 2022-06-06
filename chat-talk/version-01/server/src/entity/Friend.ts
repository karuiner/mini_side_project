import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.friend, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => User, (puser) => puser.host, {
    onDelete: "CASCADE",
  })
  puser: User;
}
