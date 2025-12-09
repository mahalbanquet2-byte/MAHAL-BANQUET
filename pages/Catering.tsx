import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, ChevronUp, Phone, Utensils, Star, Wine, Plus, Download, Check, Sparkles, ArrowRight, ChefHat } from 'lucide-react';

// --- MENU DATA CONSTANTS ---

const SILVER_MENU = {
  rate: "Rs. 3075",
  desc: "Affordable multicuisine spread incl. snacks, soups, salads, veg & non-veg mains, dessert.",
  color: "from-gray-300/20 to-gray-100/5",
  borderColor: "border-gray-400/30",
  glow: "shadow-gray-400/20",
  items: [
    {
      category: "🥣 Soups (Choose Any One)",
      list: ["Veg Hot & Sour", "Veg Garlic Mushroom (Creamy Soup)", "Veg Tom Yum Soup", "Spinach Mushroom Soup", "Tomato Soup"]
    },
    {
      category: "🥗 Salads (Choose Any Four)",
      list: ["Mahal Banquet SPECIAL SALAD BAR (Includes 8 Different Varieties)"]
    },
    {
      category: "🥒 Pickles (All Included)",
      list: ["Golveda Achar", "Kerau Meethi Achar", "Gundruk Achar", "Mixed Lapsi Achar", "Aloo Mula Achar"]
    },
    {
      category: "🍗 Snacks — Non-Veg (All Included)",
      list: [
        "Buff: Choila / Sadeko, Sekuwa, Sausage, Boiled, Meat Ball, MoMo (Live/Fried/Kothey), Shashlik Stick, Chilly",
        "Chicken: Lolly, Choila / Sadeko, MoMo (Live/Fried/Kothey), Tikka, Wonton, Singaporean, Sausage, Shashlik Stick, Chilli, Timmur, Satay, Boiled",
        "Fish: Chilli, Nugget, Small Fry, Timmur",
        "Pork: Steamed, Timmur, Choila, Sadeko"
      ]
    },
    {
      category: "🥬 Snacks — Veg (All Included)",
      list: [
        "Veg Tempura, Veg Pakoda, Veg Wonton, Veg Lolly, Veg Spring Roll, Veg Tikka, Spicy Veg Ball",
        "Veg MoMo (Live/Fried/Kothey), Tofu Chilli, Tofu Hot Sauce, Veg Finger Chilli, Onion Pakoda",
        "Veg Manchurian (Dry), Tandoori Aloo, Mustang Aloo, Aloo Stick, French Fries, Crispy Potato",
        "Chips Chilli, Onion Rings, Aloo Jeera, Sesame Potato Wedges, Golden Fried Potato, Grilled Potato",
        "Grilled Pineapple Tandoori, Potato Wedges, Cocktail Papad, Poleko Aloo, Prawn Crackers",
        "Boiled Corn, Peanuts Sadeko/Fry, Corn Satay, Crispy Corn, Mushroom Choila/Sadeko, Crispy Mushroom",
        "Mass Ko Bara, Bhatmas Sadeko"
      ]
    },
    {
      category: "🍽️ Main Course — Rice",
      list: ["Plain Steamed Rice", "Veg Fried Rice Hira", "Moti Ko Pulao", "Butter Rice Veg", "Biryani", "Jeera Pulao", "Plain Pulao", "Matar Pulao"]
    },
    {
      category: "🥘 Main Course — Veg",
      list: ["Seasonal Veg", "Gobi Matar Capsicum", "Stir-Fried Seasonal Veg (With Garlic)", "Mix Veg Curry", "Kashmiri Aloo Dum", "Mix Veg in Schezwan", "Mix Veg Jalfrezi", "Aloo Parwal"]
    },
    {
      category: "🍖 Main Course — Non-Veg",
      list: [
        "Chicken / Fish (Choose One Category): Curry, Sesame, Fry, Gravy, Butter Masala",
        "Mutton: Rogan Josh, Mahal Banquet SPECIAL Mutton Kadhai, Mutton Jhol, Mutton Gravy"
      ]
    },
    {
      category: "🍲 Dal & Beans (Choose Any One)",
      list: ["Dal Makhani", "Punjabi Dal Tadka", "Dal Fry", "Mixed Dal Fry", "Rajma Masala", "Chana Masala"]
    },
    {
      category: "🥬 Leafy Greens (Choose Any One)",
      list: ["Mixed Saag", "Jhaneko Saag", "Seasonal Saag", "Bok Choy (With Black Mushroom)"]
    },
    {
      category: "🍞 Roti / Naan (Choose Any One)",
      list: ["Garlic Naan", "Butter Naan", "Plain Naan", "Plain Paratha"]
    },
    {
      category: "🍝 Noodles / Pasta (Choose Any One)",
      list: ["Tomato Sauce Pasta", "Chinese Hakka Noodles", "Chowmein (Chicken/Veg)", "Macaroni (Veg/Non-Veg)", "Penne Pasta", "White Sauce Pasta"]
    },
    {
      category: "🍮 Dessert (All Included)",
      list: ["Juju Dhau", "Rasbari / Lalmohan", "Fresh Cut Fruits", "Bread Pudding", "Ice Cream", "Mugi Ko Halwa", "Gajar Ko Halwa", "Suji Ko Halwa", "Jalebi (Live)"]
    }
  ]
};

