-- Migration: Fix Estonian Content Diacritics
-- Date: 2026-02-01
-- Description: Corrects missing diacritics (ö, ä, õ, ü, š, ž) in concept_translations and node_translations tables.

-- ============================================================
-- 1. DNA CONCEPTS (concept_translations)
-- ============================================================

-- Tokenization (Tokeniseerimine)
UPDATE concept_translations
SET
  explanation = 'Tekst puruneb väikesteks numbriteks — ainus keel, mida masinad mõistavad.',
  metaphor = 'Puude lõhkumine — terved palgid muutuvad halgudeks, mis ahju mahuvad.',
  question = 'Kuidas masin lugema hakkab?'
WHERE concept_id = 'tokenization' AND locale = 'et';

-- Embeddings (Vektorid)
UPDATE concept_translations
SET
  explanation = 'Iga token muudetakse arvude loendiks, mis esindab selle tähendust kõrgemõõtmelises ruumis. Sarnase tähendusega sõnad satuvad lähestikku, moodustades keelekaardi.',
  metaphor = 'Nagu GPS-koordinaadid ideede jaoks — "kuningas" ja "kuninganna" on naabrid, samas kui "kuningas" ja "banaan" on mandrite kaugusel.',
  question = 'Kuidas tehisintellekt mõistab sõnade tähendust?'
WHERE concept_id = 'embeddings' AND locale = 'et';

-- Attention (Enesetähelepanu)
UPDATE concept_translations
SET
  explanation = 'Mudel analüüsib iga tokeni seost kõigi teiste tokenitega sisendis. See võimaldab mõista konteksti — teadmist, et "pank" tähendab erinevat "jõepank" ja "pangakonto" puhul.',
  metaphor = 'Nagu prožektor pimedas ruumis — see valgustab sõnade vahelisi seoseid, paljastades, millised on üksteise jaoks kõige olulisemad.',
  question = 'Kuidas see mõistab konteksti?'
WHERE concept_id = 'attention' AND locale = 'et';

-- Prediction (Ennustamine)
UPDATE concept_translations
SET
  explanation = 'Kogu kogutud konteksti põhjal arvutab mudel igale võimalikule järgmisele tokenile tõenäosuse. See valib kõige tõenäolisema (või valib loovalt) ja kordab — üks token korraga luues vastust.',
  metaphor = 'Nagu automaattäiendus steroididel — ühe sõna asemel kaalub see tuhandeid võimalusi, kasutades kõike õpitut.',
  question = 'Kuidas see tegelikult teksti genereerib?'
WHERE concept_id = 'prediction' AND locale = 'et';


-- ============================================================
-- 2. TREE NODES (node_translations)
-- ============================================================

-- Root: The Algorithm (Algoritm)
UPDATE node_translations
SET
  description = 'Kogu tehisintellekti iidne esivanem — idee, et juhiste jadaga saab probleeme automaatselt lahendada.',
  significance = 'Iga tehisintellekti süsteem, ELIZAst kuni GPT-4-ni, põhineb sellel fundamentaalsel ideel: reeglid, mis muudavad sisendi väljundiks.',
  metaphor = 'Üherakuline organism, millest kogu tehisintellekti elu arenes.'
WHERE node_id = 'algorithm' AND locale = 'et';

-- Era: Symbolic AI (Sümbolistlik tehisintellekt)
UPDATE node_translations
SET
  display_name = 'Sümbolistlik tehisintellekt',
  description = 'Esimene suur katse: õpetada masinatele mõeldud käsitsi kodeeritud reeglite ja loogika abil. Domineeris AI uurimises 1956–1980ndatel.',
  significance = 'Tõestas, et masinad võivad arutleda konkreetsete valdkondade üle, kuid ei suutnud toime tulla tegeliku maailma segadusega.',
  metaphor = 'Tehisintellekti dinosaurused — kunagi domineerivad, nüüd enamasti välja surnud.'
WHERE node_id = 'era-symbolic' AND locale = 'et';

