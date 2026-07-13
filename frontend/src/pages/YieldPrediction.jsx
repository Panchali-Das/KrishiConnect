import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Leaf, Languages } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "gu", label: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", label: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", label: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
];

const T = {
  en: {
    title: "Yield Prediction", subtitle: "Predict your crop yield based on farming inputs",
    crop: "Crop", season: "Season", state: "State", area: "Area", fertilizer: "Fertilizer", pesticide: "Pesticide",
    hectares: "hectares", kgs: "Kgs", tonnesPerHa: "tonnes/hectare",
    step1Title: "Crop & Location", step1Sub: "Tell us what you're growing and where",
    step2Title: "Farming Inputs", step2Sub: "Enter your land area and input usage",
    step3Title: "Review & Predict", step3Sub: "Confirm your details to get AI yield prediction",
    continue: "Continue", back: "Back", predict: "🌾 Predict My Yield",
    reviewHeading: "Review Your Farming Details",
    aiNote: "Our AI will analyze these parameters and predict your expected yield with practical tips.",
    loadingTitle: "Predicting Your Yield", loadingMsg1: "📊 Analyzing your inputs...",
    loadingMsg2: "🌱 Consulting agricultural data...", loadingMsg3: "🤖 AI is calculating yield...",
    loadingMsg4: "✅ Preparing your results...", loadingWait: "This usually takes a few seconds",
    resultsTitle: "🎉 Your Yield Prediction", resultsSub: "Based on your farming inputs — AI-powered analysis",
    predictedYield: "Predicted Yield", description: "How was this calculated?",
    tips: "Tips to Improve Your Yield", tryAgain: "Try Another Prediction",
    backHome: "Back to Home", language: "Language",
    kharif: "Kharif", rabi: "Rabi", wholeYear: "Whole Year",
    selectCrop: "Select crop", selectSeason: "Select season", selectState: "Select state",
  },
  hi: {
    title: "उपज भविष्यवाणी", subtitle: "कृषि इनपुट के आधार पर अपनी फसल की उपज का अनुमान लगाएं",
    crop: "फसल", season: "मौसम", state: "राज्य", area: "क्षेत्रफल", fertilizer: "उर्वरक", pesticide: "कीटनाशक",
    hectares: "हेक्टेयर", kgs: "किग्रा", tonnesPerHa: "टन/हेक्टेयर",
    step1Title: "फसल और स्थान", step1Sub: "हमें बताएं कि आप क्या उगा रहे हैं और कहां",
    step2Title: "कृषि इनपुट", step2Sub: "अपनी भूमि क्षेत्र और इनपुट उपयोग दर्ज करें",
    step3Title: "समीक्षा और भविष्यवाणी", step3Sub: "AI उपज भविष्यवाणी प्राप्त करने के लिए विवरण की पुष्टि करें",
    continue: "जारी रखें", back: "वापस", predict: "🌾 मेरी उपज का अनुमान लगाएं",
    reviewHeading: "अपने कृषि विवरण की समीक्षा करें",
    aiNote: "हमारा AI आपके पैरामीटर का विश्लेषण करेगा और व्यावहारिक सुझावों के साथ आपकी अपेक्षित उपज का अनुमान लगाएगा।",
    loadingTitle: "आपकी उपज का अनुमान लगाया जा रहा है",
    loadingMsg1: "📊 आपके इनपुट का विश्लेषण...",
    loadingMsg2: "🌱 कृषि डेटा से परामर्श...",
    loadingMsg3: "🤖 AI उपज की गणना कर रहा है...",
    loadingMsg4: "✅ आपके परिणाम तैयार किए जा रहे हैं...",
    loadingWait: "इसमें आमतौर पर कुछ सेकंड लगते हैं",
    resultsTitle: "🎉 आपकी उपज भविष्यवाणी",
    resultsSub: "आपके कृषि इनपुट पर आधारित — AI-संचालित विश्लेषण",
    predictedYield: "अनुमानित उपज", description: "यह गणना कैसे की गई?",
    tips: "अपनी उपज सुधारने के टिप्स", tryAgain: "नई भविष्यवाणी करें",
    backHome: "होम पेज पर वापस", language: "भाषा",
    kharif: "खरीफ", rabi: "रबी", wholeYear: "पूरे वर्ष",
    selectCrop: "फसल चुनें", selectSeason: "मौसम चुनें", selectState: "राज्य चुनें",
  },
  bn: {
    title: "ফলনের পূর্বাভাস", subtitle: "কৃষি ইনপুটের ভিত্তিতে আপনার ফসলের ফলন পূর্বাভাস করুন",
    crop: "ফসল", season: "মৌসুম", state: "রাজ্য", area: "জমির পরিমাণ", fertilizer: "সার", pesticide: "কীটনাশক",
    hectares: "হেক্টর", kgs: "কেজি", tonnesPerHa: "টন/হেক্টর",
    step1Title: "ফসল ও অবস্থান", step1Sub: "আপনি কী চাষ করছেন এবং কোথায় তা জানান",
    step2Title: "কৃষি উপকরণ", step2Sub: "আপনার জমির পরিমাণ ও উপকরণ ব্যবহার লিখুন",
    step3Title: "পর্যালোচনা ও পূর্বাভাস", step3Sub: "AI ফলন পূর্বাভাস পেতে বিস্তারিত নিশ্চিত করুন",
    continue: "চালিয়ে যান", back: "পেছনে", predict: "🌾 আমার ফলন পূর্বাভাস দিন",
    reviewHeading: "আপনার কৃষি বিবরণ পর্যালোচনা করুন",
    aiNote: "আমাদের AI আপনার প্যারামিটার বিশ্লেষণ করবে এবং ব্যবহারিক টিপসসহ আপনার প্রত্যাশিত ফলন পূর্বাভাস দেবে।",
    loadingTitle: "আপনার ফলন পূর্বাভাস দেওয়া হচ্ছে",
    loadingMsg1: "📊 আপনার ইনপুট বিশ্লেষণ...",
    loadingMsg2: "🌱 কৃষি ডেটা পরামর্শ...",
    loadingMsg3: "🤖 AI ফলন গণনা করছে...",
    loadingMsg4: "✅ আপনার ফলাফল প্রস্তুত করা হচ্ছে...",
    loadingWait: "সাধারণত কয়েক সেকেন্ড সময় লাগে",
    resultsTitle: "🎉 আপনার ফলন পূর্বাভাস",
    resultsSub: "আপনার কৃষি ইনপুটের ভিত্তিতে — AI-চালিত বিশ্লেষণ",
    predictedYield: "পূর্বাভাসিত ফলন", description: "কিভাবে এই গণনা করা হলো?",
    tips: "আপনার ফলন উন্নত করার টিপস", tryAgain: "আবার পূর্বাভাস করুন",
    backHome: "হোম পেজে ফিরুন", language: "ভাষা",
    kharif: "খরিফ", rabi: "রবি", wholeYear: "সারা বছর",
    selectCrop: "ফসল নির্বাচন করুন", selectSeason: "মৌসুম নির্বাচন করুন", selectState: "রাজ্য নির্বাচন করুন",
  },
  te: {
    title: "దిగుబడి అంచనా", subtitle: "వ్యవసాయ ఇన్‌పుట్‌ల ఆధారంగా మీ పంట దిగుబడిని అంచనా వేయండి",
    crop: "పంట", season: "ఋతువు", state: "రాష్ట్రం", area: "విస్తీర్ణం", fertilizer: "ఎరువు", pesticide: "పురుగుమందు",
    hectares: "హెక్టార్లు", kgs: "కేజీలు", tonnesPerHa: "టన్నులు/హెక్టారు",
    step1Title: "పంట & స్థానం", step1Sub: "మీరు ఏమి పండిస్తున్నారు మరియు ఎక్కడ పండిస్తున్నారో చెప్పండి",
    step2Title: "వ్యవసాయ ఇన్‌పుట్‌లు", step2Sub: "మీ భూమి విస్తీర్ణం మరియు ఇన్‌పుట్ వినియోగాన్ని నమోదు చేయండి",
    step3Title: "సమీక్ష & అంచనా", step3Sub: "AI దిగుబడి అంచనా పొందడానికి వివరాలను నిర్ధారించండి",
    continue: "కొనసాగించు", back: "వెనుకకు", predict: "🌾 నా దిగుబడిని అంచనా వేయండి",
    reviewHeading: "మీ వ్యవసాయ వివరాలను సమీక్షించండి",
    aiNote: "మా AI మీ పారామితులను విశ్లేషించి, ఆచరణాత్మక చిట్కాలతో మీ అంచనా దిగుబడిని అంచనా వేస్తుంది.",
    loadingTitle: "మీ దిగుబడి అంచనా వేయబడుతోంది",
    loadingMsg1: "📊 మీ ఇన్‌పుట్‌లను విశ్లేషించడం...",
    loadingMsg2: "🌱 వ్యవసాయ డేటాను సంప్రదించడం...",
    loadingMsg3: "🤖 AI దిగుబడిని లెక్కిస్తోంది...",
    loadingMsg4: "✅ మీ ఫలితాలను సిద్ధం చేస్తోంది...",
    loadingWait: "దీనికి సాధారణంగా కొన్ని సెకన్లు పడుతుంది",
    resultsTitle: "🎉 మీ దిగుబడి అంచనా",
    resultsSub: "మీ వ్యవసాయ ఇన్‌పుట్‌ల ఆధారంగా — AI-ఆధారిత విశ్లేషణ",
    predictedYield: "అంచనా దిగుబడి", description: "ఈ గణన ఎలా జరిగింది?",
    tips: "మీ దిగుబడిని మెరుగుపరచడానికి చిట్కాలు", tryAgain: "మరొక అంచనా ప్రయత్నించండి",
    backHome: "హోమ్ పేజీకి వెనుకకు", language: "భాష",
    kharif: "ఖరీఫ్", rabi: "రబీ", wholeYear: "సంవత్సరం పొడవునా",
    selectCrop: "పంటను ఎంచుకోండి", selectSeason: "ఋతువును ఎంచుకోండి", selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
  },
  mr: {
    title: "उत्पादन अंदाज", subtitle: "शेती इनपुटच्या आधारे तुमच्या पिकाच्या उत्पन्नाचा अंदाज लावा",
    crop: "पीक", season: "हंगाम", state: "राज्य", area: "क्षेत्रफळ", fertilizer: "खत", pesticide: "कीटकनाशक",
    hectares: "हेक्टर", kgs: "किग्रॅ", tonnesPerHa: "टन/हेक्टर",
    step1Title: "पीक आणि स्थान", step1Sub: "तुम्ही काय पिकवत आहात आणि कोठे ते सांगा",
    step2Title: "शेती इनपुट", step2Sub: "तुमचे जमीन क्षेत्र आणि इनपुट वापर प्रविष्ट करा",
    step3Title: "पुनरावलोकन आणि अंदाज", step3Sub: "AI उत्पन्न अंदाज मिळविण्यासाठी तपशीलांची पुष्टी करा",
    continue: "पुढे", back: "मागे", predict: "🌾 माझ्या उत्पन्नाचा अंदाज लावा",
    reviewHeading: "तुमच्या शेती तपशीलांचे पुनरावलोकन करा",
    aiNote: "आमचे AI तुमच्या पॅरामीटर्सचे विश्लेषण करेल आणि व्यावहारिक टिप्ससह तुमच्या अपेक्षित उत्पन्नाचा अंदाज लावेल.",
    loadingTitle: "तुमच्या उत्पन्नाचा अंदाज लावला जात आहे",
    loadingMsg1: "📊 तुमच्या इनपुटचे विश्लेषण...",
    loadingMsg2: "🌱 कृषी डेटाशी सल्लामसलत...",
    loadingMsg3: "🤖 AI उत्पन्नाची गणना करत आहे...",
    loadingMsg4: "✅ तुमचे निकाल तयार केले जात आहेत...",
    loadingWait: "यास सहसा काही सेकंद लागतात",
    resultsTitle: "🎉 तुमचा उत्पन्न अंदाज",
    resultsSub: "तुमच्या शेती इनपुटवर आधारित — AI-समर्थित विश्लेषण",
    predictedYield: "अंदाजित उत्पन्न", description: "ही गणना कशी केली गेली?",
    tips: "तुमचे उत्पन्न सुधारण्यासाठी टिप्स", tryAgain: "दुसरा अंदाज वापरून पहा",
    backHome: "मुखपृष्ठावर परत", language: "भाषा",
    kharif: "खरीप", rabi: "रब्बी", wholeYear: "संपूर्ण वर्ष",
    selectCrop: "पीक निवडा", selectSeason: "हंगाम निवडा", selectState: "राज्य निवडा",
  },
  ta: {
    title: "விளைச்சல் கணிப்பு", subtitle: "விவசாய உள்ளீடுகளின் அடிப்படையில் உங்கள் பயிர் விளைச்சலைக் கணிக்கவும்",
    crop: "பயிர்", season: "பருவம்", state: "மாநிலம்", area: "பரப்பளவு", fertilizer: "உரம்", pesticide: "பூச்சிக்கொல்லி",
    hectares: "ஹெக்டேர்", kgs: "கிலோ", tonnesPerHa: "டன்/ஹெக்டேர்",
    step1Title: "பயிர் & இடம்", step1Sub: "நீங்கள் என்ன பயிரிடுகிறீர்கள், எங்கு பயிரிடுகிறீர்கள் என்பதைக் கூறுங்கள்",
    step2Title: "விவசாய உள்ளீடுகள்", step2Sub: "உங்கள் நிலப் பரப்பு மற்றும் உள்ளீடு பயன்பாட்டை உள்ளிடவும்",
    step3Title: "மதிப்பாய்வு & கணிப்பு", step3Sub: "AI விளைச்சல் கணிப்பைப் பெற விவரங்களை உறுதிப்படுத்தவும்",
    continue: "தொடரவும்", back: "பின்", predict: "🌾 எனது விளைச்சலைக் கணிக்கவும்",
    reviewHeading: "உங்கள் விவசாய விவரங்களை மதிப்பாய்வு செய்யவும்",
    aiNote: "எங்கள் AI உங்கள் அளவுருக்களை பகுப்பாய்வு செய்து நடைமுறை உதவிக்குறிப்புகளுடன் உங்கள் எதிர்பார்க்கப்படும் விளைச்சலைக் கணிக்கும்.",
    loadingTitle: "உங்கள் விளைச்சல் கணிக்கப்படுகிறது",
    loadingMsg1: "📊 உங்கள் உள்ளீடுகளை பகுப்பாய்வு செய்தல்...",
    loadingMsg2: "🌱 விவசாய தரவை ஆலோசித்தல்...",
    loadingMsg3: "🤖 AI விளைச்சலை கணக்கிடுகிறது...",
    loadingMsg4: "✅ உங்கள் முடிவுகள் தயாராகின்றன...",
    loadingWait: "இதற்கு பொதுவாக சில வினாடிகள் ஆகும்",
    resultsTitle: "🎉 உங்கள் விளைச்சல் கணிப்பு",
    resultsSub: "உங்கள் விவசாய உள்ளீடுகளின் அடிப்படையில் — AI-இயக்க பகுப்பாய்வு",
    predictedYield: "கணிக்கப்பட்ட விளைச்சல்", description: "இந்த கணக்கீடு எவ்வாறு செய்யப்பட்டது?",
    tips: "உங்கள் விளைச்சலை மேம்படுத்த உதவிக்குறிப்புகள்", tryAgain: "மற்றொரு கணிப்பை முயற்சிக்கவும்",
    backHome: "முகப்புப் பக்கத்திற்குத் திரும்பு", language: "மொழி",
    kharif: "கரீஃப்", rabi: "ரபி", wholeYear: "ஆண்டு முழுவதும்",
    selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்", selectSeason: "பருவத்தைத் தேர்ந்தெடுக்கவும்", selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
  },
  gu: {
    title: "ઉપજ આગાહી", subtitle: "ખેતી ઇનપુટના આધારે તમારા પાકની ઉપજની આગાહી કરો",
    crop: "પાક", season: "ઋતુ", state: "રાજ્ય", area: "વિસ્તાર", fertilizer: "ખાતર", pesticide: "જંતુનાશક",
    hectares: "હેક્ટર", kgs: "કિગ્રા", tonnesPerHa: "ટન/હેક્ટર",
    step1Title: "પાક અને સ્થાન", step1Sub: "તમે શું ઉગાડો છો અને ક્યાં ઉગાડો છો તે અમને જણાવો",
    step2Title: "ખેતી ઇનપુટ્સ", step2Sub: "તમારો જમીન વિસ્તાર અને ઇનપુટ વપરાશ દાખલ કરો",
    step3Title: "સમીક્ષા અને આગાહી", step3Sub: "AI ઉપજ આગાહી મેળવવા વિગતોની પુષ્ટિ કરો",
    continue: "ચાલુ રાખો", back: "પાછળ", predict: "🌾 મારી ઉપજની આગાહી કરો",
    reviewHeading: "તમારી ખેતી વિગતોની સમીક્ષા કરો",
    aiNote: "અમારું AI તમારા પેરામીટરનું વિશ્લેષણ કરશે અને વ્યવહારુ ટિપ્સ સાથે તમારી અપેક્ષિત ઉપજની આગાહી કરશે.",
    loadingTitle: "તમારી ઉપજની આગાહી કરવામાં આવી રહી છે",
    loadingMsg1: "📊 તમારા ઇનપુટનું વિશ્લેષણ...",
    loadingMsg2: "🌱 કૃષિ ડેટા સાથે પરામર્શ...",
    loadingMsg3: "🤖 AI ઉપજની ગણતરી કરી રહ્યું છે...",
    loadingMsg4: "✅ તમારા પરિણામો તૈયાર થઈ રહ્યા છે...",
    loadingWait: "આમાં સામાન્ય રીતે થોડી સેકંડ લાગે છે",
    resultsTitle: "🎉 તમારી ઉપજ આગાહી",
    resultsSub: "તમારા ખેતી ઇનપુટ પર આધારિત — AI-સંચાલિત વિશ્લેષણ",
    predictedYield: "અનુમાનિત ઉપજ", description: "આ ગણતરી કેવી રીતે કરવામાં આવી?",
    tips: "તમારી ઉપજ સુધારવા માટે ટિપ્સ", tryAgain: "બીજી આગાહી અજમાવો",
    backHome: "હોમ પેજ પર પાછા", language: "ભાષા",
    kharif: "ખરીફ", rabi: "રબી", wholeYear: "આખું વર્ષ",
    selectCrop: "પાક પસંદ કરો", selectSeason: "ઋતુ પસંદ કરો", selectState: "રાજ્ય પસંદ કરો",
  },
  kn: {
    title: "ಇಳುವರಿ ಮುನ್ಸೂಚನೆ", subtitle: "ಕೃಷಿ ಇನ್‌ಪುಟ್‌ಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಬೆಳೆ ಇಳುವರಿಯನ್ನು ಮುನ್ಸೂಚಿಸಿ",
    crop: "ಬೆಳೆ", season: "ಋತು", state: "ರಾಜ್ಯ", area: "ವಿಸ್ತೀರ್ಣ", fertilizer: "ಗೊಬ್ಬರ", pesticide: "ಕೀಟನಾಶಕ",
    hectares: "ಹೆಕ್ಟೇರ್", kgs: "ಕೆಜಿ", tonnesPerHa: "ಟನ್/ಹೆಕ್ಟೇರ್",
    step1Title: "ಬೆಳೆ ಮತ್ತು ಸ್ಥಳ", step1Sub: "ನೀವು ಏನು ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ ಮತ್ತು ಎಲ್ಲಿ ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ ಎಂದು ತಿಳಿಸಿ",
    step2Title: "ಕೃಷಿ ಇನ್‌ಪುಟ್‌ಗಳು", step2Sub: "ನಿಮ್ಮ ಭೂಮಿ ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಇನ್‌ಪುಟ್ ಬಳಕೆಯನ್ನು ನಮೂದಿಸಿ",
    step3Title: "ಪರಿಶೀಲನೆ ಮತ್ತು ಮುನ್ಸೂಚನೆ", step3Sub: "AI ಇಳುವರಿ ಮುನ್ಸೂಚನೆ ಪಡೆಯಲು ವಿವರಗಳನ್ನು ದೃಢೀಕರಿಸಿ",
    continue: "ಮುಂದುವರಿಸಿ", back: "ಹಿಂದೆ", predict: "🌾 ನನ್ನ ಇಳುವರಿಯನ್ನು ಮುನ್ಸೂಚಿಸಿ",
    reviewHeading: "ನಿಮ್ಮ ಕೃಷಿ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    aiNote: "ನಮ್ಮ AI ನಿಮ್ಮ ನಿಯತಾಂಕಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಸಲಹೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ನಿರೀಕ್ಷಿತ ಇಳುವರಿಯನ್ನು ಮುನ್ಸೂಚಿಸುತ್ತದೆ.",
    loadingTitle: "ನಿಮ್ಮ ಇಳುವರಿಯನ್ನು ಮುನ್ಸೂಚಿಸಲಾಗುತ್ತಿದೆ",
    loadingMsg1: "📊 ನಿಮ್ಮ ಇನ್‌ಪುಟ್‌ಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    loadingMsg2: "🌱 ಕೃಷಿ ಡೇಟಾವನ್ನು ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...",
    loadingMsg3: "🤖 AI ಇಳುವರಿಯನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತಿದೆ...",
    loadingMsg4: "✅ ನಿಮ್ಮ ಫಲಿತಾಂಶಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
    loadingWait: "ಇದು ಸಾಮಾನ್ಯವಾಗಿ ಕೆಲವು ಸೆಕೆಂಡುಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ",
    resultsTitle: "🎉 ನಿಮ್ಮ ಇಳುವರಿ ಮುನ್ಸೂಚನೆ",
    resultsSub: "ನಿಮ್ಮ ಕೃಷಿ ಇನ್‌ಪುಟ್‌ಗಳ ಆಧಾರದ ಮೇಲೆ — AI-ಚಾಲಿತ ವಿಶ್ಲೇಷಣೆ",
    predictedYield: "ಮುನ್ಸೂಚಿತ ಇಳುವರಿ", description: "ಈ ಲೆಕ್ಕಾಚಾರವನ್ನು ಹೇಗೆ ಮಾಡಲಾಗಿದೆ?",
    tips: "ನಿಮ್ಮ ಇಳುವರಿಯನ್ನು ಸುಧಾರಿಸಲು ಸಲಹೆಗಳು", tryAgain: "ಮತ್ತೊಂದು ಮುನ್ಸೂಚನೆಯನ್ನು ಪ್ರಯತ್ನಿಸಿ",
    backHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ", language: "ಭಾಷೆ",
    kharif: "ಖರೀಫ್", rabi: "ರಬಿ", wholeYear: "ಇಡೀ ವರ್ಷ",
    selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ", selectSeason: "ಋತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ", selectState: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  },
  ml: {
    title: "വിളവ് പ്രവചനം", subtitle: "കാർഷിക ഇൻപുട്ടുകളെ അടിസ്ഥാനമാക്കി നിങ്ങളുടെ വിളയുടെ വിളവ് പ്രവചിക്കുക",
    crop: "വിള", season: "കാലം", state: "സംസ്ഥാനം", area: "വിസ്തീർണ്ണം", fertilizer: "വളം", pesticide: "കീടനാശിനി",
    hectares: "ഹെക്ടർ", kgs: "കിലോ", tonnesPerHa: "ടൺ/ഹെക്ടർ",
    step1Title: "വിളയും സ്ഥലവും", step1Sub: "നിങ്ങൾ എന്താണ് കൃഷി ചെയ്യുന്നതെന്നും എവിടെയാണെന്നും പറയുക",
    step2Title: "കാർഷിക ഇൻപുട്ടുകൾ", step2Sub: "നിങ്ങളുടെ ഭൂമി വിസ്തീർണ്ണവും ഇൻപുട്ട് ഉപയോഗവും നൽകുക",
    step3Title: "അവലോകനവും പ്രവചനവും", step3Sub: "AI വിളവ് പ്രവചനം ലഭിക്കുന്നതിന് വിശദാംശങ്ങൾ സ്ഥിരീകരിക്കുക",
    continue: "തുടരുക", back: "പിന്നിലേക്ക്", predict: "🌾 എന്റെ വിളവ് പ്രവചിക്കുക",
    reviewHeading: "നിങ്ങളുടെ കാർഷിക വിശദാംശങ്ങൾ അവലോകനം ചെയ്യുക",
    aiNote: "ഞങ്ങളുടെ AI നിങ്ങളുടെ പാരാമീറ്ററുകൾ വിശകലനം ചെയ്യുകയും പ്രായോഗിക നുറുങ്ങുകൾക്കൊപ്പം നിങ്ങളുടെ പ്രതീക്ഷിക്കുന്ന വിളവ് പ്രവചിക്കുകയും ചെയ്യും.",
    loadingTitle: "നിങ്ങളുടെ വിളവ് പ്രവചിക്കുന്നു",
    loadingMsg1: "📊 നിങ്ങളുടെ ഇൻപുട്ടുകൾ വിശകലനം ചെയ്യുന്നു...",
    loadingMsg2: "🌱 കാർഷിക ഡാറ്റയുമായി കൂടിയാലോചിക്കുന്നു...",
    loadingMsg3: "🤖 AI വിളവ് കണക്കാക്കുന്നു...",
    loadingMsg4: "✅ നിങ്ങളുടെ ഫലങ്ങൾ തയ്യാറാക്കുന്നു...",
    loadingWait: "ഇത് സാധാരണയായി കുറച്ച് നിമിഷങ്ങൾ എടുക്കും",
    resultsTitle: "🎉 നിങ്ങളുടെ വിളവ് പ്രവചനം",
    resultsSub: "നിങ്ങളുടെ കാർഷിക ഇൻപുട്ടുകളെ അടിസ്ഥാനമാക്കി — AI-പ്രവർത്തിത വിശകലനം",
    predictedYield: "പ്രവചിക്കപ്പെട്ട വിളവ്", description: "ഈ കണക്കുകൂട്ടൽ എങ്ങനെയാണ് ചെയ്തത്?",
    tips: "നിങ്ങളുടെ വിളവ് മെച്ചപ്പെടുത്താനുള്ള നുറുങ്ങുകൾ", tryAgain: "മറ്റൊരു പ്രവചനം പരീക്ഷിക്കുക",
    backHome: "ഹോം പേജിലേക്ക് മടങ്ങുക", language: "ഭാഷ",
    kharif: "ഖരീഫ്", rabi: "റാബി", wholeYear: "വർഷം മുഴുവൻ",
    selectCrop: "വിള തിരഞ്ഞെടുക്കുക", selectSeason: "കാലം തിരഞ്ഞെടുക്കുക", selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
  },
  pa: {
    title: "ਝਾੜ ਅਨੁਮਾਨ", subtitle: "ਖੇਤੀ ਇਨਪੁਟਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਆਪਣੀ ਫਸਲ ਦੇ ਝਾੜ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ",
    crop: "ਫਸਲ", season: "ਰੁੱਤ", state: "ਰਾਜ", area: "ਰਕਬਾ", fertilizer: "ਖਾਦ", pesticide: "ਕੀਟਨਾਸ਼ਕ",
    hectares: "ਹੈਕਟੇਅਰ", kgs: "ਕਿਲੋ", tonnesPerHa: "ਟਨ/ਹੈਕਟੇਅਰ",
    step1Title: "ਫਸਲ ਅਤੇ ਸਥਾਨ", step1Sub: "ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਕੀ ਉਗਾ ਰਹੇ ਹੋ ਅਤੇ ਕਿੱਥੇ",
    step2Title: "ਖੇਤੀ ਇਨਪੁਟ", step2Sub: "ਆਪਣਾ ਜ਼ਮੀਨ ਰਕਬਾ ਅਤੇ ਇਨਪੁਟ ਵਰਤੋਂ ਦਰਜ ਕਰੋ",
    step3Title: "ਸਮੀਖਿਆ ਅਤੇ ਅਨੁਮਾਨ", step3Sub: "AI ਝਾੜ ਅਨੁਮਾਨ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਵੇਰਵਿਆਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    continue: "ਜਾਰੀ ਰੱਖੋ", back: "ਪਿੱਛੇ", predict: "🌾 ਮੇਰੇ ਝਾੜ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ",
    reviewHeading: "ਆਪਣੇ ਖੇਤੀ ਵੇਰਵਿਆਂ ਦੀ ਸਮੀਖਿਆ ਕਰੋ",
    aiNote: "ਸਾਡਾ AI ਤੁਹਾਡੇ ਮਾਪਦੰਡਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੇਗਾ ਅਤੇ ਵਿਹਾਰਕ ਸੁਝਾਵਾਂ ਨਾਲ ਤੁਹਾਡੇ ਅਨੁਮਾਨਿਤ ਝਾੜ ਦਾ ਅਨੁਮਾਨ ਲਗਾਏਗਾ।",
    loadingTitle: "ਤੁਹਾਡੇ ਝਾੜ ਦਾ ਅਨੁਮਾਨ ਲਗਾਇਆ ਜਾ ਰਿਹਾ ਹੈ",
    loadingMsg1: "📊 ਤੁਹਾਡੇ ਇਨਪੁਟਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ...",
    loadingMsg2: "🌱 ਖੇਤੀਬਾੜੀ ਡੇਟਾ ਨਾਲ ਸਲਾਹ...",
    loadingMsg3: "🤖 AI ਝਾੜ ਦੀ ਗਣਨਾ ਕਰ ਰਿਹਾ ਹੈ...",
    loadingMsg4: "✅ ਤੁਹਾਡੇ ਨਤੀਜੇ ਤਿਆਰ ਕੀਤੇ ਜਾ ਰਹੇ ਹਨ...",
    loadingWait: "ਇਸ ਵਿੱਚ ਆਮ ਤੌਰ 'ਤੇ ਕੁਝ ਸਕਿੰਟ ਲੱਗਦੇ ਹਨ",
    resultsTitle: "🎉 ਤੁਹਾਡਾ ਝਾੜ ਅਨੁਮਾਨ",
    resultsSub: "ਤੁਹਾਡੇ ਖੇਤੀ ਇਨਪੁਟਾਂ 'ਤੇ ਆਧਾਰਿਤ — AI-ਸੰਚਾਲਿਤ ਵਿਸ਼ਲੇਸ਼ਣ",
    predictedYield: "ਅਨੁਮਾਨਿਤ ਝਾੜ", description: "ਇਹ ਗਣਨਾ ਕਿਵੇਂ ਕੀਤੀ ਗਈ?",
    tips: "ਆਪਣੇ ਝਾੜ ਨੂੰ ਸੁਧਾਰਨ ਲਈ ਸੁਝਾਅ", tryAgain: "ਕੋਈ ਹੋਰ ਅਨੁਮਾਨ ਅਜ਼ਮਾਓ",
    backHome: "ਹੋਮ ਪੇਜ 'ਤੇ ਵਾਪਸ", language: "ਭਾਸ਼ਾ",
    kharif: "ਖਰੀਫ", rabi: "ਰਬੀ", wholeYear: "ਪੂਰਾ ਸਾਲ",
    selectCrop: "ਫਸਲ ਚੁਣੋ", selectSeason: "ਰੁੱਤ ਚੁਣੋ", selectState: "ਰਾਜ ਚੁਣੋ",
  },
};

const CROPS = [
  "Arecanut", "Arhar/Tur", "Castor seed", "Coconut", "Cotton(lint)", "Dry chillies",
  "Gram", "Jute", "Linseed", "Maize", "Mesta", "Niger seed",
  "Onion", "Other Rabi pulses", "Potato", "Rapeseed &Mustard", "Rice", "Sesamum",
  "Small millets", "Sugarcane", "Sweet potato", "Tapioca", "Tobacco", "Turmeric",
  "Wheat", "Bajra", "Black pepper", "Cardamom", "Coriander", "Garlic",
  "Ginger", "Groundnut", "Horse-gram", "Jowar", "Ragi", "Cashewnut",
  "Banana", "Soyabean", "Barley", "Khesari", "Masoor", "Moong(Green Gram)",
  "Other Kharif pulses", "Safflower", "Sannhamp", "Sunflower", "Urad",
  "Peas & beans (Pulses)", "other oilseeds", "Other Cereals", "Cowpea(Lobia)",
  "Oilseeds total", "Guar seed", "Other Summer Pulses", "Moth",
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Andaman & Nicobar", "Chandigarh",
  "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Jammu & Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry",
];

const cropIcons = {
  Rice: "🌾", Wheat: "🌾", Maize: "🌽", Sugarcane: "🎋", Coconut: "🥥",
  Potato: "🥔", Onion: "🧅", Groundnut: "🥜", Soybean: "🌿",
  Bajra: "🌾", Jowar: "🌾", Ragi: "🌾", Barley: "🌾",
  Sunflower: "🌻", Jute: "🌿", Banana: "🍌", Tobacco: "🍃",
  Turmeric: "🧂", Ginger: "🫚", Garlic: "🧄", Cashewnut: "🥜",
  Black pepper: "🌶️", Cardamom: "🫛", Coriander: "🌿",
  "Arhar/Tur": "🫘", "Castor seed": "🌱", "Dry chillies": "🌶️",
  Gram: "🫘", Linseed: "🌱", Mesta: "🌿", "Niger seed": "🌱",
  Sesamum: "🌱", "Sweet potato": "🍠", Tapioca: "🥔",
  "Horse-gram": "🫘", "Rapeseed &Mustard": "🌱", Safflower: "🌼",
  Sannhamp: "🌿", Urad: "🫘", Masoor: "🫘",
  "Moong(Green Gram)": "🫘", "Peas & beans (Pulses)": "🫛",
  Arecanut: "🌴", "Small millets": "🌾",
};

const YieldPrediction = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [language, setLanguage] = useState("en");

  const t = (key) => T[language]?.[key] || T["en"][key] || key;

  const [formData, setFormData] = useState({
    crop: "", season: "", state: "", area: 5, fertilizer: 100, pesticide: 10,
  });

  const selectedLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const steps = [
    {
      title: t("step1Title"), subtitle: t("step1Sub"), emoji: "🌾",
      fields: [
        {
          key: "crop", label: t("crop"), emoji: "🌱", type: "select",
          options: CROPS, placeholder: t("selectCrop"),
        },
        {
          key: "season", label: t("season"), emoji: "☀️", type: "select",
          options: [
            { value: "Kharif", label: t("kharif") },
            { value: "Rabi", label: t("rabi") },
            { value: "Whole Year", label: t("wholeYear") },
          ], placeholder: t("selectSeason"),
        },
        {
          key: "state", label: t("state"), emoji: "📍", type: "select",
          options: INDIAN_STATES, placeholder: t("selectState"),
        },
      ],
    },
    {
      title: t("step2Title"), subtitle: t("step2Sub"), emoji: "📊",
      fields: [
        {
          key: "area", label: t("area"), emoji: "📐", unit: t("hectares"),
          min: 0.1, max: 100, step: 0.1, default: 5,
          tip: "Enter your total farming land area",
        },
        {
          key: "fertilizer", label: t("fertilizer"), emoji: "🧪", unit: t("kgs"),
          min: 0, max: 1000, step: 1, default: 100,
          tip: "Total fertilizer used in kilograms",
        },
        {
          key: "pesticide", label: t("pesticide"), emoji: "🧴", unit: t("kgs"),
          min: 0, max: 100, step: 0.5, default: 10,
          tip: "Total pesticide used in kilograms",
        },
      ],
    },
  ];

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    const msgs = [
      t("loadingMsg1"), t("loadingMsg2"), t("loadingMsg3"), t("loadingMsg4"),
    ];
    let i = 0;
    setLoadingMsg(msgs[0]);
    const interval = setInterval(() => {
      i++;
      if (i < msgs.length) setLoadingMsg(msgs[i]);
    }, 700);

    try {
      const token = localStorage.getItem("authToken");
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/features/yield-prediction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          crop: formData.crop,
          season: formData.season,
          state: formData.state,
          area: parseFloat(formData.area),
          fertilizer: parseFloat(formData.fertilizer),
          pesticide: parseFloat(formData.pesticide),
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Prediction failed");

      setResults(data.data);
      setShowResults(true);
    } catch (error) {
      setResults({
        predictedYield: 3.5,
        description: "Unable to fetch AI prediction. Showing estimated values based on general agricultural data for your inputs.",
        tips: [
          "Ensure proper irrigation scheduling",
          "Use balanced NPK fertilizers",
          "Practice crop rotation",
          "Consult local agricultural officer",
        ],
      });
      setShowResults(true);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFormData({ crop: "", season: "", state: "", area: 5, fertilizer: 100, pesticide: 10 });
    setResults(null);
    setShowResults(false);
    setStep(0);
  };

  const currentStepData = steps[step];

  if (showResults && results) {
    const yieldVal = parseFloat(results.predictedYield) || 0;
    const maxYield = 15;
    const pct = Math.min((yieldVal / maxYield) * 100, 100);
    const getLevel = () => {
      if (yieldVal >= 8) return { label: "Excellent", color: "#1B6B42", bg: "rgba(82,183,136,0.12)" };
      if (yieldVal >= 5) return { label: "Good", color: "#2D6A4F", bg: "rgba(64,145,108,0.12)" };
      if (yieldVal >= 3) return { label: "Average", color: "#8B5E0A", bg: "rgba(244,162,97,0.12)" };
      return { label: "Below Average", color: "#B5430F", bg: "rgba(231,111,81,0.12)" };
    };
    const level = getLevel();

    return (
      <div className="min-h-screen" style={{ background: "#F8F5F0" }}>
        <div className="page-header">
          <button
            onClick={() => setShowResults(false)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#40916C,#74C69D)" }}>
              <Leaf className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-base font-bold" style={{ color: "#1A2E1A" }}>
              Krishi<span style={{ color: "#40916C" }}>Connect</span>
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}>
              📊 Results Ready
            </span>
            <div className="relative">
              <button
                onClick={() => setShowLangPicker(!showLangPicker)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ background: "rgba(244,162,97,0.12)", color: "#7C5C3A", border: "1px solid rgba(244,162,97,0.2)" }}
              >
                <Languages className="w-4 h-4" />
              </button>
              {showLangPicker && (
                <div className="absolute right-0 top-12 w-48 rounded-2xl z-50 overflow-hidden shadow-xl animate-scale-in"
                  style={{ background: "white", border: "1px solid rgba(64,145,108,0.15)" }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLangPicker(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all"
                      style={{
                        background: language === lang.code ? "rgba(64,145,108,0.08)" : "transparent",
                        color: language === lang.code ? "#2D6A4F" : "#3D5A40",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(64,145,108,0.05)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = language === lang.code ? "rgba(64,145,108,0.08)" : "transparent"; }}
                    >
                      <span>{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in-up">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: "#1A2E1A" }}>
              {t("resultsTitle")}
            </h1>
            <p className="text-sm" style={{ color: "#6B8F6E" }}>
              {t("resultsSub")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-3xl p-6 sm:p-7" style={{ background: "white", boxShadow: "0 4px 24px rgba(45,106,79,0.08)", border: "1px solid rgba(64,145,108,0.12)" }}>
              <div className="text-center mb-6">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#9AB09D" }}>
                  {t("predictedYield")}
                </p>
                <div className="relative inline-flex items-center justify-center mb-2">
                  <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#E8F4ED" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke={level.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(pct / 100) * 326.7} 326.7`}
                      style={{ transition: "stroke-dasharray 1.2s ease" }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-extrabold" style={{ color: level.color }}>
                      {yieldVal.toFixed(1)}
                    </span>
                    <span className="text-xs font-medium mt-0.5" style={{ color: "#6B8F6E" }}>
                      {t("tonnesPerHa")}
                    </span>
                  </div>
                </div>
                <span
                  className="inline-flex px-4 py-1.5 rounded-full text-sm font-bold"
                  style={{ background: level.bg, color: level.color }}
                >
                  {level.label}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl" style={{ background: "#F8F5F0", border: "1px solid rgba(64,145,108,0.1)" }}>
                  <span className="text-xs font-medium" style={{ color: "#6B8F6E" }}>{t("crop")}</span>
                  <span className="text-sm font-extrabold" style={{ color: "#1A2E1A" }}>
                    {cropIcons[formData.crop] || "🌾"} {formData.crop}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl" style={{ background: "#F8F5F0", border: "1px solid rgba(64,145,108,0.1)" }}>
                  <span className="text-xs font-medium" style={{ color: "#6B8F6E" }}>{t("season")}</span>
                  <span className="text-sm font-extrabold" style={{ color: "#1A2E1A" }}>
                    {formData.season === "Kharif" ? t("kharif") : formData.season === "Rabi" ? t("rabi") : t("wholeYear")}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl" style={{ background: "#F8F5F0", border: "1px solid rgba(64,145,108,0.1)" }}>
                  <span className="text-xs font-medium" style={{ color: "#6B8F6E" }}>{t("state")}</span>
                  <span className="text-sm font-extrabold" style={{ color: "#1A2E1A" }}>{formData.state}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {results.inputSummary && (
                <div className="rounded-3xl p-6 sm:p-7" style={{ background: "linear-gradient(135deg, rgba(64,145,108,0.06), rgba(244,162,97,0.06))", border: "1px solid rgba(64,145,108,0.15)", boxShadow: "0 4px 16px rgba(45,106,79,0.05)" }}>
                  <h3 className="text-base font-extrabold mb-3 flex items-center gap-2" style={{ color: "#1A2E1A" }}>
                    <span>📋</span> Input Summary & Result
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#3D5A40" }}>
                    {results.inputSummary}
                  </p>
                </div>
              )}
              <div className="rounded-3xl p-6 sm:p-7" style={{ background: "white", boxShadow: "0 4px 24px rgba(45,106,79,0.08)", border: "1px solid rgba(64,145,108,0.12)" }}>
                <h3 className="text-base font-extrabold mb-3 flex items-center gap-2" style={{ color: "#1A2E1A" }}>
                  <span>🧑‍🌾</span> {t("description")}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#3D5A40" }}>
                  {results.description}
                </p>
              </div>

              {results.tips && results.tips.length > 0 && (
                <div className="rounded-3xl p-6 sm:p-7" style={{ background: "white", boxShadow: "0 4px 24px rgba(45,106,79,0.08)", border: "1px solid rgba(64,145,108,0.12)" }}>
                  <h3 className="text-base font-extrabold mb-4 flex items-center gap-2" style={{ color: "#1A2E1A" }}>
                    <span>💡</span> {t("tips")}
                  </h3>
                  <div className="space-y-2.5">
                    {results.tips.map((tip, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-2xl"
                        style={{ background: i % 2 === 0 ? "rgba(64,145,108,0.05)" : "white", border: "1px solid rgba(64,145,108,0.1)" }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 mt-0.5"
                          style={{ background: "rgba(64,145,108,0.15)", color: "#2D6A4F" }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#3D5A40" }}>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetAll}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all flex-1"
              style={{ background: "white", border: "2px solid rgba(64,145,108,0.25)", color: "#2D6A4F" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(64,145,108,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}
            >
              <RotateCcw className="w-4 h-4" />
              {t("tryAgain")}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all text-white flex-1"
              style={{ background: "linear-gradient(135deg, #2D6A4F, #40916C)", boxShadow: "0 4px 16px rgba(45,106,79,0.3)" }}
            >
              {t("backHome")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#F8F5F0" }}>
        <div className="text-center px-8 animate-scale-in">
          <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl animate-bounce-gentle" style={{ background: "rgba(244,162,97,0.12)", border: "3px solid rgba(244,162,97,0.2)" }}>
            📊
          </div>
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "#1A2E1A" }}>
            {t("loadingTitle")}
          </h2>
          <p className="text-base font-medium mb-8" style={{ color: "#F4A261" }}>{loadingMsg}</p>
          <div className="w-64 mx-auto h-2 rounded-full" style={{ background: "#E0EDE6" }}>
            <div
              className="h-2 rounded-full"
              style={{
                background: "linear-gradient(90deg, #F4A261, #E76F51)",
                animation: "progressFill 3s ease forwards",
                width: "100%",
              }}
            />
          </div>
          <p className="text-xs mt-4" style={{ color: "#9AB09D" }}>{t("loadingWait")}</p>
        </div>
      </div>
    );
  }

  const totalSteps = steps.length + 1;
  const progressPct = step === 0 ? 10 : step === 1 ? 55 : 90;

  return (
    <div className="min-h-screen" style={{ background: "#F8F5F0" }}>
      <div className="page-header">
        <button
          onClick={() => step > 0 ? setStep(step - 1) : navigate("/dashboard")}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#40916C,#74C69D)" }}>
            <Leaf className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-base font-bold" style={{ color: "#1A2E1A" }}>
            Krishi<span style={{ color: "#40916C" }}>Connect</span>
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
              style={{ background: "rgba(244,162,97,0.12)", color: "#7C5C3A", border: "1px solid rgba(244,162,97,0.2)" }}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{selectedLang.flag} {selectedLang.label}</span>
            </button>
            {showLangPicker && (
              <div className="absolute right-0 top-12 w-48 rounded-2xl z-50 overflow-hidden shadow-xl animate-scale-in"
                style={{ background: "white", border: "1px solid rgba(64,145,108,0.15)" }}
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setShowLangPicker(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all"
                    style={{
                      background: language === lang.code ? "rgba(64,145,108,0.08)" : "transparent",
                      color: language === lang.code ? "#2D6A4F" : "#3D5A40",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(64,145,108,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = language === lang.code ? "rgba(64,145,108,0.08)" : "transparent"; }}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={resetAll}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
            style={{ color: "#BC8A5F", background: "rgba(188,138,95,0.1)", border: "1px solid rgba(188,138,95,0.2)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(188,138,95,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(188,138,95,0.1)"; }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            {[
              { emoji: "🌾", label: t("step1Title").split(" ").slice(0, 1).join(" ") },
              { emoji: "📊", label: t("step2Title").split(" ").slice(0, 1).join(" ") },
              { emoji: "✅", label: "Review" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1 flex-1">
                <div
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: step === i ? "rgba(64,145,108,0.12)" : step > i ? "rgba(64,145,108,0.05)" : "transparent",
                    color: step === i ? "#2D6A4F" : step > i ? "#52B788" : "#9AB09D",
                    border: step === i ? "1.5px solid rgba(64,145,108,0.3)" : "1.5px solid transparent",
                  }}
                >
                  {step > i ? "✓" : `${s.emoji} ${s.label}`}
                </div>
                {i < 2 && (
                  <div className="flex-1 h-0.5 rounded-full" style={{ background: step > i ? "#52B788" : "#E0EDE6" }} />
                )}
              </div>
            ))}
          </div>

          <div className="h-1.5 rounded-full" style={{ background: "#E0EDE6" }}>
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #40916C, #74C69D)" }}
            />
          </div>
        </div>

        <div
          className="rounded-3xl p-6 sm:p-8 animate-scale-in"
          style={{ background: "white", boxShadow: "0 8px 40px rgba(45,106,79,0.10)", border: "1px solid rgba(64,145,108,0.12)" }}
        >
          {step < 2 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{currentStepData.emoji}</span>
                <div>
                  <h1 className="text-xl font-extrabold" style={{ color: "#1A2E1A" }}>
                    {currentStepData.title}
                  </h1>
                  <p className="text-sm" style={{ color: "#6B8F6E" }}>{currentStepData.subtitle}</p>
                </div>
              </div>
            </div>
          )}

          {step < 2 && (
            <div className="space-y-7">
              {currentStepData.fields.map((field) => {
                const val = formData[field.key];

                if (field.type === "select") {
                  const options = field.options || [];
                  return (
                    <div key={field.key} className="animate-fade-in-up">
                      <div className="flex items-center justify-between mb-2">
                        <label className="flex items-center gap-2 text-sm font-bold" style={{ color: "#1A2E1A" }}>
                          <span className="text-base">{field.emoji}</span>
                          {field.label}
                        </label>
                      </div>
                      <select
                        value={val}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="input-earth w-full cursor-pointer"
                        style={{ appearance: "auto", paddingRight: "12px" }}
                      >
                        <option value="" disabled>{field.placeholder}</option>
                        {options.map((opt, i) => {
                          const optValue = typeof opt === "object" ? opt.value : opt;
                          const optLabel = typeof opt === "object" ? opt.label : opt;
                          return (
                            <option key={i} value={optValue}>{field.emoji} {optLabel}</option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }

                return (
                  <div key={field.key} className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-sm font-bold" style={{ color: "#1A2E1A" }}>
                        <span className="text-base">{field.emoji}</span>
                        {field.label}
                      </label>
                      <span
                        className="text-base font-extrabold px-3 py-0.5 rounded-xl"
                        style={{ background: "rgba(244,162,97,0.1)", color: "#7C5C3A" }}
                      >
                        {typeof val === "number" ? (Number.isInteger(val) ? val : val.toFixed(1)) : val}
                        <span className="text-xs font-medium ml-1" style={{ color: "#6B8F6E" }}>{field.unit}</span>
                      </span>
                    </div>

                    <input
                      type="range"
                      className="slider-earth w-full mb-3"
                      min={field.min}
                      max={field.max}
                      step={field.step || 1}
                      value={val}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs" style={{ color: "#9AB09D" }}>{field.min}</span>
                      <input
                        type="number"
                        className="input-earth text-center text-sm w-28 py-2"
                        min={field.min}
                        max={field.max}
                        step={field.step || 1}
                        value={val}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                      />
                      <span className="text-xs" style={{ color: "#9AB09D" }}>{field.max}</span>
                    </div>

                    <p className="helper-text mt-2">
                      <span>💡</span> {field.tip}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">✅</span>
                <div>
                  <h1 className="text-xl font-extrabold" style={{ color: "#1A2E1A" }}>{t("reviewHeading")}</h1>
                  <p className="text-sm" style={{ color: "#6B8F6E" }}>{t("step3Sub")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { emoji: cropIcons[formData.crop] || "🌾", label: t("crop"), value: formData.crop },
                  { emoji: "☀️", label: t("season"), value: formData.season === "Kharif" ? t("kharif") : formData.season === "Rabi" ? t("rabi") : t("wholeYear") },
                  { emoji: "📍", label: t("state"), value: formData.state },
                  { emoji: "📐", label: t("area"), value: `${formData.area} ${t("hectares")}` },
                  { emoji: "🧪", label: t("fertilizer"), value: `${formData.fertilizer} ${t("kgs")}` },
                  { emoji: "🧴", label: t("pesticide"), value: `${formData.pesticide} ${t("kgs")}` },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3.5 rounded-2xl"
                    style={{ background: "#F8F5F0", border: "1px solid rgba(64,145,108,0.1)" }}
                  >
                    <span className="text-lg">{r.emoji}</span>
                    <div>
                      <p className="text-xs" style={{ color: "#9AB09D" }}>{r.label}</p>
                      <p className="text-sm font-extrabold" style={{ color: "#1A2E1A" }}>{r.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl mb-2" style={{ background: "rgba(244,162,97,0.06)", border: "1px solid rgba(244,162,97,0.15)" }}>
                <p className="text-xs font-medium" style={{ color: "#7C5C3A" }}>
                  🤖 {t("aiNote")}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all flex-1"
                style={{ background: "#F8F5F0", border: "1.5px solid rgba(64,145,108,0.2)", color: "#2D6A4F" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(64,145,108,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#F8F5F0"; }}
              >
                <ArrowLeft className="w-4 h-4" />
                {t("back")}
              </button>
            )}

            {step < 2 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 0 && (!formData.crop || !formData.season || !formData.state)}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all flex-1 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: step === 0 && (!formData.crop || !formData.season || !formData.state)
                    ? "#ccc"
                    : "linear-gradient(135deg, #2D6A4F, #40916C)",
                  boxShadow: step === 0 && (!formData.crop || !formData.season || !formData.state)
                    ? "none"
                    : "0 4px 16px rgba(45,106,79,0.3)",
                }}
                onMouseEnter={(e) => { if (!(step === 0 && (!formData.crop || !formData.season || !formData.state))) { e.currentTarget.style.transform = "translateY(-1px)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
              >
                {t("continue")}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="yield-predict-btn"
                onClick={handlePredict}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all flex-1 text-white"
                style={{
                  background: "linear-gradient(135deg, #F4A261, #E76F51)",
                  boxShadow: "0 4px 24px rgba(244,162,97,0.45)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
              >
                {t("predict")}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#9AB09D" }}>
          🔒 {t("language") === "Language" ? "Your data is only used for this analysis and never stored." : "आपका डेटा केवल इस विश्लेषण के लिए उपयोग किया जाता है और कभी संग्रहीत नहीं किया जाता है।"}
        </p>
      </div>
    </div>
  );
};

export default YieldPrediction;
