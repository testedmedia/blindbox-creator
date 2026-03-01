# Analytics Dashboard Template — Track Everything

**Platform:** Google Sheets (free, shareable, auto-updating)

**Update Frequency:** Daily (auto) + Weekly manual review

**Goal:** Data-driven decisions, not guesswork

---

## DASHBOARD STRUCTURE (6 Tabs)

1. **Overview** — KPIs at-a-glance
2. **Traffic** — Source breakdown, conversion funnels
3. **Revenue** — Sales, MRR, LTV, cohorts
4. **Growth** — Email list, affiliates, viral coefficient
5. **Content** — Blog, social, influencer performance
6. **Experiments** — A/B tests, feature launches

---

## TAB 1: OVERVIEW (Weekly Snapshot)

### **Key Metrics (This Week vs. Last Week)**

| Metric | This Week | Last Week | % Change | Target | Status |
|--------|-----------|-----------|----------|--------|--------|
| **Visitors** | — | — | — | 2,500 | 🔴🟡🟢 |
| **Trials Started** | — | — | — | 250 | 🔴🟡🟢 |
| **Conversions** | — | — | — | 25 | 🔴🟡🟢 |
| **Revenue** | $— | $— | — | $500 | 🔴🟡🟢 |
| **Email Signups** | — | — | — | 100 | 🔴🟡🟢 |
| **Active Affiliates** | — | — | — | 25 | 🔴🟡🟢 |

**Status Colors:**
- 🔴 <80% of target
- 🟡 80-100% of target
- 🟢 >100% of target

---

### **Monthly Trends (Line Graph)**

Chart showing:
- Visitors (blue line)
- Conversions (green line)
- Revenue (purple line)

**Formula:** `=SPARKLINE(B2:M2, {"charttype","line"})`

---

### **Top Performers This Week**

| Category | Winner | Metric |
|----------|--------|--------|
| **Traffic Source** | Instagram | 45% of traffic |
| **Best-Selling Pack** | Chibi Kitty Club | 12 sales |
| **Top Influencer** | @craftymom | 8 referrals |
| **Best Blog Post** | "10 Free Templates" | 500 views |
| **Top Email** | Cart Abandonment #2 | 8% conversion |

---

## TAB 2: TRAFFIC

### **Traffic Sources (This Month)**

| Source | Visitors | % | Trials | Conversion Rate | Revenue |
|--------|----------|---|--------|-----------------|---------|
| **Direct** | — | —% | — | —% | $— |
| **Google (Organic)** | — | —% | — | —% | $— |
| **Instagram** | — | —% | — | —% | $— |
| **TikTok** | — | —% | — | —% | $— |
| **Pinterest** | — | —% | — | —% | $— |
| **Email** | — | —% | — | —% | $— |
| **Influencer Referrals** | — | —% | — | —% | $— |
| **Product Hunt** | — | —% | — | —% | $— |
| **Paid Ads** | — | —% | — | —% | $— |
| **TOTAL** | — | 100% | — | —% | $— |

**Formula for %:** `=B2/SUM($B$2:$B$11)`

---

### **Conversion Funnel**

| Step | Count | Conversion Rate | Drop-off |
|------|-------|-----------------|----------|
| 1. Land on site | 10,000 | 100% | — |
| 2. View product page | 3,000 | 30% | 70% |
| 3. Add to cart | 600 | 20% | 80% |
| 4. Start checkout | 300 | 50% | 50% |
| 5. Complete purchase | 150 | 50% | 50% |

**Overall Conversion:** 150 / 10,000 = **1.5%**

**Biggest drop-off:** Step 2 → 3 (80% leave after viewing product)
**Action:** Improve product page CTAs, add urgency, social proof

---

### **Page Performance**

| Page | Views | Avg Time | Bounce Rate | Conversion Rate |
|------|-------|----------|-------------|-----------------|
| Homepage | 5,000 | 1:23 | 45% | 2% |
| /shop | 3,000 | 2:15 | 30% | 5% |
| /create (AI generator) | 2,000 | 3:45 | 25% | 8% |
| /pricing | 1,500 | 1:50 | 40% | 10% |
| /blog/[post] | 1,000 | 4:20 | 50% | 1% |
| /contest | 500 | 2:10 | 35% | 3% |

---

## TAB 3: REVENUE

### **Revenue Breakdown (This Month)**

