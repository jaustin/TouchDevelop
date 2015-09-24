/// <reference path='../typings/node/node.d.ts' />

'use strict';

import * as td from 'td';
import * as assert from 'assert';

var TD = td.TD;
type JsonObject = td.JsonObject;
type JsonBuilder = td.JsonBuilder;

var asArray = td.asArray;
var json = td.json;
var clone = td.clone;


var adj2: string[];

var adj = ["able", "absolute", "abstract", "acceptable", "accurate",
"active", "actual", "additional", "adequate", "afraid", "agricultural",
"alive", "ancient", "annual", "apparent", "appropriate", "attractive",
"available", "average", "aware", "basic", "beautiful", "big", "black", "blind",
"blue", "both", "brief", "bright", "brilliant", "broad", "brown", "busy",
"calm", "capable", "capital", "careful", "central", "certain",
"characteristic", "cheap", "chief", "civil", "classical", "clean", "clear",
"clinical", "cold", "comfortable", "common", "competitive", "complex",
"component", "comprehensive", "confident", "conservative", "considerable",
"consistent", "constant", "continuous", "conventional", "cool", "corporate",
"correct", "crazy", "creative", "critical", "crucial", "cultural", "curious",
"current", "dear", "deep", "democratic", "dependent", "different", "difficult",
"digital", "distant", "distinct", "domestic", "dramatic", "dry", "due",
"early", "eastern", "easy", "economic", "educational", "effective",
"efficient", "either", "electric", "electronic", "emotional", "empty",
"enormous", "enough", "entire", "environmental", "equal", "equivalent",
"essential", "everyday", "exact", "excellent", "expensive", "experimental",
"extensive", "external", "extra", "extraordinary", "fair", "familiar",
"famous", "fantastic", "far", "fast", "favorite", "federal", "fellow",
"female", "few", "final", "financial", "fine", "firm", "first", "fit", "flat",
"flexible", "folk", "foreign", "formal", "fortunate", "free", "frequent",
"fresh", "front", "full", "fun", "functional", "funny", "further", "general",
"genetic", "gentle", "genuine", "giant", "glad", "global", "golden", "good",
"graduate", "grand", "grateful", "gray", "great", "guilty", "happy", "healthy",
"heavy", "helpful", "high", "historic", "historical", "honest", "huge",
"ideal", "ill", "immediate", "important", "impossible", "impressive", "in",
"independent", "industrial", "initial", "inner", "innocent", "inside",
"institutional", "intense", "interior", "internal", "international", "its",
"keen", "large", "late", "lazy", "legal", "less", "liberal", "light", "likely",
"literary", "little", "local", "long", "loose", "loud", "lovely", "low",
"lucky", "mad", "main", "major", "male", "massive", "master", "mature",
"medical", "mere", "minor", "mobile", "model", "moderate", "modern", "moral",
"more", "motor", "multiple", "mutual", "narrow", "national", "natural", "near",
"nearby", "necessary", "neither", "new", "next", "nice", "no", "normal",
"northern", "numerous", "obvious", "odd", "off", "official", "old", "on",
"online", "open", "opposite", "orange", "ordinary", "organic", "original",
"overall", "pale", "parallel", "particular", "patient", "perfect", "permanent",
"personal", "pink", "plain", "pleasant", "political", "poor", "popular",
"positive", "possible", "potential", "powerful", "practical", "precise",
"presidential", "pretty", "previous", "primary", "prime", "principal", "prior",
"professional", "proper", "proud", "public", "pure", "quick", "quiet",
"radical", "random", "rapid", "rare", "ready", "real", "reasonable", "recent",
"red", "regardless", "regional", "regular", "relevant", "reliable",
"remarkable", "remote", "resident", "responsible", "retail", "rich", "right",
"romantic", "rough", "round", "royal", "rural", "sad", "safe", "scientific",
"second", "secondary", "secret", "senior", "sensitive", "separate", "serious",
"severe", "sharp", "signal", "significant", "silent", "similar", "simple",
"single", "slight", "slow", "small", "smart", "smooth", "social", "soft",
"solid", "south", "southern", "spare", "special", "specific", "spot", "stable",
"standard", "star", "steady", "straight", "strict", "strong", "structural",
"subsequent", "substantial", "successful", "sudden", "sufficient", "suitable",
"sure", "surface", "sweet", "tall", "technical", "temporary", "tender", "that",
"theoretical", "thick", "thin", "this", "through", "tight", "tiny", "tough",
"traditional", "typical", "unable", "unclear", "under", "unique", "universal",
"unlike", "unusual", "up", "upper", "urban", "useful", "usual", "valuable",
"variable", "various", "vast", "visible", "visual", "vital", "voluntary",
"warm", "weak", "wealthy", "well", "western", "wet", "white", "whole", "wide",
"wild", "wise", "wonderful", "wooden", "yellow", "young"]

