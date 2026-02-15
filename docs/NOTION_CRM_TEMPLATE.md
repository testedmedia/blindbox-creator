# Influencer CRM Template (Import to Notion)

## Database Properties

| Property | Type | Options |
|----------|------|---------|
| **Name** | Title | — |
| **Platform** | Select | Instagram, TikTok, YouTube, Pinterest, Blog, Twitter |
| **Handle** | Text | @username |
| **Followers** | Number | — |
| **Tier** | Select | Nano (1K-10K), Micro (10K-100K), Macro (100K-1M), Mega (1M+) |
| **Engagement Rate** | Number | Format: Percent |
| **Niche** | Multi-select | Parenting, Crafts, Teacher, DIY, Lifestyle, Kawaii, Kids Activities |
| **Email** | Email | — |
| **Status** | Select | 🎯 Target, 📧 Outreach Sent, 💬 Replied, 🤝 Partnership, ❌ Not Interested, 🔄 Follow-Up |
| **Outreach Date** | Date | — |
| **Last Contact** | Date | — |
| **Priority Score** | Number | 1-10 (calculated: engagement × fit × reach) |
| **Notes** | Long Text | Recent posts, partnership details, personal notes |
| **Content Posted** | Number | Count of posts they've made |
| **Revenue Generated** | Number | Format: USD |
| **Affiliate Link** | URL | Their unique affiliate link |

---

## Sample Entries (Copy This Table)

| Name | Platform | Handle | Followers | Tier | Engagement | Niche | Email | Status | Priority |
|------|----------|--------|-----------|------|------------|-------|-------|--------|----------|
| Sarah Johnson | Instagram | @craftymom | 8,500 | Nano | 5.2% | Parenting, Crafts | sarah@example.com | 🎯 Target | 8 |
| Emily Craft Co | YouTube | @emilycraft | 45,000 | Micro | 4.8% | DIY, Crafts | emily@example.com | 📧 Outreach Sent | 9 |
| Mrs. Smith Teaches | TikTok | @mrssmithteaches | 12,000 | Nano | 6.1% | Teacher, Kids Activities | — | 🎯 Target | 7 |
| Kawaii Mom Life | Instagram | @kawaiimomlife | 125,000 | Macro | 3.9% | Parenting, Kawaii, Lifestyle | — | 🎯 Target | 10 |
| The DIY Mom | Blog | thediy.mom | 35,000 | Micro | 3.5% | DIY, Parenting, Crafts | contact@thediy.mom | 💬 Replied | 8 |

---

## Views to Create in Notion

### 1. **Priority Pipeline** (Board View)
- Group by: **Status**
- Sort by: **Priority Score** (descending)
- Filter: None (show all)
- Use: Drag influencers through pipeline (Target → Outreach → Replied → Partnership)

### 2. **Top Targets** (Table View)
- Filter: Status = 🎯 Target
- Sort by: Priority Score (descending)
- Visible columns: Name, Platform, Followers, Engagement Rate, Priority Score, Email, Notes
- Use: Pick next influencers to contact

### 3. **Follow-Up Queue** (Calendar View)
- Date property: **Last Contact**
- Filter: Status = 📧 Outreach Sent OR Status = 🔄 Follow-Up
- Use: See who needs a follow-up email (7+ days since last contact)

### 4. **Active Partners** (Gallery View)
- Filter: Status = 🤝 Partnership
- Group by: Tier
- Sort by: Revenue Generated (descending)
- Use: Track top-performing influencers

### 5. **By Platform** (Table View)
- Group by: Platform
- Sort by: Followers (descending)
- Use: Target specific platforms for campaigns

---

## How to Use This CRM

