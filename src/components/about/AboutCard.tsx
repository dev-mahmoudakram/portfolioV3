import styles from "@/styles/about.module.scss";
import { Icon } from "@/components/Icon";

interface AboutCardProps {
  title: string;
  description: string;
  icon: string;
}

export function AboutCard({ title, description, icon }: AboutCardProps) {
  return (
    <article className={styles.featureCard}>
      <div className={styles.cardGlow} />
      <div className={styles.iconBadge}>
        <Icon name={icon} />
      </div>
      <h3 className="mt-5 font-fredoka text-[1.45rem] font-medium leading-tight text-white">{title}</h3>
      <p className="mt-3 font-poppins text-base leading-7 text-white/70">{description}</p>
    </article>
  );
}