const GOLD_MENU = {
  rate: "Rs. 3375",
  desc: "Larger spread, premium salads, expanded non-veg and dessert options.",
  color: "from-gold-500/20 to-gold-900/10",
  borderColor: "border-gold-500/40",
  glow: "shadow-gold-500/20",
  items: [
    {
      category: "🥣 Soups",
      list: ["Hot & Sour Soup (Veg/Non-Veg)", "Cream of Mushroom Soup", "Tom Yum Soup (Veg/Non-Veg)", "Veg Clear Soup", "Sweet Corn Soup", "Mixed Veg Soup", "Green Peas Soup"]
    },
    {
      category: "🥗 Deluxe Salad Bar (12 Varieties)",
      list: ["Salad (12 varieties)", "Golveda Achar", "Gundruk Achar", "Aloo Matar Achar", "Tahakali Achar", "Lapsi Achar", "Methi Achar", "Mango Achar"]
    },
    {
      category: "🍢 Snacks — Veg (Full List)",
      list: [
        "Golden Fried Potato, Sesame Potato Wedges, Aloo Jeera, Roasted Baby Potatoes, French Fries, Crispy Potato",
        "Tandoori Aloo, Mustang Aloo, Aloo Tikki, Aloo Stick, Aloo Sadeko, Poleko Aloo, Chips Chilli",
        "Potato Croquettes, Baby Corn Tempura, Brinjal Pakoda, Crispy Corn, Corn Sadeko, Corn Pakoda",
        "Boiled Corn, Corn Satay, Spicy Veg Balls, Veg Lolly, Veg Wonton, Veg Tikka, Veg Tempura, Veg Pakoda",
        "Mushroom Chilli, Mushroom Choila, Mushroom Sadeko, Mushroom Deep Crispy, Mushroom Tempura",
        "Cocktail Papad, Tofu Tempura, Tofu Hot Sauce, Paneer Pakoda, Paneer Chilli, Paneer Tikka",
        "Bara (Mugi/Mass), Peanuts Sadeko, Bhatmas Sadeko, Hara Bara Kebab, Veg MoMo (Live/Fried/Kothey)",
        "Cheese Cherry Pineapple Stick, Grilled Vegetables (Live), Onion Pakoda, Onion Rings, Cheese Potato, Cheese Mushroom Balls, Cheese Finger"
      ]
    },
    {
      category: "🍗 Snacks — Non-Veg (Full List)",
      list: [
        "Chicken: Honey Glazed, Masala Wings, Nepali Fry, Hot & Spicy Wings, Shashlik, MoMo (Live/Fried/Kothey), Chilli, Choila, Tikka, Meatball, Sausage (Boiled/Fried/Chilly/Grilled), Wonton, Satay, Nuggets, Lolly, Singaporean, Dragon, Timmur, Kurkure",
        "Buff: MoMo (Live/Fried/Kothey), Choila, Chilli, Boiled, Sukuti, Sausage, Meatballs, Sekuwa, Shashlik, Sadeko",
        "Bandel: Steamed, Tawa, Shashlik, Sadeko, Chilli",
        "Fish: Small Fry, Finger, Tempura, Nugget, Chilli, Sesame, Amritsari, Fry (Basa), Dragon, Tikka, Singaporean, Mongolian, Timmur"
      ]
    },
    {
      category: "🍽️ Main Course — Rice",
      list: ["Plain Steamed Rice", "Butter Pulao", "Saffron Rice", "Butter Rice", "Veg Fried Rice", "Jeera Pulao", "Veg Biryani", "Kashmiri Pulao", "Plain Pulao", "Lemon Rice"]
    },
    {
      category: "🥬 Main Course — Veg",
      list: ["Seasonal Veg", "Mixed Veg Jalfrezi", "Mixed Veg Curry", "Gobi Matar Capsicum", "Kashmiri Aloo Dum", "Thai Mixed Veg Curry", "Mix Veg in Schezwan", "Bok Choy with Black Mushroom", "Veg Manchurian", "Bhindi Masala", "Aloo Parwal", "Saute Mixed Veg"]
    },
    {
      category: "🍄 Tofu / Mushroom",
      list: ["Palak Tofu/Mushroom", "Butter Masala Tofu/Mushroom", "Curry Tofu/Mushroom", "Shahi Tofu/Mushroom"]
    },
    {
      category: "🧀 Paneer Items",
      list: ["Paneer Pakoda", "Paneer Chilli", "Paneer Tikka", "Paneer Satay", "Paneer BBQ"]
    },
    {
      category: "🍖 Non-Veg Main Course",
      list: [
        "Chicken/Fish (Choose One): Fry, Gravy, Butter Masala, Nepali-Style Curry, Sesame, Kadhai, Cutlet",
        "Mutton: Rogan Josh, Gravy, Jhol, Shahi Korma, Kabab, Pakku, Hariyali, Kadahi"
      ]
    },
    {
      category: "🍞 Naan / Roti",
      list: ["Plain Naan", "Jeera Naan", "Butter Naan", "Tandoori Naan", "Garlic Naan", "Plain Paratha", "Aloo Paratha", "Lachha Paratha"]
    },
    {
      category: "🍝 Noodles / Pasta",
      list: ["Chinese Hakka Noodles", "Veg/Non-Veg Chowmein", "Penne Pasta", "Mixed Macaroni", "Pasta (Carbonara/Bolognese)"]
    },
    {
      category: "🍨 Desserts (Choose Any Four)",
      list: ["Halwa (Gajar/Suji/Mugi)", "Dudh Bari", "Jalebi (Live)", "Fresh Cut Fruits", "Ice Cream", "Seviyan Kheer", "Assorted Cake", "Rasbari/Lalmohan", "Masala Kheer", "Juju Dhau", "Bread Pudding"]
    }
  ]
};

