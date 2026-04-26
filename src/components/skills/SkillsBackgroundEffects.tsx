"use client";

import { motion } from "framer-motion";
import styles from "@/styles/skills.module.scss";
import { Icon } from "@/components/Icon";

interface SkillsBackgroundEffectsProps {
  category: string;
}

const backendNodes = [
  { x: 40, y: 60 },
  { x: 110, y: 92 },
  { x: 170, y: 64 },
  { x: 235, y: 120 },
  { x: 165, y: 170 },
  { x: 74, y: 148 }
];

const toolsIcons = [
  "github",
  "git",
  "search",
  "chart"
];

export function SkillsBackgroundEffects({ category }: SkillsBackgroundEffectsProps) {
  if (category === "frontend") {
    return (
      <div className={styles.visualStage} aria-hidden="true">
        <motion.div className={styles.frontCardPrimary} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <span className={styles.frontDots} />
          <span className={styles.frontLineLong} />
          <span className={styles.frontLineShort} />
          <span className={styles.frontPreview} />
        </motion.div>
        <motion.div className={styles.frontCardMini} animate={{ x: [0, 8, 0] }} transition={{ duration: 3.8, repeat: Infinity }}>
          <span className={styles.frontMiniLine} />
        </motion.div>
        <motion.div className={styles.frontBadge} animate={{ rotate: [0, 4, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
          <span className={styles.frontBadgeText}>Aa</span>
        </motion.div>
      </div>
    );
  }

  if (category === "backend") {
    return (
      <div className={styles.visualStage} aria-hidden="true">
        <svg viewBox="0 0 300 220" className={styles.backendSvg}>
          <path d="M40 60 L110 92 L170 64 L235 120 L165 170 L74 148 Z" className={styles.backendPath} />
          <path d="M110 92 L74 148" className={styles.backendPathSoft} />
          <path d="M170 64 L165 170" className={styles.backendPathSoft} />
          {backendNodes.map((node, index) => (
            <motion.circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r="5.5"
              className={styles.backendNodeSvg}
              animate={{ scale: [1, 1.18, 1], opacity: [0.72, 1, 0.72] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.18 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (category === "databases") {
    return (
      <div className={styles.visualStage} aria-hidden="true">
        <div className={styles.databaseGrid} />
        <div className={styles.databaseCenter}>
          <motion.div className={styles.databaseStack} animate={{ y: [0, -6, 0] }} transition={{ duration: 3.8, repeat: Infinity }}>
            <span className={styles.databaseDisk} />
            <span className={styles.databaseDisk} />
            <span className={styles.databaseDisk} />
          </motion.div>
        </div>
      </div>
    );
  }

  if (category === "cms") {
    return (
      <div className={styles.visualStage} aria-hidden="true">
        <motion.div className={styles.cmsBoard} animate={{ rotate: [0, 1.2, 0] }} transition={{ duration: 4.2, repeat: Infinity }}>
          <span className={styles.cmsTilePrimary} />
          <span className={styles.cmsTile} />
          <span className={styles.cmsTileTall} />
          <span className={styles.cmsTileWide} />
        </motion.div>
      </div>
    );
  }

  if (category === "animation") {
    return (
      <div className={styles.visualStage} aria-hidden="true">
        <div className={styles.animationCubeCenter}>
          <motion.div
            className={styles.animationCubeWrap}
            animate={{ y: [0, -10, 0], rotateZ: [0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className={styles.animationCubeScene}>
              <div className={styles.animationCube}>
                <span className={`${styles.cubeFace} ${styles.cubeFront}`} />
                <span className={`${styles.cubeFace} ${styles.cubeBack}`} />
                <span className={`${styles.cubeFace} ${styles.cubeRight}`} />
                <span className={`${styles.cubeFace} ${styles.cubeLeft}`} />
                <span className={`${styles.cubeFace} ${styles.cubeTop}`} />
                <span className={`${styles.cubeFace} ${styles.cubeBottom}`} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.visualStage} aria-hidden="true">
      <div className={styles.toolsConnector} />
      {toolsIcons.map((icon, index) => (
        <motion.div
          key={icon}
          className={styles.toolsChip}
          style={{ top: `${20 + index * 14}%`, left: `${18 + (index % 2) * 34}%` }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + index * 0.25, repeat: Infinity }}
        >
          <Icon name={icon} />
        </motion.div>
      ))}
    </div>
  );
}