-- Era: Neural Networks (Närvivõrgud - Fixed spelling from Nearovorgud)
UPDATE node_translations
SET
  display_name = 'Närvivõrgud',
  description = 'Ajust inspireeritud süsteemid, mis õpivad andmetest, mitte ei järgi selgeid reegleid. Peaaegu surid "tehisintellekti talve" ajal.',
  significance = 'Arusaam, et näidete põhjal õppimine ületab käsitsi reeglite kodeerimise, muutis kõike.',
  metaphor = 'Imetajad, kes elasid asteroidi üle — alguses vaiksed, nüüd valitsevad planeeti.'
WHERE node_id = 'era-neural' AND locale = 'et';

-- Era: Transformers (Transformerid)
UPDATE node_translations
SET
  description = 'Revolutsiooniline arhitektuur, mis töötleb kõiki sõnu samaaegselt "tähelepanu" abil — võimaldades enneolematut keelemõistmist.',
  significance = 'Kõige olulisem arhitektuuriline uuendus kaasaegses tehisintellektis. Iga suur keelemudel on Transformer.',
  metaphor = 'Tehisintellekti Kambriumi plahvatus — intelligentsus mitmekesistus arvututeks uuteks vormideks.'
WHERE node_id = 'era-transformers' AND locale = 'et';

-- ELIZA
UPDATE node_translations
SET
  description = 'Esimene juturobot (1966). Kasutas lihtsat mustriotsingut terapeudi simuleerimiseks. Pettis paljusid inimesi.',
  significance = 'Näitas, et isegi lihtsad reeglid võivad luua intelligentsuse illusiooni.',
  metaphor = 'Esimene kala, kes kõndis maal — primitiivne, kuid murranguline.'
WHERE node_id = 'eliza' AND locale = 'et';

-- Perceptron (Pertseptron)
UPDATE node_translations
SET
  description = 'Lihtsaim närvivõrk: üks kunstlik neuron, mis õpib sisendeid klassifitseerima kaalude kohandamise teel.',
  significance = 'Seeme, millest lõpuks kasvas süvaõpe. Selle esialgne läbikukkumine lükkas tehisintellekti aastakümneteks tagasi.',
  metaphor = 'Üherakuline organism — uskumatult lihtne, kuid sisaldab iga järgnenud närvivõrgu DNAd.'
WHERE node_id = 'perceptron' AND locale = 'et';

-- Backpropagation (Tagasilevitamine)
UPDATE node_translations
SET
  description = 'Algoritm, mis õpetab närvivõrkudele: võrdleb väljundit soovitud tulemusega, seejärel kohandab kaalusid võrgus tagasi.',
  significance = 'Ilma tagasilevitamiseta on süvaõpe võimatu. See on mootor, mis toidab iga kaasaegse närvivõrgu treeningut.',
  metaphor = 'Fotosüntees närvivõrkude jaoks — fundamentaalne protsess, mis laseb neil kasvada.'
WHERE node_id = 'backpropagation' AND locale = 'et';

-- CNN (Konvolutsiooniline närvivõrk)
UPDATE node_translations
SET
  display_name = 'Konvolutsiooniline närvivõrk (CNN)',
  description = 'Piltidele spetsialiseerunud närvivõrk: skannib väikseid tükke õpitud filtritega, ehitades servadest objektideni.',
  significance = 'Revolutsioonistas kompuuternägemist. Tegi võimalikuks näotuvastuse, isejuhtivad autod ja meditsiinilise pilditöötluse.',
  metaphor = 'Silmade evolutsioon — ühtäkki masinad hakkasid nägema.'
WHERE node_id = 'cnn' AND locale = 'et';

-- RNN (Rekurrentne närvivõrk)
UPDATE node_translations
SET
  display_name = 'Rekurrentne närvivõrk (RNN)',
  description = 'Mäluga närvivõrk: töötleb jadasid, suunates oma väljundi tagasi sisendiks, säilitades varjatud olekut.',
  significance = 'Esimene arhitektuur, mis suutis käsitleda jadasid. Kaasaegsete keelemudelite eelkäija.',
  metaphor = 'Esimene olend lühimäluga — revolutsiooniline, kuid kipub unustama.'
WHERE node_id = 'rnn' AND locale = 'et';