const DIAMOND_MENU = {
  rate: "Rs. 3875",
  desc: "Most premium level with maximum variety and special dishes.",
  color: "from-cyan-300/20 to-blue-500/10",
  borderColor: "border-cyan-400/30",
  glow: "shadow-cyan-400/20",
  items: [
    {
      category: "🥣 Soups (Choose Any One)",
      list: ["Veg Clear", "Cream of Mushroom", "Chef Special", "Carrot", "Chicken", "Mixed Veg", "Green Peas", "Tom Yum (Veg/Non-Veg)", "Tomato", "Mulligatawny", "Sweet Corn", "Hot & Sour (Veg/Non-Veg)", "Haddi Ko Soup"]
    },
    {
      category: "🍢 Veg Snacks (Choose Any Seven)",
      list: [
        "Golden Fried Potato, French Fries, Tandoori Aloo, Mustang Aloo, Sesame Potato Wedges, Crispy Potato",
        "Aloo Tikki, Aloo Stick, Aloo Jeera, Aloo Sadeko, Chips Chilli, Potato Croquettes, Roasted Baby Potato",
        "Crumbed Fried Potato, Honey Potato, Boiled Corn, Crispy Corn, Corn Satay, Corn Sadeko, Corn Pakoda",
        "Baby Corn Tempura, Twakka Tukka Corn, Veg Pakoda, Brinjal Pakoda, Onion Pakoda, Mushroom Chilli",
        "Mushroom Choila/Sadeko, Mushroom Cheese Balls, Crunchy Fried Mushroom, Mushroom Salt & Pepper, Mushroom Tempura",
        "Cheese Balls, Cheese Finger/Kurkure, Cheese Cherry Pineapple Stick, Hara Bara Kabab, Onion Rings, Veg Finger Chilli, Cocktail Papad"
      ]
    },
    {
      category: "🍗 Non-Veg Snacks (Choose Any Five)",
      list: [
        "Chicken: MoMo (Live/Fried/Kothey), Chilli, Choila, Tikka, Boiled, Sausages, Dragon, Singaporean, Masala Wings, Honey Glazed, Lolly, Tandoori, KFC Style, Satay, Nuggets, Shashlik, Wonton, Timmur, Nepali Fry, Hot & Spicy Wings, Kurkure, Meatball",
        "Fish: Small Fry, Finger, Tempura, Ball, Nuggets, Chilli, Mongolian, Singaporean, Amritsari, Fry (Basa), Dragon, Tikka, Timmur, Sesame"
      ]
    },
    {
      category: "🧀 Paneer / Tofu Items",
      list: ["Tofu Hot Sauce, Tofu Timmur, Tofu Chilli", "Paneer Pakoda, Paneer Chilli, Paneer Tawa, Paneer Tikka, Paneer Satay, Paneer BBQ", "Bara (Mugi/Mass), Grilled Vegetables, Peanuts Sadeko, Bhatmas Sadeko, Veg Manchurian (Dry)"]
    },
    {
      category: "🥗 Salad Bar — Deluxe (15 Varieties)",
      list: ["Golveda Achar, Gundruk Achar, Lapsi Achar, Methi Achar, Aloo Matar Achar, Kerau Achar, Mango Achar, Tahakali Achar"]
    },
    {
      category: "🍖 Non-Veg Main Course",
      list: [
        "Chicken/Fish (Choose Any Two): Fry, Gravy, Butter Masala, Nepali-Style Curry, Sesame, Kadhai, Cutlet",
        "Mutton: Rogan Josh, Gravy, Jhol, Kadhai, Shahi Korma, Kebab, Pakku, Hariyali",
        "Bandel: Steamed/Boiled, Chilli, Roasted, Sadeko, Timmur, Tawa, Choila"
      ]
    },
    {
      category: "🌾 Rice Specialities",
      list: ["Plain Steamed Rice, Butter Rice, Jeera Rice, Lemon Rice, Saffron Rice", "Veg Fried Rice, Seasonal Veg Rice, Mixed Veg Jalfrezi, Mixed Veg Curry, Gobi Matar Capsicum", "Kashmiri Aloo Dum, Veg Biryani, Navratan Pulao, Plain Pulao, Jeera Pulao, Hira Motika Pulao, Kashmiri Pulao"]
    },
    {
      category: "🥬 Veg Main Course",
      list: ["Mixed Saag, Jhaneko Saag, Seasonal Saag, Bok Choy with Black Mushroom", "Stir Fried Seasonal Veg with Garlic, Mixed Veg Schezwan, Thai Mixed Veg Curry", "Veg Manchurian, Bhindi Masala, Sweet & Sour Veg, Aloo Parwal, Saute Mixed Veg, Corn Palak, Mahal Banquet Chef Special Veg Tawa"]
    },
    {
      category: "🍄 Tofu / Mushroom / Paneer",
      list: [
        "Tofu/Mushroom: Palak, Butter Masala, Curry, Shahi",
        "Paneer: Butter Masala, Shahi, Matar, Roll, Kadai, Palak, Hot Garlic, Malai Kofta, Korma"
      ]
    },
    {
      category: "🫓 Roti / Naan (Choose Any Two)",
      list: ["Plain Naan, Jeera Naan, Butter Naan, Tandoori Naan, Rumali Roti", "Kodo Ko Roti, Garlic Naan, Plain Paratha, Aloo Paratha, Lachha Paratha, Fapar Ko Roti"]
    },
    {
      category: "🍝 Pasta / Noodles (Choose Any Two)",
      list: ["Chinese Hakka Noodles, Penne Pasta, Mixed Macaroni (Veg/Non-Veg)", "Chowmein (Veg/Non-Veg), Pasta Carbonara, Pasta Bolognese, Pad Thai, Spaghetti (Carbonara/Bolognese)"]
    },
    {
      category: "🥣 Dal (Choose Any Two)",
      list: ["Dal Makhani, Dal Fry, Rajma Masala, Mustang Dal, Chana Masala", "Thakali Dal, Punjabi Dal Tadka, Lukla Dal, Jimbu Dal, Mixed Dal Fry"]
    },
    {
      category: "🍨 Diamond Desserts (Choose Any Five)",
      list: ["Gajar Ko Halwa, Juju Dhau, Rasbhari, Lalmohan, Masala Kheer, Dudh Bari", "Suji Halwa, Seviyan Kheer, Ice Cream, Fresh Cut Fruits, Bread Pudding, Mugi Halwa, Assorted Cake, Jalebi Live"]
    }
  ]
};

