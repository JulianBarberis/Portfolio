"use client";

import React from "react";
import {
  SiKotlin,
  SiSpringboot,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiPython,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiSvelte,
  SiTailwindcss,
  SiJavascript,
  SiMui,
  SiChakraui,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiPostman,
  SiHtml5,
  SiGoogle,
  SiExpress,
  SiSocketdotio,
  SiVite,
  SiFramer,
  SiTypeorm,
  SiFlyway,
  SiJsonwebtokens,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbSql, TbLayersLinked, TbBrain, TbPrompt, TbFileCheck } from "react-icons/tb";
import { Code2, Boxes, Network, Cpu, GraduationCap, Component } from "lucide-react";

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = "w-5 h-5" }: TechIconProps) {
  const normalized = name.toLowerCase().trim();

  // Languages & Core
  if (normalized.includes("kotlin")) {
    return <SiKotlin className={`${className} text-[#7F52FF]`} />;
  }
  if (normalized === "java") {
    return <FaJava className={`${className} text-[#ED8B00]`} />;
  }
  if (normalized.includes("typescript") || normalized === "ts") {
    return <SiTypescript className={`${className} text-[#3178C6]`} />;
  }
  if (normalized.includes("javascript") || normalized === "js") {
    return <SiJavascript className={`${className} text-[#F7DF1E]`} />;
  }
  if (normalized.includes("python")) {
    return <SiPython className={`${className} text-[#3776AB]`} />;
  }
  if (normalized.includes("c++") || normalized.includes("c / c++") || normalized === "c") {
    return <SiCplusplus className={`${className} text-[#00599C]`} />;
  }
  if (normalized.includes("sql") && !normalized.includes("postgre") && !normalized.includes("my")) {
    return <TbSql className={`${className} text-[#00758F]`} />;
  }
  if (normalized.includes("html") || normalized.includes("css")) {
    return <SiHtml5 className={`${className} text-[#E34F26]`} />;
  }

  // Frameworks & Libraries
  if (normalized.includes("spring")) {
    return <SiSpringboot className={`${className} text-[#6DB33F]`} />;
  }
  if (normalized.includes("next")) {
    return <SiNextdotjs className={`${className} text-slate-900 dark:text-white`} />;
  }
  if (normalized.includes("react")) {
    return <SiReact className={`${className} text-[#61DAFB]`} />;
  }
  if (normalized.includes("nest")) {
    return <SiNestjs className={`${className} text-[#E0234E]`} />;
  }
  if (normalized.includes("node")) {
    return <SiNodedotjs className={`${className} text-[#5FA04E]`} />;
  }
  if (normalized.includes("express")) {
    return <SiExpress className={`${className} text-slate-900 dark:text-white`} />;
  }
  if (normalized.includes("socket.io") || normalized.includes("socketio") || normalized.includes("websocket")) {
    return <SiSocketdotio className={`${className} text-slate-900 dark:text-white`} />;
  }
  if (normalized.includes("vite")) {
    return <SiVite className={`${className} text-[#646CFF]`} />;
  }
  if (normalized.includes("framer motion") || normalized.includes("framer")) {
    return <SiFramer className={`${className} text-[#0055FF]`} />;
  }
  if (normalized.includes("svelte")) {
    return <SiSvelte className={`${className} text-[#FF3E00]`} />;
  }
  if (normalized.includes("tailwind")) {
    return <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
  }
  if (normalized.includes("material ui") || normalized.includes("mui")) {
    return <SiMui className={`${className} text-[#007FFF]`} />;
  }
  if (normalized.includes("chakra")) {
    return <SiChakraui className={`${className} text-[#319795]`} />;
  }
  if (normalized.includes("zustand")) {
    return <Component className={`${className} text-[#443E38] dark:text-[#BAA898]`} />;
  }

  // Databases
  if (normalized.includes("postgre")) {
    return <SiPostgresql className={`${className} text-[#4169E1]`} />;
  }
  if (normalized.includes("mysql")) {
    return <SiMysql className={`${className} text-[#4479A1]`} />;
  }
  if (normalized.includes("mongo")) {
    return <SiMongodb className={`${className} text-[#47A248]`} />;
  }
  if (normalized.includes("redis")) {
    return <SiRedis className={`${className} text-[#DC382D]`} />;
  }
  if (normalized.includes("graphql")) {
    return <SiGraphql className={`${className} text-[#E10098]`} />;
  }

  // DevOps & Tools
  if (normalized.includes("docker")) {
    return <SiDocker className={`${className} text-[#2496ED]`} />;
  }
  if (normalized.includes("git")) {
    return <SiGit className={`${className} text-[#F05032]`} />;
  }
  if (normalized.includes("github actions")) {
    return <SiGithubactions className={`${className} text-[#2088FF]`} />;
  }
  if (normalized.includes("typeorm")) {
    return <SiTypeorm className={`${className} text-[#FE0803]`} />;
  }
  if (normalized.includes("postman")) {
    return <SiPostman className={`${className} text-[#FF6C37]`} />;
  }
  if (normalized.includes("flyway")) {
    return <SiFlyway className={`${className} text-[#CC0000]`} />;
  }
  if (normalized.includes("jwt") || normalized.includes("json web token")) {
    return <SiJsonwebtokens className={`${className} text-slate-900 dark:text-white`} />;
  }

  // AI & Architecture
  if (normalized.includes("spec driven") || normalized.includes("sdd")) {
    return <TbFileCheck className={`${className} text-[#06B6D4]`} />;
  }
  if (normalized.includes("gemini")) {
    return <SiGoogle className={`${className} text-[#8E75C2]`} />;
  }
  if (normalized.includes("openai") || normalized.includes("chatgpt")) {
    return (
      <svg className={`${className} text-[#10A37F]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.597 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4062-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    );
  }
  if (normalized.includes("claude") || normalized.includes("anthropic")) {
    return (
      <svg className={`${className} text-[#D97706]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382l-2.47-5.748h-1.99l-2.47 5.748h-2.12L12.01 4.5h2.008l3.588 9.882h-2.134zM7.5 19.5h9v-1.5h-9v1.5z" />
      </svg>
    );
  }
  if (normalized.includes("prompt")) {
    return <TbPrompt className={`${className} text-[#f8559f]`} />;
  }
  if (normalized.includes("clean architecture") || normalized.includes("ddd")) {
    return <TbLayersLinked className={`${className} text-[#3744bd] dark:text-[#93c5fd]`} />;
  }
  if (normalized.includes("context injection") || normalized.includes("copilot")) {
    return <TbBrain className={`${className} text-[#f8559f]`} />;
  }

  // Computer Science & University
  if (normalized.includes("data structure")) {
    return <Boxes className={`${className} text-[#38BDF8]`} />;
  }
  if (normalized === "graphs" || (normalized.includes("graph") && !normalized.includes("graphql"))) {
    return <Network className={`${className} text-[#A855F7]`} />;
  }
  if (normalized.includes("algorithm")) {
    return <Cpu className={`${className} text-[#EAB308]`} />;
  }
  if (normalized.includes("oop") || normalized.includes("object-oriented")) {
    return <TbLayersLinked className={`${className} text-[#3744bd] dark:text-[#93c5fd]`} />;
  }
  if (normalized.includes("unsam")) {
    return <GraduationCap className={`${className} text-[#3B82F6]`} />;
  }

  return <Code2 className={`${className} text-[#f8559f]`} />;
}
