-- Insert Seed Stage Concepts
INSERT INTO concepts (id, category, related_stage) VALUES
('weights', 'mechanics', 'seed'),
('training-data', 'foundation', 'seed'),
('loss-function', 'mechanics', 'seed'),
('epochs', 'mechanics', 'seed'),
('parameters', 'mechanics', 'seed')
ON CONFLICT (id) DO NOTHING;

-- Insert Translations (English)
INSERT INTO concept_translations (concept_id, language_code, name, metaphor, description) VALUES
('weights', 'en', 'Weights', 'Volume Knobs', 'Adjustable values that determine how important each input is.'),
('training-data', 'en', 'Training Data', 'The Soil', 'The raw information fed into the system (Wikipedia, Code, etc.) to help it learn.'),
('loss-function', 'en', 'Loss Function', 'The Compass', 'A mathematical guide that tells the model how far off its guess was.'),
('epochs', 'en', 'Epochs', 'Repetitions', 'One complete pass through the entire training dataset.'),
('parameters', 'en', 'Parameters', 'Synapses', 'The total number of adjustable weights in the network (e.g., 7 Billion).')
ON CONFLICT (concept_id, language_code) DO NOTHING;

-- Insert Translations (Estonian)
INSERT INTO concept_translations (concept_id, language_code, name, metaphor, description) VALUES
('weights', 'et', 'Kaalud', 'Helinupud', 'Kohandatavad väärtused, mis määravad iga sisendi tähtsuse.'),
('training-data', 'et', 'Treeningandmed', 'Muld', 'Toorinfo (Vikipeedia, kood jne), mida süsteemile õppimiseks söödetakse.'),
('loss-function', 'et', 'Kaofunktsioon', 'Kompass', 'Matemaatiline juhis, mis ütleb mudelile, kui mööda tema pakkumine läks.'),
('epochs', 'et', 'Epohhid', 'Kordused', 'Üks täielik läbikäik kogu treeningandmestikust.'),
('parameters', 'et', 'Parameetrid', 'Sünapsid', 'Kohandatavate kaalude koguarv võrgus (nt 7 miljardit).')
ON CONFLICT (concept_id, language_code) DO NOTHING;
