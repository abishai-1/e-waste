// CleanEarth - Master Data
// 40+ household items with full English & Telugu details, quiz questions, game items, e-waste facilities

const DATA = {
  // 42 Everyday items across Wet, Dry, Hazardous, and E-waste
  items: [
    {
      id: "banana-peel",
      name: { en: "Banana peel", te: "అరటి తొక్క" },
      bin: "wet",
      tip: {
        en: "Put directly into wet waste for composting or biomethanation.",
        te: "కంపోస్టింగ్ లేదా బయోగ్యాస్ కోసం నేరుగా తడి చెత్తలో వేయండి."
      }
    },
    {
      id: "tea-leaves",
      name: { en: "Used tea leaves and bags", te: "వాడిన టీ పొడి మరియు టీ బ్యాగులు" },
      bin: "wet",
      tip: {
        en: "Empty organic tea leaves into wet waste. Remove non-biodegradable synthetic staples.",
        te: "టీ పొడిని తడి చెత్తలో వేయండి. కృత్రిమ పిన్నులు ఏవైనా ఉంటే తీసివేయండి."
      }
    },
    {
      id: "vegetable-scraps",
      name: { en: "Vegetable peels and scraps", te: "కూరగాయల తొక్కలు మరియు ముక్కలు" },
      bin: "wet",
      tip: {
        en: "Keep free from plastic stickers or packaging before discarding.",
        te: "ప్లాస్టిక్ స్టిక్కర్లు లేకుండా తడి చెత్త బుట్టలో వేయండి."
      }
    },
    {
      id: "cooked-food",
      name: { en: "Leftover cooked food", te: "మిగిలిన వండిన ఆహారం" },
      bin: "wet",
      tip: {
        en: "Drain excess gravy or liquids into the sink before putting solids in wet bin.",
        te: "అదనపు నీటిని లేదా రసాన్ని తీసివేసి మిగిలిన భాగాన్ని తడి చెత్తలో వేయండి."
      }
    },
    {
      id: "egg-shells",
      name: { en: "Egg shells", te: "కోడిగుడ్డు పెంకులు" },
      bin: "wet",
      tip: {
        en: "Crush lightly and add to wet waste; excellent calcium source for compost.",
        te: "కొద్దిగా నలిపి తడి చెత్తలో వేయండి; ఇది కంపోస్ట్‌కు మంచి కాల్షియంను అందిస్తుంది."
      }
    },
    {
      id: "coconut-shell",
      name: { en: "Coconut shell and coir", te: "కొబ్బరి చిప్ప మరియు పీచు" },
      bin: "wet",
      tip: {
        en: "Goes to garden waste or organic processing. Can also be repurposed as a small pot.",
        te: "తోట వ్యర్థాలలో వేయవచ్చు లేదా పూల కుండీగా కొత్త ప్రయోజనానికి వాడవచ్చు."
      }
    },
    {
      id: "garden-leaves",
      name: { en: "Dry leaves and garden trimmings", te: "ఎండిన ఆకులు మరియు తోట వ్యర్థాలు" },
      bin: "wet",
      tip: {
        en: "Compost together with kitchen scraps or hand over to municipal garden collection.",
        te: "వంటగది తడి చెత్తతో కలిపి ఎరువుగా మార్చండి లేదా తోట సేకరణకు ఇవ్వండి."
      }
    },
    {
      id: "coffee-grounds",
      name: { en: "Coffee grounds", te: "కాఫీ పొడి వ్యర్థాలు" },
      bin: "wet",
      tip: {
        en: "Adds nitrogen to soil and compost. Keep separate from synthetic packaging.",
        te: "మట్టికి నత్రజనిని అందిస్తుంది. ప్యాకింగ్ కవర్లు లేకుండా తడి బుట్టలో వేయండి."
      }
    },
    {
      id: "fruit-seeds",
      name: { en: "Mango stones and fruit seeds", te: "మామిడి టెంక మరియు పండ్ల గింజలు" },
      bin: "wet",
      tip: {
        en: "Organic matter suitable for deep composting or municipal composting pits.",
        te: "కంపోస్టింగ్ గుంతలకు అనువైన సహజ సేంద్రీయ పదార్థం."
      }
    },
    {
      id: "spoiled-bread",
      name: { en: "Stale bread and roti", te: "పాడైన రొట్టెలు మరియు బ్రెడ్" },
      bin: "wet",
      tip: {
        en: "Organic biodegradable kitchen waste. Keep free from plastic wrappers.",
        te: "ప్లాస్టిక్ కవర్లు లేకుండా నేరుగా తడి చెత్తలో వేయండి."
      }
    },

    // Dry Waste
    {
      id: "newspaper",
      name: { en: "Newspaper and paper flyers", te: "వార్తాపత్రికలు మరియు కాగితపు కరపత్రాలు" },
      bin: "dry",
      tip: {
        en: "Keep dry and unsoiled. Hand over to local paper recyclers or raddi collection.",
        te: "తడి తగలకుండా పొడిగా ఉంచి కాగితం రీసైక్లర్లకు లేదా పొడి చెత్తలో వేయండి."
      }
    },
    {
      id: "cardboard-box",
      name: { en: "Cardboard delivery box", te: "కార్డ్‌బోర్డ్ డెలివరీ బాక్స్" },
      bin: "dry",
      tip: {
        en: "Flatten box to save space. Remove heavy plastic packing tape if possible.",
        te: "స్థలం ఆదా చేయడానికి బాక్స్‌ను చదును చేసి ప్యాకింగ్ టేపు తీసివేయండి."
      }
    },
    {
      id: "plastic-bottle",
      name: { en: "PET drinking water bottle", te: "ప్లాస్టిక్ వాటర్ బాటిల్" },
      bin: "dry",
      tip: {
        en: "Empty completely, rinse briefly, and crush before putting in dry bin.",
        te: "పూర్తిగా ఖాళీ చేసి, కడిగి నలిపిన తర్వాత పొడి చెత్తలో వేయండి."
      }
    },
    {
      id: "milk-packet",
      name: { en: "Milk pouch (rinsed and cut open)", te: "పాల ప్యాకెట్ (కడిగి ఆరబెట్టినది)" },
      bin: "dry",
      tip: {
        en: "Cut open, rinse residual milk, and let dry so it does not stink or contaminate paper.",
        te: "కత్తిరించి, మిగిలిన పాలను కడిగి ఆరబెట్టిన తర్వాతే పొడి చెత్తలో వేయండి."
      }
    },
    {
      id: "steel-can",
      name: { en: "Metal food can or tin", te: "లోహపు డబ్బా లేదా టిన్" },
      bin: "dry",
      tip: {
        en: "Rinse away food residue so it can be smelted and recycled cleanly.",
        te: "ఆహార అవశేషాలు లేకుండా శుభ్రంగా కడిగి పొడి చెత్తలో వేయండి."
      }
    },
    {
      id: "glass-bottle",
      name: { en: "Glass jam or sauce bottle", te: "గాజు జామ్ లేదా సాస్ సీసా" },
      bin: "dry",
      tip: {
        en: "Rinse clean and wrap carefully if chipped. Unbroken glass is fully recyclable.",
        te: "శుభ్రంగా కడిగి వేయండి. పగలకుండా ఉంటే గాజు పూర్తిగా రీసైకిల్ అవుతుంది."
      }
    },
    {
      id: "plastic-wrapper",
      name: { en: "Biscuit and snack plastic wrapper", te: "బిస్కెట్ మరియు స్నాక్స్ ప్లాస్టిక్ ర్యాపర్" },
      bin: "dry",
      tip: {
        en: "Shake off crumbs and place in dry bin for multi-layered plastic processing.",
        te: "లోపలి పొడిని దులిపి పొడి చెత్త బుట్టలో వేయండి."
      }
    },
    {
      id: "shampoo-bottle",
      name: { en: "Shampoo and detergent plastic container", te: "షాంపూ మరియు డిటర్జెంట్ ప్లాస్టిక్ డబ్బా" },
      bin: "dry",
      tip: {
        en: "Rinse out soapy residue and screw cap back on for plastic recycling.",
        te: "సబ్బు అవశేషాలు లేకుండా కడిగి మూత పెట్టి పొడి చెత్తలో వేయండి."
      }
    },
    {
      id: "notebook",
      name: { en: "Old school notebooks", te: "పాత నోట్‌బుక్‌లు" },
      bin: "dry",
      tip: {
        en: "Remove metallic spiral or plastic binding if practical before recycling.",
        te: "వీలైతే ప్లాస్టిక్ లేదా మెటల్ బైండింగ్ తీసివేసి రీసైక్లింగ్‌కు ఇవ్వండి."
      }
    },
    {
      id: "tetra-pak",
      name: { en: "Juice carton (Tetra Pak)", te: "జ్యూస్ కార్టన్ (టెట్రా ప్యాక్)" },
      bin: "dry",
      tip: {
        en: "Flatten and drain dry. Recycled through specialized composite facilities.",
        te: "పూర్తిగా పిండి చదును చేసిన తర్వాత పొడి చెత్త బుట్టలో వేయండి."
      }
    },
    {
      id: "aluminum-foil",
      name: { en: "Clean aluminum foil", te: "శుభ్రమైన అల్యూమినియం ఫాయిల్" },
      bin: "dry",
      tip: {
        en: "Ball up clean foil. If heavily soiled with oil or curry, wipe or discard separately.",
        te: "శుభ్రంగా ఉన్న ఫాయిల్‌ను ముద్దలా చేసి పొడి బుట్టలో వేయండి."
      }
    },
    {
      id: "ballpoint-pen",
      name: { en: "Empty ballpoint pen", te: "ఖాళీ బాల్ పాయింట్ పెన్" },
      bin: "dry",
      tip: {
        en: "Plastic body goes into dry waste. Consider refillable metal pens to reduce waste.",
        te: "ప్లాస్టిక్ శరీరం పొడి చెత్తలోకి వెళ్తుంది. రీఫిల్ చేసుకోగల పెన్నులు వాడటం ఉత్తమం."
      }
    },
    {
      id: "old-clothes",
      name: { en: "Torn clothes and textile scraps", te: "చిరిగిన బట్టలు మరియు వస్త్రాల ముక్కలు" },
      bin: "dry",
      tip: {
        en: "Keep dry. First consider reusing as dusting rags; otherwise place in dry waste.",
        te: "తుడుపు గుడ్డలుగా వాడవచ్చు లేదా పొడి చెత్తగా అందించవచ్చు."
      }
    },

    // Hazardous Waste
    {
      id: "cfl-bulb",
      name: { en: "CFL and fluorescent tube light", te: "ట్యూబ్‌లైట్ మరియు CFL బల్బు" },
      bin: "hazardous",
      tip: {
        en: "Contains mercury vapor. Wrap in cardboard or paper so it does not break.",
        te: "పాదరసం ఉంటుంది కాబట్టి పగలకుండా అట్టపెట్టెలో చుట్టి ప్రమాదకర బుట్టలో వేయండి."
      }
    },
    {
      id: "used-battery",
      name: { en: "AA / AAA alkaline battery", te: "వాడిన బ్యాటరీ సెల్" },
      bin: "hazardous",
      tip: {
        en: "Never mix with dry or wet waste; heavy metals can leach into soil and compost.",
        te: "సాధారణ చెత్తతో ఎప్పుడూ కలపవద్దు. విషపూరిత లోహాలు నేలలోకి చేరుతాయి."
      }
    },
    {
      id: "expired-medicine",
      name: { en: "Expired medicines and syrups", te: "గడువు ముగిసిన మందులు మరియు సిరప్‌లు" },
      bin: "hazardous",
      tip: {
        en: "Keep in original blister pack. Do not flush down the toilet or drain.",
        te: "అసలు ప్యాకెట్‌లోనే ఉంచండి. డ్రైనేజీలో లేదా వాష్‌బేసిన్‌లో పోయవద్దు."
      }
    },
    {
      id: "paint-tin",
      name: { en: "Paint can and solvent bottle", te: "పెయింట్ డబ్బా మరియు వార్నిష్ సీసా" },
      bin: "hazardous",
      tip: {
        en: "Contains volatile chemicals and flammable solvents. Keep tightly sealed.",
        te: "మండే స్వభావం గల రసాయనాలు ఉంటాయి. మూత గట్టిగా పెట్టి ప్రమాదకర బుట్టలో వేయండి."
      }
    },
    {
      id: "mosquito-repellent",
      name: { en: "Mosquito repellent liquid bottle", te: "దోమల మందు ఖాళీ రీఫిల్ బాటిల్" },
      bin: "hazardous",
      tip: {
        en: "Contains insecticide residues. Treat as domestic hazardous waste.",
        te: "పురుగుమందుల అవశేషాలు ఉంటాయి కాబట్టి ప్రమాదకర వ్యర్థంగా భావించండి."
      }
    },
    {
      id: "sanitary-waste",
      name: { en: "Sanitary pad and diaper", te: "శానిటరీ ప్యాడ్ మరియు డైపర్" },
      bin: "hazardous",
      tip: {
        en: "Wrap securely in old newspaper and mark with a red dot before collection.",
        te: "వార్తాపత్రికలో జాగ్రత్తగా చుట్టి ఎరుపు రంగు గుర్తు వేసి ప్రమాదకర సేకరణకు ఇవ్వండి."
      }
    },
    {
      id: "broken-glass",
      name: { en: "Broken window pane or glass shards", te: "పగిలిన కిటికీ గాజు లేదా గాజు ముక్కలు" },
      bin: "hazardous",
      tip: {
        en: "Wrap in thick cardboard to prevent cutting sanitation workers' hands.",
        te: "పారిశుధ్య కార్మికులకు గాయాలు కాకుండా మందపాటి అట్టపెట్టెలో చుట్టి ఇవ్వండి."
      }
    },
    {
      id: "cooking-oil",
      name: { en: "Used cooking oil", te: "వాడిన వంట నూనె" },
      bin: "hazardous",
      tip: {
        en: "Do not pour down the kitchen drain (clogs sewer pipes). Collect in a sealed bottle.",
        te: "డ్రైనేజీ పైపులు మూసుకుపోతాయి కాబట్టి సింక్‌లో పోయవద్దు. సీసాలో నింపి ఇవ్వండి."
      }
    },
    {
      id: "pesticide-container",
      name: { en: "Home garden pesticide bottle", te: "తోట పురుగుమందుల సీసా" },
      bin: "hazardous",
      tip: {
        en: "Rinse triple times if required by label and keep separate for hazardous collection.",
        te: "తీవ్రమైన విష రసాయనాలు ఉంటాయి కాబట్టి ఇతర వస్తువులతో కలపవద్దు."
      }
    },
    {
      id: "thermometer-mercury",
      name: { en: "Mercury glass thermometer", te: "పాదరసం ధర్మామీటర్" },
      bin: "hazardous",
      tip: {
        en: "High toxicity hazard. Keep unbroken in a cushioned box for hazardous disposal.",
        te: "అత్యంత ప్రమాదకరం. పగలకుండా డబ్బాలో ఉంచి ప్రమాదకర విభాగంలో ఇవ్వండి."
      }
    },

    // E-Waste
    {
      id: "mobile-phone",
      name: { en: "Old or broken mobile phone", te: "పాత లేదా పాడైన మొబైల్ ఫోన్" },
      bin: "ewaste",
      tip: {
        en: "Backup and factory reset data. Hand over to authorised e-waste collection centre.",
        te: "డేటాను తొలగించి రీసెట్ చేసిన తర్వాత అధీకృత ఇ-వ్యర్థాల కేంద్రానికి ఇవ్వండి."
      }
    },
    {
      id: "charger-cable",
      name: { en: "USB charger, adapter, and charging cable", te: "ఛార్జర్, అడాప్టర్ మరియు కేబుల్" },
      bin: "ewaste",
      tip: {
        en: "Coil neatly and place in e-waste box. Copper wires inside can be recovered.",
        te: "మడతపెట్టి ఇ-వ్యర్థాల విభాగంలో ఇవ్వండి. లోపలి రాగి తీగలను తిరిగి రీసైకిల్ చేయవచ్చు."
      }
    },
    {
      id: "earphones",
      name: { en: "Tangled or broken earphones", te: "పాడైన ఇయర్‌ఫోన్లు" },
      bin: "ewaste",
      tip: {
        en: "Small electronic scrap. Do not throw in household dry waste.",
        te: "చిన్న ఎలక్ట్రానిక్ వస్తువు. సాధారణ పొడి చెత్తలో పారవేయవద్దు."
      }
    },
    {
      id: "keyboard-mouse",
      name: { en: "Computer keyboard and mouse", te: "కంప్యూటర్ కీబోర్డ్ మరియు మౌస్" },
      bin: "ewaste",
      tip: {
        en: "Contains printed circuit boards (PCBs) and plastic casing for e-waste recycling.",
        te: "సర్క్యూట్ బోర్డులు ఉంటాయి కాబట్టి ఇ-వ్యర్థాల సేకరణ పాయింట్‌కు ఇవ్వండి."
      }
    },
    {
      id: "power-bank",
      name: { en: "Swollen or dead power bank", te: "పనిచేయని పవర్ బ్యాంక్" },
      bin: "ewaste",
      tip: {
        en: "Contains lithium-ion cells. Keep in cool place and deliver to e-waste recycler.",
        te: "లిథియం బ్యాటరీలు ఉంటాయి కాబట్టి చల్లని ప్రదేశంలో ఉంచి ఇ-వ్యర్థాల కేంద్రానికి ఇవ్వండి."
      }
    },
    {
      id: "calculator",
      name: { en: "Electronic desk calculator", te: "ఎలక్ట్రానిక్ కాలిక్యులేటర్" },
      bin: "ewaste",
      tip: {
        en: "Remove small coin cell battery if removable, then send to e-waste channel.",
        te: "చిన్న బ్యాటరీని తీసివేసి ఇ-వ్యర్థాల సేకరణకు అందజేయండి."
      }
    },
    {
      id: "electric-iron",
      name: { en: "Burnt electric clothing iron", te: "పాడైన ఇస్త్రీ పెట్టె (ఐరన్ బాక్స్)" },
      bin: "ewaste",
      tip: {
        en: "Small appliance e-waste. Metallic heating element and cords are recyclable.",
        te: "చిన్న గృహోపకరణం. ఇ-వ్యర్థాల సేకరణ కేంద్రానికి అందజేయండి."
      }
    },
    {
      id: "electric-kettle",
      name: { en: "Broken electric water kettle", te: "పాడైన ఎలక్ట్రిక్ కెటిల్" },
      bin: "ewaste",
      tip: {
        en: "Hand over with detachable base cord to an authorized appliance recycler.",
        te: "బేస్ కేబుల్‌తో కలిపి అధీకృత అప్లయన్స్ రీసైక్లర్లకు ఇవ్వండి."
      }
    },
    {
      id: "router",
      name: { en: "Discarded Wi-Fi router or modem", te: "పాత వై-ఫై రూటర్ లేదా మోడెమ్" },
      bin: "ewaste",
      tip: {
        en: "Contains network circuitry and radio components. Keep dry for e-waste depot.",
        te: "నెట్‌వర్క్ సర్క్యూట్లు ఉంటాయి కాబట్టి ఇ-వ్యర్థాల కేంద్రంలో ఇవ్వండి."
      }
    }
  ],

  // 10 Eco Quiz Questions
  quizQuestions: [
    {
      id: "q1",
      question: {
        en: "Which bin should banana peels and tea leaves be placed into?",
        te: "అరటి తొక్కలు మరియు టీ పొడిని ఏ బుట్టలో వేయాలి?"
      },
      options: [
        { en: "Green (Wet Waste)", te: "ఆకుపచ్చ (తడి చెత్త)" },
        { en: "Blue (Dry Waste)", te: "నీలం (పొడి చెత్త)" },
        { en: "Red (Hazardous)", te: "ఎరుపు (ప్రమాదకర వ్యర్థాలు)" },
        { en: "Purple (E-Waste)", te: "ఊదా (ఇ-వ్యర్థాలు)" }
      ],
      correctIndex: 0,
      explanation: {
        en: "Kitchen scraps like fruit peels, tea leaves, and food leftovers are organic wet waste meant for composting.",
        te: "కూరగాయల తొక్కలు, టీ పొడి మరియు ఆహార వ్యర్థాలు సేంద్రీయ పదార్థాలు కాబట్టి వాటిని తడి చెత్త బుట్టలోనే వేయాలి."
      }
    },
    {
      id: "q2",
      question: {
        en: "Why should used AA batteries NEVER be thrown into ordinary household dry waste?",
        te: "వాడిన బ్యాటరీలను సాధారణ పొడి చెత్తలో ఎందుకు ఎప్పుడూ వేయకూడదు?"
      },
      options: [
        { en: "They take up too much physical space in bins", te: "అవి బుట్టలో ఎక్కువ స్థలాన్ని ఆక్రమిస్తాయి కాబట్టి" },
        { en: "They contain heavy metals that can leak and poison soil and water", te: "వాటిలో విషపూరిత భార లోహాలు నేల మరియు నీటిని కలుషితం చేస్తాయి కాబట్టి" },
        { en: "Paper recyclers can easily remelt them", te: "పేపర్ రీసైక్లర్లు వాటిని సులభంగా కరిగించగలరు కాబట్టి" },
        { en: "They convert naturally into organic fertilizer", te: "అవి సహజ ఎరువుగా మారిపోతాయి కాబట్టి" }
      ],
      correctIndex: 1,
      explanation: {
        en: "Batteries contain lead, cadmium, or nickel that contaminate surrounding materials and ground water if discarded improperly.",
        te: "బ్యాటరీలలో సీసం, కాడ్మియం వంటి భార లోహాలు ఉంటాయి, ఇవి తప్పుగా పారవేస్తే భూగర్భ జలాలను విషతుల్యం చేస్తాయి."
      }
    },
    {
      id: "q3",
      question: {
        en: "What should you do with a plastic milk pouch before putting it in the Blue (Dry) bin?",
        te: "పాల ప్యాకెట్‌ను నీలం (పొడి చెత్త) బుట్టలో వేసే ముందు ఏమి చేయాలి?"
      },
      options: [
        { en: "Put it directly with milk inside into wet waste", te: "పాల అవశేషాలతో అలాగే తడి చెత్తలో వేయాలి" },
        { en: "Rinse it with water, let it dry, and then place in the dry bin", te: "నీటితో కడిగి, ఆరబెట్టిన తర్వాత పొడి బుట్టలో వేయాలి" },
        { en: "Burn it in the backyard", te: "ఇంటి పెరట్లో తగలబెట్టాలి" },
        { en: "Throw it in the red hazardous bin", te: "ఎరుపు రంగు ప్రమాదకర బుట్టలో వేయాలి" }
      ],
      correctIndex: 1,
      explanation: {
        en: "Rinsing removes milk residue that causes foul odours and spoils paper and cardboard in the dry bin.",
        te: "కడిగి ఆరబెట్టడం వల్ల దుర్వాసన రాదు మరియు ఇతర కాగితపు వస్తువులు పాడవకుండా ఉంటాయి."
      }
    },
    {
      id: "q4",
      question: {
        en: "Where should an old smartphone and broken charger be taken?",
        te: "పాత స్మార్ట్‌ఫోన్ మరియు విరిగిన ఛార్జర్‌ను ఎక్కడికి తీసుకెళ్లాలి?"
      },
      options: [
        { en: "The municipal compost pit", te: "మున్సిపల్ కంపోస్ట్ గుంతకు" },
        { en: "An authorized e-waste collection point or recycler", te: "అధీకృత ఇ-వ్యర్థాల సేకరణ కేంద్రానికి" },
        { en: "The green wet waste bin", te: "ఆకుపచ్చ తడి చెత్త బుట్టకు" },
        { en: "A roadside burning pile", te: "రోడ్డు పక్కన కాల్చే చెత్త కుప్పకు" }
      ],
      correctIndex: 1,
      explanation: {
        en: "Electronics contain recyclable precious metals and harmful circuitry that require specialized e-waste handlers.",
        te: "ఎలక్ట్రానిక్స్ వస్తువులలో విలువైన లోహాలతో పాటు ప్రమాదకర సర్క్యూట్లు ఉంటాయి, వీటిని ప్రత్యేక అధీకృత కేంద్రాలకే ఇవ్వాలి."
      }
    },
    {
      id: "q5",
      question: {
        en: "In the 5 R's hierarchy, which action has the highest priority?",
        te: "5 R ప్రాధాన్యత సూత్రాలలో అత్యంత మొదటి ప్రాధాన్యత ఏది?"
      },
      options: [
        { en: "Recycle (రీసైకిల్)", te: "రీసైకిల్ (Recycle)" },
        { en: "Repurpose (కొత్త ప్రయోజనానికి వాడండి)", te: "కొత్త ప్రయోజనానికి వాడండి (Repurpose)" },
        { en: "Refuse (నిరాకరించండి)", te: "నిరాకరించండి (Refuse)" },
        { en: "Reuse (తిరిగి వాడండి)", te: "తిరిగి వాడండి (Reuse)" }
      ],
      correctIndex: 2,
      explanation: {
        en: "Refusing unnecessary single-use items stops waste before it is even created in your household.",
        te: "అనవసరమైన ఒకసారి వాడే వస్తువులను ముందే నిరాకరించడం వల్ల ఇంట్లో చెత్త అసలు ఉత్పత్తే కాదు."
      }
    },
    {
      id: "q6",
      question: {
        en: "How should broken glass and sharp blades be prepared before disposal?",
        te: "పగిలిన గాజు ముక్కలు మరియు బ్లేడ్లను పారవేసే ముందు ఎలా సిద్ధం చేయాలి?"
      },
      options: [
        { en: "Wrapped securely in thick paper or cardboard to protect sanitation workers", te: "పారిశుధ్య కార్మికులకు గాయం కాకుండా మందపాటి కాగితం లేదా అట్టపెట్టెలో చుట్టి ఇవ్వాలి" },
        { en: "Thrown directly into the wet food waste bucket", te: "నేరుగా తడి ఆహార వ్యర్థాల బకెట్‌లో వేయాలి" },
        { en: "Scattered in garden soil", te: "తోట మట్టిలో చల్లాలి" },
        { en: "Flushed down the washroom drain", te: "వాష్‌రూమ్ డ్రైనేజీలో వేయాలి" }
      ],
      correctIndex: 0,
      explanation: {
        en: "Wrapping sharp glass prevents deep cuts and blood infections among sanitation workers who handle bags.",
        te: "మందపాటి అట్టలో చుట్టడం వల్ల పారిశుధ్య కార్మికుల చేతులకు తీవ్రమైన గాయాలు కాకుండా ఉంటాయి."
      }
    },
    {
      id: "q7",
      question: {
        en: "Which of the following items is suitable for kitchen home composting?",
        te: "కింది వాటిలో ఇంటి వద్ద కంపోస్ట్ చేయడానికి అనువైనది ఏది?"
      },
      options: [
        { en: "Plastic chocolate wrappers", te: "ప్లాస్టిక్ చాక్లెట్ కవర్లు" },
        { en: "Vegetable peels and crushed eggshells", te: "కూరగాయల తొక్కలు మరియు గుడ్డు పెంకులు" },
        { en: "Expired antibiotic tablets", te: "గడువు ముగిసిన యాంటీబయాటిక్ మందులు" },
        { en: "Button cell batteries", te: "చిన్న బటన్ సెల్ బ్యాటరీలు" }
      ],
      correctIndex: 1,
      explanation: {
        en: "Vegetable scraps and eggshells decompose naturally into nutrient-rich compost for plants.",
        te: "కూరగాయల తొక్కలు మరియు గుడ్డు పెంకులు సహజంగా కుళ్లి మొక్కలకు బలమైన పోషక ఎరువుగా మారతాయి."
      }
    },
    {
      id: "q8",
      question: {
        en: "What happens when wet waste gets mixed with recyclable dry cardboard?",
        te: "తడి చెత్తను రీసైకిల్ చేయగల అట్టపెట్టెలతో కలిపితే ఏమి జరుగుతుంది?"
      },
      options: [
        { en: "The cardboard becomes stronger", te: "అట్టపెట్టె మరింత బలంగా మారుతుంది" },
        { en: "Moisture and food stains contaminate the cardboard, making paper recycling impossible", te: "తేమ మరియు ఆహార మరకల వల్ల కాగితాన్ని రీసైకిల్ చేయడం అసాధ్యమవుతుంది" },
        { en: "It automatically turns into clean soil in minutes", te: "అది కొద్ది నిమిషాల్లోనే శుభ్రమైన మట్టిగా మారిపోతుంది" },
        { en: "Nothing, they separate automatically at dumpsites", te: "ఏమీ జరగదు, డంపింగ్ యార్డులో అవే విడిపోతాయి" }
      ],
      correctIndex: 1,
      explanation: {
        en: "Moist organic food stains degrade paper pulp fibers, forcing paper mills to reject contaminated loads.",
        te: "ఆహారపు తేమ కాగితపు ఫైబర్లను పాడుచేస్తుంది, ఫలితంగా రీసైక్లింగ్ యూనిట్లు ఆ లోడును తిరస్కరిస్తాయి."
      }
    },
    {
      id: "q9",
      question: {
        en: "Why should fluorescent tube lights and CFL bulbs NOT be crushed in regular garbage?",
        te: "ఫ్లోరోసెంట్ ట్యూబ్‌లైట్లు మరియు CFL బల్బులను సాధారణ చెత్తలో ఎందుకు పగలగొట్టకూడదు?"
      },
      options: [
        { en: "They release toxic mercury vapor into the air", te: "అవి గాలిలోకి విషపూరిత పాదరస ఆవిరిని విడుదల చేస్తాయి" },
        { en: "They are made of pure gold", te: "అవి స్వచ్ఛమైన బంగారంతో తయారవుతాయి" },
        { en: "They improve the compost temperature", te: "అవి ఎరువు ఉష్ణోగ్రతను పెంచుతాయి" },
        { en: "They do not take up any room in trucks", te: "ట్రక్కుల్లో ఎలాంటి స్థలాన్ని ఆక్రమించవు" }
      ],
      correctIndex: 0,
      explanation: {
        en: "CFLs contain hazardous mercury vapor. Inhaling crushed tube light dust harms the nervous system.",
        te: "CFL బల్బులలో ప్రమాదకర పాదరసం ఉంటుంది. పగిలినప్పుడు వెలువడే వాయువులు నరాల వ్యవస్థకు హానికరం."
      }
    },
    {
      id: "q10",
      question: {
        en: "What should you do with used cooking oil instead of pouring it down the kitchen sink?",
        te: "వాడిన వంట నూనెను సింక్‌లో పోయకుండా ఏమి చేయాలి?"
      },
      options: [
        { en: "Collect it in a closed bottle for hazardous or biodiesel collection", te: "మూత ఉన్న సీసాలో నింపి ప్రమాదకర లేదా బయోడీజిల్ సేకరణకు ఇవ్వాలి" },
        { en: "Pour it into the street water gutter", te: "వీధి మురుగు కాలువలో పోయాలి" },
        { en: "Mix it with dry newspaper", te: "పొడి వార్తాపత్రికలపై పోయాలి" },
        { en: "Flush it down the toilet bowl", te: "టాయిలెట్‌లో పోసి ఫ్లష్ చేయాలి" }
      ],
      correctIndex: 0,
      explanation: {
        en: "Poured oil solidifies in pipes causing severe clogs and polluting water bodies. Store it sealed for proper collection.",
        te: "నూనె పైపుల్లో గడ్డకట్టి డ్రైనేజీలను మూసివేస్తుంది. కాబట్టి సీసాలో నింపి ప్రత్యేకంగా అందించాలి."
      }
    }
  ],

  // 8 Demo E-Waste Recycling Plants & Collection Points
  ewasteFacilities: [
    {
      id: "ew-1",
      name: {
        en: "Coastal E-Cycle Recycling Plant",
        te: "కోస్టల్ ఇ-సైకిల్ రీసైక్లింగ్ ప్లాంట్"
      },
      type: "plant",
      district: "Visakhapatnam",
      district_te: "విశాఖపట్నం",
      address: {
        en: "Industrial Estate Road, Autonagar, Visakhapatnam 530012",
        te: "ఇండస్ట్రియల్ ఎస్టేట్ రోడ్, ఆటోనగర్, విశాఖపట్నం 530012"
      },
      phone: "+91 99999 00001",
      hours: {
        en: "Mon to Sat 9:30 AM to 5:30 PM",
        te: "సోమవారం నుండి శనివారం ఉదయం 9:30 నుండి సాయంత్రం 5:30 వరకు"
      },
      acceptedItems: ["computers", "mobile_phones", "batteries", "appliances"]
    },
    {
      id: "ew-2",
      name: {
        en: "Vizianagaram Municipal E-Waste Collection Point",
        te: "విజయనగరం మున్సిపల్ ఇ-వ్యర్థాల సేకరణ కేంద్రం"
      },
      type: "point",
      district: "Vizianagaram",
      district_te: "విజయనగరం",
      address: {
        en: "Near Municipal Office, Santha Pet, Vizianagaram 535001",
        te: "మున్సిపల్ కార్యాలయం దగ్గర, సంత పేట, విజయనగరం 535001"
      },
      phone: "+91 99999 00002",
      hours: {
        en: "Mon to Fri 10:00 AM to 4:00 PM",
        te: "సోమవారం నుండి శుక్రవారం ఉదయం 10:00 నుండి సాయంత్రం 4:00 వరకు"
      },
      acceptedItems: ["mobile_phones", "cables_chargers", "appliances"]
    },
    {
      id: "ew-3",
      name: {
        en: "Green Circuit Recyclers",
        te: "గ్రీన్ సర్క్యూట్ రీసైక్లర్స్"
      },
      type: "plant",
      district: "Vijayawada",
      district_te: "విజయవాడ",
      address: {
        en: "Plot 14, Gollapudi Industrial Area, Vijayawada 521225",
        te: "ప్లాట్ 14, గొల్లపూడి ఇండస్ట్రియల్ ఏరియా, విజయవాడ 521225"
      },
      phone: "+91 99999 00003",
      hours: {
        en: "Mon to Sat 10:00 AM to 6:00 PM",
        te: "సోమవారం నుండి శనివారం ఉదయం 10:00 నుండి సాయంత్రం 6:00 వరకు"
      },
      acceptedItems: ["computers", "batteries", "appliances", "cables_chargers"]
    },
    {
      id: "ew-4",
      name: {
        en: "Srikakulam Town Drop-off Centre",
        te: "శ్రీకాకుళం టౌన్ డ్రాప్-ఆఫ్ సెంటర్"
      },
      type: "point",
      district: "Srikakulam",
      district_te: "శ్రీకాకుళం",
      address: {
        en: "Ward 7, Main Road, Srikakulam 532001",
        te: "వార్డు 7, మెయిన్ రోడ్, శ్రీకాకుళం 532001"
      },
      phone: "+91 99999 00004",
      hours: {
        en: "Tue to Sun 9:00 AM to 1:00 PM",
        te: "మంగళవారం నుండి ఆదివారం ఉదయం 9:00 నుండి మధ్యాహ్నం 1:00 వరకు"
      },
      acceptedItems: ["mobile_phones", "cables_chargers"]
    },
    {
      id: "ew-5",
      name: {
        en: "Godavari Electronics Recovery Unit",
        te: "గోదావరి ఎలక్ట్రానిక్స్ రికవరీ యూనిట్"
      },
      type: "plant",
      district: "Rajahmundry",
      district_te: "రాజమండ్రి",
      address: {
        en: "Survey No. 88, Bommuru Road, Rajahmundry 533124",
        te: "సర్వే నెం. 88, బొమ్మూరు రోడ్, రాజమండ్రి 533124"
      },
      phone: "+91 99999 00005",
      hours: {
        en: "Mon to Sat 9:00 AM to 5:00 PM",
        te: "సోమవారం నుండి శనివారం ఉదయం 9:00 నుండి సాయంత్రం 5:00 వరకు"
      },
      acceptedItems: ["computers", "appliances", "batteries"]
    },
    {
      id: "ew-6",
      name: {
        en: "Tirupati E-Waste Collection Hub",
        te: "తిరుపతి ఇ-వ్యర్థాల సేకరణ కేంద్రం"
      },
      type: "point",
      district: "Tirupati",
      district_te: "తిరుపతి",
      address: {
        en: "Behind Bus Stand, Tirupati 517501",
        te: "బస్టాండ్ వెనుక, తిరుపతి 517501"
      },
      phone: "+91 99999 00006",
      hours: {
        en: "Mon to Sat 10:00 AM to 5:00 PM",
        te: "సోమవారం నుండి శనివారం ఉదయం 10:00 నుండి సాయంత్రం 5:00 వరకు"
      },
      acceptedItems: ["mobile_phones", "batteries", "cables_chargers"]
    },
    {
      id: "ew-7",
      name: {
        en: "Guntur Urban E-Waste Point",
        te: "గుంటూరు అర్బన్ ఇ-వ్యర్థాల కేంద్రం"
      },
      type: "point",
      district: "Guntur",
      district_te: "గుంటూరు",
      address: {
        en: "Brodipet 4th Line, Guntur 522002",
        te: "బ్రోడీపేట 4వ లైన్, గుంటూరు 522002"
      },
      phone: "+91 99999 00007",
      hours: {
        en: "Mon to Fri 10:00 AM to 4:30 PM",
        te: "సోమవారం నుండి శుక్రవారం ఉదయం 10:00 నుండి సాయంత్రం 4:30 వరకు"
      },
      acceptedItems: ["computers", "mobile_phones", "appliances"]
    },
    {
      id: "ew-8",
      name: {
        en: "Hyderabad Certified E-Waste Recycler (sample)",
        te: "హైదరాబాద్ సర్టిఫైడ్ ఇ-వ్యర్థాల రీసైక్లర్ (నమూనా)"
      },
      type: "plant",
      district: "Hyderabad",
      district_te: "హైదరాబాద్",
      address: {
        en: "Plot 5, Jeedimetla Industrial Area, Hyderabad 500055",
        te: "ప్లాట్ 5, జీడిమెట్ల ఇండస్ట్రియల్ ఏరియా, హైదరాబాద్ 500055"
      },
      phone: "+91 99999 00008",
      hours: {
        en: "Mon to Sat 9:00 AM to 6:00 PM",
        te: "సోమవారం నుండి శనివారం ఉదయం 9:00 నుండి సాయంత్రం 6:00 వరకు"
      },
      acceptedItems: ["computers", "batteries", "appliances", "cables_chargers", "mobile_phones"]
    }
  ]
};
