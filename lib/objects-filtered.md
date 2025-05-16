# Square Objects

**Pay in Full Items Combine Enrollment:** You've created "Pay in Full" items that *include* the enrollment fee and the 10% discounted session fees in one price. This is a slight deviation from the previous "separate enrollment fee item" suggestion, but it's a valid approach that simplifies the transaction for PIF clients to a single item.

- Example: `Positive Parenting Program - Pay in Full (12 Weeks) + Enrollment Fee` for `$470.00` (which is $50 enrollment + $378 discounted sessions).
- Single Session Items are Linked to Subscription Plans: Your "Single Session" items have `subscription_plan_ids` associated with them. This is how Square knows which item a subscription plan is for when using "Relative" pricing (applying a discount to an existing item's price).
- Discounts are Set Up: You have created separate discount objects for the 5% autopay discount for each program.
- Subscription Plans Use Relative Pricing: The subscription plans are set up to use "RELATIVE" pricing, meaning they apply a discount (the 5% ones you created) to an underlying item (the "Single Session" items).

**Key Information Pulled (IDs and Names):**

**1. Categories:**

- Category ID: `R74PDG6O22D5F3WJ4FON3FC5`
  - Name: `Program Services - Pay in Full`
- Category ID: `7FCBMNJAZELWWAP6TBE6SYFO`
  - Name: `Enrollment Fees`
- Category ID: `ZXCCV7ZHJLFBUYMYBG3P5NBT`
  - Name: `Program Services - Pay Per Session`

**2. Enrollment Fee Items (Type: ITEM):**
    *(These are now mostly for reference if you decide to keep the PIF items bundled, or if you need to charge enrollment separately for PAYG clients if they haven't paid a bundled PIF item)*

- Item ID: `JBYPKCE45KDT4RJCFYKWQRHL`
  - Name: `Enrollment - Positive Parenting Program`
  - Price: $50.00
- Item ID: `L2UDV3L4GVTYGNZITT3LJRUS`
  - Name: `Enrollment - Domestic Violence (DV) Female Program`
  - Price: $50.00
- Item ID: `ONHQW7G66Z25EJQ2IKTHQAJA`
  - Name: `Enrollment - Domestic Violence (DV) Male Program`
  - Price: $50.00
- Item ID: `4DN5B5IDWGSNMPPFWRD3JLDG`
  - Name: `Enrollment - Sex Offender Responsible Thinking (SORT) Program`
  - Price: $90.00
- Item ID: `SKUMYIMRS7J6IRWXSSCMBMY4`
  - Name: `Enrollment - Substance Abuse + Critical Thinking (SACT) Program`
  - Price: $50.00
- Item ID: `LSQYZFA6GGL6ZUZAU62I4LEK`
  - Name: `Enrollment - Anger Management Program`
  - Price: $50.00

**3. "Pay in Full" Items (Bundled with Enrollment) (Type: ITEM):**

- Item ID: `KWVB6EBAI6VQJPL3JHMXRQBC`
  - Name: `Positive Parenting Program - Pay in Full (12 Weeks) + Enrollment Fee`
  - Price: $470.00 (Correct: $50 + ($35\*12\*0.90) = $50 + $378 = $428. **Your JSON has $470.00. Please double-check this price.** If $35/session and $50 enrollment, $470 is $420 for sessions + $50 enrollment, meaning no 10% discount on sessions. If the 10% discount *is* applied, the total should be $428.00)
- Item ID: `DL2SP2CS44QDXR7CLWLRJCAA`
  - Name: `Substance Abuse + Critical Thinking (SACT) Program - Pay in Full (12 Weeks) + Enrollment Fee`
  - Price: $470.00 (Same note as above, please verify if the 10% discount is included. If so, should be $428.00)
- Item ID: `KG2WKWFKNY35M3UV5EHTIMZ2`
  - Name: `Anger Management Program - Pay in Full (12 Weeks) + Enrollment Fee`
  - Price: $470.00 (Same note as above, please verify if the 10% discount is included. If so, should be $428.00)
- Item ID: `EQVCTMLRLTOJNVYFAJK3QHP4`
  - Name: `Domestic Violence (DV) Male Program - Pay in Full (26 Weeks) + Enrollment Fee`
  - Price: $960.00 (Correct: $50 + ($35\*26\*0.90) = $50 + $819 = $869. **Your JSON has $960.00. Please double-check this price.** $960 is $910 for sessions + $50 enrollment, meaning no 10% discount. If the 10% discount *is* applied, the total should be $869.00)
- Item ID: `D5QCTVTWQKMBOV3Z5BVONSAE`
  - Name: `Sex Offender Responsible Thinking (SORT) Program - Pay in Full (78 Weeks) + Enrollment Fee`
  - Price: $3210.00 (Correct: $90 + ($40\*78\*0.90) = $90 + $2808 = $2898. **Your JSON has $3210.00. Please double-check this price.** $3210 is $3120 for sessions + $90 enrollment, meaning no 10% discount. If the 10% discount *is* applied, the total should be $2898.00)
- Item ID: `LX3I34MHKVZB7VVRRLK2S6CC`
  - Name: `Domestic Violence (DV) Female Program - Pay in Full (26 Weeks) + Enrollment Fee`
  - Price: $960.00 (Same note as DV Male, please verify if the 10% discount is included. If so, should be $869.00)

**Action Item for You:** **Verify the prices for your "Pay in Full + Enrollment Fee" items.** Ensure the 10% session discount is correctly calculated and reflected if that's your intention. The JSON prices suggest the discount might not be applied to the bundled PIF items.

**4. "Pay As You Go - Single Session" Items (Type: ITEM):**
    *(These are the base items for PAYG and for the Autopay subscriptions to apply discounts to)*

- Item ID: `QXP7DNEWOMYD36A4JCVWYRVR`
  - Name: `Sex Offender Responsible Thinking (SORT) Program - Single Session`
  - Price: $40.00
- Item ID: `J73JAJVQYRSEPJ54DZXFBXKU`
  - Name: `Domestic Violence (DV) Female Program - Single Session`
  - Price: $35.00
- Item ID: `LFPPKNLTUAZD42PET6P64CYU`
  - Name: `Substance Abuse + Critical Thinking (SACT) Program - Single Session`
  - Price: $35.00
- Item ID: `ZZLLITHA7O6VBS5KURWFSQRH`
  - Name: `Anger Management Program - Single Session`
  - Price: $35.00
- Item ID: `UTUKICXKASVZDEBOKGSOSGAM`
  - Name: `Domestic Violence (DV) Male Program - Single Session`
  - Price: $35.00
- Item ID: `AP2IRVYCNJQGPCE3K4OSNVGH`
  - Name: `Positive Parenting Program - Single Session`
  - Price: $35.00

**5. Discount Objects (Type: DISCOUNT - for 5% Autopay):**

- Item ID: `CYYUUZNE5Q42WW53I5ZGQF6N`
  - Name: `Domestic Violence (DV) Male Program - Weekly Autop 5%`
- Item ID: `7CHD2U7BIL4ZAMRLAS6KHCJ6`
  - Name: `Domestic Violence (DV) Female Program - Weekly Aut 5%`
- Item ID: `QVDCVTJH5ICZZS3EBIFSCRHD`
  - Name: `Sex Offender Responsible Thinking (SORT) Program - 5%`
- Item ID: `BVRXXRAWLPC7G7GKG22UYWTX`
  - Name: `Anger Management Program - Weekly Autopay 5%`
- Item ID: `UEASVY7BWUR7B46YQAAOIU2Z`
  - Name: `Substance Abuse + Critical Thinking (SACT) Program 5%`
- Item ID: `YOUNRXFDKQNH56L35K3PYIZL`
  - Name: `Positive Parenting Program - Weekly Autopay 5%`

**6. Subscription Plan IDs (Type: SUBSCRIPTION_PLAN):**
    *(These are the overall plans that contain variations and link to items/discounts)*

- Item ID: `AS4S5PWZAKZKAFHL3ZL2V2VW`
  - Name: `Domestic Violence (DV) Male Program - Weekly Autopay`
  - Links to Item ID: `UTUKICXKASVZDEBOKGSOSGAM` (DV Male - Single Session)
  - Uses Discount ID: `CYYUUZNE5Q42WW53I5ZGQF6N` (DV Male 5%)
  - Periods: 26
- Item ID: `5SREHPJWKGLOOWDVURQOO4OZ`
  - Name: `Domestic Violence (DV) Female Program - Weekly Autopay`
  - Links to Item ID: `J73JAJVQYRSEPJ54DZXFBXKU` (DV Female - Single Session)
  - Uses Discount ID: `7CHD2U7BIL4ZAMRLAS6KHCJ6` (DV Female 5%)
  - Periods: 26
- Item ID: `YBZMO2C7SFQ4Q3VWVYW5DIP3`
  - Name: `Sex Offender Responsible Thinking (SORT) Program - Weekly Autopay`
  - Links to Item ID: `QXP7DNEWOMYD36A4JCVWYRVR` (SORT - Single Session)
  - Uses Discount ID: `QVDCVTJH5ICZZS3EBIFSCRHD` (SORT 5%)
  - Periods: 78
- Item ID: `XDXBZO32T2X54TVVH2ZPCLBJ`
  - Name: `Anger Management Program - Weekly Autopay`
  - Links to Item ID: `ZZLLITHA7O6VBS5KURWFSQRH` (AM - Single Session)
  - Uses Discount ID: `BVRXXRAWLPC7G7GKG22UYWTX` (AM 5%)
  - Periods: 12
- Item ID: `ZDHW6WJQ5HWVEJLFT7LK4J5J`
  - Name: `Substance Abuse + Critical Thinking (SACT) Program - Weekly Autopay`
  - Links to Item ID: `LFPPKNLTUAZD42PET6P64CYU` (SACT - Single Session)
  - Uses Discount ID: `UEASVY7BWUR7B46YQAAOIU2Z` (SACT 5%)
  - Periods: 12
- Item ID: `SFPA46WEXPORZCNDBUR64R6P`
  - Name: `Positive Parenting Program - Weekly Autopay`
  - Links to Item ID: `AP2IRVYCNJQGPCE3K4OSNVGH` (PP - Single Session)
  - Uses Discount ID: `YOUNRXFDKQNH56L35K3PYIZL` (PP 5%)
  - Periods: 12

**What you might need these IDs for:**

- Manually Creating Subscriptions for Clients: When you subscribe a client, you'll select the `SUBSCRIPTION_PLAN_ID` (or its user-friendly name in the Square Dashboard).
- Linking Items to Plans: The `eligible_item_ids` in the `SUBSCRIPTION_PLAN` data and the `subscription_plan_ids` in the `ITEM_VARIATION` data show these connections. This is mostly managed by Square when you set up relative pricing.
- Reporting/API Usage: If you ever use the Square API or do advanced reporting, these IDs are crucial for uniquely identifying each entity.
- Troubleshooting: If a subscription isn't behaving as expected, knowing the IDs of the plan, item, and discount involved can help Square Support or your own investigation.

**Next Steps for You:**

1. **CRITICAL: Review and correct the prices for your "Pay in Full + Enrollment Fee" items** in Square to ensure the 10% discount on session fees is applied correctly if that's your intention. The current JSON prices for these bundled items do *not* reflect the 10% session discount.
2. **Verify Enrollment Fee Handling for PAYG:** If a client chooses PAYG, ensure they are charged the standalone "Enrollment Fee" item first, and then the "Single Session (PAYG)" item for each session.
3. **Test Transactions (if possible in a sandbox or with small amounts):**
    - Test a PIF purchase.
    - Test subscribing a dummy client to an Autopay plan (and manually charge the enrollment fee separately first).
    - Test a PAYG scenario (enrollment fee + a single session purchase).
