/**
 * MediDiag AI - Système de diagnostic intelligent
 * Analyse les symptômes et suggère les pannes correspondantes
 */

// ============================================
// BASE DE DONNÉES COMPLÈTE (20 ÉQUIPEMENTS)
// ============================================

const equipmentDatabase = [
    {
        id: 'scalpel',
        name: 'Bistouri Électrique',
        icon: '🔪',
        manufacturer: 'Covidien',
        model: 'ForceTriad',
        faults: [
            {
                code: 'F001',
                title: 'Pas de coupe / Coupe intermittente',
                severity: 'ighh',
                keywords: ['pas de coupe', 'coupe pas', 'intermittent', 'ne coupe pas', 'découpe', 'bip', 'erreur', 'voyant rouge'],
                solution: `🔧 SOLUTION COMPLÈTE :

1️⃣ VÉRIFIER L'ÉLECTRODE :
   • Retirer et inspecter visuellement l'électrode
   • Vérifier absence de casse ou fusion
   • Remplacer si usure >50% ou déformation

2️⃣ CONTRÔLER LE CÂBLE :
   • Vérifier continuité avec multimètre
   • Inspecter plis, écrasements, coupures
   • Tester résistance : <1Ω normalement

3️⃣ VÉRIFIER LA PLAQUE DE RETOUR :
   • Contact cutané >70% surface
   • Gel conducteur frais (pas sec)
   • Câble plaque bien connecté

4️⃣ TESTER LA PÉDALE :
   • Nettoyer contacts
   • Vérifier clic mécanique
   • Tester continuité au multimètre

⚠️ SI TOUJOURS KO : Appeler biomédical niveau 2`
            },
            {
                code: 'F002',
                title: 'Alarme surveillance patient (NESS)',
                severity: 'high',
                keywords: ['alarme', 'surveillance', 'patient', 'plaque', 'contact', 'impédance', 'erreur e', 'voyant rouge', 'bip continu'],
                solution: `🚨 URGENCE SÉCURITÉ PATIENT :

1️⃣ ARRÊT IMMÉDIAT si brûlure suspectée

2️⃣ VÉRIFIER PLAQUE RETOUR :
   • Repositionner complètement
   • Nouveau gel conducteur
   • Zone musclée (cuisse, fesse)

3️⃣ CONTRÔLER CÂBLE PLAQUE :
   • Pas de sectionnement
   • Connecteur bien encliqueté
   • Pas d'oxydation

4️⃣ TESTER IMPÉDANCE :
   • Normale : <100Ω
   • Si >300Ω : changer site plaque

5️⃣ SI PERSISTANT :
   • Changer équipement
   • Appeler biomédical URGENCE

⚡ RISQUE : Brûlure électrique patient !`
            },
            {
                code: 'F003',
                title: 'Surchauffe poignée / Odeur brûlé',
                severity: 'medium',
                keywords: ['chaud', 'chaleur', 'brûlant', 'odeur', 'fumée', 'surchauffe', 'poignée', 'brûlé'],
                solution: `🔥 SURCHAUFFE :

1️⃣ ARRÊTER immédiatement l'usage

2️⃣ VÉRIFIER :
   • Mode CUT continu trop long (>30s)
   • Puissance excessive pour électrode
   • Électrode trop fine pour puissance

3️⃣ NETTOYER :
   • Contacts poignée (alcool)
   • Isolant céramique (fissures?)

4️⃣ LAISSEZ REFROIDIR 15 min

5️⃣ TEST avec électrode neuve à 30W

⚠️ Si récidive : remplacer poignée`
            }
        ]
    },
    {
        id: 'monitor',
        name: 'Moniteur Patient',
        icon: '📺',
        manufacturer: 'Philips',
        model: 'IntelliVue',
        faults: [
            {
                code: 'M001',
                title: 'ECG plat ou bruité',
                severity: 'high',
                keywords: ['ecg', 'plat', 'ligne', 'bruit', 'haché', 'interférence', 'dérivation', 'électrode'],
                solution: `💓 PROBLÈME ECG :

1️⃣ ÉLECTRODES (5 dérivations) :
   • Raser zone si poilue
   • Nettoyer peau (alcool)
   • Gel frais sous chaque électrode
   • Pression ferme 10 secondes

2️⃣ CÂBLE PATIENT :
   • Pas de plis ou nœuds
   • Pas de pincement sous patient
   • Connecteur vert bien encliqueté

3️⃣ MASSE ÉLECTRIQUE :
   • Vérifier terre prise murale
   • Éloigner sources interference :
     * Pompe à perfusion
     * Cautère électrique
     * Téléphone

4️⃣ FILTRE :
   • Mode : Monitoring (pas Diagnostic)

5️⃣ SI TOUJOURS PLAT :
   • Changer câble patient
   • Tester module ECG

📊 Normale : 1mV = 10mm (calibration)`
            },
            {
                code: 'M002',
                title: 'SpO2 non mesurable',
                severity: 'high',
                keywords: ['spo2', 'saturation', 'oxygène', 'pouls', 'capteur', 'doigt', '---', 'non mesurable', 'signal faible'],
                solution: `🫁 SpO2 EN PANNE :

1️⃣ CHANGER DE SITE :
   • Index ↔ Majeur alternance
   • Oreille si doigts froids
   • Éviter ongles artificiels

2️⃣ VÉRIFIER CAPTEUR :
   • LED rouge visible (transilluminer)
   • Câble pas sectionné
   • Connecteur propre

3️⃣ PATIENT :
   • Réchauffer mains (couverture)
   • Retirer vernis à ongles
   • Masser doigt si vasoconstriction

4️⃣ RÈGLAGES :
   • Sensibilité : Normal ou Max
   • Moyennage : 4-8 secondes

5️⃣ SI TOUJOURS KO :
   • Changer capteur
   • Tester autre patient (valider capteur)

⚠️ SpO2 <90% = URGENCE vitale !`
            },
            {
                code: 'M003',
                title: 'Tension artérielle impossible',
                severity: 'medium',
                keywords: ['tension', 'pression', 'bras', 'brassard', 'mesure', 'impossible', 'gonflage', 'erreur', 'fuite'],
                solution: `🩺 TA EN ÉCHEC :

1️⃣ BRASSARD :
   • Taille adaptée (flèche artère)
   • Position : cœur niveau
   • Ni trop serré ni lâche (2 doigts)

2️⃣ VÉRIFIER FUITES :
   • Tuyau pas plié sous lit
   • Connecteurs bien serrés
   • Chambre gonflage intacte

3️⃣ PATIENT :
   • Bras au repos, palmé vers haut
   • Pas de contraction musculaire
   • Attendre 2 min entre mesures

4️⃣ MODE :
   • Vérifier mode (Adulte/Pédiatrique)
   • Débit initial : auto

5️⃣ SI PERSISTANT :
   • Changer brassard
   • Mesure manuelle au stéthoscope

📊 Normes : 120/80 mmHg (adulte)`
            }
        ]
    },
    {
        id: 'autoclave',
        name: 'Autoclave',
        icon: '♨️',
        manufacturer: 'Tuttnauer',
        model: 'Elara',
        faults: [
            {
                code: 'A001',
                title: 'Cycle stérilisation échoué',
                severity: 'high',
                keywords: ['cycle', 'échoué', 'température', 'pression', '121', '134', 'erreur', 'sterilisation', 'vapeur'],
                solution: `♨️ ÉCHEC STÉRILISATION :

1️⃣ VÉRIFIER TEMPÉRATURE :
   • Sonde PT100 (décalage?)
   • Résistances chauffantes (continuité)
   • Isolation thermique

2️⃣ CONTRÔLER PRESSION :
   • 121°C = 1,1 bar (surcharge)
   • 134°C = 2,1 bar
   • Fuites vanne sécurité

3️⃣ QUALITÉ EAU :
   • Dureté <5°f (test bandelette)
   • Conductivité <15μS/cm
   • Niveau réservoir

4️⃣ PORTE :
   • Joint torique (fissures?)
   • Fermeture hermétique
   • Pas de textile coincé

5️⃣ SI TOUJOURS KO :
   • Cycle test avec Bowie-Dick
   • Appeler maintenance

⚠️ Charges non stériles = REFAIRE cycle !`
            },
            {
                code: 'A002',
                title: 'Fuite de vapeur visible',
                severity: 'high',
                keywords: ['fuite', 'vapeur', 'eau', 'pression', 'porte', 'joint', 'sifflement', 'humidité'],
                solution: `💨 FUITE VAPEUR :

1️⃣ ARRÊTER CYCLE immédiatement

2️⃣ LOCALISER FUITE :
   • Porte (joint principal)
   • Soupape sécurité
   • Raccords tuyauterie
   • Robinet purge

3️⃣ REMPLACER :
   • Joint porte si durci/fissuré
   • Graisser silicone alimentaire
   • Vérifier pression fermeture

4️⃣ TEST ÉTANCHÉITÉ :
   • Cycle vide (sans charge)
   • Pression 2 bar, attendre 10 min
   • Chute <0,1 bar acceptable

5️⃣ SI FUITE PERSISTE :
   • Immobiliser appareil
   • Appeler technicien agréé

⚠️ Risque brûlure vapeur 134°C !`
            }
        ]
    },
    {
        id: 'syringe',
        name: 'Pousse-Seringue',
        icon: '💉',
        manufacturer: 'BD',
        model: 'Alaris',
        faults: [
            {
                code: 'P001',
                title: 'Alarme occlusion',
                severity: 'high',
                keywords: ['occlusion', 'alarme', 'bloqué', 'arrêt', 'pression', 'amont', 'aval', 'ligne'],
                solution: `💉 OCCLUSION DÉTECTÉE :

1️⃣ VÉRIFIER AMONT (poches) :
   • Poche vide ? → Changer
   • Clamp fermé ? → Ouvrir
   • Robinet 3 voies ? → Position perf

2️⃣ VÉRIFIER AVAL (patient) :
   • Site injection : phlébite?
   • Cathéter plié sous pansement?
   • Clamp distal ouvert?

3️⃣ LIGNE :
   • Pas de plis ou nœuds
   • Filtre anti-air (obstrué?)

4️⃣ RÉGLAGES :
   • Sensibilité occlusion : adapter
   • Pas trop sensible si ligne longue

5️⃣ SI TOUJOURS ALARME :
   • Changer ligne complète
   • Changer site veineux

⚠️ Vérifier extravasation (gonflement)!`
            }
        ]
    },
    {
        id: 'aspirator',
        name: 'Aspirateur Chirurgical',
        icon: '🌪️',
        manufacturer: 'Medela',
        model: 'Dominant',
        faults: [
            {
                code: 'AS001',
                title: 'Pas de dépression',
                severity: 'high',
                keywords: ['aspiration', 'dépression', 'vide', 'faible', 'pas d\'air', 'bouteille', 'filtre', 'tuyau'],
                solution: `🌪️ PAS D\'ASPIRATION :

1️⃣ BOUTEILLE :
   • Pleine ? → Vider
   • Bouchon bien vissé ?
   • Joint torique en place ?

2️⃣ FILTRES :
   • Filtre hydrophobe (humide = changer)
   • Filtre bactérien (obstrué?)

3️⃣ TUYAUX :
   • Pas de plis ou écrasements
   • Raccords bien enfoncés
   • Pas de perforations

4️⃣ RÉGLAGES :
   • Dépression : -400 à -600 mmHg
   • Mode intermittent ou continu

5️⃣ SI TOUJOURS KO :
   • Tester pompe (bruit anormal?)
   • Changer filtre protection pompe

⚠️ Ne jamais aspirer sans filtre !`
            }
        ]
    },
    {
        id: 'xray',
        name: 'Radiographie Standard',
        icon: '🦴',
        manufacturer: 'Siemens',
        model: 'Multix',
        faults: [
            {
                code: 'X001',
                title: 'Pas d\'exposition',
                severity: 'high',
                keywords: ['exposition', 'tir', 'pas de photo', 'noir', 'tube', 'erreur', 'ht', 'kV', 'mAs'],
                solution: `📸 PAS D\'EXPOSITION :

1️⃣ VÉRIFIER AFFICHAGE :
   • kV et mAs programmés ?
   • Pas d\'erreur système ?
   • Mode prêt ( Ready) allumé ?

2️⃣ TUBE RX :
   • Anode en rotation (bruit) ?
   • Filament OK (préchauffage) ?
   • Pas de fuite huile (tubes anciens)

3️⃣ COMMANDE :
   • Pédale ou main contact ?
   • Porte fermée (interlock) ?
   • Patient en place (détecteur)?

4️⃣ SI ERREUR AFFICHÉE :
   • Noter code erreur exact
   • Redémarrer système
   • Appeler physicien médical si E-04 (fuite radiation)

⚠️ Ne pas forcer répétitions (tube)!`
            }
        ]
    },
    {
        id: 'defibrillator',
        name: 'Défibrillateur',
        icon: '⚡',
        manufacturer: 'Zoll',
        model: 'X-Series',
        faults: [
            {
                code: 'D001',
                title: 'Non chargement',
                severity: 'high',
                keywords: ['charge', 'chargement', 'condensateur', 'whine', 'pas de son', 'paddles', 'choc'],
                solution: `⚡ PAS DE CHARGE :

1️⃣ VÉRIFIER BATTERIE :
   • >30% charge affichée ?
   • Connecteur batterie propre ?
   • Tester sur secteur

2️⃣ PADDLES :
   • Bien connectés (clic) ?
   • Câble pas sectionné ?
   • Mode interne/externe correct ?

3️⃣ CONDENSATEURS :
   • Vieillissement (>5 ans) ?
   • Fuite (test maintenance)

4️⃣ TEST :
   • Mode test charge (résistance)
   • Vérifier 360J atteints

🚨 URGENCE : Utiliser défibrillateur de secours si patient instable !`
            }
        ]
    },
    {
        id: 'ventilator',
        name: 'Ventilateur',
        icon: '🫁',
        manufacturer: 'Dräger',
        model: 'Evita',
        faults: [
            {
                code: 'V001',
                title: 'Alarme déconnexion',
                severity: 'high',
                keywords: ['déconnexion', 'fuite', 'circuit', 'patient', 'débit', 'pression', 'alarme'],
                solution: `🫁 DÉCONNEXION CIRCUIT :

1️⃣ VÉRIFIER CIRCUIT :
   • Filtre antibactérien (humide?)
   • Connecteurs 22mm (fissures?)
   • Sonde température bien placée ?

2️⃣ PATIENT :
   • Tube endotrachéal débranché ?
   • Fuite masque (ventilation non invasive)?
   • Cuff (ballonnet) dégonflé ?

3️⃣ RÉGLAGES :
   • Seuil alarme fuite adapté
   • Mode détection : Adulte/Pédiatrie

4️⃣ TEST ÉTANCHÉITÉ :
   • Boucher Y patient
   • Pression 40 cmH2O
   • Chute <5 cmH2O/10s

⚠️ Vérifier synchronisation patient/machine !`
            }
        ]
    },
    {
        id: 'ultrasound',
        name: 'Échographe',
        icon: '🔊',
        manufacturer: 'GE',
        model: 'Logiq',
        faults: [
            {
                code: 'U001',
                title: 'Image noire',
                severity: 'high',
                keywords: ['noir', 'pas d\'image', 'sonde', 'écho', 'secteur', 'glace', 'gel'],
                solution: `🔊 IMAGE NOIRE :

1️⃣ SONDE :
   • Bien connectée (clic) ?
   • Sélectionnée à l\'écran ?
   • Type compatible (convexe/linéaire)?

2️⃣ GEL :
   • Suffisant sur sonde ?
   • Pas d\'air entre sonde et peau
   • Gel conducteur (pas séparé)

3️⃣ RÉGLAGES :
   • Gain général >50% ?
   • TGC (compensation temps) : courbe en U
   • Profondeur adaptée ?

4️⃣ TEST :
   • Autre sonde sur même port
   • Même sonde sur autre port
   • Phantom (vérifier émission)

5️⃣ SI TOUJOURS NOIR :
   • Sonde défectueuse (éléments)
   • Port machine HS

📞 Appeler service technique GE`
            }
        ]
    },
    {
        id: 'dialysis',
        name: 'Machine Dialyse',
        icon: '💧',
        manufacturer: 'Fresenius',
        model: '5008',
        faults: [
            {
                code: 'DI001',
                title: 'Alarme pression artérielle',
                severity: 'high',
                keywords: ['pression', 'artérielle', 'access', 'aiguille', 'fistule', 'débit sang', 'alarme'],
                solution: `💧 PRESSION ACCESS :

1️⃣ AIGUILLES :
   • Position correcte (flux vers cœur) ?
   • Pas de rotation (360° test) ?
   • Calibre adapté (15G-17G) ?

2️⃣ FISTULE :
   • Bruit (souffle) présent ?
   • Thrombose (durci) ?
   • Sténose (pulsation faible) ?

3️⃣ LIGNE :
   • Pas de plis entre aiguille et pompe
   • Clamp ouvert
   • Chambre dégazage niveau OK

4️⃣ POMPE SANG :
   • Débit programmé réaliste ?
   • Pas d\'occlusion amont

5️⃣ SI KO :
   • Repositionner aiguille
   • Héparine bolus si thrombose suspecte

⚠️ Ne jamais reculer débit >10% !`
            }
        ]
    },
    {
        id: 'infusion',
        name: 'Pompe à Perfusion',
        icon: '💊',
        manufacturer: 'B.Braun',
        model: 'Perfusor',
        faults: [
            {
                code: 'PI001',
                title: 'Alarme bolus',
                severity: 'high',
                keywords: ['bolus', 'occlusion', 'aval', 'distal', 'ligne', 'clamps', 'site'],
                solution: `💊 ALARME BOLUS :

1️⃣ SITE INJECTION :
   • Phlébite (rougeur, douleur) ?
   • Infiltration (gonflement) ?
   • Cathéter plié ?

2️⃣ LIGNE AVAL :
   • Clamp fermé ? → Ouvrir
   • Robinet 3 voies ? → Position perf
   • Filtre (0,2μm) obstrué ?

3️⃣ PARAMÈTRES :
   • Débit trop élevé pour cathéter ?
   • Sensibilité occlusion : adapter

4️⃣ SI PHLÉBITE :
   • Arrêter perfusion
   • Changer site
   • Noter incident

⚠️ Vérifier compatibilité médicament/soluté !`
            }
        ]
    },
    {
        id: 'ecg',
        name: 'ECG 12 Dérivations',
        icon: '💓',
        manufacturer: 'GE',
        model: 'MAC',
        faults: [
            {
                code: 'E001',
                title: 'Dérivation manquante',
                severity: 'medium',
                keywords: ['dérivation', 'manquante', 'plat', 'électrode', 'câble', 'débranché'],
                solution: `💓 DÉRIVATION HS :

1️⃣ IDENTIFIER :
   • Quelle dérivation ? (indication écran)
   • Ex: V1, V2, aVL, etc.

2️⃣ ÉLECTRODE SPÉCIFIQUE :
   • Adhésion (repositionner)
   • Gel (rajouter)
   • Peau (raser si poilue)

3️⃣ CÂBLE :
   • Correspondant à dérivation
   • Pas de sectionnement
   • Connecteur vert bien enfoncé

4️⃣ SI TOUJOURS KO :
   • Changer câble patient complet
   • Tester avec autre patient

📊 Normale : 10 électrodes = 12 dérivations`
            }
        ]
    },
    {
        id: 'laser',
        name: 'Laser Chirurgical',
        icon: '🔴',
        manufacturer: 'Lumenis',
        model: 'UltraPulse',
        faults: [
            {
                code: 'L001',
                title: 'Pas d\'émission',
                severity: 'high',
                keywords: ['laser', 'émission', 'faisceau', 'rouge', 'guide', 'fibre', 'puissance', 'watt'],
                solution: `🔴 LASER MORT :

1️⃣ SÉCURITÉ :
   • Porte interlock fermée ?
   • Protection oculaire détectée ?
   • Pédale relâchée ?

2️⃣ GUIDE LUMIÈRE :
   • Bien connecté (clic) ?
   • Pas de cassure (inspecter)
   • Extrémité propre (alcool)

3️⃣ MODE :
   • Prêt (Ready) affiché ?
   • Puissance >0W programmée ?
   • Mode Standby vs Ready ?

4️⃣ TEST :
   • Mode test (sans fibre)
   • Cible papier (marque brûlure)

5️⃣ SI TOUJOURS KO :
   • Tube laser (vieux?) → Changer
   • Alimentation HT → Vérifier

⚠️ JAMAIS regarder faisceau directement !`
            }
        ]
    },
    {
        id: 'anesthesia',
        name: 'Machine Anesthésie',
        icon: '☁️',
        manufacturer: 'Dräger',
        model: 'Primus',
        faults: [
            {
                code: 'AN001',
                title: 'Fuite circuit patient',
                severity: 'high',
                keywords: ['fuite', 'circuit', 'étanchéité', 'pression', 'ballon', 'ballonnet', 'fuite permanente'],
                solution: `☁️ FUITE CIRCUIT :

1️⃣ TEST ÉTANCHÉITÉ :
   • Mode manuel
   • Boucher Y patient
   • Gonfler à 30 cmH2O
   • Chute <10 cmH2O/10s

2️⃣ VÉRIFIER :
   • Bague masque (fissures?)
   • Ballon réservoir (trous?)
   • Raccords 22mm (fissures?)
   • Filtre antibactérien (mal vissé?)

3️⃣ VALVES :
   • Valve expiratoire (membrane)
   • Valve APL (réglage fermeture)
   • Valve sécurité (ouverture 60cmH2O)

4️⃣ SI FUITE PERSISTE :
   • Changer circuit complet
   • Tester machine seule (sans circuit)

⚠️ Anesthésie générale = OBLIGATOIRE étanchéité !`
            }
        ]
    },
    {
        id: 'endoscope',
        name: 'Endoscope',
        icon: '🔍',
        manufacturer: 'Olympus',
        model: 'EVIS',
        faults: [
            {
                code: 'EN001',
                title: 'Image floue / Taches',
                severity: 'medium',
                keywords: ['flou', 'tache', 'noir', 'moisi', 'image', 'nettoyage', 'distal', 'lentille'],
                solution: `🔍 IMAGE DÉGRADÉE :

1️⃣ NETTOYAGE IMMÉDIAT :
   • Lentille distale (alcool 90%)
   • Lentille proximale (oculaire)
   • Canal irrigation (seringue eau)

2️⃣ INSPECTION FIBRES :
   • Taches noires = fibres cassées
   • >10% noires = changer endoscope
   • Moisissure = séchage insuffisant

3️⃣ SOURCE LUMIÈNE :
   • Intensité maximale ?
   • Guide lumière bien connecté ?
   • Lampe vieille (>500h) ?

4️⃣ CAMÉRA :
   • CCU (processeur) correct ?
   • Balance blancs auto ?
   • Tester autre endoscope

⚠️ Stérilisation vapeur OK si <134°C`
            }
        ]
    },
    {
        id: 'incubator',
        name: 'Couveuse Néonatale',
        icon: '👶',
        manufacturer: 'Dräger',
        model: 'Caleo',
        faults: [
            {
                code: 'C001',
                title: 'Température instable',
                severity: 'high',
                keywords: ['température', 'chaud', 'froid', 'instable', 'bébé', 'néonatal', 'thermostat'],
                solution: `👶 TEMPÉRATURE KO :

1️⃣ SONDE :
   • Position peau (pas air!)
   • Adhésion complète
   • Pas de déconnection

2️⃣ RÉGLAGES :
   • Mode : Servo-control (peau)
   • Consigne : 36,5°C
   • Alarmes : 36-37,5°C

3️⃣ ENVIRONNEMENT :
   • Porte ouverte trop longtemps ?
   • Courant d\'air (climatisation)?
   • Humidité >60% ?

4️⃣ VÉRIFIER :
   • Chauffage (résistances)
   • Ventilateur circulation
   • Filtres air (propres?)

⚠️ Hypothermie néonatale = URGENCE !`
            }
        ]
    },
    {
        id: 'centrifuge',
        name: 'Centrifugeuse',
        icon: '🔄',
        manufacturer: 'Eppendorf',
        model: '5810',
        faults: [
            {
                code: 'CE001',
                title: 'Vibration excessive',
                severity: 'medium',
                keywords: ['vibration', 'bruit', 'tremblement', 'équilibrage', 'tubes', 'rotor'],
                solution: `🔄 VIBRATIONS :

1️⃣ ARRÊT IMMÉDIAT si violent !

2️⃣ ÉQUILIBRAGE :
   • Masse égale face à face
   • Volume identique (±0,1ml)
   • Position symétrique (pas 3 tubes!)

3️⃣ VÉRIFIER :
   • Rotor (corrosion, déformation)
   • Tubes (pas de fissures)
   • Adaptateurs (bien placés)

4️⃣ MACHINE :
   • Nivellement (pieds réglables)
   • Amortisseurs (caoutchouc usé?)
   • Roulements (bruit métallique?)

⚠️ Risque éjection rotor si déséquilibre !`
            }
        ]
    },
    {
        id: 'microscope',
        name: 'Microscope Opératoire',
        icon: '🔬',
        manufacturer: 'Zeiss',
        model: 'OPMI',
        faults: [
            {
                code: 'MI001',
                title: 'Mise au point impossible',
                severity: 'medium',
                keywords: ['focus', 'net', 'flou', 'roue', 'crémaillère', 'focale', 'dure'],
                solution: `🔬 FOCUS HS :

1️⃣ LUBRIFICATION :
   • Crémaillère (huile légère)
   • Glissières (pas de graisse épaisse)
   • Molettes (libres)

2️⃣ CONTREPOIDS :
   • Équilibrage tête lourde ?
   • Freins desserrés ?
   • Bras horizontal ?

3️⃣ MOTEUR (si motorisé) :
   • Alimentation 24V ?
   • Encodeur position ?
   • Frein électrique ?

4️⃣ SI MANUEL :
   • Vis micrométrique (usure?)
   • Butées (alignement?)

📞 Maintenance Zeiss si crémaillère usée`
            }
        ]
    },
    {
        id: 'suction',
        name: 'Aspiration Murale',
        icon: '🔌',
        manufacturer: 'Amico',
        model: 'Wall Outlet',
        faults: [
            {
                code: 'SM001',
                title: 'Dépression insuffisante',
                severity: 'high',
                keywords: ['aspiration', 'dépression', 'faible', 'mur', 'central', 'potence', 'réseau'],
                solution: `🔌 DÉPRESSION FAIBLE :

1️⃣ VÉRIFIER RÉSEAU CENTRAL :
   • Pompe centrale en marche ?
   • Pression ligne : -0,6 à -0,8 bar
   • Maintenance en cours ?

2️⃣ AU LIT :
   • Robinet ouvert à fond ?
   • Filtre potence (plein?) → Vider
   • Bouteille (pleine?) → Vider
   • Tuyau (pas de plis?)

3️⃣ RÉGULATEUR :
   • Dépression affichée ?
   • Manomètre fonctionnel ?
   • Fuite au robinet (sifflement?)

4️⃣ SI RÉSEAU KO :
   • Appeler maintenance centrale
   • Utiliser aspirateur mobile

⚠️ Aspiration = critique chirurgie !`
            }
        ]
    },
    {
        id: 'electrocautery',
        name: 'Électrocautère',
        icon: '⚡',
        manufacturer: 'Bovie',
        model: 'ICC',
        faults: [
            {
                code: 'EC001',
                title: 'Pas de coagulation',
                severity: 'high',
                keywords: ['coag', 'coagulation', 'pointe', 'brûler', 'adhérence', 'collage', 'tissu'],
                solution: `⚡ PAS DE COAG :

1️⃣ POINTE :
   • Encrassée (carbone noir) ?
   • Nettoyer (éponge saline)
   • Bien vissée (contact) ?
   • Type adapté (aiguille/spatule)?

2️⃣ RÉGLAGES :
   • Mode : COAG (pas CUT)
   • Puissance : 30-50W (pas trop bas!)
   • Spray/Fulguration si large zone

3️⃣ TECHNIQUE :
   • Pas frotter (carbone)
   • Contact léger
   • Temps court répété

4️⃣ SI TOUJOURS KO :
   • Changer pointe
   • Tester résistance charge

⚠️ Pas CUT pour coagulation vaisseaux !`
            }
        ]
    }
];