### Step 1: Add Influencers
1. Search Instagram/TikTok/YouTube for target keywords (#craftymom, #teachersofinstagram, etc.)
2. Find 10 influencers that match your target audience
3. Add them to Notion with all fields filled out
4. Calculate **Priority Score** = (Engagement Rate × 10) + (Audience Fit 1-10) + (Reach Tier: Nano=1, Micro=2, Macro=3, Mega=4)

**Example:**
- Engagement: 5.2% → 5.2 × 10 = 52
- Audience Fit: Parenting + Crafts = 8/10
- Reach: Nano = 1
- **Priority Score: 52 + 8 + 1 = 61** → Normalize to 1-10 scale = **6/10**

(Or just eyeball it — 1=low priority, 10=dream partner)

### Step 2: Outreach
1. Go to **Top Targets** view
2. Pick top 10 influencers (highest priority scores)
3. Find their email (check Instagram bio → website → contact page)
4. Send Email 1 from templates (personalize first!)
5. Update Status → 📧 Outreach Sent
6. Set **Outreach Date** to today

### Step 3: Track Replies
1. When someone replies, update Status → 💬 Replied
2. Update **Last Contact** to today
3. Add notes: "Interested in free Pro account" or "Asked about commission rates"
4. Move to next step (send VIP access, schedule call, etc.)

### Step 4: Close Partnership
1. When they agree to partner, update Status → 🤝 Partnership
2. Generate affiliate link → add to **Affiliate Link** field
3. Send them press kit + sample scripts
4. Track **Content Posted** (increment when they post)
5. Track **Revenue Generated** (update monthly from Stripe data)

### Step 5: Follow-Up
1. Check **Follow-Up Queue** view every Monday
2. Send Email 2 to anyone who hasn't replied in 4 days
3. Send Email 3 to anyone who hasn't replied in 8 days
4. After Email 3, mark as ❌ Not Interested or 🔄 Follow-Up (if they asked to circle back later)

---

## Priority Score Formula

If you want to get fancy, use Notion's formula field:

```
if(prop("Engagement Rate") > 0 and prop("Followers") > 0,
  round(
    (prop("Engagement Rate") * 100) +
    (if(prop("Tier") == "Nano", 1,
       if(prop("Tier") == "Micro", 2,
       if(prop("Tier") == "Macro", 3,
       if(prop("Tier") == "Mega", 4, 0)))) +
    (if(contains(prop("Niche"), "Parenting"), 2, 0)) +
    (if(contains(prop("Niche"), "Crafts"), 2, 0)) +
    (if(contains(prop("Niche"), "Teacher"), 1, 0))
  ) / 10,
  0
)
```

This auto-calculates priority based on:
- Engagement rate (higher = better)
- Tier (bigger = more reach)
- Niche fit (parenting/crafts = highest fit)

---

## Automation Ideas (Advanced)

### Zapier/Make.com Integrations
1. **New Notion row → Send welcome email** (via Gmail/Mailchimp)
2. **Status = Partnership → Add to Stripe affiliates** (create affiliate code)
3. **Stripe sale → Update Revenue Generated** (track conversions)
4. **Last Contact > 7 days → Slack notification** ("Follow up with Sarah!")

### Notion Formulas
1. **Days Since Contact:** `dateBetween(now(), prop("Last Contact"), "days")`
2. **Follow-Up Needed:** `if(prop("Days Since Contact") > 7 and prop("Status") == "Outreach Sent", "⚠️ YES", "✓ No")`
3. **Est. Revenue (if 5% convert):** `prop("Followers") * 0.05 * 5` (assumes $5 avg order)

---

## KPIs to Track

| Metric | Formula | Target |
|--------|---------|--------|
| **Total Outreach** | Count(Status = Outreach Sent) | 50+ in Month 1 |
| **Reply Rate** | Replied / Outreach Sent | 20%+ |
| **Partnership Rate** | Partnership / Replied | 50%+ |
| **Avg Revenue/Partner** | Sum(Revenue) / Count(Partnership) | $100+/mo |
| **Top Platform** | Group by Platform → Sum(Revenue) | Instagram or TikTok |

---

## Next Steps

1. ✅ Create Notion database with properties above
2. ✅ Import sample entries (or start fresh)
3. ✅ Set up 5 views (Priority Pipeline, Top Targets, Follow-Up Queue, Active Partners, By Platform)
4. ✅ Add first 10 influencers from Instagram search
5. ✅ Calculate priority scores
6. ✅ Start outreach with top 10

**Notion Template Link:** Create database, then share as template via Notion's "Share → Template" feature.

---

## Pro Tips

- **Update weekly:** Every Monday, review pipeline and update statuses
- **Tag wins:** When someone posts, screenshot it and add to Notes field
- **Track trends:** If TikTok influencers convert better, prioritize TikTok
- **Batch outreach:** Send 10 emails on Tuesday, 10 on Thursday (avoid spam filters)
- **Personalize:** Spend 2-3 min per influencer researching recent posts before emailing
- **Follow up:** 80% of conversions happen after 2+ touches

**The CRM is only as good as you keep it updated. Make it a Monday ritual.**
