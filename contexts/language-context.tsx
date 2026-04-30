"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi" | "mr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    hero_title: "Master Your Future",
    hero_with: "With",
    hero_excellence: "Excellence",
    hero_desc: "Discover a world of knowledge with expert-led courses. Level up your skills and join a community of heroes!",
    btn_quest: "Start Your Quest",
    btn_challenge: "Enter Challenge Zone",
    challenge_title: "The Challenge Zone",
    challenge_desc: "Level up by completing quizzes and practicing your code!",
    choose_path: "Choose Your Path",
    code_playground: "Code Playground",
    run_magic: "Run Magic",
    accuracy: "Accuracy",
    exp_earned: "EXP Earned",
    global_rank: "Global Rank",
    try_again: "Try Again",
    back_to_challenges: "Back to Challenges",
    challenge_complete: "Challenge Complete!",
    exit_challenge: "Exit Challenge",
    question: "Question",
    of: "of",
    path_title: "Pick Your Path!",
    path_desc: "What kind of creator do you want to be today? Choose an adventure!",
    cat_python: "Python",
    cat_java: "Java",
    cat_cpp: "C++",
    cat_c: "C Language",
    cat_js: "JavaScript",
    cat_ds: "Data Science",
    cat_aiml: "AI & ML",
    cat_web: "Web Dev",
    cat_3d: "3D Printing",
    cat_robotics: "Robotics",
    cat_electronics: "Electronics",
    cat_drone: "Drone",
    courses_text: "courses",
    explore: "Explore",
    featured_title: "Featured Courses",
    featured_desc: "Learn from the best instructors around the world",
    view_all: "View All Courses",
    reviews: "reviews",
  },
  hi: {
    hero_title: "अपना भविष्य संवारें",
    hero_with: "साथ",
    hero_excellence: "उत्कृष्टता",
    hero_desc: "विशेषज्ञों द्वारा संचालित पाठ्यक्रमों के साथ ज्ञान की दुनिया की खोज करें। अपने कौशल को बढ़ाएं और नायकों के समुदाय में शामिल हों!",
    btn_quest: "अपनी खोज शुरू करें",
    btn_challenge: "चुनौती क्षेत्र में प्रवेश करें",
    challenge_title: "चुनौती क्षेत्र",
    challenge_desc: "क्विज़ पूरा करके और अपने कोड का अभ्यास करके लेवल बढ़ाएं!",
    choose_path: "अपना रास्ता चुनें",
    code_playground: "कोड प्लेग्राउंड",
    run_magic: "जादू चलाएं",
    accuracy: "सटीकता",
    exp_earned: "EXP अर्जित",
    global_rank: "वैश्विक रैंक",
    try_again: "फिर से प्रयास करें",
    back_to_challenges: "चुनौतियों पर वापस जाएं",
    challenge_complete: "चुनौती पूरी हुई!",
    exit_challenge: "चुनौती से बाहर निकलें",
    question: "प्रश्न",
    of: "का",
    path_title: "अपना रास्ता चुनें!",
    path_desc: "आज आप किस तरह के निर्माता बनना चाहते हैं? एक साहसिक कार्य चुनें!",
    cat_python: "पायथन",
    cat_java: "जावा",
    cat_cpp: "C++",
    cat_c: "C भाषा",
    cat_js: "जावास्क्रिप्ट",
    cat_ds: "डेटा साइंस",
    cat_aiml: "AI और ML",
    cat_web: "वेब डेवलपमेंट",
    cat_3d: "3D प्रिंटिंग",
    cat_robotics: "रोबोटिक्स",
    cat_electronics: "इलेक्ट्रॉनिक्स",
    cat_drone: "ड्रोन",
    courses_text: "कोर्स",
    explore: "एक्सप्लोर करें",
    featured_title: "विशेष पाठ्यक्रम",
    featured_desc: "दुनिया भर के सर्वश्रेष्ठ प्रशिक्षकों से सीखें",
    view_all: "सभी पाठ्यक्रम देखें",
    reviews: "समीक्षाएं",
  },
  mr: {
    hero_title: "आपले भविष्य घडवा",
    hero_with: "सह",
    hero_excellence: "उत्कृष्टता",
    hero_desc: "तज्ञ-मार्गदर्शित कोर्सेससह ज्ञानाचे जग शोधा. आपली कौशल्ये सुधारा आणि वीरांच्या समुदायात सामील व्हा!",
    btn_quest: "तुमचा शोध सुरू करा",
    btn_challenge: "चॅलेंज झोनमध्ये प्रवेश करा",
    challenge_title: "चॅलेंज झोन",
    challenge_desc: "क्विझ पूर्ण करून आणि कोडचा सराव करून लेव्हल वाढवा!",
    choose_path: "तुमचा मार्ग निवडा",
    code_playground: "कोड प्लेग्राउंड",
    run_magic: "जादू चालवा",
    accuracy: "अचूकता",
    exp_earned: "EXP मिळवले",
    global_rank: "जागतिक रँक",
    try_again: "पुन्हा प्रयत्न करा",
    back_to_challenges: "आव्हानांकडे परत जा",
    challenge_complete: "चॅलेंज पूर्ण झाले!",
    exit_challenge: "बाहेर पडा",
    question: "प्रश्न",
    of: "पैकी",
    path_title: "तुमचा मार्ग निवडा!",
    path_desc: "आज तुम्हाला कोणत्या प्रकारचे निर्माते व्हायचे आहे? एक साहस निवडा!",
    cat_python: "पायथन",
    cat_java: "जावा",
    cat_cpp: "C++",
    cat_c: "C भाषा",
    cat_js: "जावास्क्रिप्ट",
    cat_ds: "डेटा सायन्स",
    cat_aiml: "AI आणि ML",
    cat_web: "वेब डेव्हलपमेंट",
    cat_3d: "3D प्रिंटिंग",
    cat_robotics: "रोबोटिक्स",
    cat_electronics: "इलेक्ट्रॉनिक्स",
    cat_drone: "ड्रोन",
    courses_text: "कोर्सेस",
    explore: "एक्सप्लोर करा",
    featured_title: "वैशिष्ट्यीकृत कोर्सेस",
    featured_desc: "जगभरातील सर्वोत्तम प्रशिक्षकांकडून शिका",
    view_all: "सर्व कोर्सेस पहा",
    reviews: "पुनरावलोकने",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Sync with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Language;
    if (saved && (saved === "en" || saved === "hi" || saved === "mr")) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("app_lang", lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