-- LTSM -> LSTM
UPDATE node_translations
SET
  description = 'Täiustatud RNN "väravatega", mis kontrollivad, mida meeles pidada ja mida unustada.',
  significance = 'Võimaldas praktilist jadatöötlust: masintõlge, kõnetuvastus, teksti genereerimine enne Transformereid.',
  metaphor = 'Elav fossiil — kunagi jadamodelleerimise tippkiskja, nüüd väljatõrjutud, kuid leidub pärandsüsteemides.'
WHERE node_id = 'lstm' AND locale = 'et';

-- GAN
UPDATE node_translations
SET
  description = 'Kaks närvivõrku võistluses: Generaator loob võltsinguid, Diskriminaator tuvastab neid. Mõlemad paranevad.',
  significance = 'Avas tee tehisintellekti poolt loodud piltidele. Deepfake''id ja varane tehisintellektikunst tulid GANidest.',
  metaphor = 'Evolutsioon läbi võistluse — kiskja ja saakloom kiirendavad teineteise arengut.'
WHERE node_id = 'gan' AND locale = 'et';

-- Attention Is All You Need
UPDATE node_translations
SET
  description = '2017. aasta Google Brain artikkel, mis tutvustas Transformeri arhitektuuri, asendades korduvuse paralleelse enesetähelepanuga.',
  significance = 'Kõige viidatum ja mõjukam tehisintellekti artikkel ajaloos. Tegi võimalikuks GPT, BERT, Claude ja kõik kaasaegsed keelemudelid.',
  metaphor = 'Tehisintellekti "K-T asteroid" — mutatsioon, mis muutis kõike.'
WHERE node_id = 'attention-paper' AND locale = 'et';

-- BERT
UPDATE node_translations
SET
  description = 'Google''i kahesuunaline Transformer: loeb teksti mõlemast suunast samaaegselt, mõistmaks sügavalt konteksti.',
  significance = 'Muutis otsingumootorid ja NLP võrdlusnäitajad. Näitas, et suurel tekstimassil eelkoolitus toimib.',
  metaphor = 'Herbivoor Transformer — loeb ja mõistab, kuid ei genereeri.'
WHERE node_id = 'bert' AND locale = 'et';

-- GPT-1
UPDATE node_translations
SET
  description = 'OpenAI esimene Generative Pre-trained Transformer (2018): näitas, et toorele tekstile eelkoolitus loob kasuliku keelemõistmise.',
  significance = 'Tõestas "eelkooli, siis hääleta" paradigmat. Kaasaegsete standardite järgi väike (117M parameetrit).',
  metaphor = 'Esimene hominiid — väikese ajuga, kuid kõndis püsti.'
WHERE node_id = 'gpt-1' AND locale = 'et';

-- GPT-2
UPDATE node_translations
SET
  description = 'Mudel, mis oli "liiga ohtlik avaldamiseks" (1.5B parameetrit). Genereeris üllatavalt sidusat teksti.',
  significance = 'Demonstreeris teksti genereerimise võimalusi mastaabis. Esimene mudel, mis käivitas avaliku arutelu tehisintellekti riskide üle.',
  metaphor = 'Homo erectus — omandas tule (sidus tekst) ja hoiatas teisi liike.'
WHERE node_id = 'gpt-2' AND locale = 'et';

-- GPT-3
UPDATE node_translations
SET
  description = '175 miljardit parameetrit. Kirjutas esseesid, koodi, luulet ja tõlkis — ilma ühegi ülesandesuunitlusega treeninguta.',
  significance = 'Tõestas "skaleerimisseadused" — suuremad mudelid on kvalitatiivselt erinevad. Käivitas alusmudeli ajastu.',
  metaphor = 'Homo sapiens — mitte suurim, kuid võimekaim, muutes kogu maastikku.'
WHERE node_id = 'gpt-3' AND locale = 'et';

-- DALL-E
UPDATE node_translations
SET
  description = 'OpenAI tekstist pildiks mudel: genereerib pilte loomuliku keele kirjeldustest muudetud GPT arhitektuuri abil.',
  significance = 'Näitas, et Transformerid võivad ühendada modaalsusi — mõistes teksti piisavalt, et luua vastavaid pilte.',
  metaphor = 'Esimene kahepaikne — Transformer, mis õppis hingama uues keskkonnas (pildid).'
