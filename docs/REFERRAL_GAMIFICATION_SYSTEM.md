# Referral Gamification System — Technical Spec

**Goal:** Turn every user into an affiliate through tiered rewards and social mechanics

**Current:** 50% commission affiliate program (manual signup)
**Upgrade:** Automatic gamification + leaderboard + milestone rewards

---

## TIER SYSTEM

| Referrals | Reward | Visual Badge | Notification |
|-----------|--------|--------------|--------------|
| **1** | $5 credit | 🌱 Seedling | "You earned your first $5! Keep sharing!" |
| **3** | Free pack ($4.99 value) | 🌸 Blossom | "3 referrals = 1 free pack! Choose your pack:" |
| **10** | Founding Pro (1 year, $300 value) | ⭐ Rising Star | "WOW! 10 referrals = free Pro for a YEAR!" |
| **50** | $500 cash payout | 👑 Legend | "LEGENDARY! You just earned $500 cash. Check your PayPal!" |
| **100+** | Custom co-branded pack | 💎 Diamond | "You're a Diamond affiliate! Let's create your signature pack!" |

---

## DATABASE SCHEMA

### `referrals` Table (Supabase)

```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_code TEXT NOT NULL, -- Their unique code (e.g., "SARAH2024")
  referrer_email TEXT NOT NULL, -- Who referred
  referred_email TEXT, -- Who was referred (null if anonymous)
  clicked_at TIMESTAMP DEFAULT NOW(), -- When they clicked the link
  converted_at TIMESTAMP, -- When they made first purchase (null if not yet)
  conversion_amount_cents INT DEFAULT 0, -- How much they spent
  commission_earned_cents INT DEFAULT 0, -- 50% of conversion_amount
  status TEXT DEFAULT 'pending', -- pending, converted, paid
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_referrer_code ON referrals(referrer_code);
CREATE INDEX idx_referrer_email ON referrals(referrer_email);
```

### `affiliate_stats` Table

```sql
CREATE TABLE affiliate_stats (
  email TEXT PRIMARY KEY,
  referral_code TEXT UNIQUE NOT NULL,
  total_clicks INT DEFAULT 0,
  total_conversions INT DEFAULT 0,
  total_earned_cents INT DEFAULT 0, -- Lifetime earnings
  current_tier TEXT DEFAULT 'seedling', -- seedling, blossom, star, legend, diamond
  tier_progress INT DEFAULT 0, -- Conversions toward next tier
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### `milestone_rewards` Table

```sql
CREATE TABLE milestone_rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  milestone INT NOT NULL, -- 1, 3, 10, 50, 100
  reward_type TEXT NOT NULL, -- credit, pack, pro_year, cash, custom_pack
  reward_value_cents INT NOT NULL,
  claimed_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'pending', -- pending, delivered, completed
  UNIQUE(email, milestone) -- Prevent duplicate claims
);
```

---

## API ENDPOINTS

### `/api/referrals/generate` — Generate Unique Code

**POST** `/api/referrals/generate`

**Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "code": "SARAH2024",
  "link": "https://blindbox-creator.vercel.app?ref=SARAH2024",
  "stats": {
    "clicks": 0,
    "conversions": 0,
    "earned": 0,
    "tier": "seedling"
  }
}
```

**Logic:**
1. Check if email already has code in `affiliate_stats`
2. If yes, return existing code
3. If no, generate new code: `FIRSTNAME + random4digits` (e.g., "SARAH2024")
4. Insert into `affiliate_stats`
5. Return code + share link

---

### `/api/referrals/track` — Track Click

**POST** `/api/referrals/track`

**Body:**
```json
{
  "code": "SARAH2024",
  "ip": "192.168.1.1" // For fraud prevention
}
```

**Response:**
```json
{
  "success": true,
  "credit_popup": true, // Show $5 credit popup if first visit
  "expiry": "2026-02-16T12:00:00Z" // 24h from now
}
```

**Logic:**
1. Hash IP (SHA-256) for privacy
2. Check if IP has clicked this code in last 30 days (prevent duplicate clicks)
3. If new click:
   - Insert into `referrals` table (status = 'pending')
   - Increment `affiliate_stats.total_clicks`
   - Set 30-day cookie: `ref_code=SARAH2024`
   - Set 24h cookie: `ref_credit=1` (for $5 popup)
4. Return success + credit_popup flag

---

### `/api/referrals/convert` — Track Conversion

**POST** `/api/referrals/convert`