| Product | Units Sold | Revenue | % of Total | Avg Order Value |
|---------|------------|---------|------------|-----------------|
| **Template Packs** | — | $— | —% | $4.99 |
| **Party Kits** | — | $— | —% | $9.99 |
| **Classroom Bundles** | — | $— | —% | $29.99 |
| **Mega Bundle** | — | $— | —% | $149.99 |
| **Founding Pro (Monthly)** | — | $— | —% | $9.99 |
| **Founding Pro (Annual)** | — | $— | —% | $99.99 |
| **TOTAL** | — | $— | 100% | $— |

---

### **MRR (Monthly Recurring Revenue)**

| Month | New Subscribers | Churned | Net Change | MRR | Growth Rate |
|-------|-----------------|---------|------------|-----|-------------|
| Jan | 10 | 0 | +10 | $99 | — |
| Feb | 15 | 2 | +13 | $229 | +131% |
| Mar | 20 | 3 | +17 | $399 | +74% |
| Apr | 25 | 5 | +20 | $599 | +50% |
| **Target Dec** | — | — | — | **$2,000** | — |

**Formula for MRR:** `=SUM(Active Subscribers × $9.99)`
**Formula for Growth Rate:** `=(This Month MRR / Last Month MRR) - 1`

---

### **Customer Lifetime Value (LTV)**

**Calculation:**
- Avg Order Value: $15
- Avg Purchases per Year: 4
- Avg Customer Lifespan: 2 years
- **LTV = $15 × 4 × 2 = $120**

**LTV:CAC Ratio:** $120 / $30 = **4:1** (healthy = 3:1+)

---

### **Cohort Analysis**

| Cohort (Month Joined) | Month 1 | Month 2 | Month 3 | Month 4 | Month 5 | Month 6 |
|----------------------|---------|---------|---------|---------|---------|---------|
| Jan 2026 | 100% | 60% | 45% | 35% | 30% | 28% |
| Feb 2026 | 100% | 65% | 50% | 40% | 35% | — |
| Mar 2026 | 100% | 70% | 55% | 45% | — | — |
| Apr 2026 | 100% | 75% | 60% | — | — | — |

**Insight:** Retention improving each cohort! Feb cohort retains better than Jan.

---

## TAB 4: GROWTH

### **Email List Growth**

| Week | New Subscribers | Unsubscribes | Net Growth | Total List | Growth Rate |
|------|-----------------|--------------|------------|------------|-------------|
| Week 1 | 50 | 2 | +48 | 200 | +24% |
| Week 2 | 75 | 3 | +72 | 272 | +26% |
| Week 3 | 100 | 5 | +95 | 367 | +26% |
| Week 4 | 125 | 7 | +118 | 485 | +24% |

**Target:** 2,000 subscribers by Day 90 (need +50 net/week avg)

---

### **Affiliate Performance**

| Affiliate | Referrals | Conversions | Revenue Generated | Commission Paid | ROI |
|-----------|-----------|-------------|-------------------|-----------------|-----|
| @craftymom | 45 | 8 | $120 | $60 | 2x |
| @teacherlife | 30 | 5 | $75 | $37.50 | 2x |
| @kawaiiparent | 20 | 3 | $45 | $22.50 | 2x |
| **TOTAL** | 95 | 16 | $240 | $120 | 2x |

---

### **Viral Coefficient**

**Formula:** `(Invites Sent × Conversion Rate) / Inviters`

**Example:**
- 100 customers invited friends (inviters)
- Sent 300 total invites
- 30 friends signed up (10% conversion)
- **Viral Coefficient = 30 / 100 = 0.3**

**Target:** >1.0 (viral growth!)

**Current:** 0.3 (not viral yet, need referral incentives)

---

## TAB 5: CONTENT

### **Blog Performance**

| Post Title | Publish Date | Views | Avg Time | Conversions | Conversion Rate |
|------------|--------------|-------|----------|-------------|-----------------|
| "10 Free Templates" | Feb 15 | 1,500 | 4:20 | 30 | 2% |
| "How to Make Blind Box" | Feb 20 | 800 | 5:10 | 20 | 2.5% |
| "Birthday Party Ideas" | Feb 25 | 600 | 3:45 | 15 | 2.5% |

**Best Performer:** "10 Free Templates" (highest views)
**Best Converter:** "How to Make" (highest conversion rate)

---

### **Social Media Performance**

