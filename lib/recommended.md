Deep-dive on “County ➜ Referral source” (item 2)

Below is a fuller blueprint that covers data model, API, front-end wiring, and validation logic so the flow is bullet-proof yet still lets staff handle edge-cases.

⸻

1 · Database shape

table	key columns	notes
counties	code PK, name	Static list (Alameda = AL, etc.)
referral_types	code PK, label	PGP, PTI, DV-Court, …
referral_sources	id PK, name, county_code FK, type_code FK, active	One row per organization/agency
enrollments	…, county_code, type_code, source_id, source_other	source_id is nullable; source_other is only populated when the picker fails

Advantages:
	•	Perfect filtering—one query surfaces “all PTI sources in Clark County”.
	•	If an agency moves counties or changes type, you just update the row—no code changes.
	•	Choosing “Other” still records county + type so you keep analytics even on unknown sources.

⸻

2 · REST (or RPC) endpoint

// GET /api/referrals?county=AL&type=PGP&q=hea
// → [{ id: 12, label: 'Healthy Families Alameda' }, …]

router.get('/referrals', async (req, res) => {
  const { county, type, q } = req.query;

  if (!county || !type) return res.status(400).send([]);

  const rows = await db.referral_sources
    .select('id', 'name')
    .where({ county_code: county, type_code: type, active: true })
    .andWhereILike('name', `%${q || ''}%`)
    .orderBy('name')
    .limit(10);

  res.json(rows.map(r => ({ value: r.id, label: r.name })));
});

ILIKE (or LOWER(name) LIKE …) gives case-insensitive search without extra deps.

⸻

3 · Front-end: dependent AsyncSelect / Combobox

const county   = watch('personalInfo.county');
const refType  = watch('personalInfo.referralType');

const loadOptions = useCallback(
  (input: string) =>
    fetch(`/api/referrals?county=${county}&type=${refType}&q=${input}`)
      .then(r => r.json())
      .catch(() => []),
  [county, refType]
);

<Controller
  control={control}
  name="personalInfo.referralSource"
  rules={{ required: true }}
  render={({ field }) => (
    <AsyncSelect
      {...field}
      isDisabled={!county || !refType}
      placeholder={
        !county || !refType
          ? 'Select county & type first…'
          : 'Type 2+ letters to search…'
      }
      loadOptions={loadOptions}
      cacheOptions
      defaultOptions={false}  // don’t hit DB until user starts typing
      onChange={option => field.onChange(option?.value)}
      components={{ DropdownIndicator: null }} // minimal UI
    />
  )}
/>

Key details:

UX decision	Why
Disabled until both county & type chosen	Prevents meaningless queries.
Debounced fetch ( does this for you)	Avoids hammering the API.
defaultOptions={false}	No long preload list—fast first paint.
DropdownIndicator hidden	Makes it feel like an input with suggestions, not a huge dropdown.


⸻

4 · Automatic “Other” fallback

const [noHits, setNoHits] = useState(false);

const loadOptions = async (input) => {
  const opts = await fetch(/*…*/).then(r => r.json());
  setNoHits(!opts.length && input.length >= 2);
  return opts;
};

{noHits && (
  <Input
    {...register('personalInfo.referralSourceOther', { required: true })}
    placeholder="Organisation not listed – type name here"
    className="mt-3"
  />
)}

	•	Show the extra input only if the DB returns zero results after the user types ≥ 2 chars—no guesswork for them, clean rules for you.

⸻

5 · Validation & submission

With zod + react-hook-form:

const schema = z.object({
  county: z.string().min(1),
  referralType: z.string().min(1),
  referralSource: z.union([z.number(), z.literal('other')]),
  referralSourceOther: z.string().optional()
}).superRefine((vals, ctx) => {
  if (vals.referralSource === 'other' && !vals.referralSourceOther?.trim()) {
    ctx.addIssue({ code: 'custom', message: 'Write the organisation name.' });
  }
});

When saving:

await db.enrollments.insert({
  county_code: vals.county,
  type_code:  vals.referralType,
  source_id:  vals.referralSource === 'other' ? null : vals.referralSource,
  source_other: vals.referralSource === 'other' ? vals.referralSourceOther : null,
  …
});


⸻

6 · Edge-cases & ops tips

Scenario	Handling
Agency name typo	Staff identify duplicates later, merge IDs—front-end stays unchanged.
County tries to pick wrong type	Type <Select> filters out impossible combos up-front.
Bulk import of new sources	Spreadsheet → CSV → single COPY into referral_sources.
Analytics	Query on county_code + type_code, group by COALESCE(source_id, -1).


⸻

Recap
	1.	Normal path → County & Type chosen → user types “hea…” → combobox returns “Healthy Families Alameda” → click, done.
	2.	No-match path → same typing, DB returns 0 → free-text box appears → they supply a new org name.
	3.	Data integrity stays intact because every enrollment still carries county + referral type even when the actual org is brand-new.

That’s the deeper picture. When you’re ready we can bolt the endpoint onto your existing Bun/Next API route or hook it into Supabase RPC—just let me know which backend you’re using.