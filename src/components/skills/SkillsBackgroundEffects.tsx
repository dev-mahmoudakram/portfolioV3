"use client";

import styles from "@/styles/skills.module.scss";

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

export function SkillsBackgroundEffects({ category }: SkillsBackgroundEffectsProps) {
  if (category === "frontend") {
    return (
      <div className={styles.visualStage} aria-hidden="true">
        <div className={`${styles.frontCardPrimary} ${styles.floatPrimary}`}>
          <span className={styles.frontDots} />
          <span className={styles.frontLineLong} />
          <span className={styles.frontLineShort} />
          <span className={styles.frontPreview} />
        </div>
        <div className={`${styles.frontCardMini} ${styles.floatSide}`}>
          <span className={styles.frontMiniLine} />
        </div>
        <div className={`${styles.frontBadge} ${styles.floatRotate}`}>
          <span className={styles.frontBadgeText}>Aa</span>
        </div>
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
            <circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r="5.5"
              className={`${styles.backendNodeSvg} ${styles.backendNodePulse}`}
              style={{
                transformOrigin: `${node.x}px ${node.y}px`,
                animationDelay: `${index * 0.18}s`
              }}
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
          <div className={`${styles.databaseStack} ${styles.floatPrimary}`}>
            <span className={styles.databaseDisk} />
            <span className={styles.databaseDisk} />
            <span className={styles.databaseDisk} />
          </div>
        </div>
      </div>
    );
  }

  if (category === "cms") {
    return (
      <div className={styles.visualStage} aria-hidden="true">
        <div className={`${styles.cmsBoard} ${styles.floatRotateSoft}`}>
          <span className={styles.cmsTilePrimary} />
          <span className={styles.cmsTile} />
          <span className={styles.cmsTileTall} />
          <span className={styles.cmsTileWide} />
        </div>
      </div>
    );
  }

  if (category === "animation") {
    return (
      <div className={styles.visualStage} aria-hidden="true">
        <div className={styles.animationCubeCenter}>
          <div className={`${styles.animationCubeWrap} ${styles.floatCube}`}>
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.visualStage} aria-hidden="true">
      <div className={styles.seoChartBoard}>
        <div className={styles.seoChartHeader}>
          <span>Performance</span>
          <span className={styles.seoChartBadge}>+99</span>
        </div>
        <div className={styles.seoChartGrid} />

        <div className={styles.seoChartBars} role="presentation">
          <span className={`${styles.seoBar} ${styles.seoBarFcp}`} />
          <span className={`${styles.seoBar} ${styles.seoBarLcp}`} />
          <span className={`${styles.seoBar} ${styles.seoBarTbt}`} />
          <span className={`${styles.seoBar} ${styles.seoBarCls}`} />
          <span className={`${styles.seoBar} ${styles.seoBarSi}`} />
        </div>

        <div className={styles.seoKpiRow}>
          <span className={styles.seoKpiChip}>FCP 0.3s</span>
          <span className={styles.seoKpiChip}>LCP 0.9s</span>
          <span className={styles.seoKpiChip}>CLS 0.00</span>
        </div>
      </div>
    </div>
  );
}
