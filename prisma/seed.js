import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

try {
    await prisma.$queryRaw`TRUNCATE TABLE "LineupPlayer", "Lineup", "Player", "Team", "User" RESTART IDENTITY CASCADE;`;

  const usersData = [
    { email: 'bob@example.com', password: 'bob123' },
    { email: 'emily@example.com', password: 'emily123' }
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword
      }
    });

    users.push(user);
  }

  const user1 = users[0];
  const user2 = users[1];

  // Teams
  const team1 = await prisma.team.create({
    data: {
        name: "Bob's Team",
        userId: user1.id
    }
  });

  const team2 = await prisma.team.create({
    data: {
        name: "Emily's Team",
        userId: user2.id
    }
  });

  // Players
  const player1 = await prisma.player.create({
    data: {
        name: "John Forward",
        position: "Forward",
        teamId: team1.id
    }
  });

  const player2 = await prisma.player.create({
    data: {
        name: "Dave Defense",
        position: "Defense",
        teamId: team1.id
    }
  });

  const player3 = await prisma.player.create({
    data: {
        name: "Gary Goalie",
        position: "Goalie",
        teamId: team2.id
    }
  });

  const player4 = await prisma.player.create({
    data: {
        name: "Mike Forward",
        position: "Forward",
        teamId: team2.id
    }
  });

  // Lineups
  const lineup1 = await prisma.lineup.create({
    data: {
        name: "Bob's Lineup 1",
        teamId: team1.id
    }
  });

  const lineup2 = await prisma.lineup.create({
    data: {
        name: "Emily's Lineup 1",
        teamId: team2.id
    }
  });

  // Lineup Players
  await prisma.lineupPlayer.createMany({
    data: [
        {
            lineupId: lineup1.id,
            playerId: player1.id
        },
        {
            lineupId: lineup1.id,
            playerId: player2.id
        },
        {
            lineupId: lineup2.id,
            playerId: player3.id
        },
        {
            lineupId: lineup2.id,
            playerId: player4.id
        }
    ]
  });

  console.log("Seeding complete")
} catch (error) {
  console.error("Seed failed:", error);
} finally {
  await prisma.$disconnect();
}