WHERE node_id = 'dall-e' AND locale = 'et';

-- GPT-4
UPDATE node_translations
SET
  description = 'Multimodaalne mudel, mis vastab tekstile ja piltidele. Läbib advokatuuri eksami, scores tipus.',
  significance = 'Tõi tehisintellekti võimalused tasemele, mis sundis igat tööstust uuesti mõtlema oma suhet tehnoloogiaga.',
  metaphor = 'Kaasaegne tsivilisatsioon — mitte ainult intelligentne, vaid suuteline arutlema üle valdkondade.'
WHERE node_id = 'gpt-4' AND locale = 'et';

-- Claude
UPDATE node_translations
SET
  description = 'Anthropicu Konstitutsioonilise tehisintellekti assistent, loodud ohutuse ja kasulikkuse kui põhimõtetega.',
  significance = 'Tutvustas "Konstitutsioonilist tehisintellekti" — treenis tehisintellekti olema kasulik, kahjutu ja aus.',
  metaphor = 'Diplomaatlik liik — arenenud olema võimas JA koostööaldis.'
WHERE node_id = 'claude' AND locale = 'et';

-- Gemini
UPDATE node_translations
SET
  display_name = 'Gemini',
  description = 'Google DeepMind''i multimodaalne mudelite perekond, mis mõistab teksti, pilte, heli ja videot ühes arhitektuuris.',
  significance = 'Esindab Google''i aastakümnete tehisintellekti uurimise koondamist ühtseks mudelite perekonnaks.',
  metaphor = 'Kujumuutja — võrdselt mugav töötlema teksti, pilte, heli ja koodi.'
WHERE node_id = 'gemini' AND locale = 'et';

-- LLaMA
UPDATE node_translations
SET
  description = 'Meta avatud kaaludega keelemudelite perekond. Avalikult välja antud, võimaldades globaalset peenhäälestatud variantide ökosüsteemi.',
  significance = 'Demokratiseeris suured keelemudelid. Näitas, et avatud lähtekoodiga tehisintellekt võib võistelda omandmudelitega.',
  metaphor = 'Avatud lähtekoodiga liik — põgenes laborist ja edenes looduses.'
WHERE node_id = 'llama' AND locale = 'et';

-- Diffusion
UPDATE node_translations
SET
  description = 'Arhitektuur, mis genereerib pilte, õppides ümber pöörama müra lisamise protsessi — alustades mürast ja luues järk-järgult selgust.',
  significance = 'Ületas GANid pildikvaliteedis. Toidab praegust revolutsiooni tehisintellekti poolt loodud kunstis ja videos.',
  metaphor = 'Täiesti erinev puu haru — konvergentne evolutsioon, mis loob silmapaistvat visuaalset intelligentsust.'
WHERE node_id = 'diffusion' AND locale = 'et';

-- Stable Diffusion
UPDATE node_translations
SET
  description = 'Stability AI avatud lähtekoodiga pildigenereerimise mudel, mis kasutab latentset difusiooni. Töötab tarbija riistvaral.',
  significance = 'Tegi tehisintellektikunsti genereerimise kõigile kättesaadavaks. Käivitas massiivsed kultuurilised ja õiguslikud arutelud.',
  metaphor = 'Võilill — levitab seemneid igale poole, kasvab igas aias.'
WHERE node_id = 'stable-diffusion' AND locale = 'et';

-- Midjourney
UPDATE node_translations
SET
  description = 'Sõltumatu tehisintellektikunsti generaator, tuntud eriti esteetilise, kunstilise väljundi poolest. Ligipääsetav Discordi kaudu.',
  significance = 'Tõestas, et tehisintellekt suudab luua tõeliselt ilusat kunsti, võites võistlusi ja muutes loovtööstusi.',
  metaphor = 'Paabulind — arenenud spetsiaalselt esteetilise ilu jaoks.'
WHERE node_id = 'midjourney' AND locale = 'et';