| Platform | Posts This Month | Impressions | Engagement Rate | Clicks | Conversion Rate |
|----------|------------------|-------------|-----------------|--------|-----------------|
| Instagram | 30 | 50,000 | 3.5% | 1,000 | 5% |
| TikTok | 12 | 100,000 | 5% | 2,000 | 3% |
| Pinterest | 20 | 30,000 | 2% | 600 | 4% |
| Twitter | 60 | 20,000 | 1.5% | 300 | 2% |

**Best Platform:** TikTok (highest impressions + engagement)
**Best Converter:** Instagram (5% of clicks convert)

---

### **Influencer Campaign Tracking**

| Influencer | Platform | Followers | Post Date | Impressions | Clicks | Conversions | Revenue | ROI |
|------------|----------|-----------|-----------|-------------|--------|-------------|---------|-----|
| @craftymom | Instagram | 25K | Feb 10 | 10,000 | 300 | 8 | $120 | 4.8x |
| @teacherlife | TikTok | 18K | Feb 15 | 50,000 | 800 | 5 | $75 | 3x |
| @kawaiiparent | Instagram | 12K | Feb 20 | 5,000 | 150 | 3 | $45 | 1.8x |

**Cost:** $25/influencer (gift kit)
**Total Spent:** $75
**Total Revenue:** $240
**Overall ROI:** 3.2x

---

## TAB 6: EXPERIMENTS

### **A/B Test Tracker**

| Test | Variant A | Variant B | Winner | Lift | Status |
|------|-----------|-----------|--------|------|--------|
| Homepage Hero | "Create kawaii..." | "Print blind boxes..." | B | +15% | ✅ Deployed |
| Pricing Page CTA | "Start Free Trial" | "Get Started" | A | +8% | ✅ Deployed |
| Email Subject | "Welcome!" | "Your free gift 🎁" | B | +22% | ✅ Deployed |
| Product Page Price | Show discount | Hide discount | A | +5% | ✅ Deployed |

**Learning:** Emojis in subject lines = +22% open rate!

---

### **Feature Launch Tracker**

| Feature | Launch Date | Adoption Rate | Impact on Revenue | Status |
|---------|-------------|---------------|-------------------|--------|
| AI Generator | Feb 1 | 35% of users tried | +$200/month | ✅ Success |
| UGC Contest | Feb 15 | 50 entries | +$100/month | 🟡 Ongoing |
| Exit-Intent Popup | Feb 20 | 5% cart recovery | +$150/month | ✅ Success |
| Referral Gamification | Mar 1 | TBD | TBD | ⏳ Planned |

---

## AUTOMATION (Google Sheets Functions)

### **Auto-Update from Google Analytics:**
Use Google Sheets Add-on: "Google Analytics" or "Supermetrics"

1. Install Add-on
2. Connect GA4 account
3. Set up auto-refresh (daily at 6am)
4. Pull metrics: Sessions, Users, Conversions, Revenue

---

### **Formulas**

**Conversion Rate:**
```
=IFERROR(Conversions / Visitors, 0)
```

**% Change:**
```
=(This Week - Last Week) / Last Week
```

**Conditional Formatting (Status):**
- Red: `<80%` of target
- Yellow: `80-100%` of target
- Green: `>100%` of target

---

## WEEKLY REVIEW CHECKLIST

**Every Monday 9am:**
- [ ] Update Overview tab (This Week metrics)
- [ ] Identify top performer (highlight in yellow)
- [ ] Identify worst performer (flag for improvement)
- [ ] Review funnel drop-offs (fix biggest leak)
- [ ] Check MRR growth (on track for target?)
- [ ] Review content performance (double down on winners)
- [ ] Analyze A/B test results (deploy winner)
- [ ] Set 3 goals for this week

---

## MONTHLY REVIEW CHECKLIST

**First Monday of Month:**
- [ ] Review full month trends
- [ ] Calculate LTV, CAC, viral coefficient
- [ ] Analyze cohort retention
- [ ] Identify seasonal patterns
- [ ] Update annual revenue forecast
- [ ] Plan next month's campaigns
- [ ] Share dashboard with team/stakeholders

---

## NEXT STEPS

1. ✅ Copy Google Sheets template: [link to template]
2. ✅ Connect Google Analytics
3. ✅ Set up auto-refresh (daily)
4. ✅ Input Week 1 manual data
5. ✅ Set Monday 9am calendar reminder (weekly review)
6. ✅ Share with co-founder/team
7. ✅ Start tracking TODAY

**Dashboard Template:** https://docs.google.com/spreadsheets/d/[YOUR_SHEET_ID]

**What gets measured gets improved. Track everything! 📊**