**Body:**
```json
{
  "email": "buyer@example.com",
  "amount_cents": 499, // $4.99
  "stripe_session_id": "cs_xxx"
}
```

**Response:**
```json
{
  "success": true,
  "referrer_earned_cents": 250, // 50% commission
  "milestone_unlocked": {
    "tier": 3,
    "reward": "free_pack",
    "message": "You unlocked a free pack!"
  }
}
```

**Logic:**
1. Read cookie `ref_code` (if exists within 30 days)
2. If exists:
   - Find referral in `referrals` table (status = 'pending')
   - Update: `status = 'converted'`, `converted_at = NOW()`, `conversion_amount_cents`, `commission_earned_cents = amount * 0.5`
   - Update `affiliate_stats`: increment `total_conversions`, add `commission_earned_cents` to `total_earned_cents`
   - Check if milestone reached (1, 3, 10, 50, 100 conversions)
   - If milestone reached: insert into `milestone_rewards`, return milestone data
3. Return success + earnings

---

### `/api/referrals/stats` — Get User Stats

**GET** `/api/referrals/stats?email=user@example.com`

**Response:**
```json
{
  "code": "SARAH2024",
  "link": "https://blindbox-creator.vercel.app?ref=SARAH2024",
  "clicks": 45,
  "conversions": 8,
  "earned_cents": 2000, // $20.00
  "tier": "blossom",
  "next_milestone": {
    "referrals_needed": 2,
    "reward": "Founding Pro (1 year)"
  },
  "unclaimed_rewards": [
    {
      "milestone": 3,
      "reward_type": "free_pack",
      "message": "Choose your free pack!"
    }
  ]
}
```

---

### `/api/referrals/leaderboard` — Public Leaderboard

**GET** `/api/referrals/leaderboard?limit=10`

**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "name": "Sarah M.", // Anonymized (first name + last initial)
      "conversions": 87,
      "tier": "legend",
      "badge": "👑"
    },
    {
      "rank": 2,
      "name": "Emily J.",
      "conversions": 52,
      "tier": "legend",
      "badge": "👑"
    }
  ],
  "your_rank": 15,
  "your_conversions": 8
}
```

---

## UI COMPONENTS

### 1. Referral Dashboard (`/affiliate` page enhancements)

**Add to existing affiliate page:**

```tsx
<div className="bg-white rounded-2xl p-6 border">
  <h2 className="text-2xl font-bold mb-4">Your Progress</h2>

  {/* Tier Badge */}
  <div className="flex items-center gap-4 mb-6">
    <div className="text-6xl">{tierEmoji}</div>
    <div>
      <div className="text-lg font-bold">{tierName}</div>
      <div className="text-sm text-muted-foreground">
        {conversions}/10 conversions to next tier
      </div>
    </div>
  </div>

  {/* Progress Bar */}
  <div className="bg-gray-200 rounded-full h-4 mb-2">
    <div
      className="bg-gradient-to-r from-brand-pink to-brand-purple h-4 rounded-full"
      style={{ width: `${(conversions / 10) * 100}%` }}
    />
  </div>
  <p className="text-xs text-muted-foreground">
    {10 - conversions} more referrals to unlock Founding Pro (1 year)!
  </p>

  {/* Unclaimed Rewards */}
  {unclaimedRewards.length > 0 && (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
      <h3 className="font-bold text-green-800 mb-2">🎁 You have rewards waiting!</h3>
      {unclaimedRewards.map(reward => (
        <button
          key={reward.milestone}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold"
        >
          Claim {reward.reward_type === 'free_pack' ? 'Free Pack' : reward.reward_type}
        </button>
      ))}
    </div>
  )}
