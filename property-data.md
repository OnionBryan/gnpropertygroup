# Napier Portfolio - Property Data

## Data Sources
- Owner-provided specs (2026-08-02) — authoritative
- rent.html investment analysis
- Prior web search results (Zillow, Realtor.com snippets) — superseded where they conflict

---

## 1045 Patterson St, Macon, GA 31204

| Field | Value | Source |
|-------|-------|--------|
| Type | Residential + Warehouse | User |
| Zoning | R3 | User |
| Bedrooms | 1 | User |
| Bathrooms | 1 | User |
| Residential Sq Ft | 588 | User |
| Warehouse Sq Ft | 2,280 | User |
| Lot Size | 1.13 acres | Web search |
| Monthly Rent | $1,600 | rent.html |

**Notes:** Commercial warehouse on residential zoned lot with small home.

---

## 2511 Napier Ave, Macon, GA 31204

| Field | Value | Source |
|-------|-------|--------|
| Type | Duplex (2 units) | Web search |
| Year Built | 1910 | Web search |
| Bedrooms | 5 | User |
| Bathrooms | 3 | User |
| Square Feet | 3,165 | User |
| Monthly Rent | $1,750 | rent.html |

**Notes:** rent.html mentions "currently below market" - upside potential.
Per-unit split unknown — the old front (2/2, ~1,500 sq ft) / back (1/1, ~1,000 sq ft)
breakdown contradicts the confirmed 5 bed / 3 bath / 3,165 sq ft totals and was removed.

---

## 2525 Napier Ave (Main House), Macon, GA 31204

| Field | Value | Source |
|-------|-------|--------|
| Type | Single Family | Web search |
| Year Built | 1910 | Web search |
| Bedrooms | 4 | Web search |
| Bathrooms | 2.5 | Web search |
| Square Feet | 3,206 | Web search |
| Monthly Rent | $1,750 | User |

---

## 2525½ Napier Cottage, Macon, GA 31204

| Field | Value | Source |
|-------|-------|--------|
| Type | Cottage/ADU | |
| Bedrooms | 1 | |
| Bathrooms | 1 | |
| Square Feet | 591 | User |
| Monthly Rent | $1,400 | User |

**Notes:** Referred to as "2525.5" by owner. Sits behind the main house.

---

## 2529 Napier Ave, Macon, GA 31204

| Field | Value | Source |
|-------|-------|--------|
| Type | Cottage | Web search |
| Bedrooms | 2 | Web search |
| Bathrooms | 1 | Web search |
| Square Feet | 750 | User |
| Monthly Rent | $1,000 | User |

---

## 2534 Napier Ave, Macon, GA 31204

| Field | Value | Source |
|-------|-------|--------|
| Type | Duplex | Web search |
| Total Bedrooms | 4 | Web search |
| Total Bathrooms | 2 | Web search |
| Total Square Feet | 2,430 | User |
| Monthly Rent | $2,475 | User |

### Unit Breakdown:
| Unit | Beds | Baths | Sq Ft |
|------|------|-------|-------|
| Left | 1 | 1 | ? |
| Right | 3 | 1 | ? |

**Notes:** Per-unit sq ft removed — the old 1,000 / 1,375 split summed to the superseded
2,375 total. Beds and baths per unit are unchanged.

---

## 2553 Napier Ave, Macon, GA 31204

| Field | Value | Source |
|-------|-------|--------|
| Type | Single Family | |
| Bedrooms | 5 | |
| Bathrooms | 2.5 | |
| Square Feet | 2,832 | User |
| Monthly Rent | $2,000 | rent.html reconciliation |
| Distance to Mercer | 2 minutes | User |

---

## Summary

| Property | Beds | Baths | Sq Ft | Rent | Year |
|----------|------|-------|-------|------|------|
| 1045 Patterson | 1 | 1 | 588 (+2,280 warehouse) | $1,600 | ? |
| 2511 Napier | 5 | 3 | 3,165 | $1,750 | 1910 |
| 2525 Napier Ave | 4 | 2.5 | 3,206 | $1,750 | 1910 |
| 2525½ Cottage | 1 | 1 | 591 | $1,400 | ? |
| 2529 Napier | 2 | 1 | 750 | $1,000 | ? |
| 2534 Napier | 4 | 2 | 2,430 | $2,475 | ? |
| 2553 Napier | 5 | 2.5 | 2,832 | $2,000 | ? |

**Total monthly rent:** $11,975
**Total annual (GSR):** $143,700

---

