import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Compass } from 'lucide-react';
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE } from '../constants';

const Contact = () => {
  return (
    <div className="pt-24 bg-onyx min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Royal 3D Emblem */}
             <div className="relative w-20 h-20 mb-8 perspective-1000">
                <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="w-full h-full relative transform-style-3d animate-[spin_12s_linear_infinite]">
                  <div className="absolute inset-0 rounded-full border border-gold-500/40 border-l-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]"></div>
                  <div className="absolute inset-2 rounded-full border border-gold-500/30 border-r-gold-500 rotate-90"></div>
                  <div className="absolute inset-4 rounded-full border border-white/10 border-t-white/50 -rotate-45"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Compass size={32} className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-float" />
                </div>
             </div>

            <div className="inline-block px-6 py-2 crystal-glass rounded-full mb-8">
              <span className="text-gold-400 text-xs font-bold uppercase tracking-[0.2em]">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-cinzel text-ivory mb-8">Begin Your <br/><span className="text-gold-500">Journey</span></h1>
            <p className="text-white/70 mb-12 leading-relaxed font-light text-base md:text-lg max-w-lg">
              We invite you to tour Mahal Banquet and discuss how we can bring your vision to life. 
              Our concierge team is available to answer all your queries.
            </p>

            <div className="space-y-6">
              <div className="group crystal-glass p-5 md:p-8 rounded-3xl transition-all duration-500">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-black/20 flex items-center justify-center text-gold-500 shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-gold-400 font-cinzel text-sm uppercase tracking-wider mb-2">Visit Us</h3>
                    <p className="text-ivory text-base md:text-lg font-serif">{COMPANY_ADDRESS}</p>
                  </div>
                </div>
              </div>

              <div className="group crystal-glass p-5 md:p-8 rounded-3xl transition-all duration-500">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-black/20 flex items-center justify-center text-gold-500 shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-gold-400 font-cinzel text-sm uppercase tracking-wider mb-2">Call Us</h3>
                    <p className="text-ivory text-base md:text-lg font-serif">{COMPANY_PHONE}</p>
                    <p className="text-white/40 text-sm mt-1">Mon - Sun: 9am - 8pm</p>
                  </div>
                </div>
              </div>

              <div className="group crystal-glass p-5 md:p-8 rounded-3xl transition-all duration-500">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-black/20 flex items-center justify-center text-gold-500 shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-gold-400 font-cinzel text-sm uppercase tracking-wider mb-2">Email Us</h3>
                    <p className="text-ivory text-base md:text-lg font-serif">{COMPANY_EMAIL}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side - Crystal Glass */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="crystal-glass p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative"
          >
            {/* Gold Accent Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>

            <h3 className="text-2xl md:text-3xl font-cinzel text-ivory mb-8 md:mb-10 text-center">Inquiry Form</h3>

            <form className="space-y-6" action="https://formspree.io/f/manrdand" method="POST">
              <input type="hidden" name="_subject" value="New Website Contact" />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold-500/80 ml-2">First Name</label>
                  <input type="text" name="firstName" required className="w-full bg-black/20 border border-white/10 text-ivory text-base p-4 rounded-xl focus:outline-none focus:border-gold-500/50 focus:bg-black/40 transition-all placeholder:text-white/20" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold-500/80 ml-2">Last Name</label>
                  <input type="text" name="lastName" required className="w-full bg-black/20 border border-white/10 text-ivory text-base p-4 rounded-xl focus:outline-none focus:border-gold-500/50 focus:bg-black/40 transition-all placeholder:text-white/20" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold-500/80 ml-2">Email Address</label>
                <input type="email" name="email" required className="w-full bg-black/20 border border-white/10 text-ivory text-base p-4 rounded-xl focus:outline-none focus:border-gold-500/50 focus:bg-black/40 transition-all placeholder:text-white/20" placeholder="john@example.com" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold-500/80 ml-2">Event Type</label>
                  <select name="eventType" className="w-full bg-black/20 border border-white/10 text-ivory text-base p-4 rounded-xl focus:outline-none focus:border-gold-500/50 focus:bg-black/40 transition-all appearance-none cursor-pointer">
                    <option className="bg-charcoal" value="Wedding">Wedding</option>
                    <option className="bg-charcoal" value="Reception">Reception</option>
                    <option className="bg-charcoal" value="Corporate">Corporate</option>
                    <option className="bg-charcoal" value="Social">Social</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold-500/80 ml-2">Guest Count</label>
                  <input type="number" name="guestCount" className="w-full bg-black/20 border border-white/10 text-ivory text-base p-4 rounded-xl focus:outline-none focus:border-gold-500/50 focus:bg-black/40 transition-all placeholder:text-white/20" placeholder="500" />
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-gold-500/80 ml-2">Message</label>
                 <textarea name="message" rows={4} className="w-full bg-black/20 border border-white/10 text-ivory text-base p-4 rounded-xl focus:outline-none focus:border-gold-500/50 focus:bg-black/40 transition-all placeholder:text-white/20" placeholder="Tell us about your requirements..."></textarea>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-onyx font-bold uppercase tracking-widest py-5 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 mt-4 flex items-center justify-center gap-3 group active:scale-98">
                Send Inquiry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
      {/* Footer spacer for mobile scrolling */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Contact;