// ============================================
// CLASSE PRINCIPALE DE L'APPLICATION
// ============================================

class MediDiagAI {
    constructor() {
        this.currentEquipment = null;
        this.symptomsText = '';
        this.suggestedFaults = [];
        this.init();
    }

    init() {
        this.renderEquipmentGrid();
        this.setupEventListeners();
    }

    // Rendu de la grille d'équipements
    renderEquipmentGrid() {
        const grid = document.getElementById('equipmentGrid');
        if (!grid) return;

        grid.innerHTML = equipmentDatabase.map(eq => `
            <div class="equipment-card" data-id="${eq.id}" onclick="app.selectEquipment('${eq.id}')">
                <div class="equipment-status"></div>
                <div class="pulse"></div>
                <span class="equipment-icon">${eq.icon}</span>
                <div class="equipment-name">${eq.name}</div>
                <div class="equipment-meta">${eq.manufacturer}</div>
            </div>
        `).join('');
    }

    // Sélection d'un équipement
    selectEquipment(id) {
        // Mise à jour visuelle
        document.querySelectorAll('.equipment-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const activeCard = document.querySelector(`[data-id="${id}"]`);
        if (activeCard) activeCard.classList.add('active');

        this.currentEquipment = equipmentDatabase.find(eq => eq.id === id);
        this.symptomsText = '';
        this.suggestedFaults = [];
        this.renderDiagnosticArea();
    }

    // Rendu de la zone de diagnostic
    renderDiagnosticArea() {
        const area = document.getElementById('diagnosticArea');
        if (!area) return;

        if (!this.currentEquipment) {
            area.innerHTML = this.getEmptyStateHTML();
            return;
        }

        area.innerHTML = `
            ${this.getSymptomsSectionHTML()}
            ${this.getAIResultsSectionHTML()}
            ${this.getAllFaultsSectionHTML()}
        `;
    }

    // Section symptômes avec bouton AI
    getSymptomsSectionHTML() {
        return `
            <div class="section-card symptoms-section">
                <div class="section-header">
                    <div class="section-icon">${this.currentEquipment.icon}</div>
                    <div class="section-title">
                        <h2>${this.currentEquipment.name}</h2>
                        <p>${this.currentEquipment.manufacturer} ${this.currentEquipment.model}</p>
                    </div>
                </div>
                
                <div class="symptoms-container">
                    <div class="symptoms-label">
                        <span>📝</span>
                        Décrivez les symptômes constatés
                    </div>
                    <textarea 
                        id="symptomsInput" 
                        class="symptoms-textarea"
                        placeholder="Ex: L'appareil affiche une erreur E-05, le voyant rouge clignote, pas de son lors de la mesure..."
                        oninput="app.updateSymptoms(this.value)"
                    >${this.symptomsText}</textarea>
                    <div class="char-counter">
                        <span id="charCount">${this.symptomsText.length}</span> caractères
                    </div>
                </div>

                <div class="ai-action-bar">
                    <button class="btn-ai" onclick="app.analyzeWithAI()" ${!this.symptomsText.trim() ? 'disabled' : ''}>
                        <span class="ai-icon">🤖</span>
                        <span class="ai-text">Analyser avec l'IA</span>
                    </button>
                    <div class="ai-hint">L'IA va analyser vos symptômes et proposer les pannes correspondantes</div>
                </div>

                <div class="quick-tags">
                    <span class="tag-label">Symptômes courants :</span>
                    ${this.getSymptomTags()}
                </div>
            </div>
        `;
    }

    // Section résultats AI
    getAIResultsSectionHTML() {
        if (this.suggestedFaults.length === 0) return '';

        const confidence = this.calculateConfidence();

        return `
            <div class="section-card ai-results-section">
                <div class="section-header ai-header">
                    <div class="section-icon" style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); color: #1976d2;">
                        🤖
                    </div>
                    <div class="section-title">
                        <h2>Résultats de l'analyse IA</h2>
                        <p>Confiance: ${confidence}% - ${this.suggestedFaults.length} panne(s) suggérée(s)</p>
                    </div>
                </div>

                <div class="ai-faults-list">
                    ${this.suggestedFaults.map((fault, index) => this.getAIFaultCardHTML(fault, index)).join('')}
                </div>
            </div>
        `;
    }

    // Section toutes les pannes (collapsible)
    getAllFaultsSectionHTML() {
        return `
            <div class="section-card all-faults-section">
                <div class="section-header collapsible" onclick="app.toggleAllFaults(this)">
                    <div class="section-icon" style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); color: #ff6f00;">
                        🔧
                    </div>
                    <div class="section-title">
                        <h2>Toutes les pannes connues</h2>
                        <p>${this.currentEquipment.faults.length} diagnostic(s) disponible(s)</p>
                    </div>
                    <div class="toggle-icon">▼</div>
                </div>
                
                <div class="all-faults-content" style="display: none;">
                    <div class="faults-list">
                        ${this.currentEquipment.faults.map((fault, index) => this.getFaultCardHTML(fault, index)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Carte de panne AI (avec bouton solution)
    getAIFaultCardHTML(fault, index) {
        const severityClass = `severity-${fault.severity}`;
        const severityText = {
            'high': 'CRITIQUE',
            'medium': 'MOYEN',
            'low': 'FAIBLE'
        }[fault.severity];

        const matchScore = this.calculateMatchScore(fault);
        const matchPercent = Math.round((matchScore / fault.keywords.length) * 100);

        return `
            <div class="fault-card ai-fault" data-severity="${fault.severity}">
                <div class="fault-header">
                    <div class="fault-info">
                        <div class="fault-code">${fault.code}</div>
                        <div class="fault-title">
                            ${fault.title}
                            <span class="severity-badge ${severityClass}">${severityText}</span>
                        </div>
                        <div class="match-score">
                            <div class="match-bar" style="width: ${matchPercent}%"></div>
                            <span>${matchPercent}% correspondance</span>
                        </div>
                    </div>
                </div>
                
                <div class="ai-actions">
                    <button class="btn-show-solution" onclick="app.showSolution('${fault.code}')">
                        <span>🔧</span> Voir la solution complète
                    </button>
                </div>

                <div class="fault-solution" id="solution-${fault.code}" style="display: none;">
                    <div class="solution-content">
                        ${this.formatSolution(fault.solution)}
                    </div>
                    <button class="btn-hide-solution" onclick="app.hideSolution('${fault.code}')">
                        Masquer la solution ▲
                    </button>
                </div>
            </div>
        `;
    }

    // Carte de panne standard
    getFaultCardHTML(fault, index) {
        const severityClass = `severity-${fault.severity}`;
        const severityText = {
            'high': 'CRITIQUE',
            'medium': 'MOYEN',
            'low': 'FAIBLE'
        }[fault.severity];

        return `
            <div class="fault-card" data-severity="${fault.severity}" onclick="app.toggleFault(this)">
                <div class="fault-header">
                    <div class="fault-info">
                        <div class="fault-code">${fault.code}</div>
                        <div class="fault-title">
                            ${fault.title}
                            <span class="severity-badge ${severityClass}">${severityText}</span>
                        </div>
                    </div>
                    <div class="fault-toggle">▼</div>
                </div>
                
                <div class="fault-solution">
                    <div class="solution-content">
                        ${this.formatSolution(fault.solution)}
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================
    // LOGIQUE AI
    // ============================================

    // Analyse des symptômes avec AI
    analyzeWithAI() {
        if (!this.symptomsText.trim() || !this.currentEquipment) return;

        const symptoms = this.symptomsText.toLowerCase();
        const words = symptoms.split(/\s+/).filter(w => w.length > 2);
        
        this.suggestedFaults = [];

        // Scoring des pannes
        const scoredFaults = this.currentEquipment.faults.map(fault => {
            let score = 0;
            let matchedKeywords = [];

            // 1. Correspondance mots-clés exacts
            fault.keywords.forEach(keyword => {
                if (symptoms.includes(keyword.toLowerCase())) {
                    score += 10;
                    matchedKeywords.push(keyword);
                }
            });

            // 2. Correspondance partielle
            words.forEach(word => {
                fault.keywords.forEach(keyword => {
                    if (keyword.includes(word) || word.includes(keyword)) {
                        score += 5;
                    }
                });
            });

            // 3. Bonus sévérité (pour prioriser critiques)
            if (fault.severity === 'high') score *= 1.2;
            if (fault.severity === 'medium') score *= 1.1;

            return { fault, score, matchedKeywords };
        });

        // Trier par score et prendre les meilleurs
        scoredFaults.sort((a, b) => b.score - a.score);
        
        // Garder les pannes avec score > 0, max 3 résultats
        this.suggestedFaults = scoredFaults
            .filter(s => s.score > 0)
            .slice(0, 3)
            .map(s => s.fault);

        // Si aucune correspondance, proposer les plus critiques
        if (this.suggestedFaults.length === 0) {
            this.suggestedFaults = this.currentEquipment.faults
                .filter(f => f.severity === 'high')
                .slice(0, 2);
        }

        this.renderDiagnosticArea();
        
        // Scroll vers résultats
        setTimeout(() => {
            const aiSection = document.querySelector('.ai-results-section');
            if (aiSection) aiSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    // Calculer score de correspondance pour affichage
    calculateMatchScore(fault) {
        const symptoms = this.symptomsText.toLowerCase();
        let matches = 0;
        
        fault.keywords.forEach(keyword => {
            if (symptoms.includes(keyword.toLowerCase())) {
                matches++;
            }
        });
        
        return matches;
    }

    // Calculer confiance globale
    calculateConfidence() {
        if (this.suggestedFaults.length === 0) return 0;
        
        const totalKeywords = this.suggestedFaults[0].keywords.length;
        const matchedKeywords = this.calculateMatchScore(this.suggestedFaults[0]);
        
        return Math.min(95, Math.round((matchedKeywords / Math.max(1, totalKeywords)) * 100 + 20));
    }

    // ============================================
    // UTILITAIRES
    // ============================================

    updateSymptoms(value) {
        this.symptomsText = value;
        const counter = document.getElementById('charCount');
        if (counter) counter.textContent = value.length;
        
        const btn = document.querySelector('.btn-ai');
        if (btn) btn.disabled = !value.trim();
    }

    addSymptom(symptom) {
        const textarea = document.getElementById('symptomsInput');
        if (textarea) {
            const current = textarea.value;
            const separator = current && !current.endsWith(' ') ? ' ' : '';
            textarea.value = current + separator + symptom.toLowerCase();
            this.updateSymptoms(textarea.value);
        }
    }

    showSolution(code) {
        const solutionDiv = document.getElementById(`solution-${code}`);
        if (solutionDiv) {
            solutionDiv.style.display = 'block';
            solutionDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    hideSolution(code) {
        const solutionDiv = document.getElementById(`solution-${code}`);
        if (solutionDiv) {
            solutionDiv.style.display = 'none';
        }
    }

    toggleFault(element) {
        document.querySelectorAll('.fault-card').forEach(card => {
            if (card !== element) card.classList.remove('expanded');
        });
        element.classList.toggle('expanded');
    }

    toggleAllFaults(header) {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.toggle-icon');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.textContent = '▲';
        } else {
            content.style.display = 'none';
            icon.textContent = '▼';
        }
    }

    getSymptomTags() {
        if (!this.currentEquipment) return '';
        
        const allSymptoms = new Set();
        this.currentEquipment.faults.forEach(f => {
            f.keywords.slice(0, 3).forEach(k => allSymptoms.add(k));
        });

        return Array.from(allSymptoms).slice(0, 6).map(symptom => `
            <button class="symptom-tag" onclick="app.addSymptom('${symptom}')">
                ${symptom}
            </button>
        `).join('');
    }

    formatSolution(solution) {
        return solution
            .replace(/\n/g, '<br>')
            .replace(/([0-9]️⃣)/g, '<span class="step-num">$1</span>')
            .replace(/(⚠️|🚨|🔧|📞|✅)/g, '<span class="emoji">$1</span>');
    }

    getEmptyStateHTML() {
        return `
            <div class="empty-state">
                <div class="empty-icon">🔬</div>
                <h3>Sélectionnez un équipement médical</h3>
                <p>Choisissez un équipement pour commencer le diagnostic assisté par IA</p>
            </div>
        `;
    }

    setupEventListeners() {
        // Raccourci clavier Ctrl+Enter pour analyser
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.analyzeWithAI();
            }
        });
    }
}

// Initialisation
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MediDiagAI();
});