## Reconciliation with rent.html

rent.html's rent roll has five line items; two of them bundle a second property:

| rent.html line | Components | Monthly |
|----------------|-----------|---------|
| 2553 Napier Ave | 2553 ($2,000) + 2529 ($1,000) | $3,000 |
| 2525 Napier Ave | 2525 main ($1,750) + cottage ($1,400) | $3,150 |
| 2511 Napier Ave | 2511 | $1,750 |
| 2534 Napier Ave | 2534 | $2,475 |
| 1045 Patterson St | 1045 Patterson | $1,600 |
| **Total** | | **$11,975** |

Both bundled lines reconcile exactly under the corrected rents.
The only GSR change from the corrections is 2534: $1,925 → $2,475
(+$550/mo, +$6,600/yr), moving GSR from $137,100 to $143,700.

---

## Base Case Re-Underwrite (rent.html)

The base case was rebuilt off the corrected $143,700 GSR.

**Expense treatment:** verified property taxes and fixed-dollar expenses were held
constant; only vacancy scales, since it is definitionally a percentage of rent.
A $550/mo rent increase at one property does not raise taxes, insurance,
maintenance, or capital reserves.

| Line | Before | After | Treatment |
|------|--------|-------|-----------|
| Property Taxes | $9,497 | $9,497 | Held — verified from actual bills |
| Insurance | $6,800 | $6,800 | Held — quoted premium |
| Repairs & Maintenance | $16,370 | $16,370 | Held — property-driven |
| Vacancy & Credit Loss | $10,915 | $11,440 | Scaled @ 7.96% of GSR |
| Capital Reserves | $6,822 | $6,822 | Held — per-unit driven |
| **Total OpEx** | **$50,404** | **$50,929** | 35% of GSR (was 37%) |

**Resulting base case:**

| Metric | Before | After |
|--------|--------|-------|
| GSR | $137,100 | $143,700 |
| OpEx | ($50,404) | ($50,929) |
| Stabilized NOI | $86,700 | $92,800 |
| Value @ 8.0% cap | $1,084,000 | $1,160,000 |
| DSCR @ $862,500 / 7.5% | 1.20× | 1.28× |
| Year 1 cash flow after debt | $14,331 | $20,431 |
| Levered IRR (5-yr, 7.75% exit) | ~10.8% | ~17.6% |
| Unlevered IRR | ~8.4% | ~10.4% |

**Convention note (2026-08-02):** rent.html now follows npv.html — terminal value
capitalizes year T+1 NOI (N+1 rule), selling costs are a slider (default 2%),
and financing is selectable: Conventional 30yr fixed / Commercial balloon
(25-yr am, 5-yr balloon, 3/2/1) / DSCR 5/25 (25-yr am, 5-yr balloon, 5/4/3/2/1).
Optional closing-cost toggle (2–5% of price) adds to cash-in equity.
IRR rows above reflect the N+1 exit at the unchanged 7.75% exit cap
(prior trailing-NOI figures were ~16.6% / ~10.1%).

Purchase price ($1,150,000), LTV, rate, exit cap, and hold period are unchanged —
they are acquisition assumptions, not rent-derived. At the unchanged $1,150,000
price the implied acquisition cap moves from 7.54% to 8.07%.

---

## Financing

All five parcels are **R-2/R-3 residential and conventionally financeable**,
1045 Patterson included — the warehouse is an outbuilding on a residential
parcel with a 588 sq ft dwelling on site, not a commercial use.
Commercial balloon and DSCR 5/25 are alternatives, not requirements.

| Parcel | Contains |
|--------|----------|
| 1 | 1045 Patterson |
| 2 | 2511 Napier |
| 3 | 2525 Napier + 2525½ cottage |
| 4 | 2534 Napier |
| 5 | 2553 Napier + 2529 Napier |

**Five parcels** against the Fannie Mae cap of 10 financed properties.
The parcel grouping matches rent.html's five rent-roll rows exactly.
Note the gallery on index.html shows **seven** properties — parcels and
marketed units are different counts; both are correct.

**Rate range:** 6.0% – 8.5%. Model default 7.5%.

**Hold period:** the 5-year default is deliberate — it matches the point where a
DSCR 5/4/3/2/1 prepayment step-down burns to zero. Do not treat it as arbitrary.

---

## Still Need From User

1. **2511 Napier:** per-unit bed/bath/sq ft split
2. **2534 Napier:** per-unit sq ft split
3. **Year built:** 1045 Patterson, 2529, 2534, 2553