</div>
```

---

### 2. Leaderboard Page (`/affiliate/leaderboard`)

**Create new page:**

```tsx
export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [yourRank, setYourRank] = useState(null);

  useEffect(() => {
    fetch('/api/referrals/leaderboard?limit=100')
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data.leaderboard);
        setYourRank(data.your_rank);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        🏆 Top Referrers
      </h1>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8">
        <p className="text-center font-bold">
          Top 10 affiliates earn $100 bonus at end of month! 💰
        </p>
      </div>

      <div className="space-y-4">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={`bg-white rounded-xl p-4 border-2 ${
              entry.rank === yourRank ? 'border-brand-pink' : 'border-border'
            } flex items-center justify-between`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-muted-foreground">
                #{entry.rank}
              </div>
              <div className="text-4xl">{entry.badge}</div>
              <div>
                <div className="font-bold">{entry.name}</div>
                <div className="text-sm text-muted-foreground">
                  {entry.conversions} referrals
                </div>
              </div>
            </div>
            {entry.rank === yourRank && (
              <span className="bg-brand-pink text-white px-3 py-1 rounded-full text-sm font-bold">
                You!
              </span>
            )}
          </div>
        ))}
      </div>

      {yourRank && yourRank > 100 && (
        <div className="text-center mt-8 text-muted-foreground">
          <p>You're ranked #{yourRank}. Keep sharing to climb the leaderboard!</p>
        </div>
      )}
    </div>
  );
}
```

---

### 3. Milestone Notification (Toast/Modal)

**When user hits milestone, show modal:**

```tsx
function MilestoneModal({ milestone, onClose }) {
  const rewards = {
    1: { emoji: '🌱', title: 'First Referral!', reward: '$5 credit', message: 'Keep sharing!' },
    3: { emoji: '🌸', title: 'Blossom Tier!', reward: 'Free pack', message: 'Choose your pack below' },
    10: { emoji: '⭐', title: 'Rising Star!', reward: 'Pro for 1 year', message: 'You're amazing!' },
    50: { emoji: '👑', title: 'LEGENDARY!', reward: '$500 cash', message: 'Check your PayPal!' },
  };

  const data = rewards[milestone];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md text-center animate-in zoom-in">
        <div className="text-8xl mb-4">{data.emoji}</div>
        <h2 className="text-3xl font-extrabold mb-2">{data.title}</h2>
        <p className="text-xl mb-4">You unlocked: <strong>{data.reward}</strong></p>
        <p className="text-muted-foreground mb-6">{data.message}</p>
        <button
          onClick={onClose}
          className="bg-brand-pink text-white px-8 py-3 rounded-full font-bold"
        >
          Claim Reward
        </button>
      </div>
    </div>
  );
}
```

---

## SOCIAL PROOF WIDGET

### Live Activity Feed (Homepage)

**Add to homepage:**

```tsx
<div className="bg-muted rounded-xl p-4">
  <h3 className="font-bold mb-3">🔥 Recent Activity</h3>
  <div className="space-y-2 text-sm">
    <div className="flex items-center gap-2">
      <span className="text-green-600">✓</span>
      <span className="text-muted-foreground">
        <strong>Sarah</strong> just earned a free pack (3 referrals)
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-green-600">✓</span>
      <span className="text-muted-foreground">
        <strong>Emily</strong> hit Legend tier (50 referrals!)
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-green-600">✓</span>
      <span className="text-muted-foreground">
        <strong>Mike</strong> just made their first referral!
      </span>
    </div>
  </div>
</div>
```

**Data source:** Poll `/api/referrals/activity` every 10 seconds, show last 5 milestone events

---

## IMPLEMENTATION PLAN

### Phase 1: Database & API (Week 1)
- [ ] Create Supabase tables (`referrals`, `affiliate_stats`, `milestone_rewards`)
- [ ] Build `/api/referrals/generate` endpoint
- [ ] Build `/api/referrals/track` endpoint
- [ ] Build `/api/referrals/convert` endpoint
- [ ] Build `/api/referrals/stats` endpoint
- [ ] Test with 10 manual referrals

### Phase 2: UI Components (Week 2)
- [ ] Enhance `/affiliate` page with tier progress
- [ ] Create `/affiliate/leaderboard` page
- [ ] Build milestone notification modal
- [ ] Add social proof widget to homepage
- [ ] Test user flows (signup → share → convert → claim reward)

### Phase 3: Automation (Week 3)
- [ ] Auto-generate affiliate code on user signup (create page, first AI generation, or first purchase)
- [ ] Auto-track conversions via Stripe webhook
- [ ] Auto-send milestone emails ("You hit 3 referrals!")
- [ ] Auto-pay cash rewards ($500 tier) via PayPal API
- [ ] Leaderboard monthly bonus ($100 to top 10)

---

## NEXT STEPS

1. ✅ Review schema design
2. ✅ Create Supabase migration scripts
3. ✅ Build API endpoints
4. ✅ Test referral flow end-to-end
5. ✅ Design UI components (Figma mockups)
6. ✅ Implement frontend
7. ✅ QA test with real users (10 beta testers)
8. ✅ Launch publicly + announce via email

**Let's turn every user into an affiliate! 🚀**
