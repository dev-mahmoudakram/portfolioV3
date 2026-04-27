import { brandData } from "@/components/skills/brandData";
import styles from "@/styles/skills.module.scss";

export type SkillBrand = keyof typeof brandData;

const lightPlateBrands = new Set(["github", "nextdotjs", "prisma", "threedotjs"]);

interface SkillBrandIconProps {
  brand: SkillBrand;
}

export function SkillBrandIcon({ brand }: SkillBrandIconProps) {
  const icon = brandData[brand];
  const needsLightPlate = lightPlateBrands.has(brand);
  const color = needsLightPlate ? "#111111" : `#${icon.hex}`;

  return (
    <span className={`${styles.skillBrandWrap} ${needsLightPlate ? styles.skillBrandWrapLight : ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className={styles.skillBrandGlyph}>
        <path d={icon.path} fill={color} />
      </svg>
    </span>
  );
}
