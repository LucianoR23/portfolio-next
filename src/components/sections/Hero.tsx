"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, FileText } from "lucide-react"; 
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { smoothScroll } from "@/lib/utils";

interface HeroProps {
  variant?: "bento" | "minimal";
}

export function Hero({ variant = "minimal" }: HeroProps) {
  const { personalInfo, socials } = portfolioData;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (variant === "bento") {
    return (
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 bg-card border border-border p-8 rounded-2xl flex flex-col justify-center gap-4 shadow-sm"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">{personalInfo.name}</h1>
              <p className="text-xl text-muted-foreground font-medium">{personalInfo.tagline}</p>
              
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  href="#contact"
                  onClick={(e) => smoothScroll(e, "#contact")}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  Contact Me <ArrowRight size={16} />
                </Link>
                
                <a
                  href={personalInfo.cv}
                  download
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground border border-border font-medium hover:bg-secondary/80 transition-colors"
                >
                  <FileText size={16} /> CV
                </a>

              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-1 bg-card border border-border p-0 rounded-2xl flex items-end justify-center overflow-hidden relative min-h-60"
            >
              
              <video
                autoPlay
                loop
                muted
                playsInline 
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-90" 
              >
                
                <source src="/animacion-3d-saludo.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
              
              <div className="relative z-20 p-6 text-center w-full">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-medium text-white uppercase tracking-widest">Online</span>
                </div>
                
                <p className="text-white text-sm font-medium leading-tight">
                  Available in <br />
                  <span className="text-lg font-bold">{personalInfo.location}</span>
                </p>
              </div>
            </motion.div>
            
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-3 bg-card border border-border p-6 rounded-2xl flex items-center justify-between"
            >
              <div className="flex gap-4 text-muted-foreground">
                <Link href={socials.github} target="_blank" className="hover:text-primary transition-colors">
                  <GithubIcon size={24} />
                </Link>
                <Link href={socials.linkedin} target="_blank" className="hover:text-primary transition-colors">
                  <LinkedinIcon size={24} />
                </Link>
                <Link href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
                  <Mail size={24} />
                </Link>
              </div>
              <div className="text-sm font-medium text-green-500 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Open to work
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  
  return (
    <section className="w-full py-24 md:py-40">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">{personalInfo.name}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{personalInfo.tagline}</p>
          </div>

          <p className="text-base text-muted-foreground/80 max-w-lg">{personalInfo.description}</p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#projects"
              onClick={(e) => smoothScroll(e, "#projects")}
              className="group inline-flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="h-4 w-px bg-border hidden sm:block" /> 

            
            <a 
              href={personalInfo.cv}
              download
              className="text-muted-foreground hover:text-primary font-medium transition-colors flex items-center gap-1.5"
            >
              <FileText size={18} /> Download CV
            </a>

            <div className="h-4 w-px bg-border hidden sm:block" /> 

            <div className="flex gap-4">
              <a
                href={socials.github}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}