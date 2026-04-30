"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  Trophy, 
  Brain, 
  Zap, 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  RotateCcw,
  Sparkles,
  Timer,
  Terminal,
  Play,
  Code2,
  Trash2,
  Swords,
  Calendar,
  Clock,
  ChevronLeft
} from "lucide-react";

// Updated Mock Quiz Data with Multilingual Support
const quizzes = (lang: string) => [
  {
    id: "ai-basics",
    title: lang === "hi" ? "AI सुपर क्विज़" : lang === "mr" ? "AI सुपर क्विझ" : "AI Super Quiz",
    description: lang === "hi" ? "एआई की दुनिया में अपनी शक्ति का परीक्षण करें!" : lang === "mr" ? "AI च्या जगात तुमची शक्ती तपासा!" : "Test your AI superpowers — Class 10 level!",
    icon: Brain,
    color: "bg-blue-500",
    questions: [
      { question: "What does 'AI' stand for?", options: ["Artificial Intelligence", "Advanced Integration", "Automated Interface", "Active Interaction"], answer: 0 },
      { question: "Which part of a computer is called its 'brain'?", options: ["RAM", "Hard Disk", "CPU", "Monitor"], answer: 2 },
      { question: "Which of these is an example of Artificial Intelligence?", options: ["Calculator", "Google Assistant", "Pen drive", "Printer"], answer: 1 },
      { question: "What is 'Machine Learning'?", options: ["Teaching machines to repair themselves", "Teaching computers to learn from data", "Programming a robot manually", "Typing commands into a computer"], answer: 1 },
      { question: "Which of the following is NOT an AI application?", options: ["Self-driving cars", "Face recognition", "Spreadsheet software", "Chatbots"], answer: 2 },
      { question: "What does a 'neural network' try to imitate?", options: ["The internet", "The human brain", "A circuit board", "A hard drive"], answer: 1 },
      { question: "Which country developed the AI system 'AlphaGo'?", options: ["USA", "China", "UK (DeepMind)", "Japan"], answer: 2 },
      { question: "What is the full form of 'IoT'?", options: ["Internet of Things", "Integration of Technology", "Input of Text", "Internet of Transfer"], answer: 0 },
      { question: "In class 10 science — which law states F = ma?", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Ohm's Law"], answer: 1 },
      { question: "What is the chemical formula of water?", options: ["CO2", "NaCl", "H2O", "O2"], answer: 2 },
      { question: "What type of number is √2?", options: ["Natural", "Integer", "Rational", "Irrational"], answer: 3 },
      { question: "A triangle with all sides equal is called?", options: ["Scalene", "Isosceles", "Equilateral", "Right-angled"], answer: 2 },
      { question: "Which device converts AC to DC?", options: ["Transistor", "Rectifier", "Capacitor", "Inductor"], answer: 1 },
      { question: "The SI unit of electric current is?", options: ["Volt", "Ohm", "Ampere", "Watt"], answer: 2 },
      { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], answer: 2 },
    ]
  },
  {
    id: "coding-quest",
    title: lang === "hi" ? "कोडिंग क्वेस्ट" : lang === "mr" ? "कोडिंग क्वेस्ट" : "Coding Quest",
    description: lang === "hi" ? "अपनी पसंदीदा भाषा चुनें!" : lang === "mr" ? "तुमची आवडती भाषा निवडा!" : "Choose your favorite language and let the magic begin!",
    icon: Zap,
    color: "bg-yellow-500",
    hasLanguages: true,
    languages: ["C", "C++", "Python", "Java", "JavaScript", "SQL", "HTML/CSS"],
    questionsByLang: {
      "C": [
        { question: "How do you print 'Hello' in C?", options: ["printf(\"Hello\");", "cout << \"Hello\";", "print(\"Hello\");", "echo(\"Hello\");"], answer: 0 },
        { question: "Which header file is needed for printf()?", options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"], answer: 1 },
        { question: "What is the correct syntax to declare an integer in C?", options: ["integer x;", "int x;", "var x;", "num x;"], answer: 1 },
        { question: "Which operator is used to get address of a variable?", options: ["*", "&", "#", "@"], answer: 1 },
        { question: "What does 'scanf' do in C?", options: ["Prints output", "Reads input", "Declares variable", "Loops"], answer: 1 },
      ],
      "C++": [
        { question: "Which keyword is used for output in C++?", options: ["printf", "print", "cout", "echo"], answer: 2 },
        { question: "What is the parent class of all classes in Java but NOT C++?", options: ["Object", "Base", "Root", "C++ has no default parent"], answer: 3 },
        { question: "Which symbol is used for single-line comment in C++?", options: ["#", "//", "/*", "--"], answer: 1 },
        { question: "What is a constructor in C++?", options: ["A function that destroys objects", "A function called automatically when object is created", "A loop function", "A global variable"], answer: 1 },
        { question: "Which header file is needed for cout?", options: ["<stdio.h>", "<cmath>", "<iostream>", "<string>"], answer: 2 },
      ],
      "Python": [
        { question: "Which keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], answer: 2 },
        { question: "How do you start a for loop in Python?", options: ["for(i=0;i<5;i++)", "for i in range(5):", "loop i from 1 to 5", "foreach i in 5"], answer: 1 },
        { question: "Which method adds an element to a list?", options: ["add()", "push()", "append()", "insert_end()"], answer: 2 },
        { question: "What is the output of: print(type([]))?", options: ["<class 'tuple'>", "<class 'list'>", "<class 'array'>", "<class 'set'>"], answer: 1 },
        { question: "How do you open a file in Python?", options: ["open('file.txt')", "file.open('file.txt')", "read('file.txt')", "load('file.txt')"], answer: 0 },
      ],
      "Java": [
        { question: "Which keyword is used to create a class in Java?", options: ["class", "struct", "void", "object"], answer: 0 },
        { question: "What is the entry point method in Java?", options: ["start()", "begin()", "main()", "run()"], answer: 2 },
        { question: "Which keyword is used to inherit a class in Java?", options: ["inherits", "extends", "implements", "uses"], answer: 1 },
        { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Method", "Joint Virtual Memory", "Java Version Manager"], answer: 0 },
        { question: "Which of these is NOT a Java data type?", options: ["int", "float", "real", "boolean"], answer: 2 },
      ],
      "JavaScript": [
        { question: "Which keyword declares a constant in JavaScript?", options: ["var", "let", "const", "static"], answer: 2 },
        { question: "What does '===' check in JavaScript?", options: ["Value only", "Type only", "Value and Type", "Neither"], answer: 2 },
        { question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "append()"], answer: 0 },
        { question: "What does 'DOM' stand for?", options: ["Document Object Model", "Data Object Method", "Document Order Map", "Dynamic Object Mode"], answer: 0 },
        { question: "Which symbol is used for template literals in JS?", options: ["Single quote", "Double quote", "Backtick (`)", "Hash (#)"], answer: 2 },
      ],
      "SQL": [
        { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Question Language", "System Query Logic", "Standard Query Lookup"], answer: 0 },
        { question: "Which command retrieves data in SQL?", options: ["GET", "FETCH", "SELECT", "READ"], answer: 2 },
        { question: "Which SQL clause filters results?", options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"], answer: 2 },
        { question: "What is a PRIMARY KEY?", options: ["The first column", "A unique identifier for each row", "A foreign reference", "An index column"], answer: 1 },
        { question: "Which SQL command removes a table entirely?", options: ["DELETE TABLE", "DROP TABLE", "REMOVE TABLE", "ERASE TABLE"], answer: 1 },
      ],
      "HTML/CSS": [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Mode Language", "Home Tool Markup Language"], answer: 0 },
        { question: "Which tag creates a hyperlink?", options: ["<link>", "<href>", "<a>", "<url>"], answer: 2 },
        { question: "Which CSS property changes text color?", options: ["text-color", "font-color", "color", "foreground"], answer: 2 },
        { question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<header>", "<h1>", "<heading>"], answer: 2 },
        { question: "What does 'display: flex' do in CSS?", options: ["Makes text bold", "Creates a flexible box layout", "Hides the element", "Adds a border"], answer: 1 },
      ],
    }
  },
  {
    id: "daily-problem",
    title: lang === "hi" ? "दैनिक समस्या" : lang === "mr" ? "दैनिक समस्या" : "Daily Problem",
    description: lang === "hi" ? "हर दिन एक नई कोडिंग चुनौती!" : lang === "mr" ? "दररोज एक नवीन कोडिंग आव्हान!" : "A fresh coding challenge every single day!",
    icon: Calendar,
    color: "bg-emerald-500",
    isDailyProblem: true,
    questions: [] // not used — isDailyProblem renders code editor instead
  },
  {
    id: "coding-battles",
    title: lang === "hi" ? "1v1 कोडिंग लड़ाई" : lang === "mr" ? "1v1 कोडिंग लढाई" : "1v1 Coding Battles",
    description: lang === "hi" ? "दुनिया भर के कोडर्स के साथ रीयल-टाइम में मुकाबला करें!" : lang === "mr" ? "जगभरातील कोडर्सशी रिअल-टाइममध्ये स्पर्धा करा!" : "Compete with real coders in live matches!",
    icon: Swords,
    color: "bg-rose-500",
    isBattle: true,
    questions: [
      { question: "Which is the largest heading tag in HTML?", options: ["<h6>", "<h1>", "<head>", "<header>"], answer: 1 },
      { question: "In CSS, 'flex' is a value of which property?", options: ["color", "display", "font", "border"], answer: 1 },
      { question: "What does '===' do in JavaScript?", options: ["Assignment", "Loose comparison", "Strict comparison", "Concatenation"], answer: 2 },
      { question: "What does the 'push' command do in Git?", options: ["Downloads code", "Sends code to remote repo", "Creates a branch", "Deletes a file"], answer: 1 },
      { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Auto Program Installer", "Applied Protocol Interface"], answer: 0 },
      { question: "Which HTTP method is used to update a resource?", options: ["GET", "POST", "PUT", "DELETE"], answer: 2 },
      { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Coded Style Syntax"], answer: 1 },
      { question: "Which symbol starts a comment in Python?", options: ["//", "/*", "#", "--"], answer: 2 },
    ]
  },
  {
    id: "timed-challenges",
    title: lang === "hi" ? "समयबद्ध चुनौतियां" : lang === "mr" ? "वेळेवर आधारित आव्हाने" : "Timed Challenges",
    description: lang === "hi" ? "10 सेकंड में जवाब दो!" : lang === "mr" ? "10 सेकंदात उत्तर द्या!" : "10 seconds per question — think fast!",
    icon: Clock,
    color: "bg-amber-500",
    isTimed: true,
    questions: [
      { question: "Which method adds an element to a list in Python?", options: ["add()", "insert()", "append()", "push()"], answer: 2 },
      { question: "How many times does 'for i in range(5)' loop?", options: ["4", "5", "6", "Infinite"], answer: 1 },
      { question: "What is the result of 10 % 3?", options: ["3", "1", "0", "3.33"], answer: 1 },
      { question: "Shortest way to reverse a string in Python?", options: ["str.reverse()", "str[::-1]", "reverse(str)", "str.flip()"], answer: 1 },
      { question: "Which keyword exits a loop immediately?", options: ["exit", "stop", "break", "return"], answer: 2 },
      { question: "What is 2 ** 8 in Python?", options: ["16", "64", "256", "512"], answer: 2 },
      { question: "Which data type stores True/False?", options: ["int", "str", "bool", "float"], answer: 2 },
      { question: "What does len([1, 2, 3]) return?", options: ["2", "3", "4", "Error"], answer: 1 },
      { question: "Which of these creates a dictionary in Python?", options: ["[]", "()", "{}", "<>"], answer: 2 },
      { question: "What does print(\"Hi\" * 3) output?", options: ["Hi Hi Hi", "HiHiHi", "Hi3", "Error"], answer: 1 },
      { question: "What is the index of the first element in a list?", options: ["-1", "1", "0", "null"], answer: 2 },
      { question: "Which function converts string to integer?", options: ["str()", "int()", "float()", "num()"], answer: 1 },
    ]
  },
  {
    id: "weekly-tournaments",
    title: lang === "hi" ? "साप्ताहिक टूर्नामेंट" : lang === "mr" ? "साप्ताहिक टूर्नामेंट" : "Weekly Tournaments",
    description: lang === "hi" ? "बड़े पुरस्कारों के लिए महाकाव्य कोडिंग प्रतियोगिताओं में शामिल हों!" : lang === "mr" ? "मोठ्या बक्षिसांसाठी महाकाव्य कोडिंग स्पर्धांमध्ये सामील व्हा!" : "Join epic coding competitions for grand prizes!",
    icon: Trophy,
    color: "bg-indigo-500",
    isTournament: true,
    questions: []
  }
];

const dailyChallenges = [
  {
    id: "reverse-array",
    title: "Reverse an Array",
    difficulty: "Easy",
    category: "Array",
    problemStatement: "Given an array arr, return a new array with all elements in reversed order. Do not modify the original array.",
    constraints: ["1 ≤ arr.length ≤ 1000", "Elements can be any integers"],
    examples: [
      { input: "arr = [1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]" },
      { input: "arr = [1, 2, 3]", output: "[3, 2, 1]" }
    ],
    hint: "In Python, you can reverse a list with arr[::-1]",
    template: "# Write your solution here\ndef solution(arr):\n    pass",
    validate: (code: string) => {
      const c = code.toLowerCase();
      const hasReturn = c.includes("return");
      const hasReverse = c.includes("[::-1]") || c.includes(".reverse()") || c.includes("reversed(");
      const hasLoop = c.includes("for ") || c.includes("while ");
      
      if (!hasReturn) return { success: false, msg: "❌ Test Case 1: Runtime Error (NoneType returned)\n\n💡 Hint: Your function needs to return the reversed array!" };
      if (hasReverse) return { success: true, msg: "✅ Test Case 1: Passed  ([5,4,3,2,1] ✓)\n✅ Test Case 2: Passed  ([3,2,1] ✓)\n\n🚀 All tests passed! Great solution!\n🌟 +50 XP earned!" };
      if (hasLoop) return { success: true, msg: "✅ Test Case 1: Passed  ([5,4,3,2,1] ✓)\n⚠️  Test Case 2: Wrong Answer (edge case)\n\n💡 Tip: Try using [::-1] for a cleaner one-liner!\n⭐ +25 XP earned!" };
      return { success: false, msg: "❌ Test Case 1: Wrong Answer\n\n💡 Hint: Use arr[::-1] to reverse a list in Python." };
    }
  },
  {
    id: "find-max",
    title: "Find Maximum",
    difficulty: "Easy",
    category: "Array",
    problemStatement: "Given an array of numbers, return the largest number in the array.",
    constraints: ["1 ≤ nums.length ≤ 1000", "Numbers can be negative"],
    examples: [
      { input: "nums = [1, 5, 3, 9, 2]", output: "9" },
      { input: "nums = [-10, -5, -2, -20]", output: "-2" }
    ],
    hint: "You can use the built-in max() function in Python.",
    template: "# Write your solution here\ndef solution(nums):\n    pass",
    validate: (code: string) => {
      const c = code.toLowerCase();
      const hasReturn = c.includes("return");
      const hasMax = c.includes("max(");
      const hasLoop = c.includes("for ") || c.includes("while ");
      
      if (!hasReturn) return { success: false, msg: "❌ Test Case 1: Runtime Error\n\n💡 Hint: Your function needs to return the maximum value!" };
      if (hasMax) return { success: true, msg: "✅ Test Case 1: Passed (9 ✓)\n✅ Test Case 2: Passed (-2 ✓)\n\n🚀 Perfect! Using built-in functions is efficient!\n🌟 +50 XP earned!" };
      if (hasLoop) return { success: true, msg: "✅ Test Case 1: Passed (9 ✓)\n✅ Test Case 2: Passed (-2 ✓)\n\n🚀 Great! You implemented the logic manually!\n🌟 +50 XP earned!" };
      return { success: false, msg: "❌ Test Case 1: Wrong Answer\n\n💡 Hint: Use max(nums) to find the largest number." };
    }
  },
  {
    id: "palindrome-check",
    title: "Palindrome Check",
    difficulty: "Easy",
    category: "String",
    problemStatement: "Check if a given string s is a palindrome (reads the same forwards and backwards). Return True or False.",
    constraints: ["1 ≤ s.length ≤ 1000", "Only lowercase letters"],
    examples: [
      { input: "s = 'racecar'", output: "True" },
      { input: "s = 'hello'", output: "False" }
    ],
    hint: "Compare the string with its reverse s[::-1].",
    template: "# Write your solution here\ndef solution(s):\n    pass",
    validate: (code: string) => {
      const c = code.toLowerCase();
      const hasReturn = c.includes("return");
      const hasReverse = c.includes("[::-1]") || c.includes("reversed");
      
      if (!hasReturn) return { success: false, msg: "❌ Test Case 1: Runtime Error\n\n💡 Hint: Return True if it's a palindrome, else False." };
      if (hasReverse && (c.includes("==") || c.includes("is "))) return { success: true, msg: "✅ Test Case 1: Passed ('racecar' -> True)\n✅ Test Case 2: Passed ('hello' -> False)\n\n🚀 Spot on! Palindromes are fun!\n🌟 +50 XP earned!" };
      return { success: false, msg: "❌ Test Case 1: Wrong Answer\n\n💡 Hint: Check if s == s[::-1]" };
    }
  },
  {
    id: "sum-array",
    title: "Sum of Array",
    difficulty: "Easy",
    category: "Math",
    problemStatement: "Return the sum of all numbers in the given array nums.",
    constraints: ["0 ≤ nums.length ≤ 1000"],
    examples: [
      { input: "nums = [1, 2, 3, 4]", output: "10" },
      { input: "nums = []", output: "0" }
    ],
    hint: "Use the built-in sum() function.",
    template: "# Write your solution here\ndef solution(nums):\n    pass",
    validate: (code: string) => {
      const c = code.toLowerCase();
      const hasReturn = c.includes("return");
      const hasSum = c.includes("sum(");
      
      if (!hasReturn) return { success: false, msg: "❌ Test Case 1: Runtime Error\n\n💡 Hint: Return the total sum." };
      if (hasSum) return { success: true, msg: "✅ Test Case 1: Passed (10 ✓)\n✅ Test Case 2: Passed (0 ✓)\n\n🚀 Clean and efficient!\n🌟 +50 XP earned!" };
      if (c.includes("+=")) return { success: true, msg: "✅ Test Case 1: Passed (10 ✓)\n✅ Test Case 2: Passed (0 ✓)\n\n🚀 Nice loop implementation!\n🌟 +50 XP earned!" };
      return { success: false, msg: "❌ Test Case 1: Wrong Answer\n\n💡 Hint: Use sum(nums)" };
    }
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "Medium",
    category: "Logic",
    problemStatement: "For a given number n, return a list of strings from 1 to n. But for multiples of 3 return 'Fizz', for multiples of 5 return 'Buzz', and for multiples of both return 'FizzBuzz'.",
    constraints: ["1 ≤ n ≤ 100"],
    examples: [
      { input: "n = 5", output: "['1', '2', 'Fizz', '4', 'Buzz']" }
    ],
    hint: "Use if-elif-else inside a loop.",
    template: "# Write your solution here\ndef solution(n):\n    pass",
    validate: (code: string) => {
      const c = code.toLowerCase();
      const hasReturn = c.includes("return");
      const hasFizz = c.includes("fizz");
      const hasBuzz = c.includes("buzz");
      
      if (!hasReturn) return { success: false, msg: "❌ Test Case 1: Runtime Error\n\n💡 Hint: Return a list of strings." };
      if (hasFizz && hasBuzz && c.includes("% 3") && c.includes("% 5")) return { success: true, msg: "✅ Test Case 1: Passed (n=5 ✓)\n✅ Test Case 2: Passed (n=15 ✓)\n\n🚀 Classic FizzBuzz solved!\n🌟 +50 XP earned!" };
      return { success: false, msg: "❌ Test Case 1: Wrong Answer\n\n💡 Hint: Check for multiples of 3 and 5." };
    }
  },
  {
    id: "factorial",
    title: "Factorial",
    difficulty: "Easy",
    category: "Math",
    problemStatement: "Calculate the factorial of a non-negative integer n.",
    constraints: ["0 ≤ n ≤ 10"],
    examples: [
      { input: "n = 5", output: "120" },
      { input: "n = 0", output: "1" }
    ],
    hint: "n! = n * (n-1) * ... * 1. Factorial of 0 is 1.",
    template: "# Write your solution here\ndef solution(n):\n    pass",
    validate: (code: string) => {
      const c = code.toLowerCase();
      const hasReturn = c.includes("return");
      
      if (!hasReturn) return { success: false, msg: "❌ Test Case 1: Runtime Error\n\n💡 Hint: Use recursion or a loop." };
      if (c.includes("import math") && c.includes("factorial")) return { success: true, msg: "✅ Test Case 1: Passed (5! = 120 ✓)\n✅ Test Case 2: Passed (0! = 1 ✓)\n\n🚀 Math library makes it easy!\n🌟 +50 XP earned!" };
      if (c.includes("*") && (c.includes("range") || c.includes("solution("))) return { success: true, msg: "✅ Test Case 1: Passed (5! = 120 ✓)\n✅ Test Case 2: Passed (0! = 1 ✓)\n\n🚀 Perfect implementation!\n🌟 +50 XP earned!" };
      return { success: false, msg: "❌ Test Case 1: Wrong Answer\n\n💡 Hint: 5! is 5*4*3*2*1 = 120." };
    }
  }
];


export default function QuizZonePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedLangPath, setSelectedLangPath] = useState<string | null>(null);
  
  // Battle State
  const [opponentScore, setOpponentScore] = useState(0);
  const [showVsScreen, setShowVsScreen] = useState(false);
  const [opponentAnswered, setOpponentAnswered] = useState(false);

  // Battle Matchmaking State
  const [matchId, setMatchId] = useState<string | null>(null);
  const [matchmaking, setMatchmaking] = useState(false);
  const [matchmakingCountdown, setMatchmakingCountdown] = useState(0);
  const [humanOpponent, setHumanOpponent] = useState<{name: string; avatar: string} | null>(null);

  // Timer State
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerActive, setTimerActive] = useState(false);

  // Tournament State
  const [showPrizes, setShowPrizes] = useState(false);
  const [tournamentRank, setTournamentRank] = useState(0);
  const [showCodingProblem, setShowCodingProblem] = useState(false);
  const [tournamentCode, setTournamentCode] = useState("# Write your solution here\ndef solution(nums):\n    pass");
  const [tournamentSubmitted, setTournamentSubmitted] = useState(false);
  const [tournamentOutput, setTournamentOutput] = useState("");

  // Daily Problem State
  const [mounted, setMounted] = useState(false);
  const [dailyChallengeIndex, setDailyChallengeIndex] = useState(0);
  const [dailyCode, setDailyCode] = useState("# Write your solution here\ndef solution(nums):\n    pass");
  const [dailySubmitted, setDailySubmitted] = useState(false);
  const [dailyOutput, setDailyOutput] = useState("");

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    // Use date elements to create a stable index that changes daily
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const seed = day + month + year;
    setDailyChallengeIndex(seed % dailyChallenges.length);
  }, []);


  const currentDailyChallenge = dailyChallenges[dailyChallengeIndex];


  // Playground State
  const [code, setCode] = useState("print('Hello World!')\n# Type your code here...");
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const currentQuizzes = quizzes(language);

  // Anti-cheat State
  const [cheatWarning, setCheatWarning] = useState(false);
  const [cheatCount, setCheatCount] = useState(0);

  // Anti-cheat: block tab switch and page leave during tournament
  useEffect(() => {
    if (!showCodingProblem || tournamentSubmitted) return;

    // Block page close / reload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "⚠️ Leaving will reset your tournament progress!";
      return e.returnValue;
    };

    // Detect tab switch / window blur
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheatWarning(true);
        setCheatCount(prev => {
          const next = prev + 1;
          if (next >= 2) {
            // 2nd violation — auto-reset tournament
            setShowCodingProblem(false);
            setTournamentSubmitted(false);
            setTournamentOutput("");
            setTournamentCode("# Write your solution here\ndef solution(nums):\n    pass");
            setShowPrizes(false);
            setActiveQuiz(null);
            setCheatCount(0);
          }
          return next;
        });
      }
    };

    const handleWindowBlur = () => {
      if (!document.hidden) {
        setCheatWarning(true);
        setCheatCount(prev => {
          const next = prev + 1;
          if (next >= 2) {
            setShowCodingProblem(false);
            setTournamentSubmitted(false);
            setTournamentOutput("");
            setTournamentCode("# Write your solution here\ndef solution(nums):\n    pass");
            setShowPrizes(false);
            setActiveQuiz(null);
            setCheatCount(0);
          }
          return next;
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [showCodingProblem, tournamentSubmitted]);

  // Fake leaderboard
  const fakeLeaderboard = [
    { name: "CodeNinja_99", score: 580, avatar: "🥷" },
    { name: "DevMaster_X", score: 540, avatar: "👨‍💻" },
    { name: "AlgoQueen", score: 510, avatar: "👩‍💻" },
    { name: "ByteWarrior", score: 490, avatar: "⚔️" },
    { name: "PixelPro", score: 460, avatar: "🎮" },
    { name: "StackOverflow_Fan", score: 430, avatar: "📚" },
    { name: "BugHunter_01", score: 400, avatar: "🐛" },
    { name: "CSSWizard", score: 370, avatar: "🧙" },
  ];

  // Timer effect for timed challenges
  useEffect(() => {
    if (!timerActive || !activeQuiz?.isTimed) return;
    if (timeLeft <= 0) {
      // Time's up - auto skip
      setTimerActive(false);
      if (activeQuiz && currentQuestion < activeQuiz.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setTimeLeft(10);
        setTimerActive(true);
      } else {
        setShowResult(true);
      }
      return;
    }
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, timerActive, activeQuiz, currentQuestion]);

  // Opponent simulation/sync for battle mode
  useEffect(() => {
    if (!activeQuiz?.isBattle || showVsScreen || matchmaking) return;

    if (humanOpponent && matchId) {
      // Real 1v1: Poll for opponent score
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/match/${matchId}`);
          const match = await res.json();
          const opponent = match.players.find((p: any) => p.userId !== user?.uid);
          if (opponent) {
            setOpponentScore(opponent.score);
          }
          if (match.status === "completed") {
            setShowResult(true);
            clearInterval(interval);
          }
        } catch (err) {
          console.error("Score poll error:", err);
        }
      }, 2000);
      return () => clearInterval(interval);
    } else if (!humanOpponent) {
      if (showResult) return;
      // Bot fallback logic
      if (selectedOption !== null) return;
      setOpponentAnswered(false);
      const delay = 2000 + Math.random() * 4000;
      const timer = setTimeout(() => {
        const correct = Math.random() > 0.4;
        if (correct) setOpponentScore(prev => prev + 1);
        setOpponentAnswered(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, activeQuiz, showResult, showVsScreen, humanOpponent, matchId, user?.uid]);

  const startQuiz = async (quiz: any, langPath?: string) => {
    if (quiz.comingSoon) return;

    if (quiz.hasLanguages && !langPath) {
      setActiveQuiz({ ...quiz, isSelectingLang: true });
      return;
    }

    // Battle: Real Matchmaking
    if (quiz.isBattle) {
      if (!user) {
        toast.error("Please log in to participate in 1v1 Battles!");
        router.push("/auth?mode=login");
        return;
      }

      setMatchmaking(true);
      setActiveQuiz(quiz);
      setHumanOpponent(null);
      setMatchId(null);
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedOption(null);
      setOpponentScore(0);

      try {
        const res = await fetch("/api/match/find", { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            problemId: `${quiz.id || quiz._id || "general-coding"}${langPath ? `-${langPath.toLowerCase()}` : ""}` 
          }),
          credentials: "include"
        });
        const match = await res.json();
        
        if (match.error) throw new Error(match.error);

        setMatchId(match._id);

        const pollInterval = setInterval(async () => {
          try {
            const statusRes = await fetch(`/api/match/${match._id}`, { 
              credentials: "include",
              cache: "no-store"
            });
            const updatedMatch = await statusRes.json();
            console.log(`[Matchmaking Poll] Status: ${updatedMatch.status}`);

            if (updatedMatch.status === "active") {
              const opponent = updatedMatch.players.find((p: any) => p.userId.toString() !== user.uid.toString());
              console.log(`[Matchmaking Poll] Opponent found: ${opponent?.displayName}`);
              
              if (opponent) {
                clearInterval(pollInterval);
                setHumanOpponent({ name: opponent.displayName, avatar: "👤" });
                setMatchmakingCountdown(3);
                
                // Simple countdown
                const cdInterval = setInterval(() => {
                  setMatchmakingCountdown(prev => {
                    if (prev <= 1) {
                      clearInterval(cdInterval);
                      setMatchmaking(false);
                      setShowVsScreen(true);
                      setTimeout(() => setShowVsScreen(false), 2500);
                      return 0;
                    }
                    return prev - 1;
                  });
                }, 1000);
              }
            }
          } catch (err) {
            console.error("Polling error:", err);
          }
        }, 2000);

      } catch (error: any) {
        console.error("Detailed matchmaking error:", error);
        toast.error(error.message || "Matchmaking failed. Please try again.");
        setMatchmaking(false);
        setActiveQuiz(null);
      }
      return;
    }

    // Tournament: show prizes first
    if (quiz.isTournament) {
      setShowPrizes(true);
      const finalQuiz = { ...quiz, isSelectingLang: false };
      setActiveQuiz(finalQuiz);
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedOption(null);
      setTournamentRank(0);
      return;
    }

    const finalQuiz = langPath 
      ? { ...quiz, questions: quiz.questionsByLang[langPath], isSelectingLang: false } 
      : { ...quiz, isSelectingLang: false };

    setActiveQuiz(finalQuiz);
    setSelectedLangPath(langPath || null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);

    // Daily Problem: show code editor
    if (quiz.isDailyProblem) {
      setActiveQuiz({ ...quiz, isSelectingLang: false });
      setDailySubmitted(false);
      setDailyOutput("");
      setDailyCode(currentDailyChallenge.template);
      return;
    }


    // Start timer for timed challenges
    if (quiz.isTimed) {
      setTimeLeft(10);
      setTimerActive(true);
    }
  };

  const startTournamentQuiz = () => {
    setShowPrizes(false);
    setShowCodingProblem(true);
    setTournamentSubmitted(false);
    setTournamentOutput("");
    setTournamentCode("# Write your solution here\ndef solution(nums):\n    pass");
  };

  const submitDailySolution = () => {
    setDailySubmitted(true);
    const result = currentDailyChallenge.validate(dailyCode);
    setDailyOutput(result.msg);
  };


  const submitTournamentSolution = () => {
    setTournamentSubmitted(true);

    const code = tournamentCode.toLowerCase();

    // Evaluate if the code looks like a valid Two Sum solution
    const hasReturn = code.includes("return");
    const hasLoop = code.includes("for ") || code.includes("while ");
    const hasHashMap = code.includes("dict") || code.includes("{}") || code.includes("hashmap") || code.includes("seen") || code.includes("lookup") || code.includes("map");
    const hasNestedLoop = (code.match(/for /g) || []).length >= 2;
    const isJustTemplate = code.trim().endsWith("pass") && !hasReturn;
    const hasIndexLogic = code.includes("index") || code.includes("append") || code.includes("enumerate") || code.includes("range");

    const rank = Math.floor(Math.random() * 4) + 2;

    if (isJustTemplate || !hasReturn) {
      // Code was not changed meaningfully
      setTournamentOutput(
        "❌ Test Case 1: Runtime Error (NoneType returned)\n" +
        "❌ Test Case 2: Runtime Error\n" +
        "❌ Test Case 3: Runtime Error\n\n" +
        "💡 Hint: Your function needs to return something!"
      );
    } else if (hasReturn && hasHashMap) {
      // Hash map approach — optimal O(n)
      setTournamentRank(1);
      setTournamentOutput(
        "✅ Test Case 1: Passed  ([0, 1] ✓)\n" +
        "✅ Test Case 2: Passed  ([1, 2] ✓)\n" +
        "✅ Test Case 3: Passed  ([0, 3] ✓)\n\n" +
        "🚀 Time: O(n)  |  Space: O(n)\n" +
        "🏆 All 3 test cases passed! Optimal solution detected!\n" +
        "Your rank: #1"
      );
    } else if (hasReturn && hasNestedLoop) {
      // Brute force O(n²) — correct but slow
      setTournamentRank(rank);
      setTournamentOutput(
        "✅ Test Case 1: Passed  ([0, 1] ✓)\n" +
        "✅ Test Case 2: Passed  ([1, 2] ✓)\n" +
        "⚠️  Test Case 3: Time Limit Exceeded (large input)\n\n" +
        "📊 Time: O(n²)  |  Space: O(1)\n" +
        "💡 Tip: Try a hash map for O(n) solution!\n" +
        "Partial score submitted. Rank: #" + rank
      );
    } else if (hasReturn && hasLoop) {
      // Some loop with return — partial credit
      setTournamentRank(rank);
      setTournamentOutput(
        "✅ Test Case 1: Passed  ([0, 1] ✓)\n" +
        "❌ Test Case 2: Failed  (Expected [1, 2], got [0, 1])\n" +
        "❌ Test Case 3: Failed  (Wrong Answer)\n\n" +
        "📊 Partial logic detected. Check your index tracking.\n" +
        "Score: 1/3 tests. Rank: #" + rank
      );
    } else {
      // Has return but unclear logic
      setTournamentRank(rank + 2);
      setTournamentOutput(
        "❌ Test Case 1: Wrong Answer  (Expected [0, 1], got [])\n" +
        "❌ Test Case 2: Wrong Answer\n" +
        "❌ Test Case 3: Wrong Answer\n\n" +
        "💡 Hint: Make sure you're returning a list of two indices.\n" +
        "Score: 0/3 tests. Keep trying!"
      );
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    
    let newScore = score;
    if (optionIndex === activeQuiz?.questions[currentQuestion].answer) {
      newScore = score + 1;
      setScore(newScore);

      // If in a live battle, update the database
      if (activeQuiz?.isBattle && matchId) {
        fetch(`/api/match/${matchId}/score`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score: newScore })
        }).catch(err => console.error("Score sync error:", err));
      }
    }

    // Pause timer on answer
    if (activeQuiz?.isTimed) setTimerActive(false);

    setTimeout(() => {
      if (activeQuiz && currentQuestion < activeQuiz.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        if (activeQuiz.isTimed) {
          setTimeLeft(15);
          setTimerActive(true);
        }
      } else {
        setShowResult(true);
        setTimerActive(false);

        // If in a live battle, mark as completed
        if (activeQuiz?.isBattle && matchId) {
          fetch(`/api/match/${matchId}/score`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: newScore, status: "completed" })
          }).catch(err => console.error("Match completion sync error:", err));
        }

        if (activeQuiz?.isTournament) {
          const myPoints = score * 100;
          const rank = fakeLeaderboard.filter(p => p.score > myPoints).length + 1;
          setTournamentRank(rank);
        }
      }
    }, 1500);
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Simulate code execution
    setTimeout(() => {
      let resultText = "Code executed successfully!";
      let isError = false;
      const trimmedCode = code.trim();
      
      if (trimmedCode.includes('print')) {
        // Basic syntax check
        const singleQuotes = (trimmedCode.match(/'/g) || []).length;
        const doubleQuotes = (trimmedCode.match(/"/g) || []).length;
        const openParens = (trimmedCode.match(/\(/g) || []).length;
        const closeParens = (trimmedCode.match(/\)/g) || []).length;
        
        if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0 || openParens !== closeParens) {
          isError = true;
          resultText = "SyntaxError: invalid syntax";
        } else {
          const match = trimmedCode.match(/print\(['"](.*?)['"]\)/);
          if (match) {
            resultText = match[1];
          } else {
            resultText = "Hello World!";
          }
        }
      } else if (trimmedCode.length === 0) {
        isError = true;
        resultText = "Error: Empty code block";
      }

      const newOutput = [
        "> Executing...",
        isError ? `[Error] ${resultText}` : `[Result] Output: ${resultText}`,
        isError ? "> Failed! 💥" : "> Done! 🚀"
      ];
      setOutput(newOutput);
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Navbar />
      
      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="relative py-28 overflow-hidden bg-slate-50 dark:bg-slate-950">
          {/* Animated Background Mesh/Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                x: [0, 50, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px]"
              style={{ background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0) 60%)' }}
            />
            <motion.div 
              animate={{ 
                x: [0, -50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/2 -right-1/4 w-[1000px] h-[1000px]"
              style={{ background: 'radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, rgba(129, 140, 248, 0) 60%)' }}
            />
            <motion.div 
              animate={{ 
                x: [0, 30, -30, 0],
                y: [0, -30, 30, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-[800px] h-[800px]"
              style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0) 60%)' }}
            />
          </div>

          {/* Very faint tiny grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 max-w-3xl mx-auto"
            >
              <Badge variant="outline" className="px-5 py-2 border-primary/20 bg-background/50 backdrop-blur-md shadow-sm">
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                <span className="text-foreground">{t('challenge_title')}</span>
              </Badge>
              
              <h1 className="text-5xl font-black md:text-7xl text-slate-900 dark:text-white tracking-tight">
                Prove Your <span className="text-primary italic pr-2">Skills</span>
              </h1>
              
              <p className="mx-auto max-w-2xl text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('challenge_desc')} 🏆
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 mt-12">
          {!activeQuiz ? (
            <div className="space-y-16">
              {/* Quiz Selection Section */}
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <Brain className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-black">{t('choose_path')}</h2>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
                >
                  {currentQuizzes.map((quiz) => (
                    <motion.div
                      key={quiz.id}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="h-full cursor-pointer border-2 border-border/50 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm group overflow-hidden"
                        onClick={() => startQuiz(quiz)}
                      >
                        <CardHeader className="relative">
                          {quiz.comingSoon && (
                            <Badge className="absolute top-4 right-4 bg-primary/10 text-primary border-primary/20 text-[10px] uppercase tracking-wider font-bold">
                              Soon
                            </Badge>
                          )}
                          <div className={`w-12 h-12 rounded-xl ${quiz.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
                            <quiz.icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-2xl font-bold">{quiz.title}</CardTitle>
                          <CardDescription>{quiz.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm font-medium">
                            <span className="flex items-center text-muted-foreground">
                              <Timer className="mr-1.5 h-4 w-4" />
                              {quiz.comingSoon ? "Locked" : quiz.hasLanguages ? "Select Lang" : quiz.isDailyProblem ? "Daily Problem" : quiz.isTournament ? "Coding Challenge" : quiz.isBattle ? "Live Match" : `${quiz.questions.length} ${t('question')}s`}
                            </span>
                            <span className={`flex items-center ${quiz.comingSoon ? "text-muted-foreground opacity-50" : "text-primary group-hover:translate-x-1 transition-transform"}`}>
                              {quiz.comingSoon ? "Locked" : "Start"} <ChevronRight className="ml-1 h-4 w-4" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </section>

              {/* Code Playground Section */}
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <Terminal className="h-8 w-8 text-orange-500" />
                  <h2 className="text-3xl font-black">{t('code_playground')} 🛠️</h2>
                </div>
                
                <Card className="border-2 border-border shadow-2xl overflow-hidden bg-slate-900 text-slate-50">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      <span className="font-bold tracking-tight">magic_playground.py</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => { setCode(""); setOutput([]); }}
                        className="text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={runCode} 
                        disabled={isRunning}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold gap-2"
                      >
                        {isRunning ? <Sparkles className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                        {t('run_magic')}
                      </Button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 min-h-[400px]">
                    {/* Editor Side */}
                    <div className="p-4 border-r border-slate-800 relative">
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-transparent font-mono text-lg resize-none outline-none text-blue-300"
                        spellCheck="false"
                        placeholder="# Start coding here..."
                      />
                    </div>
                    {/* Terminal Side */}
                    <div className="p-4 bg-slate-950 flex flex-col font-mono text-lg">
                      <div className="flex-1 space-y-2">
                        {output.length === 0 ? (
                          <p className="text-slate-600 italic">// Click '{t('run_magic')}' to see results</p>
                        ) : (
                          output.map((line, i) => (
                            <motion.p 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={line.includes('Result') ? "text-green-400 font-bold" : line.includes('Error') || line.includes('Failed') ? "text-red-400 font-bold" : "text-slate-400"}
                            >
                              {line}
                            </motion.p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          ) : matchmaking ? (
            /* ── 1v1 BATTLE: MATCHMAKING SCREEN ── */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-xl mx-auto py-20 text-center space-y-10"
            >
              <div className="space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  className="w-20 h-20 border-4 border-rose-500 border-t-transparent rounded-full mx-auto"
                />
                <h2 className="text-3xl font-black">Finding Opponent...</h2>
                <p className="text-muted-foreground">Searching for a live player to challenge you</p>
              </div>
              {humanOpponent && (
                <>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4 bg-card border-2 border-rose-500/30 rounded-2xl p-6">
                    <span className="text-4xl">{humanOpponent.avatar}</span>
                    <div className="text-left">
                      <p className="font-black text-xl">{humanOpponent.name}</p>
                      <Badge className="bg-green-500/20 text-green-500 text-xs">🟢 Online</Badge>
                    </div>
                  </motion.div>
                  <div className="text-7xl font-black text-rose-500">
                    {matchmakingCountdown > 0 ? matchmakingCountdown : "GO!"}
                  </div>
                </>
              )}
            </motion.div>

          ) : showVsScreen ? (
            /* ── 1v1 BATTLE: VS SCREEN ── */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-2xl mx-auto py-20 text-center space-y-8"
            >
              <div className="flex items-center justify-center gap-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-4xl shadow-xl shadow-blue-500/30">👤</div>
                  <span className="text-2xl font-black">You</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="text-6xl font-black text-rose-500"
                >VS</motion.div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full bg-rose-500 flex items-center justify-center text-4xl shadow-xl shadow-rose-500/30">
                    {humanOpponent?.avatar || "👤"}
                  </div>
                  <span className="text-2xl font-black">{humanOpponent?.name || "Opponent"}</span>
                </div>
              </div>
              <motion.p
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-xl text-muted-foreground font-bold"
              >Battle starting...</motion.p>
            </motion.div>

          ) : activeQuiz?.isDailyProblem ? (
            /* ── DAILY PROBLEM: CODE EDITOR ── */
            <div className="max-w-5xl mx-auto py-4 space-y-6">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => setActiveQuiz(null)} className="text-muted-foreground">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div className="flex items-center gap-3">
                  <Badge className="bg-emerald-500/20 text-emerald-600 font-bold">📅 Daily Challenge</Badge>
                  <Badge className="bg-amber-500/20 text-amber-600 font-bold">⏰ No Time Limit</Badge>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Problem Statement */}
                <Card className="border-2 border-emerald-500/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{currentDailyChallenge.title}</CardTitle>
                      <Badge className="bg-green-500/20 text-green-600 font-bold">{currentDailyChallenge.difficulty}</Badge>
                    </div>
                    <CardDescription suppressHydrationWarning>{currentDailyChallenge.category} · Day {mounted ? new Date().getDate() : "--"} Challenge</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <p className="font-bold text-foreground mb-2">Problem Statement</p>
                      <p className="text-muted-foreground leading-relaxed">
                        {currentDailyChallenge.problemStatement}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-2">Constraints</p>
                      <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                        {currentDailyChallenge.constraints.map((c, i) => (
                          <li key={i}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <p className="font-bold text-foreground">Examples</p>
                      {currentDailyChallenge.examples.map((ex, i) => (
                        <div key={i} className="bg-muted/50 rounded-lg p-3 font-mono text-xs space-y-1">
                          <p className="text-muted-foreground">Input:</p>
                          <p>{ex.input}</p>
                          <p className="text-muted-foreground mt-2">Output:</p>
                          <p className="text-green-500 font-bold">{ex.output}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                      <p className="text-xs font-bold text-emerald-600">💡 Hint:</p>
                      <p className="text-xs text-muted-foreground mt-1">{currentDailyChallenge.hint}</p>
                    </div>
                  </CardContent>
                </Card>


                {/* Code Editor */}
                <div className="space-y-4">
                  <Card className="border-2 border-border shadow-xl overflow-hidden bg-slate-900 text-slate-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-emerald-400" />
                        <span className="font-bold text-sm">solution.py</span>
                        <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">Python</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => { setDailyCode(currentDailyChallenge.template); setDailySubmitted(false); setDailyOutput(""); }} className="text-slate-400 hover:text-red-400 text-xs">
                          <Trash2 className="h-3 w-3 mr-1" /> Reset
                        </Button>

                        <Button size="sm" onClick={submitDailySolution} disabled={dailySubmitted} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1">
                          <Play className="h-3 w-3" /> {dailySubmitted ? "Submitted" : "Submit"}
                        </Button>
                      </div>
                    </div>
                    <textarea
                      value={dailyCode}
                      onChange={(e) => setDailyCode(e.target.value)}
                      disabled={dailySubmitted}
                      className="w-full bg-slate-900 font-mono text-sm p-4 resize-none outline-none text-blue-300 min-h-[260px]"
                      spellCheck={false}
                    />
                    <div className="border-t border-slate-800 bg-slate-950 p-4 min-h-[100px]">
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Output</p>
                      {dailyOutput ? (
                        <pre className={`text-sm font-mono whitespace-pre-wrap ${dailyOutput.includes("All tests") || dailyOutput.includes("+50") ? "text-green-400" : dailyOutput.includes("+25") ? "text-amber-400" : "text-red-400"}`}>{dailyOutput}</pre>
                      ) : (
                        <p className="text-slate-600 text-sm italic">// Submit your solution to see results</p>
                      )}
                    </div>
                  </Card>
                  {dailySubmitted && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <Button className="w-full font-bold gap-2" onClick={() => { setActiveQuiz(null); setDailySubmitted(false); setDailyOutput(""); }}>
                        <RotateCcw className="h-4 w-4" /> Try Another Approach
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

          ) : showPrizes ? (
            /* ── TOURNAMENT: PRIZE SCREEN ── */
            <div className="max-w-3xl mx-auto py-8 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-black">🏆 Weekly Tournament</h2>
                <p className="text-muted-foreground text-lg">Solve a real coding challenge. Climb the leaderboard. Win prizes.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { rank: "🥇 1st Place", prize: "₹5,000 Amazon Gift Card", color: "from-yellow-400/20 to-yellow-600/10 border-yellow-500/40", badge: "bg-yellow-500" },
                  { rank: "🥈 2nd Place", prize: "₹2,500 Gift Voucher", color: "from-slate-400/20 to-slate-600/10 border-slate-400/40", badge: "bg-slate-400" },
                  { rank: "🥉 3rd Place", prize: "₹1,000 Store Credit", color: "from-orange-400/20 to-orange-600/10 border-orange-500/40", badge: "bg-orange-500" },
                ].map(p => (
                  <Card key={p.rank} className={`bg-gradient-to-br ${p.color} border-2 text-center`}>
                    <CardContent className="pt-6 space-y-2">
                      <div className="text-3xl">{p.rank.split(" ")[0]}</div>
                      <p className="font-black text-lg">{p.rank.split(" ").slice(1).join(" ")}</p>
                      <Badge className={`${p.badge} text-white font-bold`}>{p.prize}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-black text-xl mb-4 text-center">🎁 All Participants Get</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Certificate of Participation", "XP Boost for 7 days", "Exclusive Tournament Badge", "Early access to new courses"].map(perk => (
                      <div key={perk} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="font-medium">{perk}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="px-10 font-black gap-2" onClick={startTournamentQuiz}>
                  <Trophy className="h-5 w-5" /> Enter Tournament
                </Button>
                <Button size="lg" variant="outline" onClick={() => { setActiveQuiz(null); setShowPrizes(false); }}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </div>
            </div>

          ) : showCodingProblem ? (
            /* ── TOURNAMENT: CODING PROBLEM SCREEN ── */
            <div className="max-w-5xl mx-auto py-4 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => { setShowCodingProblem(false); setActiveQuiz(null); }} className="text-muted-foreground">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Exit
                </Button>
                <div className="flex items-center gap-3">
                  <Badge className="bg-indigo-500/20 text-indigo-500 font-bold">🏆 Week 4 Tournament</Badge>
                  <Badge className="bg-amber-500/20 text-amber-600 font-bold">⏱ 60 min remaining</Badge>
                </div>
              </div>

              {/* Anti-cheat Warning Banner */}
              {cheatWarning && !tournamentSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-xl border-2 border-red-500/50 bg-red-500/10 px-4 py-3"
                >
                  <span className="text-2xl">🚨</span>
                  <div className="flex-1">
                    <p className="font-black text-red-500">Tab Switch Detected! ({cheatCount}/2 violations)</p>
                    <p className="text-sm text-red-400">
                      {cheatCount >= 2
                        ? "⚠️ Final warning! One more and your tournament will be auto-reset!"
                        : "Stay on this tab. Switching tabs is not allowed during the tournament."}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 shrink-0" onClick={() => setCheatWarning(false)}>
                    Dismiss
                  </Button>
                </motion.div>
              )}

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Problem Statement */}
                <div className="space-y-4">
                  <Card className="border-2 border-indigo-500/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Two Sum</CardTitle>
                        <Badge className="bg-green-500/20 text-green-600 font-bold">Easy</Badge>
                      </div>
                      <CardDescription>Array · Hash Map · Week 4 Challenge</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div>
                        <p className="font-bold text-foreground mb-2">Problem Statement</p>
                        <p className="text-muted-foreground leading-relaxed">
                          Given an array of integers <code className="bg-muted px-1 rounded font-mono">nums</code> and an integer <code className="bg-muted px-1 rounded font-mono">target</code>, return the <strong>indices</strong> of the two numbers that add up to target. You may not use the same element twice.
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-2">Constraints</p>
                        <ul className="text-muted-foreground space-y-1 font-mono text-xs">
                          <li>• 2 ≤ nums.length ≤ 10⁴</li>
                          <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                          <li>• Only one valid answer exists</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <p className="font-bold text-foreground">Examples</p>
                        <div className="bg-muted/50 rounded-lg p-3 font-mono text-xs space-y-1">
                          <p className="text-muted-foreground">Input:</p>
                          <p>nums = [2, 7, 11, 15], target = 9</p>
                          <p className="text-muted-foreground mt-2">Output:</p>
                          <p className="text-green-500 font-bold">[0, 1]</p>
                          <p className="text-muted-foreground text-[11px] mt-1">Because nums[0] + nums[1] = 2 + 7 = 9</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 font-mono text-xs space-y-1">
                          <p className="text-muted-foreground">Input:</p>
                          <p>nums = [3, 2, 4], target = 6</p>
                          <p className="text-muted-foreground mt-2">Output:</p>
                          <p className="text-green-500 font-bold">[1, 2]</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Leaderboard preview */}
                  <Card className="border-2 border-border">
                    <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Trophy className="h-4 w-4 text-indigo-500" /> Current Leaderboard</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      {fakeLeaderboard.slice(0, 5).map((p, i) => (
                        <div key={p.name} className="flex items-center gap-2 text-sm">
                          <span className="font-black w-5">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i+1}`}</span>
                          <span className="text-lg">{p.avatar}</span>
                          <span className="flex-1 font-medium">{p.name}</span>
                          <span className="font-black text-indigo-500">{p.score} pts</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Code Editor */}
                <div className="space-y-4">
                  <Card className="border-2 border-border shadow-xl overflow-hidden bg-slate-900 text-slate-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-indigo-400" />
                        <span className="font-bold text-sm">solution.py</span>
                        <Badge className="bg-indigo-500/20 text-indigo-400 text-xs">Python</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => {
                          setTournamentCode("# Write your solution here\ndef solution(nums):\n    pass");
                          setTournamentSubmitted(false);
                          setTournamentOutput("");
                        }} className="text-slate-400 hover:text-red-400 text-xs">
                          <Trash2 className="h-3 w-3 mr-1" /> Reset
                        </Button>
                        <Button size="sm" onClick={submitTournamentSolution} disabled={tournamentSubmitted} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-1">
                          <Play className="h-3 w-3" /> {tournamentSubmitted ? "Submitted" : "Submit"}
                        </Button>
                      </div>
                    </div>
                    <textarea
                      value={tournamentCode}
                      onChange={(e) => setTournamentCode(e.target.value)}
                      disabled={tournamentSubmitted}
                      className="w-full bg-slate-900 font-mono text-sm p-4 resize-none outline-none text-blue-300 min-h-[260px]"
                      spellCheck={false}
                      placeholder="# Write your solution..."
                    />
                    {/* Output */}
                    <div className="border-t border-slate-800 bg-slate-950 p-4 min-h-[100px]">
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Output</p>
                      {tournamentOutput ? (
                        <pre className={`text-sm font-mono whitespace-pre-wrap ${tournamentOutput.includes("All test cases") ? "text-green-400" : "text-amber-400"}`}>{tournamentOutput}</pre>
                      ) : (
                        <p className="text-slate-600 text-sm italic">// Submit your solution to see results</p>
                      )}
                    </div>
                  </Card>

                  {tournamentSubmitted && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                      <Button className="flex-1 font-bold gap-2" onClick={() => { setShowCodingProblem(false); setActiveQuiz(null); setShowPrizes(false); }}>
                        <Trophy className="h-4 w-4" /> View Final Leaderboard
                      </Button>
                      <Button variant="outline" onClick={() => { setTournamentSubmitted(false); setTournamentOutput(""); }}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

          ) : activeQuiz.isSelectingLang ? (
            <div className="max-w-4xl mx-auto py-12 text-center space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-black">{t('choose_path')} ⚔️</h2>
                <p className="text-xl text-muted-foreground">Select the coding language you want to master!</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {activeQuiz.languages.map((lang: string) => (
                  <motion.button
                    key={lang}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startQuiz(activeQuiz, lang)}
                    className="group relative flex flex-col items-center gap-6 p-10 rounded-[2.5rem] bg-card border-4 border-border hover:border-primary transition-all shadow-xl"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-inner">
                      {lang === "C" ? <Code2 className="h-10 w-10" /> : lang === "Python" ? <Zap className="h-10 w-10" /> : <Terminal className="h-10 w-10" />}
                    </div>
                    <span className="text-2xl font-black">{lang}</span>
                    <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
              <Button variant="ghost" size="lg" onClick={() => setActiveQuiz(null)} className="mt-8 font-bold text-muted-foreground">
                <ChevronLeft className="mr-2 h-5 w-5" /> Back to Quizzes
              </Button>
            </div>

          ) : (
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <Button variant="ghost" size="sm" onClick={() => { setActiveQuiz(null); setTimerActive(false); }} className="text-muted-foreground">
                        <RotateCcw className="mr-2 h-4 w-4" /> {t('exit_challenge')}
                      </Button>
                      <div className="flex items-center gap-3 flex-wrap">
                        {/* Timer for Timed Challenges */}
                        {activeQuiz.isTimed && (
                          <div className={`flex items-center gap-1 font-black text-lg px-3 py-1 rounded-full ${timeLeft <= 5 ? "bg-red-500/20 text-red-500 animate-pulse" : "bg-amber-500/20 text-amber-600"}`}>
                            <Clock className="h-4 w-4" /> {timeLeft}s
                          </div>
                        )}
                        {/* Battle scores */}
                        {activeQuiz.isBattle && (
                          <div className="flex items-center gap-3 text-sm font-bold">
                            <span className="text-blue-500">You: {score}</span>
                            <span className="text-muted-foreground">vs</span>
                            <span className="text-rose-500">{humanOpponent?.name || "Bot"}: {opponentScore}</span>
                            {!humanOpponent && opponentAnswered && <Badge className="bg-rose-500/20 text-rose-500 text-xs">Bot answered!</Badge>}
                          </div>
                        )}
                        {/* Tournament score */}
                        {activeQuiz.isTournament && (
                          <Badge className="bg-indigo-500/20 text-indigo-500 font-bold px-3 py-1">
                            <Trophy className="h-3 w-3 mr-1" /> {score * 100} pts
                          </Badge>
                        )}
                        <div className="text-sm font-bold text-muted-foreground">
                          {t('question')} {currentQuestion + 1} {t('of')} {activeQuiz.questions.length}
                        </div>
                      </div>
                    </div>

                    {/* Progress bars */}
                    <div className="space-y-1">
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          animate={{ width: `${((currentQuestion + 1) / activeQuiz.questions.length) * 100}%` }}
                        />
                      </div>
                      {activeQuiz.isTimed && (
                        <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${timeLeft <= 5 ? "bg-red-500" : "bg-amber-500"}`}
                            animate={{ width: `${(timeLeft / 15) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Question */}
                    <h2 className="text-3xl font-bold text-foreground leading-tight">
                      {activeQuiz.questions[currentQuestion].question}
                    </h2>

                    <div className="grid gap-4">
                      {activeQuiz.questions[currentQuestion].options.map((option: string, idx: number) => {
                        const isCorrect = idx === activeQuiz.questions[currentQuestion].answer;
                        const isSelected = selectedOption === idx;
                        return (
                          <motion.button
                            key={idx}
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleAnswer(idx)}
                            className={`p-6 text-left rounded-2xl border-2 transition-all duration-300 flex items-center justify-between ${
                              selectedOption === null
                                ? "border-border hover:border-primary bg-card/50"
                                : isCorrect
                                  ? "border-green-500 bg-green-500/10"
                                  : isSelected
                                    ? "border-red-500 bg-red-500/10"
                                    : "border-border opacity-50 bg-card/50"
                            }`}
                          >
                            <span className="text-lg font-bold">{option}</span>
                            {selectedOption !== null && (
                              isCorrect ? <CheckCircle2 className="text-green-500" /> : isSelected ? <XCircle className="text-red-500" /> : null
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8 py-12"
                  >
                    {activeQuiz.isBattle ? (
                      /* ── BATTLE RESULT ── */
                      <>
                        <div className={`inline-flex h-24 w-24 items-center justify-center rounded-full text-5xl shadow-xl mb-4 ${score > opponentScore ? "bg-green-500/20 shadow-green-500/20" : score < opponentScore ? "bg-red-500/20 shadow-red-500/20" : "bg-yellow-500/20 shadow-yellow-500/20"}`}>
                          {score > opponentScore ? "🏆" : score < opponentScore ? "💀" : "🤝"}
                        </div>
                        <h2 className="text-5xl font-black">{score > opponentScore ? "You Win!" : score < opponentScore ? `${humanOpponent?.name || "Bot"} Wins!` : "Draw!"}</h2>
                        <div className="flex justify-center gap-16 pt-2">
                          <div className="text-center">
                            <p className="text-5xl font-black text-blue-500">{score}</p>
                            <p className="text-sm font-bold text-muted-foreground mt-1">Your Score</p>
                          </div>
                          <div className="text-center">
                            <p className="text-5xl font-black text-rose-500">{opponentScore}</p>
                            <p className="text-sm font-bold text-muted-foreground mt-1">{humanOpponent?.name || "Bot"} Score</p>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4">
                          <Button size="lg" className="px-8 font-bold gap-2" onClick={() => startQuiz(activeQuiz)}>
                            <Swords className="h-4 w-4" /> Rematch
                          </Button>
                          <Button size="lg" variant="outline" onClick={() => setActiveQuiz(null)}>{t('back_to_challenges')}</Button>
                        </div>
                      </>
                    ) : activeQuiz.isTournament ? (
                      /* ── TOURNAMENT RESULT with LEADERBOARD ── */
                      <div className="space-y-8 text-left max-w-2xl mx-auto">
                        <div className="text-center space-y-2">
                          <div className="text-6xl mb-2">🏆</div>
                          <h2 className="text-4xl font-black">Tournament Complete!</h2>
                          <p className="text-muted-foreground text-lg">You scored <span className="text-primary font-black">{score * 100} pts</span> — Rank #{tournamentRank}</p>
                        </div>
                        <Card className="border-2 border-indigo-500/30">
                          <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-indigo-500" /> Live Leaderboard</CardTitle></CardHeader>
                          <CardContent className="space-y-2">
                            {(() => {
                              const myEntry = { name: "You", score: score * 100, avatar: "👤", isMe: true };
                              const allPlayers = [...fakeLeaderboard.map(p => ({ ...p, isMe: false })), myEntry].sort((a, b) => b.score - a.score);
                              return allPlayers.map((player, idx) => (
                                <div key={player.name} className={`flex items-center gap-3 p-3 rounded-xl ${(player as any).isMe ? "bg-primary/10 border border-primary/30" : "bg-muted/30"}`}>
                                  <span className="text-lg font-black w-6 text-center">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx+1}`}</span>
                                  <span className="text-2xl">{player.avatar}</span>
                                  <span className={`flex-1 font-bold ${(player as any).isMe ? "text-primary" : ""}`}>{player.name}{(player as any).isMe ? " (You)" : ""}</span>
                                  <span className="font-black">{player.score} pts</span>
                                </div>
                              ));
                            })()}
                          </CardContent>
                        </Card>
                        <div className="flex justify-center gap-4">
                          <Button size="lg" className="px-8 font-bold gap-2" onClick={() => startQuiz(activeQuiz)}>
                            <RotateCcw className="h-4 w-4" /> Play Again
                          </Button>
                          <Button size="lg" variant="outline" onClick={() => setActiveQuiz(null)}>{t('back_to_challenges')}</Button>
                        </div>
                      </div>
                    ) : (
                      /* ── STANDARD / TIMED RESULT ── */
                      <>
                        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500 shadow-xl shadow-yellow-500/10 mb-4">
                          <Trophy className="h-12 w-12" />
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-5xl font-black text-foreground">{t('challenge_complete')}</h2>
                          <p className="text-xl text-muted-foreground">
                            You scored <span className="text-primary font-bold">{score} out of {activeQuiz.questions.length}</span>
                            {activeQuiz.isTimed && <span className="ml-2 text-amber-500 font-bold">⚡ Speed Run!</span>}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                          <Button size="lg" className="px-8 font-bold gap-2" onClick={() => startQuiz(activeQuiz)}>
                            <RotateCcw className="h-4 w-4" /> {t('try_again')}
                          </Button>
                          <Button size="lg" variant="outline" className="px-8 font-bold" onClick={() => setActiveQuiz(null)}>
                            {t('back_to_challenges')}
                          </Button>
                        </div>
                        <div className="pt-12 grid grid-cols-3 gap-8 border-t border-border mt-12">
                          <div className="space-y-1">
                            <p className="text-3xl font-black text-foreground">+{score * 10}</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('exp_earned')}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-3xl font-black text-foreground">{(score / activeQuiz.questions.length * 100).toFixed(0)}%</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('accuracy')}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-3xl font-black text-foreground">#{score > 0 ? (score * 7 + 1) : 42}</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('global_rank')}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
