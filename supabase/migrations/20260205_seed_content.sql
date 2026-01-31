-- ============================================================
-- Seed Stage Content Population
-- Populates the `concepts` and `concept_translations` tables
-- for the Seed (Data & Training) stage.
-- ============================================================

DO $$
DECLARE
    -- ID variables to ensure consistency
    v_dataset_id TEXT := 'dataset';
    v_common_crawl_id TEXT := 'common-crawl';
    v_the_pile_id TEXT := 'the-pile';
    v_data_cleaning_id TEXT := 'data-cleaning';
    v_bias_id TEXT := 'bias-in-data';
    
    v_loss_function_id TEXT := 'loss-function';
    v_backprop_id TEXT := 'backpropagation';
    v_compute_cluster_id TEXT := 'compute-cluster';
    v_epochs_id TEXT := 'epochs';
    v_overfitting_id TEXT := 'overfitting';
    
    v_weights_id TEXT := 'weights';
    v_base_model_id TEXT := 'base-model';
    v_checkpoints_id TEXT := 'checkpoints';
    v_evaluation_id TEXT := 'evaluation';
BEGIN

    -- 1. DELETE existing Seed concepts to ensure clean slate (idempotency)
    -- Cascades to translations and relationships due to FK constraints
    DELETE FROM concepts WHERE stage = 'seed';

    -- 2. INSERT Concepts (Phase 1: The Dataset)
    INSERT INTO concepts (id, stage, category, complexity_level, visual_type, sort_order, icon) VALUES
    (v_dataset_id, 'seed', 'data', 1, 'card', 10, 'database'),
    (v_common_crawl_id, 'seed', 'data', 2, 'card', 11, 'globe'),
    (v_the_pile_id, 'seed', 'data', 2, 'card', 12, 'layers'),
    (v_data_cleaning_id, 'seed', 'data', 2, 'card', 13, 'filter'),
    (v_bias_id, 'seed', 'data', 3, 'card', 14, 'scale');

    -- 2. INSERT Concepts (Phase 2: Training)
    INSERT INTO concepts (id, stage, category, complexity_level, visual_type, sort_order, icon) VALUES
    (v_loss_function_id, 'seed', 'training', 3, 'interactive', 20, 'activity'),
    (v_backprop_id, 'seed', 'training', 4, 'animation', 21, 'git-commit'),
    (v_compute_cluster_id, 'seed', 'training', 2, 'card', 22, 'server'),
    (v_epochs_id, 'seed', 'training', 2, 'card', 23, 'rotate-cw'),
    (v_overfitting_id, 'seed', 'training', 3, 'interactive', 24, 'alert-triangle');

    -- 2. INSERT Concepts (Phase 3: The Model)
    INSERT INTO concepts (id, stage, category, complexity_level, visual_type, sort_order, icon) VALUES
    (v_weights_id, 'seed', 'model', 4, 'card', 30, 'grid'),
    (v_base_model_id, 'seed', 'model', 3, 'card', 31, 'box'),
    (v_checkpoints_id, 'seed', 'model', 2, 'card', 32, 'save'),
    (v_evaluation_id, 'seed', 'model', 3, 'card', 33, 'check-circle');


    -- 3. INSERT Translations (EN)
    INSERT INTO concept_translations (concept_id, locale, title, explanation, metaphor) VALUES
    -- Phase 1
    (v_dataset_id, 'en', 'Training Dataset', 'The massive collection of text used to teach the AI model, containing trillions of words from books, websites, and code.', 'The library of all human knowledge.'),
    (v_common_crawl_id, 'en', 'Common Crawl', 'An open repository of web crawl data that makes up a significant portion of LLM training data.', 'Snapshot of the internet.'),
    (v_the_pile_id, 'en', 'The Pile', 'A diverse, curated dataset designed to improve model generalization across different domains.', 'A carefully mixed balanced diet.'),
    (v_data_cleaning_id, 'en', 'Data Cleaning', 'The process of removing duplicates, formatting errors, and low-quality text from the dataset.', 'filtering the water before bottling it.'),
    (v_bias_id, 'en', 'Bias in Data', 'Historical and social prejudices present in the training data that the model might learn to replicate.', 'If the library has mostly old books, the student learns old ideas.'),

    -- Phase 2
    (v_loss_function_id, 'en', 'Loss Function', 'A mathematical way to calculate how far off the model''s prediction is from the actual target.', 'The "hot or cold" game feedback.'),
    (v_backprop_id, 'en', 'Backpropagation', 'The algorithm that updates the model''s weights based on the error calculated by the loss function.', 'Correcting your swing after missing the ball.'),
    (v_compute_cluster_id, 'en', 'Compute Cluster', 'Thousands of GPUs working in parallel to process the massive dataset and update the model.', 'A factory of super-brains.'),
    (v_epochs_id, 'en', 'Epochs', 'One complete pass through the entire training dataset.', 'Reading the textbook from cover to cover once.'),
    (v_overfitting_id, 'en', 'Overfitting', 'When a model memorizes the training data instead of learning general patterns, performing poorly on new data.', 'Memorizing the answers instead of understanding the subject.'),

    -- Phase 3
    (v_weights_id, 'en', 'Weights (Parameters)', 'The adjustable numbers inside the model that determine how input signals are processed.', 'The dial settings on a complex machine.'),
    (v_base_model_id, 'en', 'Base Model', 'The raw, pre-trained model before any fine-tuning for specific tasks like chat or coding.', 'A brilliant student who knows facts but lacks social skills.'),
    (v_checkpoints_id, 'en', 'Checkpoints', 'Snapshots of the model saved at various points during training to prevent data loss.', 'Auto-save in a video game.'),
    (v_evaluation_id, 'en', 'Evaluation', 'Testing the model on a held-out set of data it hasn''t seen before to measure true performance.', 'The final exam.');


    -- 4. INSERT Translations (ET)
    INSERT INTO concept_translations (concept_id, locale, title, explanation, metaphor) VALUES
    -- Phase 1
    (v_dataset_id, 'et', 'Treeningandmestik', 'Massiivine tekstikogu, mida kasutatakse tehisintellekti mudeli õpetamiseks, sisaldades triljoneid sõnu raamatutest ja veebist.', 'Kogu inimteadmiste raamatukogu.'),
    (v_common_crawl_id, 'et', 'Common Crawl', 'Avatud veebiandmete arhiiv, mis moodustab suure osa LLM-ide treeningmaterjalist.', 'Internetist tehtud hetktõmmis.'),
    (v_the_pile_id, 'et', 'The Pile', 'Mitmekesine ja kureeritud andmestik, mis on loodud mudeli üldistusvõime parandamiseks.', 'Hoolikalt tasakaalustatud toitumine.'),
    (v_data_cleaning_id, 'et', 'Andmete Puhastamine', 'Duplikaatide, vormindamisvigade ja madalakvaliteedilise teksti eemaldamine andmestikust.', 'Vee filtreerimine enne pudelisse villimist.'),
    (v_bias_id, 'et', 'Andmete Kallutatus', 'Ajaloolised ja sotsiaalsed eelarvamused treeningandmetes, mida mudel võib õppida kordama.', 'Kui raamatukogus on vaid vanad raamatud, õpib tudeng vanu ideid.'),

    -- Phase 2
    (v_loss_function_id, 'et', 'Kaofunktsioon', 'Matemaatiline viis arvutada, kui kaugel on mudeli ennustus tegelikust eesmärgist.', 'Mäng "soe või külm".'),
    (v_backprop_id, 'et', 'Tagasilevi', 'Algoritm, mis uuendab mudeli kaalusid vastavalt kaofunktsiooni arvutatud veale.', 'Löögi korrigeerimine pärast möödalasku.'),
    (v_compute_cluster_id, 'et', 'Arvutusklaster', 'Tuhanded GPU-d, mis töötavad paralleelselt andmestiku töötlemiseks.', 'Superajude tehas.'),
    (v_epochs_id, 'et', 'Epohhid', 'Üks täielik läbimine läbi kogu treeningandmestiku.', 'Õpiku kaanest kaaneni läbilugemine ühe korra.'),
    (v_overfitting_id, 'et', 'Ülesobitamine', 'Kui mudel jätab treeningandmed meelde selle asemel, et õppida üldisi mustreid.', 'Vastuste päheõppimine aine mõistmise asemel.'),

    -- Phase 3
    (v_weights_id, 'et', 'Kaalud (Parameetrid)', 'Reguleeritavad arvud mudeli sees, mis määravad, kuidas sisendsignaale töödeldakse.', 'Keerulise masina seadistusnupud.'),
    (v_base_model_id, 'et', 'Baasmudel', 'Toores, eeltreenitud mudel enne peenhäälestamist spetsiifilisteks ülesanneteks.', 'Geniaalne tudeng, kes teab fakte, kuid ei oska veel suhelda.'),
    (v_checkpoints_id, 'et', 'Kontrollpunktid', 'Mudeli salvestatud hetkeseisud treeningu ajal.', 'Automaatne salvestamine videomängus.'),
    (v_evaluation_id, 'et', 'Hindamine', 'Mudeli testimine andmetel, mida see pole varem näinud.', 'Lõpueksam.');

END $$;