const ADD_ONS = [
  "Special Salad Bar – 24 Varieties",
  "Special Seafood Items – 4 Varieties",
  "Special Dessert & Pastry Bar – 18 Varieties",
  "Special Cocktail Bar",
  "Live BBQ Station",
  "Special Duck Items",
  "Pani Puri, Paan, Chaat Station",
  "Assorted Pastries, Swiss Roll, Celebration Cake",
  "Live Pasta/Spaghetti/Noodles Station"
];

const SPECIAL_ITEMS = [
  { name: "Mutton MoMo", price: "Rs. 400" },
  { name: "Mutton Choila", price: "Rs. 400" },
  { name: "Mutton Taas", price: "Rs. 400" },
  { name: "Golden Fried Prawn", price: "Rs. 600" },
  { name: "Whole Mutton BBQ", price: "Rs. 35,000" },
  { name: "Whole Chicken BBQ", price: "Rs. 2,000" }
];

const EXTRA_SERVICES = [
  "Photography & Videography",
  "Wedding Planner",
  "Decoration",
  "Outdoor Catering",
  "Makeup / Bridal Package",
  "Dress Designer",
  "Vehicle Rental / Decoration",
  "Live Music (Local Band / Renowned Artists)",
  "Bandel / Panche Baja",
  "DJ Arrangements",
  "All kinds of beverages at best rate"
];

