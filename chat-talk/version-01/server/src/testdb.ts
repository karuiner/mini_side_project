import { TestDataSource } from "./data-source";
import { Friend } from "./entity/Friend";
import { Member } from "./entity/Member";
import { Message } from "./entity/Message";
import { Room } from "./entity/Room";
import { User } from "./entity/User";

TestDataSource.initialize()
  .then(async () => {
    const user = TestDataSource.getRepository(User);
    const friend = TestDataSource.getRepository(Friend);
    const room = TestDataSource.getRepository(Room);
    const member = TestDataSource.getRepository(Member);
    const message = TestDataSource.getRepository(Message);

    const uc = await user.count();
    if (uc === 0) {
      for (let i = 1; i < 10; i++) {
        await user.insert({
          userName: `test${i}`,
          password: `test${i}`,
          email: `test${i}@test.test`,
        });
      }
    }
    const rc = await room.count();
    if (rc === 0) {
      await room.insert({ roomName: "troom", lastMessage: "" });
    }

    const room1 = await room.findOne({ where: { id: 1 } });
    const user1 = await user.findOne({ where: { id: 1 } });
    const mc = await member.count();
    if (mc === 0) {
      for (let i = 2; i < 10; i = i + 2) {
        const target = await user.findOne({ where: { id: i } });
        await member.insert({ user: target, room: room1 });
      }
    }
    const fc = await friend.count();
    if (fc === 0) {
      for (let i = 2; i < 10; i = i + 2) {
        const target = await user.findOne({ where: { id: i } });
        await friend.insert({ user: user1, puser: target });
      }
    }
    // await member
    //   .find({ relations: { room: true }, where: { user: { id: 2 } } })
    //   .then((x) => {
    //     let rooms = [];
    //     x.forEach((x) => {
    //       rooms.push(x.room);
    //     });
    //     return rooms;
    //   })
    //   .then((x) => {
    //     console.log(x);
    //   })
    //   .catch();
    await room
      .findOne({
        select: { member: { id: true, user: { id: true, userName: true } } },
        relations: { member: { user: true } },
        where: { id: 1 },
      })
      .then((x) => {
        console.log(x.member);
      })
      .catch((err) => {});
    // await user
    //   .findOne({
    //     relations: {
    //       friend: { puser: true },
    //     },
    //     select: { friend: true },
    //     where: { id: 1 },
    //   })
    //   .then((rst) => {
    //     // rst.friend.forEach((x) => {
    //     //   console.log(x);
    //     // });
    //     console.log(rst);
    //   });
    await friend
      .find({
        select: { puser: { id: true, userName: true } },
        relations: { puser: true },
        where: { user: { id: 1 } },
      })
      .then(console.log);
  })
  .then(async () => {
    await TestDataSource.destroy();
  })
  .catch((error) => console.log(error));