var noun = ["ability", "absence", "academic", "access", "accident",
"accommodation", "accord", "account", "achievement", "acquisition", "action",
"activity", "actor", "ad", "addition", "address", "adjustment",
"administration", "advantage", "adventure", "advertisement", "advice",
"adviser", "afternoon", "age", "agency", "agenda", "agent", "agreement", "aim",
"air", "aircraft", "airline", "alarm", "album", "ally", "alternative",
"amendment", "amount", "analysis", "analyst", "angle", "animal",
"announcement", "answer", "anything", "apartment", "appearance", "application",
"appointment", "approval", "april", "architecture", "area", "argument", "arm",
"army", "arrangement", "arrival", "art", "article", "artist", "assessment",
"asset", "assistance", "assistant", "associate", "association", "assumption",
"athlete", "atmosphere", "attachment", "attendance", "attention", "attitude",
"attraction", "attribute", "audience", "august", "author", "autumn",
"awareness", "baby", "background", "bag", "ball", "band", "bank", "barrier",
"base", "bath", "battle", "beach", "bear", "beauty", "bed", "behavior",
"belief", "bell", "belt", "benefit", "bike", "bill", "bin", "bird", "birth",
"bit", "board", "boat", "body", "bone", "book", "boot", "border", "boss",
"bottle", "bottom", "boundary", "bowl", "box", "boy", "brain", "branch",
"brand", "bread", "breakfast", "breath", "bridge", "brother", "brush",
"budget", "bunch", "bus", "business", "button", "buyer", "cable", "cake",
"camera", "camp", "cap", "capability", "capacity", "car", "carbon", "card",
"career", "carpet", "case", "cash", "cast", "castle", "cat", "catalog",
"category", "celebration", "cell", "cent", "center", "century", "ceremony",
"chain", "chair", "chairman", "challenge", "chamber", "champion",
"championship", "chance", "channel", "chapter", "character", "charity",
"charm", "chart", "cheek", "cheese", "chemical", "chest", "chicken", "child",
"childhood", "chocolate", "choice", "church", "circle", "circumstance",
"citizen", "city", "civilian", "class", "classic", "clause", "climate",
"clock", "clothing", "cloud", "club", "coach", "coal", "coast", "coat", "code",
"coffee", "coin", "colleague", "collection", "college", "color", "column",
"combination", "comedy", "comfort", "comment", "commercial", "commission",
"commitment", "committee", "communication", "community", "company",
"comparison", "compensation", "competition", "competitor", "complaint",
"complexity", "composition", "compound", "computer", "concentration",
"concept", "concern", "concert", "conclusion", "concrete", "condition",
"confidence", "connection", "consequence", "consideration", "constraint",
"construction", "consultant", "consumer", "contemporary", "content", "contest",
"context", "contract", "contribution", "convention", "conversation",
"cooperation", "core", "corner", "corporation", "cost", "council", "counsel",
"country", "county", "couple", "course", "court", "cover", "coverage", "cow",
"cream", "creation", "creature", "credit", "crew", "criterion", "crop",
"crowd", "culture", "cup", "currency", "curtain", "curve", "custom",
"customer", "cycle", "database", "date", "daughter", "day", "debate", "debt",
"decade", "december", "decision", "defense", "deficit", "definition", "degree",
"delight", "delivery", "democracy", "demonstration", "density", "department",
"deposit", "depth", "description", "desert", "designer", "desk", "detail",
"determination", "development", "device", "dialog", "difference", "difficulty",
"dimension", "dinner", "direction", "director", "discipline", "discount",
"discovery", "discussion", "dish", "disk", "distance", "distinction",
"district", "diversity", "division", "document", "dog", "dollar", "door",
"dozen", "draft", "drama", "dream", "dress", "driver", "dust", "duty", "ear",
"earth", "ease", "east", "economy", "edge", "edition", "editor", "education",
"effect", "efficiency", "effort", "egg", "election", "electricity", "element",
"emergency", "emotion", "empire", "employee", "employer", "employment", "end",
"energy", "engine", "engineer", "enterprise", "entertainment", "entrance",
"entry", "envelope", "environment", "episode", "equation", "equipment", "era",
"error", "essay", "establishment", "estate", "estimate", "evaluation", "event",
"evidence", "evolution", "exam", "examination", "example", "exception",
"excess", "excitement", "executive", "exercise", "exhibition", "existence",
"expansion", "expectation", "expenditure", "expense", "experience",
"experiment", "expert", "explanation", "exposure", "expression", "extension",
"extent", "extract", "eye", "face", "facility", "fact", "factor", "factory",
"faith", "fall", "family", "fan", "farm", "farmer", "fashion", "father",
"fault", "favor", "feature", "february", "fee", "fence", "festival", "fiction",
"field", "fight", "film", "filter", "finance", "finish", "fire", "fish",
"flag", "flash", "flight", "flood", "floor", "flower", "focus", "food", "foot",
"football", "forecast", "forest", "form", "format", "formation", "formula",
"fortune", "foundation", "fragment", "frame", "framework", "freedom",
"frequency", "friday", "friend", "friendship", "fruit", "fuel", "function",
"fund", "furniture", "future", "gallery", "game", "gap", "garden", "gas",
"gate", "gaze", "generation", "gentleman", "gesture", "gift", "girl", "glance",
"glass", "goal", "gold", "golf", "government", "governor", "grade", "grain",
"grammar", "grass", "green", "group", "growth", "guest", "guideline", "guitar",
"guy", "hair", "half", "hall", "hand", "happiness", "harbor", "hat", "head",
"health", "heart", "height", "hell", "hero", "highlight", "hill", "historian",
"history", "holder", "hole", "holiday", "home", "honor", "hook", "hope",
"horse", "hospital", "host", "hotel", "hour", "house", "household", "human",
"humor", "hunger", "husband", "ice", "idea", "identity", "illustration",
"image", "imagination", "immigrant", "implement", "implementation",
"implication", "importance", "impression", "improvement", "incentive", "inch",
"incident", "income", "independence", "index", "indication", "individual",
"industry", "infant", "infection", "inflation", "information", "initiative",
"injury", "innovation", "inquiry", "insight", "instance", "institution",
"instruction", "instrument", "insurance", "intellectual", "intelligence",
"intention", "interaction", "interpretation", "intervention", "introduction",
"investigation", "investment", "investor", "invitation", "involvement", "iron",
"island", "issue", "item", "jacket", "jail", "january", "job", "journal",
"journalist", "journey", "joy", "july", "june", "jury", "justice", "key",
"kick", "kid", "kind", "king", "kitchen", "knee", "knowledge", "label",
"laboratory", "lady", "lake", "land", "landscape", "language", "last",
"laughter", "law", "lawyer", "layer", "leader", "leadership", "league",
"leather", "lecture", "left", "leg", "legislation", "length", "lesson",
"letter", "library", "license", "life", "limit", "limitation", "line", "lip",
"liquid", "list", "listener", "literature", "load", "location", "log", "logic",
"lot", "luck", "lunch", "luxury", "machine", "magazine", "magic", "mail",
"maintenance", "majority", "maker", "man", "management", "manager", "manner",
"manufacturer", "map", "margin", "market", "marriage", "mass", "match", "mate",
"material", "matter", "maximum", "mayor", "meal", "measurement", "meat",
"mechanism", "medicine", "medium", "member", "membership", "memory", "menu",
"mess", "message", "metal", "meter", "method", "middle", "mile", "military",
"milk", "mind", "minimum", "minister", "minority", "minute", "mirror",
"mission", "mistake", "mixture", "mode", "module", "moment", "monday", "money",
"monitor", "month", "mood", "moon", "morning", "mortgage", "motion",
"motivation", "mountain", "mouse", "mouth", "movement", "movie", "muscle",
"museum", "music", "musical", "musician", "mystery", "name", "narrative",
"nation", "native", "nature", "neck", "negotiation", "neighbor",
"neighborhood", "nerve", "net", "network", "newspaper", "night", "noise",
"north", "nose", "notion", "noun", "novel", "november", "number", "nurse",
"objective", "obligation", "observation", "occasion", "ocean", "october",
"office", "officer", "oil", "opera", "operation", "operator", "opinion",
"opponent", "opportunity", "opposition", "option", "organization", "origin",
"outcome", "output", "outside", "owner", "ownership", "pace", "package",
"page", "pair", "panel", "panic", "paper", "paragraph", "parent", "part",
"participant", "participation", "partner", "partnership", "party", "passage",
"passenger", "passion", "past", "path", "pattern", "payment", "peace", "peak",
"peer", "pen", "penalty", "pension", "people", "percent", "percentage",
"perception", "performance", "period", "permission", "person", "personality",
"personnel", "perspective", "phase", "phenomenon", "philosophy", "photo",
"phrase", "piano", "picture", "piece", "pig", "pile", "pilot", "pipe", "pitch",
"plan", "plane", "planet", "plant", "plastic", "plate", "platform", "player",
"pleasure", "pocket", "poem", "poet", "poetry", "police", "policy",
"politician", "poll", "pollution", "pool", "population", "port", "portion",
"portrait", "position", "possession", "possibility", "pot", "potato", "pound",
"poverty", "power", "preference", "premise", "preparation", "presence",
"present", "presentation", "president", "pressure", "pride", "principle",
"printer", "priority", "privilege", "prize", "pro", "probability", "problem",
"procedure", "producer", "product", "production", "profession", "profile",
"program", "project", "promotion", "proof", "property", "proportion",
"proposal", "prospect", "protection", "protein", "province", "provision",
"publication", "publisher", "pupil", "purpose", "quadrillion", "qualification",
"quality", "quantity", "quarter", "radio", "rail", "rain", "range", "rat",
"rate", "ratio", "reaction", "reader", "reality", "reason", "recognition",
"recommendation", "record", "recovery", "reduction", "reflection", "region",
"registration", "regulation", "relation", "relationship", "relative", "relief",
"reply", "report", "reporter", "representation", "representative",
"reputation", "requirement", "researcher", "resistance", "resolution",
"resort", "resource", "response", "responsibility", "rest", "restaurant",
"restriction", "retirement", "revenue", "revolution", "rice", "river", "road",
"rock", "role", "roof", "room", "root", "route", "routine", "rule", "safety",
"sake", "salary", "sale", "salt", "sanction", "sand", "satisfaction",
"saturday", "scale", "scene", "scheme", "scholar", "school", "science",
"scientist", "scope", "screen", "sea", "season", "secretary", "section",
"sector", "security", "seed", "segment", "selection", "self", "sentence",
"september", "sequence", "servant", "server", "session", "set", "settlement",
"shade", "shadow", "shape", "share", "shareholder", "sheep", "sheet", "shelf",
"shell", "shelter", "ship", "shirt", "shock", "shoe", "shop", "shore", "short",
"shoulder", "shower", "side", "sight", "significance", "silence", "silver",
"singer", "sink", "sir", "sister", "site", "situation", "size", "ski", "skill",
"skin", "skirt", "sky", "slice", "slope", "snow", "society", "software",
"soil", "soldier", "solution", "son", "song", "sort", "soul", "sound",
"source", "space", "speaker", "specialist", "speech", "speed", "spirit",
"sport", "spring", "square", "stability", "staff", "stage", "stair", "stamp",
"start", "state", "statement", "station", "statistic", "status", "steel",
"stem", "step", "stick", "stock", "stomach", "stone", "storage", "store",
"storm", "story", "stranger", "strategy", "stream", "street", "strength",
"string", "structure", "student", "studio", "stuff", "style", "subject",
"substance", "substitute", "success", "sugar", "suggestion", "sum", "summary",
"summer", "sun", "sunday", "supplement", "supplier", "supporter", "surgery",
"survival", "swing", "switch", "symbol", "symptom", "system", "table",
"tackle", "tail", "tale", "talent", "tank", "target", "task", "taste", "tax",
"taxi", "tea", "teacher", "team", "tear", "technique", "technology",
"teenager", "telephone", "television", "temperature", "tendency", "tennis",
"tension", "tent", "term", "territory", "test", "text", "theater", "theme",
"theory", "therapy", "thing", "thirst", "throat", "thursday", "ticket", "time",
"tip", "tire", "tissue", "title", "tone", "tongue", "tool", "tooth", "top",
"topic", "total", "tour", "tourism", "tourist", "tower", "town", "toy",
"tradition", "traffic", "trail", "train", "transition", "transportation",
"trap", "treatment", "tree", "trend", "trial", "trigger", "trip", "troop",
"trouble", "truck", "truth", "tube", "tuesday", "tune", "twin", "type",
"uncertainty", "unemployment", "uniform", "union", "unit", "universe",
"university", "unknown", "user", "valley", "van", "variation", "variety",
"vegetable", "vehicle", "venture", "verb", "version", "vessel", "veteran",
"victory", "video", "view", "village", "vision", "visitor", "voice", "volume",
"voter", "wage", "wall", "water", "way", "wealth", "weather", "web",
"wednesday", "week", "weekend", "weight", "welcome", "welfare", "west",
"wheel", "when", "where", "wife", "wind", "window", "wing", "winner", "winter",
"wire", "witness", "woman", "wonder", "wood", "word", "work", "worker",
"world", "worth", "wound", "writer", "yard", "year", "youth", "zone"];

