// ============================================
// SEED DATABASE - DONNÉES INITIALES
// Fichier: prisma/seed.ts
// ============================================

import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "@my-better-t-app/env/server";
import {
  PrismaClient,
  type Insect,
  type User,
  type Account,
  type Session,
  type Verification,
  type Todo,
  type DailySteps,
  type UserInsect,
  type PointTransaction,
  Rarity,
} from "./generated/client";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ============================================
// DONNÉES D'INSECTES
// ============================================
const insects: Insect[] = [
  // COMMUNS

  {
    id: 1,
    name: "Coccinelle",
    sciName: "Coccinella septempunctata",
    featured: true,
    rarity: Rarity.Commun,
    imageKey: "coccinelle",
    description:
      "Petit coléoptère rouge à points noirs très apprécié des jardiniers. Elle se nourrit principalement de pucerons et contribue naturellement à protéger les plantes.",
  },
  {
    id: 2,
    name: "Fourmi noire",
    sciName: "Lasius niger",
    featured: false,
    rarity: Rarity.Commun,
    imageKey: "fourmi-noire",
    description:
      "Espèce très commune vivant en colonies organisées. Les ouvrières construisent des galeries complexes et coopèrent pour récolter nourriture et matériaux.",
  },
  {
    id: 3,
    name: "Abeille domestique",
    sciName: "Apis mellifera",
    featured: true,
    rarity: Rarity.Commun,
    imageKey: "abeille-domestique",
    description:
      "Pollinisateur essentiel à de nombreuses cultures. Elle vit dans des ruches et produit du miel grâce au nectar récolté sur les fleurs.",
  },
  {
    id: 4,
    name: "Criquet migrateur",
    sciName: "Locusta migratoria",
    featured: false,
    rarity: Rarity.Commun,
    imageKey: "criquet-migrateur",
    description:
      "Insecte sauteur capable de parcourir de grandes distances. Lors de certaines migrations, il peut former d'immenses essaims.",
  },
  {
    id: 5,
    name: "Gendarme",
    sciName: "Pyrrhocoris apterus",
    featured: false,
    rarity: Rarity.Commun,
    imageKey: "gendarme",
    description:
      "Insecte rouge et noir souvent observé en groupe au pied des arbres. Il est totalement inoffensif pour l'être humain.",
  },
  {
    id: 6,
    name: "Mouche domestique",
    sciName: "Musca domestica",
    featured: false,
    rarity: Rarity.Commun,
    imageKey: "mouche-domestique",
    description:
      "L'un des insectes les plus répandus au monde. Elle possède une grande capacité d'adaptation aux environnements humains.",
  },

  // RARES

  {
    id: 7,
    name: "Papillon Monarque",
    sciName: "Danaus plexippus",
    featured: true,
    rarity: Rarity.Rare,
    imageKey: "papillon-monarque",
    description:
      "Papillon célèbre pour ses migrations spectaculaires à travers l'Amérique du Nord. Ses ailes orange et noires sont facilement reconnaissables.",
  },
  {
    id: 8,
    name: "Libellule bleue",
    sciName: "Calopteryx virgo",
    featured: true,
    rarity: Rarity.Rare,
    imageKey: "libellule-bleue",
    description:
      "Prédateur aérien très agile vivant près des zones humides. Ses ailes transparentes lui permettent un vol extrêmement précis.",
  },
  {
    id: 9,
    name: "Bourdon terrestre",
    sciName: "Bombus terrestris",
    featured: false,
    rarity: Rarity.Rare,
    imageKey: "bourdon-terrestre",
    description:
      "Grand pollinisateur au corps trapu et velu. Il peut voler même lorsque les températures sont relativement basses.",
  },
  {
    id: 10,
    name: "Phasme gaulois",
    sciName: "Clonopsis gallica",
    featured: false,
    rarity: Rarity.Rare,
    imageKey: "phasme-gaulois",
    description:
      "Maître du camouflage, son corps imite parfaitement une brindille afin d'échapper aux prédateurs.",
  },
  {
    id: 11,
    name: "Cétoine dorée",
    sciName: "Cetonia aurata",
    featured: false,
    rarity: Rarity.Rare,
    imageKey: "cetoine-doree",
    description:
      "Coléoptère aux reflets métalliques verts et dorés. On le rencontre souvent dans les jardins durant les journées ensoleillées.",
  },

  // ÉPIQUES

  {
    id: 12,
    name: "Scarabée Rhinocéros",
    sciName: "Oryctes nasicornis",
    featured: true,
    rarity: Rarity.Epique,
    imageKey: "scarabee-rhinoceros",
    description:
      "Impressionnant coléoptère doté d'une corne caractéristique. Malgré son apparence intimidante, il est totalement inoffensif.",
  },
  {
    id: 13,
    name: "Lucane Cerf-volant",
    sciName: "Lucanus cervus",
    featured: true,
    rarity: Rarity.Epique,
    imageKey: "lucane-cerf-volant",
    description:
      "L'un des plus grands coléoptères d'Europe. Les mâles possèdent de puissantes mandibules rappelant les bois d'un cerf.",
  },
  {
    id: 14,
    name: "Grand Paon de Nuit",
    sciName: "Saturnia pyri",
    featured: false,
    rarity: Rarity.Epique,
    imageKey: "grand-paon-de-nuit",
    description:
      "Le plus grand papillon d'Europe. Ses ailes présentent de grands ocelles qui imitent les yeux d'un prédateur.",
  },
  {
    id: 15,
    name: "Rosalie des Alpes",
    sciName: "Rosalia alpina",
    featured: false,
    rarity: Rarity.Epique,
    imageKey: "rosalie-des-alpes",
    description:
      "Coléoptère rare à la coloration bleu-gris et aux longues antennes noires. Espèce protégée dans plusieurs pays européens.",
  },

  // LÉGENDAIRES

  {
    id: 16,
    name: "Mante Religieuse",
    sciName: "Mantis religiosa",
    featured: true,
    rarity: Rarity.Legendaire,
    imageKey: "mante-religieuse",
    description:
      "Prédateur redoutable capable de capturer des proies presque aussi grandes qu'elle. Son attitude évoque une posture de prière.",
  },
  {
    id: 17,
    name: "Atlas géant",
    sciName: "Attacus atlas",
    featured: true,
    rarity: Rarity.Legendaire,
    imageKey: "atlas-geant",
    description:
      "L'un des plus grands papillons du monde. Son envergure peut dépasser 25 centimètres.",
  },
  {
    id: 18,
    name: "Goliath géant",
    sciName: "Goliathus goliatus",
    featured: false,
    rarity: Rarity.Legendaire,
    imageKey: "goliath-geant",
    description:
      "Parmi les plus lourds insectes connus. Les adultes impressionnent par leur taille et leur puissance.",
  },
  {
    id: 19,
    name: "Papillon Reine Alexandra",
    sciName: "Ornithoptera alexandrae",
    featured: false,
    rarity: Rarity.Legendaire,
    imageKey: "papillon-reine-alexandra",
    description:
      "Le plus grand papillon du monde. Cette espèce extrêmement rare est endémique de certaines régions de Papouasie-Nouvelle-Guinée.",
  },
];
// ============================================
// DONNÉES D'UTILISATEURS
// ============================================

const users: User[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    emailVerified: true,
    image: "https://example.com/alice.jpg",
    points: 1250,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Bob",
    email: "bob@example.com",
    emailVerified: false,
    image: "https://example.com/bob.jpg",
    points: 340,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ============================================
// DONNÉES DE COMPTES
// ============================================

const accounts: Account[] = [
  {
    id: "1",
    accountId: "12345",
    providerId: "google",
    userId: "1",
    accessToken: "access_token_123",
    refreshToken: "refresh_token_123",
    idToken: "id_token_123",
    accessTokenExpiresAt: new Date(),
    refreshTokenExpiresAt: new Date(),
    scope: "read:user",
    password: "hashed_password_123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    accountId: "67890",
    providerId: "github",
    userId: "2",
    accessToken: "access_token_456",
    refreshToken: "refresh_token_456",
    idToken: "id_token_456",
    accessTokenExpiresAt: new Date(),
    refreshTokenExpiresAt: new Date(),
    scope: "read:user",
    password: "hashed_password_456",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ============================================
// DONNÉES DE SESSIONS
// ============================================

const sessions: Session[] = [
  {
    id: "1",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    token: "session_token_123",
    createdAt: new Date(),
    updatedAt: new Date(),
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0",
    userId: "1",
  },
  {
    id: "2",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    token: "session_token_456",
    createdAt: new Date(),
    updatedAt: new Date(),
    ipAddress: "192.168.1.2",
    userAgent: "Mozilla/5.0",
    userId: "2",
  },
];

// ============================================
// DONNÉES DE VÉRIFICATION
// ============================================

const verifications: Verification[] = [
  {
    id: "1",
    identifier: "alice@example.com",
    value: "verification_token_123",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    identifier: "bob@example.com",
    value: "verification_token_456",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ============================================
// DONNÉES DE TODOS
// ============================================

const todos: Todo[] = [
  {
    id: 1,
    text: "Acheter du lait",
    completed: false,
  },
  {
    id: 2,
    text: "Faire les courses",
    completed: true,
  },
];

// ============================================
// DONNÉES DE POINTS
// ============================================

const dailySteps: DailySteps[] = [
  {
    id: 1,
    userId: "1",
    date: new Date("2026-06-01"),
    steps: 8234,
  },
  {
    id: 2,
    userId: "1",
    date: new Date("2026-06-02"),
    steps: 10125,
  },
  {
    id: 3,
    userId: "2",
    date: new Date("2026-06-01"),
    steps: 4210,
  },
];

const pointTransactions: PointTransaction[] = [
  {
    id: 1,
    userId: "1",
    amount: 500,
    reason: "reward for steps",
    createdAt: new Date(),
  },
  {
    id: 2,
    userId: "1",
    amount: -100,
    reason: "summoning insect",
    createdAt: new Date(),
  },
  {
    id: 3,
    userId: "1",
    amount: 850,
    reason: "reward for steps",
    createdAt: new Date(), 
  },
  {
    id: 4,
    userId: "2",
    amount: 340,
    reason: "reward for steps",
    createdAt: new Date(),
  },
];

// ============================================
// DONNÉES DE USER INSECTS (COLLECTIONS)
// ============================================

const userInsects: UserInsect[] = [
  {
    id: 1,
    userId: "1",
    insectId: 1,
    quantity: 12,
  },
  {
    id: 2,
    userId: "1",
    insectId: 2,
    quantity: 5,
  },
  {
    id: 3,
    userId: "1",
    insectId: 12,
    quantity: 1,
  },
  {
    id: 4,
    userId: "1",
    insectId: 16,
    quantity: 1,
  },
  {
    id: 5,
    userId: "2",
    insectId: 1,
    quantity: 2,
  },
  {
    id: 6,
    userId: "2",
    insectId: 8,
    quantity: 1,
  },
];


// ============================================
// FONCTION PRINCIPALE DE SEEDING
// ============================================


async function main() {
  await prisma.insect.createMany({ data: insects });
  await prisma.user.createMany({ data: users });
  await prisma.account.createMany({ data: accounts });
  await prisma.session.createMany({ data: sessions });
  await prisma.verification.createMany({ data: verifications });
  await prisma.todo.createMany({ data: todos });
  await prisma.dailySteps.createMany({ data: dailySteps });
  await prisma.pointTransaction.createMany({ data: pointTransactions });
  await prisma.userInsect.createMany({ data: userInsects });
  console.log("Database seeded successfully!");


  // ============================================
  // RESYNCHRONISATION DES SÉQUENCES POSTGRESQL
  // Nécessaire après un createMany avec des ids
  // explicites : Prisma n'incrémente pas les
  // séquences auto-increment automatiquement.
  // ============================================
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Insect"', 'id'), (SELECT MAX(id) FROM "Insect"))`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"DailySteps"', 'id'), (SELECT MAX(id) FROM "DailySteps"))`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"PointTransaction"', 'id'), (SELECT MAX(id) FROM "PointTransaction"))`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"UserInsect"', 'id'), (SELECT MAX(id) FROM "UserInsect"))`;
 
  console.log("Database seeded successfully!");
}
 
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 