// --- CRYSTAL COMPONENTS ---

const MenuTierCard = ({ title, data, tierColor, icon }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-700 crystal-glass
        ${isExpanded ? 'col-span-1 md:col-span-3' : 'hover:translate-y-[-10px]'}
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-20 z-0`}></div>
      <div className={`absolute inset-0 border ${data.borderColor} rounded-3xl opacity-30 z-10 transition-opacity duration-500 group-hover:opacity-100`}></div>
      
      {/* Glow Effect */}
      <div className={`absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${data.glow} z-[-1]`}></div>

      <div className="relative z-20 p-6 md:p-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg shrink-0`}>
              {icon}
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-cinzel font-bold text-ivory tracking-wide">{title}</h3>
              <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold mt-1">Premium Selection</p>
            </div>
          </div>
          <div className="text-right bg-black/20 px-3 py-2 rounded-xl border border-white/5 backdrop-blur-sm shrink-0">
            <p className="text-xl md:text-3xl font-serif text-ivory">{data.rate}</p>
            <p className="text-white/40 text-[10px] md:text-xs tracking-wider">per plate</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 mb-8 font-light leading-relaxed min-h-[60px] text-sm md:text-base">{data.desc}</p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Collapsed Highlights */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 md:space-y-6 mb-8 flex-grow"
            >
               <div className="grid grid-cols-1 gap-2 md:gap-3">
                 {data.items.slice(0, 4).map((section: any, idx: number) => (
                   <div key={idx} className="flex items-center gap-3 text-xs md:text-sm text-white/80 bg-white/5 p-3 rounded-lg border border-white/5">
                     <div className={`w-2 h-2 rounded-full flex-shrink-0 ${title === "Gold Menu" ? "bg-gold-500" : title === "Diamond Menu" ? "bg-cyan-400" : "bg-gray-400"}`}></div>
                     <span className="truncate font-medium">{section.category.split('(')[0]}</span>
                   </div>
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                {data.items.map((section: any, idx: number) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors backdrop-blur-sm"
                  >
                    <h4 className={`font-cinzel font-bold text-sm mb-4 border-b border-white/10 pb-3 uppercase tracking-wider flex items-center gap-2 ${title === "Gold Menu" ? "text-gold-400" : title === "Diamond Menu" ? "text-cyan-300" : "text-gray-300"}`}>
                      {section.category}
                    </h4>
                    <ul className="space-y-3">
                      {section.list.map((item: string, i: number) => (
                        <li key={i} className="text-white/70 text-sm font-light leading-relaxed flex items-start gap-2 group/item">
                          <span className="text-white/10 mt-1.5 w-1 h-1 rounded-full bg-current group-hover/item:text-white transition-colors flex-shrink-0"></span>
                          <span className="group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-cinzel font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden group/btn ${
            isExpanded 
              ? 'bg-white/10 text-white border border-white/20' 
              : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isExpanded ? <>Collapse Menu <ChevronUp size={14} /></> : <>Explore Full Menu <ChevronDown size={14} /></>}
          </span>
          {/* Button Shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
        </button>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---

const Catering = () => {
  return (
    <div className="bg-onyx min-h-screen font-sans text-ivory selection:bg-gold-500/30">
      
      {/* 1. Hero Section - Parallax & Crystal */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Parallax */}
        <div className="absolute inset-0 z-0 scale-110">
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070" 
            alt="Luxury Catering" 
            className="w-full h-full object-cover animate-[pulse-slow_10s_ease-in-out_infinite] opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-onyx via-transparent to-onyx"></div>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        {/* Floating Glass Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            <div className="crystal-glass px-6 py-10 md:px-24 md:py-20 rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden group">
              {/* Shimmer Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Royal 3D Emblem */}
              <div className="relative w-20 h-20 mx-auto mb-6 perspective-1000">
                <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="w-full h-full relative transform-style-3d animate-[spin_10s_linear_infinite]">
                    <div className="absolute inset-0 rounded-full border border-gold-500/40 border-t-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]"></div>
                    <div className="absolute inset-2 rounded-full border border-gold-500/30 border-r-gold-500 rotate-90"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChefHat size={32} className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-float" />
                </div>
              </div>
              
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5 }}
                className="text-gold-400 text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block font-cinzel"
              >
                Culinary Excellence
              </motion.span>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold text-ivory mb-6 drop-shadow-2xl">
                Mahal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-500 to-gold-200 animate-gradient-x">Banquet</span>
              </h1>
              
              <p className="text-base md:text-xl text-white/80 max-w-xl mx-auto mb-8 md:mb-10 font-serif italic leading-relaxed">
                "Where every dish is a masterpiece, crafted for celebrations that echo through time."
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-gold-500 text-onyx px-8 py-4 rounded-full font-cinzel font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] flex items-center gap-2"
                >
                  View Collections <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-cinzel">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. Intro Features Grid */}
      <section className="py-20 md:py-32 bg-onyx relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-1/4 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gold-500/5 rounded-full blur-[100px] -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/5 rounded-full blur-[100px] translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-cinzel text-ivory mb-8 leading-tight">
                An Experience <br/> Beyond <span className="text-gold-500 italic font-serif">Taste</span>
              </h2>
              <p className="text-white/70 leading-relaxed font-light text-base md:text-lg mb-10 md:mb-12">
                At Mahal Banquet, cuisine is an art form. We don't just serve food; we curate culinary journeys. From the authentic spices of the Himalayas to the refined techniques of continental gastronomy, our chefs ensure that every bite tells a story of quality, tradition, and luxury.
              </p>
              
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: "1200+ Guest Capacity", icon: <Star size={16} /> },
                  { label: "Live Chef Stations", icon: <Utensils size={16} /> },
                  { label: "Premium Ingredients", icon: <Sparkles size={16} /> },
                  { label: "Bespoke Menus", icon: <Check size={16} /> }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 md:gap-4 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <div className="text-gold-500 flex-shrink-0">{feature.icon}</div>
                    <span className="text-xs md:text-sm font-cinzel font-bold text-white/90">{feature.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Pricing Glass Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-400 to-transparent opacity-30 blur-xl rounded-[2rem]"></div>
              <div className="crystal-glass p-8 md:p-12 rounded-[2rem] relative text-center shadow-2xl">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-500/30 text-gold-400">
                  <Wine size={28} className="md:w-8 md:h-8" />
                </div>
                <h3 className="text-gold-400 font-cinzel uppercase tracking-[0.3em] text-xs mb-4">Starting Packages</h3>
                <div className="flex justify-center items-end gap-2 mb-2">
                  <span className="text-5xl md:text-6xl font-serif text-ivory">2,800</span>
                  <span className="text-gold-500 text-lg md:text-xl font-bold">NPR</span>
                </div>
                <p className="text-white/40 text-xs mb-8 md:mb-10 tracking-wider">per plate (excluding taxes)</p>
                
                <Link to="/contact" className="inline-flex items-center justify-center w-full py-4 border border-gold-500/30 rounded-xl text-gold-400 hover:bg-gold-500 hover:text-onyx transition-all uppercase text-xs font-bold tracking-[0.2em] group">
                  Get Custom Quote <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-white/20 text-[10px] mt-4 italic">Rates subject to seasonal change</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. The Collections (Menu Tiers) */}
      <section id="packages" className="py-20 md:py-32 bg-charcoal relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block font-cinzel">Curated For You</span>
            <h2 className="text-4xl md:text-6xl font-cinzel text-ivory drop-shadow-lg">Signature Collections</h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <MenuTierCard 
              title="Silver Menu" 
              data={SILVER_MENU} 
              tierColor="gray-300" 
              icon={<Utensils size={24} className="text-gray-200" />} 
            />
            <MenuTierCard 
              title="Gold Menu" 
              data={GOLD_MENU} 
              tierColor="gold-500" 
              icon={<Wine size={24} className="text-gold-400" />} 
            />
            <MenuTierCard 
              title="Diamond Menu" 
              data={DIAMOND_MENU} 
              tierColor="cyan-300" 
              icon={<Sparkles size={24} className="text-cyan-200" />} 
            />
          </div>
        </div>
      </section>

      {/* 4. Enhancements & Add-ons */}
      <section className="py-20 md:py-32 bg-onyx relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Add-ons List */}
            <div className="lg:col-span-7">
              <h3 className="text-3xl md:text-4xl font-cinzel text-ivory mb-12 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-gold-500"></span> 
                Culinary Enhancements
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {ADD_ONS.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/5 hover:border-gold-500/30 transition-colors group cursor-default crystal-glass"
                  >
                    <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-onyx transition-colors shrink-0">
                      <Plus size={14} />
                    </div>
                    <span className="text-white/80 text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 bg-gradient-to-r from-white/5 to-transparent p-6 md:p-8 rounded-2xl border border-white/10 crystal-glass">
                <h4 className="text-gold-400 font-cinzel text-sm uppercase tracking-[0.2em] mb-6">Premium Additions</h4>
                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                  {SPECIAL_ITEMS.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="text-white/60">{item.name}</span>
                      <span className="text-ivory font-serif font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Extra Services Card */}
            <div className="lg:col-span-5">
              <div className="h-full bg-gradient-to-b from-charcoal to-black border border-white/10 rounded-[2rem] p-8 md:p-10 relative overflow-hidden crystal-glass">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                  <Star size={200} />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-cinzel text-ivory mb-8">Complete Your Event</h3>
                <p className="text-white/60 mb-8 font-light">
                  Beyond catering, we provide a full suite of event management services to ensure flawless execution.
                </p>

                <ul className="space-y-4 mb-10">
                  {EXTRA_SERVICES.slice(0, 8).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/80 text-sm font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-4 border border-white/20 rounded-xl text-white/80 hover:bg-white hover:text-onyx transition-all uppercase text-xs font-bold tracking-[0.2em]">
                  View Service Catalog
                </button>

                <div className="mt-8 flex items-center gap-4 p-4 bg-gold-900/10 border border-gold-500/20 rounded-xl">
                  <Download className="text-gold-500" size={20} />
                  <div>
                    <p className="text-gold-400 text-xs font-bold uppercase">Download Brochure</p>
                    <p className="text-white/40 text-[10px]">PDF • 4.2 MB</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Luxury Inquiry Section */}
      <section className="py-20 md:py-32 bg-black relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="max-w-5xl mx-auto">
            <div className="crystal-glass rounded-[2rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
              {/* Gold Border Accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300"></div>

              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-4xl md:text-5xl font-cinzel text-ivory mb-6">Reserve Your Date</h2>
                <p className="text-white/60 max-w-2xl mx-auto font-light">
                  Our culinary team is ready to design a menu that reflects your taste and tradition. Fill out the form below to begin the planning process.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-1 space-y-8 lg:border-r border-white/5 pr-0 lg:pr-8">
                  <div>
                    <h4 className="text-gold-500 font-cinzel text-sm uppercase tracking-widest mb-2">Direct Line</h4>
                    <p className="text-2xl font-serif text-ivory">+977 9801754060</p>
                    <p className="text-white/60 text-sm mt-1">Event Concierge</p>
                  </div>
                  <div>
                    <h4 className="text-gold-500 font-cinzel text-sm uppercase tracking-widest mb-2">Email</h4>
                    <p className="text-lg font-serif text-ivory">info@mahalbanquet.com</p>
                  </div>
                  <div>
                    <h4 className="text-gold-500 font-cinzel text-sm uppercase tracking-widest mb-2">Location</h4>
                    <p className="text-white/70 font-light">Gwarko, Lalitpur<br/>Kathmandu, Nepal</p>
                  </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-2">
                  <form className="space-y-6" action="https://formspree.io/f/manrdand" method="POST">
                    <input type="hidden" name="_subject" value="New Catering Inquiry" />
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40">Full Name</label>
                        <input type="text" name="fullName" required className="w-full bg-black/20 border-b border-white/10 text-ivory p-3 focus:outline-none focus:border-gold-500 transition-colors rounded-none" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs uppercase tracking-widest text-white/40">Phone Number</label>
                        <input type="text" name="phone" required className="w-full bg-black/20 border-b border-white/10 text-ivory p-3 focus:outline-none focus:border-gold-500 transition-colors rounded-none" placeholder="+977" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-xs uppercase tracking-widest text-white/40">Event Type</label>
                         <select name="eventType" className="w-full bg-black/20 border-b border-white/10 text-ivory p-3 focus:outline-none focus:border-gold-500 transition-colors rounded-none">
                           <option className="bg-onyx" value="Wedding Reception">Wedding Reception</option>
                           <option className="bg-onyx" value="Corporate Gala">Corporate Gala</option>
                           <option className="bg-onyx" value="Anniversary">Anniversary</option>
                           <option className="bg-onyx" value="Social Gathering">Social Gathering</option>
                         </select>
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs uppercase tracking-widest text-white/40">Expected Guests</label>
                         <input type="number" name="guestCount" className="w-full bg-black/20 border-b border-white/10 text-ivory p-3 focus:outline-none focus:border-gold-500 transition-colors rounded-none" placeholder="e.g. 500" />
                       </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40">Additional Requests</label>
                      <textarea name="requests" rows={3} className="w-full bg-black/20 border-b border-white/10 text-ivory p-3 focus:outline-none focus:border-gold-500 transition-colors rounded-none" placeholder="Tell us about your menu preferences..."></textarea>
                    </div>

                    <button type="submit" className="w-full bg-gold-500 text-onyx font-bold uppercase tracking-[0.2em] py-5 rounded-sm hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-8">
                      Submit Inquiry
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Disclaimer */}
      <div className="bg-black py-8 border-t border-white/5 text-center px-6">
        <p className="text-white/20 text-[10px] leading-relaxed max-w-4xl mx-auto uppercase tracking-wider">
          *Menu items and prices are subject to change based on seasonal availability and market rates. <br/>
          Please consult with our banquet manager for the most up-to-date packages. Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

    </div>
  );
};

export default Catering;