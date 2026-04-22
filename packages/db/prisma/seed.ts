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
  Rarity,
} from "./generated/client";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ============================================
// DONNÉES D'INSECTES
// ============================================

const insects: Insect[] = [
  {
    id: 1,
    name: "Coccinelle",
    Sci_Name: "Coccinella septempunctata",
    featured: true,
    rarity: Rarity.Commun,
  },
  {
    id: 2,
    name: "Papillon Monarque",
    Sci_Name: "Danaus plexippus",
    featured: false,
    rarity: Rarity.Rare,
  },
  {
    id: 3,
    name: "Scarabée Rhinocéros",
    Sci_Name: "Oryctes nasicornis",
    featured: true,
    rarity: Rarity.Epique,
  },
  {
    id: 4,
    name: "Mante Religieuse",
    Sci_Name: "Mantis religiosa",
    featured: false,
    rarity: Rarity.Legendaire,
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Bob",
    email: "bob@example.com",
    emailVerified: false,
    image: "https://example.com/bob.jpg",
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
// FONCTION PRINCIPALE DE SEEDING
// ============================================

async function main() {
  await prisma.insect.createMany({ data: insects });
  await prisma.user.createMany({ data: users });
  await prisma.account.createMany({ data: accounts });
  await prisma.session.createMany({ data: sessions });
  await prisma.verification.createMany({ data: verifications });
  await prisma.todo.createMany({ data: todos });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });