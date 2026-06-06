# BusinessPlan AI Pro

> Plateforme SaaS de génération automatique de business plans professionnels pour les entrepreneurs africains francophones.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/businessplan-log-prod)

## Fonctionnalites

- Génération IA : Business plans complets en 5 minutes via GPT-4o
- Wizard 5 étapes : Assistant intelligent pour saisir vos informations
- Module financier : Prévisions sur 1, 3 et 5 ans avec graphiques Recharts
- Analyse SWOT : Générée automatiquement et visuellement
- Export Premium : PDF style cabinet de conseil, Word éditable, Excel financier
- Paiements Africains : CinetPay, Flutterwave, Stripe
- Authentification : Google OAuth + Email/Password via NextAuth
- Dashboard Admin : Gestion complète des utilisateurs, paiements et logs
- SEO Optimisé : Sitemap, robots.txt, Open Graph, meta tags

## Stack Technique

| Couche | Technologies |
|--------|-------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Shadcn UI |
| Backend | Next.js API Routes, Prisma ORM |
| Base de données | PostgreSQL |
| IA | OpenAI GPT-4o |
| Auth | NextAuth v5 (Google + Email) |
| Paiement | Stripe, CinetPay, Flutterwave |
| Export | jsPDF, docx, ExcelJS |
| Graphiques | Recharts |
| Déploiement | GitHub Actions + Vercel |

## Installation

### 1. Cloner et installer
```bash
git clone https://github.com/your-org/businessplan-log-prod.git
cd businessplan-log-prod
npm install
```

### 2. Configurer l'environnement
```bash
cp .env.local.example .env.local
```

### 3. Variables d'environnement requises
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="votre-secret"
GOOGLE_CLIENT_ID="..."
OPENAI_API_KEY="sk-..."
STRIPE_SECRET_KEY="sk_test_..."
CINETPAY_API_KEY="..."
```

### 4. Base de données
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Lancer
```bash
npm run dev
```

## Structure

```
src/
├── app/
│   ├── (auth)/          # Login, Register
│   ├── (dashboard)/     # Dashboard, Create, Plans, Billing
│   ├── (marketing)/     # Homepage, Pricing, Features
│   ├── (admin)/         # Espace administrateur
│   └── api/             # API Routes
├── components/          # Composants React
├── lib/                 # Utilitaires (ai, auth, db)
├── types/               # Types TypeScript
└── prisma/schema.prisma # Schéma BDD
```

## Offres

| Offre | Prix |
|-------|------|
| Document Unique | 10 000 FCFA |
| Mensuel | 25 000 FCFA/mois |
| Premium | 50 000 FCFA/mois |

Développé par SEAHORSE - Douala, Cameroun
