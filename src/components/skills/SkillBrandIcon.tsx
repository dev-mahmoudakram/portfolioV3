import type { SimpleIcon } from "simple-icons";
import {
  siBlazor,
  siBootstrap,
  siCss,
  siFramer,
  siGit,
  siGithub,
  siGsap,
  siHtml5,
  siJavascript,
  siLaravel,
  siLivewire,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPrisma,
  siReact,
  siReactquery,
  siRedux,
  siSass,
  siShopify,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siWordpress,
  siYoast
} from "simple-icons";
import styles from "@/styles/skills.module.scss";

const brandIcons = {
  blazor: siBlazor,
  bootstrap: siBootstrap,
  css: siCss,
  framer: siFramer,
  git: siGit,
  github: siGithub,
  gsap: siGsap,
  html5: siHtml5,
  javascript: siJavascript,
  laravel: siLaravel,
  livewire: siLivewire,
  mysql: siMysql,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  php: siPhp,
  postgresql: siPostgresql,
  prisma: siPrisma,
  react: siReact,
  reactquery: siReactquery,
  redux: siRedux,
  sass: siSass,
  shopify: siShopify,
  tailwindcss: siTailwindcss,
  threedotjs: siThreedotjs,
  typescript: siTypescript,
  wordpress: siWordpress,
  yoast: siYoast
} satisfies Record<string, SimpleIcon>;

export type SkillBrand = keyof typeof brandIcons;

const lightPlateBrands = new Set(["github", "nextdotjs", "prisma", "threedotjs"]);

interface SkillBrandIconProps {
  brand: SkillBrand;
}

export function SkillBrandIcon({ brand }: SkillBrandIconProps) {
  const icon = brandIcons[brand];
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
