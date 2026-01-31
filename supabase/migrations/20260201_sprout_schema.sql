-- Create Sprout Lessons table
create table if not exists sprout_lessons (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title jsonb not null, -- {en: "Title", et: "Pealkiri"}
  description jsonb not null,
  analogy jsonb, -- {en: "Like a...", et: "Nagu..."}
  visual_type text check (visual_type in ('static_image', 'interactive_demo', 'code_snippet', 'component')),
  order_index integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table sprout_lessons enable row level security;

-- Create Policy for Public Read Access
create policy "Enable read access for all users" on sprout_lessons
  for select using (true);

-- Seed Initial Content (6 Core Cards)
insert into sprout_lessons (slug, title, description, analogy, visual_type, order_index)
values
  (
    'tokens',
    '{"en": "Tokens", "et": "Tokenid"}',
    '{"en": "The basic units of text processing. A token is a piece of a word.", "et": "Teksti töötlemise põhiüksused. Token on sõna osa."}',
    '{"en": "Like Lego bricks. You need to break a castle (sentence) into bricks (tokens) to understand how it is built.", "et": "Nagu Lego klotsid. Pead lossi (lause) lammutama klotsideks (tokeniteks), et mõista selle ehitust."}',
    'component',
    1
  ),
  (
    'vectors',
    '{"en": "Vectors", "et": "Vektorid"}',
    '{"en": "Numbers that represent meaning. Similar words have similar numbers.", "et": "Numbrid, mis esindavad tähendust. Sarnastel sõnadel on sarnased numbrid."}',
    '{"en": "Like GPS coordinates for meaning. ''King'' and ''Queen'' are close together on the map.", "et": "Nagu tähenduse GPS-koordinaadid. ''Kuningas'' ja ''Kuninganna'' asuvad kaardil lähestikku."}',
    'component',
    2
  ),
  (
    'attention',
    '{"en": "Attention", "et": "Tähelepanu"}',
    '{"en": "The ability to focus on specific words to understand context.", "et": "Võime keskenduda kindlatele sõnadele, et mõista konteksti."}',
    '{"en": "Like reading a sentence and glancing back at previous words to understand who ''he'' refers to.", "et": "Nagu lauset lugedes pilgu heitmine eelmistele sõnadele, et mõista, keda ''ta'' tähistab."}',
    'component',
    3
  ),
  (
    'context-window',
    '{"en": "Context Window", "et": "Kontekstiaken"}',
    '{"en": "The amount of text the model can consider at once.", "et": "Tekstihulk, mida mudel suudab korraga töödelda."}',
    '{"en": "Like your short-term memory. If the conversation is too long, you forget the beginning.", "et": "Nagu sinu lühimälu. Kui vestlus on liiga pikk, unustad alguse ära."}',
    'component',
    4
  ),
  (
    'prompting',
    '{"en": "Prompting", "et": "Promptimine"}',
    '{"en": "The art of guiding the model to the best output.", "et": "Kunst suunata mudelit parima tulemuse poole."}',
    '{"en": "Like giving instructions to a brilliant intern. The clearer the instructions, the better the result.", "et": "Nagu juhiste andmine hiilgavale praktikandile. Mida selgemad juhised, seda parem tulemus."}',
    'static_image',
    5
  ),
  (
    'hallucination',
    '{"en": "Hallucination", "et": "Hallutsinatsioon"}',
    '{"en": "When the model confidently states something incorrect.", "et": "Kui mudel väidab enesekindlalt midagi valet."}',
    '{"en": "Like a dream where everything looks real but isn''t. The model predicts words, not facts.", "et": "Nagu unenägu, kus kõik tundub päris, aga pole. Mudel ennustab sõnu, mitte fakte."}',
    'static_image',
    6
  )
on conflict (slug) do nothing;
