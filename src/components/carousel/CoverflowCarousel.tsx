"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectItem } from "@/data/types";
import ProjectCard from "./ProjectCard";

interface CoverflowCarouselProps {
  projects: ProjectItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenModal: (project: ProjectItem) => void;
  renderVisualHeader: (project: ProjectItem) => React.ReactNode;
}

export default function CoverflowCarousel({
  projects,
  activeIndex,
  onSelectIndex,
  onOpenModal,
  renderVisualHeader,
}: CoverflowCarouselProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [step, setStep] = useState<number>(240);

  useEffect(() => {
    const updateStep = () => {
      if (!stageRef.current) return;
      const width = stageRef.current.offsetWidth;
      if (width < 640) {
        setStep(130);
      } else if (width < 1024) {
        setStep(190);
      } else {
        setStep(260);
      }
    };

    updateStep();
    const observer = new ResizeObserver(updateStep);
    if (stageRef.current) {
      observer.observe(stageRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const total = projects.length;

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipeThreshold = 50;
    const velocityThreshold = 400;
    const { offset, velocity } = info;

    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      if (activeIndex < total - 1) {
        onSelectIndex(activeIndex + 1);
      }
    } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      if (activeIndex > 0) {
        onSelectIndex(activeIndex - 1);
      }
    }
  };

  const springTransition = {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1.0,
  };

  return (
    <div
      ref={stageRef}
      className="relative w-full h-[570px] sm:h-[530px] flex items-center justify-center select-none touch-pan-y overflow-visible"
      style={{
        perspective: shouldReduceMotion ? undefined : 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        drag={shouldReduceMotion ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {projects.map((project, index) => {
          const offset = index - activeIndex;
          const isCenter = offset === 0;

          let x = 0;
          let z = 0;
          let rotateY = 0;
          let scale = 1;
          let opacity = 1;
          let blur = "0px";

          if (shouldReduceMotion) {
            x = offset * (step + 40);
            scale = isCenter ? 1 : 0.92;
            opacity = isCenter ? 1 : 0.6;
          } else {
            if (isCenter) {
              x = 0;
              z = 40;
              rotateY = 0;
              scale = 1.05;
              opacity = 1;
              blur = "0px";
            } else if (offset < 0) {
              // Left cards: rotateY +35 brings the right edge forward
              x = -step - (Math.abs(offset) - 1) * 90;
              z = -60 - (Math.abs(offset) - 1) * 80;
              rotateY = offset === -1 ? 35 : 42;
              scale = offset === -1 ? 0.9 : 0.8;
              opacity = offset === -1 ? 0.75 : 0.35;
              blur = offset === -1 ? "1.5px" : "3px";
            } else {
              // Right cards: rotateY -35 brings the left edge forward
              x = step + (offset - 1) * 90;
              z = -60 - (offset - 1) * 80;
              rotateY = offset === 1 ? -35 : -42;
              scale = offset === 1 ? 0.9 : 0.8;
              opacity = offset === 1 ? 0.75 : 0.35;
              blur = offset === 1 ? "1.5px" : "3px";
            }
          }

          return (
            <motion.div
              key={project.id}
              onClick={() => {
                if (!isCenter) {
                  onSelectIndex(index);
                }
              }}
              animate={{
                x,
                z: shouldReduceMotion ? 0 : z,
                rotateY: shouldReduceMotion ? 0 : rotateY,
                scale,
                opacity,
                filter: `blur(${blur})`,
              }}
              transition={
                shouldReduceMotion ? { duration: 0.15 } : springTransition
              }
              style={{
                transformStyle: "preserve-3d",
                zIndex: 30 - Math.abs(offset) * 5,
              }}
              className={`absolute w-[82vw] max-w-[320px] sm:max-w-[360px] md:max-w-[400px] origin-center ${
                isCenter ? "cursor-default" : "cursor-pointer hover:opacity-90"
              }`}
            >
              <ProjectCard
                project={project}
                isActive={isCenter}
                onOpenModal={() => onOpenModal(project)}
                visualHeader={renderVisualHeader(project)}
                isCoverflowSide={!isCenter}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