var verb = ["abandon", "accept", "accompany", "accomplish", "achieve",
"acknowledge", "acquire", "act", "adapt", "add", "adjust", "admire", "admit",
"adopt", "advance", "advertise", "advise", "advocate", "affect", "afford",
"agree", "aid", "allege", "allow", "alter", "amaze", "analyze", "announce",
"anticipate", "apologize", "appeal", "appear", "apply", "appoint",
"appreciate", "approach", "approve", "argue", "arise", "arrange", "arrest",
"arrive", "ask", "assess", "assign", "assist", "assume", "assure", "attach",
"attempt", "attend", "attract", "avoid", "award", "balance", "ban", "bar",
"be", "beat", "become", "begin", "behave", "believe", "belong", "bend", "bet",
"bid", "bind", "bite", "blame", "bless", "block", "blow", "bond", "boom",
"boost", "borrow", "bother", "break", "breathe", "breed", "bring", "broadcast",
"build", "burden", "burn", "burst", "buy", "calculate", "call", "campaign",
"cancel", "capture", "care", "carry", "catch", "cause", "celebrate", "change",
"characterize", "charge", "chase", "chat", "check", "chip", "choose", "cite",
"claim", "climb", "cluster", "collapse", "collect", "combine", "come",
"command", "commit", "communicate", "compare", "compete", "complain",
"complete", "complicate", "compose", "comprise", "compromise", "compute",
"concentrate", "conclude", "conduct", "confirm", "conflict", "confuse",
"connect", "consider", "consist", "constitute", "construct", "consult",
"consume", "contact", "contain", "continue", "contrast", "contribute",
"control", "convert", "convince", "cook", "cope", "copy", "correspond",
"cough", "could", "count", "counter", "crack", "craft", "crash", "create",
"criticize", "cross", "cry", "cut", "dance", "dare", "deal", "decide",
"declare", "decline", "decrease", "dedicate", "defeat", "defend", "define",
"delay", "deliver", "demand", "demonstrate", "deny", "depend", "derive",
"describe", "deserve", "design", "detect", "determine", "develop", "devote",
"diet", "differ", "dig", "direct", "disagree", "disappear", "disappoint",
"discover", "discuss", "dismiss", "display", "distinguish", "distribute",
"disturb", "divide", "do", "dominate", "drag", "draw", "drink", "drive",
"drop", "earn", "eat", "edit", "educate", "elect", "eliminate", "emerge",
"emphasize", "employ", "enable", "encounter", "encourage", "engage", "enhance",
"enjoy", "ensure", "enter", "entertain", "entitle", "escape", "establish",
"evaluate", "evolve", "examine", "exceed", "exchange", "excite", "exclude",
"excuse", "exhaust", "exhibit", "exist", "expand", "expect", "explain",
"explore", "export", "express", "extend", "fade", "fail", "fancy", "fascinate",
"feed", "feel", "figure", "file", "fill", "find", "fix", "float", "flow",
"fly", "fold", "follow", "fool", "force", "forget", "found", "freeze",
"fulfill", "gain", "gather", "generate", "get", "give", "go", "govern", "grab",
"grant", "greet", "grin", "ground", "grow", "guarantee", "guard", "guess",
"guide", "handle", "hang", "happen", "hear", "heat", "help", "hesitate",
"hide", "hint", "hire", "hit", "hold", "hurry", "identify", "ignore",
"illustrate", "imagine", "imply", "import", "impose", "impress", "improve",
"include", "incorporate", "increase", "indicate", "influence", "inform",
"injure", "input", "insist", "inspire", "install", "insure", "integrate",
"intend", "interest", "interpret", "interview", "introduce", "invent",
"invest", "investigate", "invite", "involve", "isolate", "join", "joke",
"judge", "jump", "justify", "keep", "kiss", "knock", "know", "labor", "lack",
"laugh", "launch", "lead", "lean", "leap", "learn", "leave", "lend", "let",
"level", "lie", "lift", "like", "link", "listen", "live", "loan", "locate",
"lock", "lose", "love", "maintain", "make", "manage", "manufacture", "mark",
"marry", "mean", "measure", "meet", "mention", "miss", "mix", "modify",
"motivate", "mount", "move", "need", "neglect", "negotiate", "note", "notice",
"object", "observe", "occupy", "occur", "offer", "operate", "oppose", "order",
"organize", "outline", "overcome", "owe", "pack", "paint", "park",
"participate", "pass", "pause", "pay", "perceive", "perform", "permit",
"persuade", "phone", "photograph", "pick", "place", "play", "plot", "point",
"pop", "pose", "possess", "post", "pour", "practice", "praise", "predict",
"prefer", "prepare", "preserve", "press", "pretend", "prevent", "price",
"print", "proceed", "process", "produce", "profit", "progress", "promise",
"promote", "prompt", "propose", "protect", "protest", "prove", "provide",
"pull", "pump", "purchase", "pursue", "push", "put", "qualify", "question",
"quote", "raise", "rank", "reach", "react", "read", "realize", "recall",
"receive", "reckon", "recognize", "recommend", "recover", "recruit", "reduce",
"refer", "reference", "reflect", "reform", "refuse", "regard", "register",
"regret", "regulate", "relate", "relax", "release", "rely", "remain", "remark",
"remember", "remind", "remove", "rent", "repair", "repeat", "replace",
"represent", "request", "require", "rescue", "research", "reserve", "resign",
"resist", "resolve", "respect", "respond", "restore", "restrict", "result",
"retain", "retire", "return", "reveal", "reverse", "review", "revise",
"reward", "rid", "ride", "ring", "rise", "risk", "roll", "row", "ruin", "run",
"rush", "sail", "sample", "satisfy", "save", "say", "scan", "schedule",
"score", "scream", "seal", "search", "seat", "secure", "see", "seek", "seem",
"select", "sell", "send", "sense", "serve", "service", "settle", "shake",
"shift", "shine", "shout", "show", "shut", "sigh", "sign", "sing", "sit",
"situate", "sleep", "slide", "slip", "smell", "smile", "snap", "solve",
"speak", "specify", "spell", "spend", "spin", "split", "sponsor", "spread",
"stain", "stake", "stand", "stare", "stay", "steal", "stir", "stop", "strain",
"strengthen", "stretch", "strike", "study", "submit", "succeed", "suggest",
"suit", "summarize", "supply", "support", "suppose", "surprise", "surround",
"survey", "survive", "suspend", "sustain", "sweep", "swim", "take", "talk",
"tap", "tape", "teach", "tell", "tend", "thank", "think", "throw", "tie",
"touch", "trace", "track", "trade", "transfer", "transform", "translate",
"transport", "travel", "treat", "trick", "trust", "try", "turn", "twist",
"undergo", "underlie", "understand", "undertake", "unite", "update", "urge",
"use", "value", "vary", "very", "visit", "volunteer", "vote", "wait", "wake",
"walk", "wander", "want", "warn", "wash", "waste", "watch", "wave", "wear",
"wed", "weigh", "whisper", "win", "wipe", "wish", "withdraw", "worry", "wrap",
"write", "yield"]


export function generate() : string
{
    let pass: string;
    if (adj2 == null) {
        adj2 = adj.concat(noun).concat(verb);
    }
    let s = "";
    for (let j = 0; j < 4; j++) {
        if (j > 0) {
            s = s + " ";
        }
        s = s + adj2.random();
    }
    pass = s;
    return pass;
}


